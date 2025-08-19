
import React from 'react';
import { Candidate } from '../types';
import { RemoveIcon } from './icons';

interface CandidateCardProps {
  candidate: Candidate;
  index: number;
  onUpdate: (id: number, field: 'name' | 'resume', value: string) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, index, onUpdate, onRemove, canRemove }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 relative bg-gray-50 dark:bg-gray-700/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Candidate #{index + 1}
        </h3>
        {canRemove && (
          <button
            onClick={() => onRemove(candidate.id)}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition duration-200"
            aria-label="Remove candidate"
          >
           <RemoveIcon />
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor={`name-${candidate.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Candidate Name
          </label>
          <input
            id={`name-${candidate.id}`}
            type="text"
            value={candidate.name}
            onChange={(e) => onUpdate(candidate.id, 'name', e.target.value)}
            placeholder="E.g., Jane Doe"
            className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
        <div>
          <label htmlFor={`resume-${candidate.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Resume / LinkedIn Profile
          </label>
          <textarea
            id={`resume-${candidate.id}`}
            value={candidate.resume}
            onChange={(e) => onUpdate(candidate.id, 'resume', e.target.value)}
            placeholder="Paste the full resume text or LinkedIn profile details here..."
            className="w-full h-32 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      </div>
    </div>
  );
};
