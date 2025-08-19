# AI Resume Shortlister

<img width="2255" height="1405" alt="Screenshot 2025-08-20 12 52 03 AM" src="https://github.com/user-attachments/assets/d262f770-85bb-4ecf-b60c-63ffa0acba41" />


An intelligent, web-based tool that uses Google's Gemini AI to automate the tedious process of resume screening. This application allows recruiters and hiring managers to quickly analyze multiple candidate profiles against a specific job description, providing a ranked and detailed breakdown of each candidate's suitability.

## Key Features

- **🤖 AI-Powered Analysis**: Utilizes the advanced reasoning capabilities of the `gemini-2.5-flash` model to understand the nuances of both the job description and candidate resumes.
- **📊 Quantitative Scoring**: Each candidate is given a `Suitability Score` from 1 to 10 for a quick, at-a-glance comparison.
- **📝 Qualitative Feedback**: Generates a concise summary, a list of **Pros** (strengths & qualifications), and **Cons** (potential gaps) for each candidate.
- **🏆 Top Candidate Recommendation**: The AI identifies and highlights the single most promising candidate from the provided list.
- **👥 Multi-Candidate Comparison**: Add and analyze several candidates simultaneously in a single batch.
- **📱 Responsive & Clean UI**: A modern, intuitive interface built with Tailwind CSS that works beautifully on all devices.
- **🌙 Dark Mode**: Automatic dark mode support based on system preference.

## How It Works

1.  **Paste the Job Description**: Provide the full text of the job description you're hiring for.
2.  **Add Candidate Profiles**: For each candidate, enter their name and paste the full text of their resume or LinkedIn profile. You can add as many candidates as you need.
3.  **Analyze Resumes**: Click the "Analyze Resumes" button to send the data to the Gemini API.
4.  **View Results**: The application displays a sorted list of candidates, highlighting the top pick and showing a detailed card for each with their score, summary, pros, and cons.

## Tech Stack

- **Frontend**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Model**: [Google Gemini API](https://ai.google.dev/) (`@google/genai` SDK)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- An active [Google AI API Key](https://aistudio.google.com/app/apikey).

### Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/ai-resume-shortlister.git
    cd ai-resume-shortlister
    ```

2.  **Set up your environment variables:**
    The application is configured to use an environment variable for the Google Gemini API key. Ensure that `process.env.API_KEY` is available in your execution environment. For local development, you can create a mechanism (e.g., using a `.env` file with a tool like Vite or `dotenv`) to load this variable.

    Create a `.env` file in the project root and add your API key:
    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```

3.  **Install dependencies and run:**
    This project uses a modern, build-free setup with ES modules. You can serve it with any simple local server. For example, using `serve`:
    ```sh
    # Install serve globally if you don't have it
    npm install -g serve

    # Run the server from the project root
    serve .
    ```
    Your application will be running at the local address provided by the server (e.g., `http://localhost:3000`).

## Project Structure

```
.
├── index.html            # HTML entry point
├── index.tsx             # Main React entry script
├── App.tsx               # Main application component (state and layout)
├── services/
│   └── geminiService.ts  # Logic for interacting with the Gemini API
├── components/
│   ├── CandidateCard.tsx # Component for a single candidate's input form
│   ├── Header.tsx        # Application header component
│   ├── ResultsDisplay.tsx# Component to display the final analysis
│   └── ...               # Other UI components
└── types.ts              # TypeScript type definitions
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
