
import { GoogleGenAI, Type } from "@google/genai";
import { Candidate, AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
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
                        description: "The name of the candidate being analyzed."
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


const buildPrompt = (jobDescription: string, candidates: Candidate[]): string => {
    const candidateProfiles = candidates.map(c => 
        `--- CANDIDATE PROFILE ---
        Name: ${c.name}
        Resume/Profile Text:
        ${c.resume}
        --- END CANDIDATE PROFILE ---`
    ).join('\n\n');

    return `
      You are an expert technical recruiter and hiring manager with years of experience. Your task is to analyze a list of candidates for a specific job role.

      First, carefully review the provided job description to understand the key requirements, skills, and qualifications.

      --- JOB DESCRIPTION ---
      ${jobDescription}
      --- END JOB DESCRIPTION ---

      Next, analyze each of the following candidate profiles against the job description.

      ${candidateProfiles}

      Based on your analysis, provide a detailed evaluation for each candidate and identify the top candidate. Respond ONLY with a JSON object that matches the provided schema. Do not include any other text or markdown formatting.
    `;
};

export const analyzeResumes = async (jobDescription: string, candidates: Candidate[]): Promise<AnalysisResult> => {
    const prompt = buildPrompt(jobDescription, candidates);
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.2,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        // Basic validation
        if (!result.candidateAnalyses || !result.topCandidateName) {
            throw new Error("Invalid JSON structure received from API.");
        }
        
        return result as AnalysisResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from AI. Please check the console for more details.");
    }
};
