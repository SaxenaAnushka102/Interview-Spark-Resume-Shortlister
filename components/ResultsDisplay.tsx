
import React from 'react';
import { AnalysisResult, CandidateAnalysis } from '../types';
import { CheckIcon, CrossIcon, StarIcon } from './icons';

const getScoreColor = (score: number): string => {
  if (score >= 8) return 'text-green-500';
  if (score >= 5) return 'text-yellow-500';
  return 'text-red-500';
};

const ScoreDonut: React.FC<{ score: number }> = ({ score }) => {
    const colorClass = score >= 8 ? 'stroke-green-500' : score >= 5 ? 'stroke-yellow-500' : 'stroke-red-500';
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 10) * circumference;
  
    return (
      <div className="relative w-20 h-20">
        <svg className="w-full h-full" viewBox="0 0 80 80">
          <circle
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="40"
            cy="40"
          />
          <circle
            className={`transition-all duration-1000 ease-out ${colorClass}`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="40"
            cy="40"
            transform="rotate(-90 40 40)"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
      </div>
    );
};

const AnalysisCard: React.FC<{ analysis: CandidateAnalysis; isTopPick: boolean }> = ({ analysis, isTopPick }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 p-6 transition-all duration-300 ${isTopPick ? 'border-green-500 shadow-green-500/20' : 'border-gray-200 dark:border-gray-700'}`}>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
           <h3 className="text-xl font-bold text-gray-900 dark:text-white">{analysis.candidateName}</h3>
            {isTopPick && (
                <div className="mt-2 flex items-center gap-1.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                    <StarIcon/> Top Pick
                </div>
            )}
           <div className="mt-4">
                <ScoreDonut score={analysis.suitabilityScore} />
           </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-600 dark:text-gray-400 italic">"{analysis.summary}"</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Pros</h4>
              <ul className="space-y-1.5">
                {analysis.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon /> <span className="text-sm">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Cons</h4>
              <ul className="space-y-1.5">
                {analysis.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CrossIcon /> <span className="text-sm">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export const ResultsDisplay: React.FC<{ analysis: AnalysisResult }> = ({ analysis }) => {
  const sortedAnalyses = [...analysis.candidateAnalyses].sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  return (
    <div className="space-y-6 mt-8">
       <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Analysis Results</h2>
       <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Here is the AI's breakdown of each candidate's suitability for the role. The top pick is highlighted for your convenience.
       </p>
      {sortedAnalyses.map((candidateAnalysis, index) => (
        <AnalysisCard
          key={index}
          analysis={candidateAnalysis}
          isTopPick={candidateAnalysis.candidateName === analysis.topCandidateName}
        />
      ))}
    </div>
  );
};
