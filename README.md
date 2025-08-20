# Interview Spark AI Resume Shortlister
<img width="2254" height="1392" alt="image" src="https://github.com/user-attachments/assets/cc5d6bc4-464a-4ec6-8462-9dce7f8d371a" />

Interview Spark is an AI-powered tool designed to streamline the initial stages of the hiring process. It automatically screens and rates candidates by analyzing their resumes against a specific job description, helping recruiters and hiring managers quickly identify the most suitable applicants.

## Key Features

- **🤖 AI-Powered Analysis**: Leverages the Google Gemini API to perform a deep, contextual analysis of resumes, going beyond simple keyword matching.
- **📄 Bulk Resume Upload**: Upload multiple candidate resumes at once with a simple and intuitive drag-and-drop interface. Supported formats include `.pdf`, `.docx`, `.txt`, and more.
- **🎯 Job Description Matching**: Paste any job description, and the AI will use it as the single source of truth for its analysis.
- **📈 Detailed Scoring & Feedback**: Each candidate receives a quantitative **Suitability Score** (from 1 to 10), a qualitative summary, and a clear list of **Pros** and **Cons**.
- **⭐ Top Candidate Identification**: The system automatically highlights the best-fit candidate based on the overall analysis, saving you time and effort.
- **✨ Modern & Clean UI**: A responsive, easy-to-use interface built with React and Tailwind CSS provides a seamless user experience.

## How to Use

Using Interview Spark is a simple three-step process:

1.  **Paste the Job Description**: In the first section, paste the complete job description for the role you are hiring for. The more detail you provide, the more accurate the AI's analysis will be.

2.  **Upload Resumes**: Drag and drop one or more resume files into the uploader, or click to select them from your computer. You will see a list of "Staged Files" ready for analysis.

3.  **Analyze**: Click the **"Analyze Resumes"** button. The AI will process each resume against the job description. This may take a few moments.

4.  **Review Results**: Once the analysis is complete, the results will appear. You can review each candidate's score, summary, pros, and cons. The top candidate will be highlighted with a "Top Pick" badge.

## Technical Stack

-   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Engine**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)

## Project Setup

This application is designed to run in a web-based development environment where the necessary dependencies are managed.

### API Key Configuration

The application requires a Google Gemini API key to function. This key must be available as an environment variable named `API_KEY`.

-   `process.env.API_KEY`: Your secret Google Gemini API key.

The application is architected to read this key directly from the execution environment. No in-app configuration is required.

### File Structure

The project is organized into the following main directories and files:

```
/
├── public/
├── src/
│   ├── components/      # Reusable React components (Header, ResultsDisplay, etc.)
│   ├── services/        # Contains the geminiService.ts for API interactions
│   ├── App.tsx          # Main application component and state management
│   ├── index.tsx        # Entry point for the React application
│   └── types.ts         # TypeScript type definitions
├── index.html           # Main HTML file
└── README.md            # You are here!
```
