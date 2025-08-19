
export interface Candidate {
  id: number;
  name: string;
  resume: string;
}

export interface CandidateAnalysis {
  candidateName: string;
  suitabilityScore: number;
  summary: string;
  pros: string[];
  cons: string[];
}

export interface AnalysisResult {
  topCandidateName: string;
  candidateAnalyses: CandidateAnalysis[];
}
