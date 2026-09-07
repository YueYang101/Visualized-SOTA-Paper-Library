export const categoryIds = [
  'robust-grasp',
  'shared-control',
  'retarget-teleop',
] as const;

export type CategoryId = (typeof categoryIds)[number];
export type Priority = 'very-high' | 'high' | 'medium' | 'low';

export interface DeepReadState {
  completed: boolean;
  needed: boolean;
}

export interface PaperIndex {
  id: string;
  title: string;
  shortTitle: string;
  paperUrl: string;
  authors: string[];
  year: number;
  venue: string;
  categories: CategoryId[];
  priority: Priority;
  deepRead: DeepReadState;
  tags: string[];
  oneMinute: string;
}

export interface PaperLink {
  label: string;
  url: string;
}

export interface PaperExperiment {
  title: string;
  setup: string;
  result: string;
  takeaway?: string;
  source?: string;
}

export interface PaperMedia {
  type: 'image' | 'video';
  role: 'architecture' | 'experiment' | 'demo';
  title: string;
  url: string;
  caption: string;
  sourceUrl?: string;
  alt?: string;
  direct?: boolean;
  posterUrl?: string;
}

export interface PaperQuestionAnswer {
  id: string;
  question: string;
  answer: string;
  updatedAt?: string;
  relatedQaIds?: string[];
  sources?: PaperLink[];
}

export interface PaperDetail {
  id: string;
  subtitle: string;
  spotlight?: boolean;
  sourceNote: string;
  contributions: string[];
  evidence: string[];
  limitations: string[];
  relevance: string[];
  nextReading: string;
  suggestedTags: string[];
  links: PaperLink[];
  experiments?: PaperExperiment[];
  media?: PaperMedia[];
  qa?: PaperQuestionAnswer[];
}

export interface CategoryManifestItem {
  id: CategoryId;
  label: string;
  shortLabel: string;
  description: string;
  count: number;
}

export interface PaperOverride {
  original: PaperIndex;
  changes: Partial<Pick<PaperIndex, 'categories' | 'priority' | 'deepRead' | 'tags'>>;
  updatedAt: string;
}

export interface LocalStore {
  schemaVersion: 1;
  papers: Record<string, PaperOverride>;
}
