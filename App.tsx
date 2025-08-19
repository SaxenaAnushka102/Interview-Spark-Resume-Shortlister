
import React, { useState, useCallback } from 'react';
import { Candidate, AnalysisResult } from './types';
import { analyzeResumes } from './services/geminiService';
import { Header } from './components/Header';
import { CandidateCard } from './components/CandidateCard';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { AddIcon, AnalyzeIcon } from './components/icons';

const App: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: '', resume: '' },
  ]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { id: Date.now(), name: '', resume: '' },
    ]);
  };

  const removeCandidate = (id: number) => {
    setCandidates(candidates.filter((c) => c.id !== id));
  };

  const updateCandidate = (id: number, field: 'name' | 'resume', value: string) => {
    setCandidates(
      candidates.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleAnalysis = useCallback(async () => {
    if (!jobDescription.trim() || candidates.some(c => !c.name.trim() || !c.resume.trim())) {
      setError('Please fill in the job description and all candidate details.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeResumes(jobDescription, candidates);
      setAnalysis(result);
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? `An error occurred: ${e.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [jobDescription, candidates]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Job Description</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Paste the full job description below. The more detailed it is, the better the AI analysis will be.
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="E.g., Senior Frontend React Engineer with experience in TypeScript and Tailwind CSS..."
              className="w-full h-40 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Candidate Profiles</h2>
              <button
                onClick={addCandidate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                <AddIcon />
                Add Candidate
              </button>
            </div>
            <div className="space-y-6">
              {candidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  index={index}
                  onUpdate={updateCandidate}
                  onRemove={removeCandidate}
                  canRemove={candidates.length > 1}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleAnalysis}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader />
                  Analyzing...
                </>
              ) : (
                <>
                 <AnalyzeIcon />
                  Analyze Resumes
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {analysis && <ResultsDisplay analysis={analysis} />}
        </div>
      </main>
    </div>
  );
};

export default App;
