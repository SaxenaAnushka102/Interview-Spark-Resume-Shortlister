import { GoogleGenAI, Type, Part } from "@google/genai";
import { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        topCandidateName: {
            type: Type.STRING,
            description: "The name of the single most suitable candidate from the list."
        },
        candidateAnalyses: {
            type: Type.ARRAY,
            description: "An array containing the detailed analysis for each candidate.",
            items: {
                type: Type.OBJECT,
                properties: {
                    candidateName: {
                        type: Type.STRING,
                        description: "The full name of the candidate, extracted from their resume."
                    },
                    suitabilityScore: {
                        type: Type.INTEGER,
                        description: "A score from 1 (not suitable) to 10 (perfect fit) indicating suitability for the role."
                    },
                    summary: {
                        type: Type.STRING,
                        description: "A brief one or two-sentence summary of the candidate's fit for the role."
                    },
                    pros: {
                        type: Type.ARRAY,
                        description: "A list of key strengths and matching qualifications.",
                        items: { type: Type.STRING }
                    },
                    cons: {
                        type: Type.ARRAY,
                        description: "A list of potential weaknesses, gaps, or areas of concern.",
                        items: { type: Type.STRING }
                    }
                },
                required: ["candidateName", "suitabilityScore", "summary", "pros", "cons"]
            }
        }
    },
    required: ["topCandidateName", "candidateAnalyses"]
};


const fileToGenerativePart = async (file: File): Promise<Part> => {
    const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error("Failed to read file as data URL."));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });

    const data = await base64EncodedDataPromise;
    return {
        inlineData: {
            data,
            mimeType: file.type,
        },
    };
};

export const analyzeResumes = async (jobDescription: string, resumeFiles: File[]): Promise<AnalysisResult> => {
    
    const prompt = `
      You are an expert technical recruiter and hiring manager with years of experience. Your task is to analyze a list of candidate resumes for a specific job role.

      First, carefully review the provided job description to understand the key requirements, skills, and qualifications.

      --- JOB DESCRIPTION ---
      ${jobDescription}
      --- END JOB DESCRIPTION ---

      Next, analyze each of the attached candidate resume files. For each resume, you must first extract the candidate's full name from the document.

      Based on your analysis, provide a detailed evaluation for each candidate against the job description and identify the top candidate overall.

      Respond ONLY with a JSON object that matches the provided schema. The 'candidateName' for each analysis in your response MUST be the name you extracted from the corresponding resume file. Do not include any other text or markdown formatting.
    `;

    try {
        const fileParts = await Promise.all(resumeFiles.map(fileToGenerativePart));
        
        const contents = {
            parts: [{ text: prompt }, ...fileParts],
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.2,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        if (!result.candidateAnalyses || !result.topCandidateName) {
            throw new Error("Invalid JSON structure received from API.");
        }
        
        return result as AnalysisResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error && error.message.includes('JSON')) {
             throw new Error("Failed to parse the analysis from the AI. The response was not valid JSON.");
        }
        throw new Error("Failed to get analysis from AI. Please check the console for more details.");
    }
};