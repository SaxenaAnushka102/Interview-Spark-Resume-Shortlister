import React, { useState, useCallback, DragEvent } from 'react';
import { AnalysisResult } from './types';
import { analyzeResumes } from './services/geminiService';
import { Header } from './components/Header';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { AnalyzeIcon, UploadIcon, FileIcon, TrashIcon } from './components/icons';
import { jobDescriptions } from './data/jobDescriptions';

const App: React.FC = () => {
  const [selectedJdId, setSelectedJdId] = useState<string>('');
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const selectedJd = jobDescriptions.find(jd => jd.id === selectedJdId);

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      // Prevent duplicates
      const uniqueNewFiles = newFiles.filter(
        (newFile) => !resumeFiles.some((existingFile) => existingFile.name === newFile.name && existingFile.size === newFile.size)
      );
      setResumeFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
    }
  };
  
  const removeFile = (fileToRemove: File) => {
    setResumeFiles(resumeFiles.filter(file => file !== fileToRemove));
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Necessary to allow drop
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const handleAnalysis = useCallback(async () => {
    if (!selectedJd || resumeFiles.length === 0) {
      setError('Please select a job description and upload at least one resume.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeResumes(selectedJd.description, resumeFiles);
      setAnalysis(result);
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? `An error occurred: ${e.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedJd, resumeFiles]);

  return (
    <div className="min-h-screen bg-slate-50 text-[#0d141c]" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <Header />
      <main className="flex flex-1 justify-center py-5 px-4">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          
          <div className="bg-white p-6 rounded-lg border border-[#e7edf4]">
            <h2 className="text-xl font-bold text-[#0d141c] mb-3">1. Select Job Description</h2>
            <p className="text-[#49739c] text-base font-normal leading-normal mb-4">
              Choose a pre-defined job role from the dropdown to see the full description.
            </p>
            <select
                value={selectedJdId}
                onChange={(e) => setSelectedJdId(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141c] focus:outline-0 focus:ring-0 border border-[#cedbe8] bg-slate-50 focus:border-[#cedbe8] h-14 bg-[image:--select-button-svg] placeholder:text-[#49739c] py-[15px] pl-[15px] pr-12 text-base font-normal leading-normal appearance-none bg-no-repeat bg-[right_0.75rem_center]"
                style={{ "--select-button-svg": "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(73,115,156)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')" } as React.CSSProperties}
                aria-label="Select Job Role"
            >
                <option value="" disabled>Select a job role...</option>
                {jobDescriptions.map(jd => (
                    <option key={jd.id} value={jd.id}>{jd.title}</option>
                ))}
            </select>

            {selectedJd && (
                <div className="mt-4 p-4 border border-[#e7edf4] rounded-lg bg-slate-50 max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-[#0d141c] font-sans">
                        {selectedJd.description}
                    </pre>
                </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#e7edf4]">
            <h2 className="text-xl font-bold text-[#0d141c] mb-4">2. Upload Resumes</h2>
            
            <div 
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${isDragging ? 'border-[#0d80f2] bg-blue-50' : 'border-[#cedbe8] hover:border-[#0d80f2]'}`}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={(e) => handleFileChange(e.target.files)}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-2 text-[#49739c]">
                <UploadIcon />
                <span className="font-semibold text-[#0d80f2]">Click to upload</span>
                <span>or drag and drop</span>
                <span className="text-xs">PDF, DOCX, TXT, etc.</span>
              </label>
            </div>

            {resumeFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-[#0d141c]">Staged Files:</h3>
                {resumeFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-100 p-3 rounded-lg border border-[#e7edf4]">
                    <div className="flex items-center gap-3">
                      <FileIcon />
                      <span className="text-sm font-medium text-[#0d141c]">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-[#49739c]">{formatBytes(file.size)}</span>
                      <button onClick={() => removeFile(file)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label={`Remove ${file.name}`}>
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleAnalysis}
              disabled={isLoading || resumeFiles.length === 0 || !selectedJd}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#0d80f2] text-slate-50 text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed mx-auto gap-3"
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
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg" role="alert">
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