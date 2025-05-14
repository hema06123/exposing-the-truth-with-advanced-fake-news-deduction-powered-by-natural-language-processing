
export interface ContentMetric {
  name: string;
  description: string;
  score: number; // 0 to 1
}

export interface ContentSource {
  title: string;
  url: string;
  description: string;
}

export interface ContentType {
  id: string;
  type: 'text' | 'url';
  title: string;
  content: string;
  excerpt: string;
  analyzedAt: Date;
  truthScore: number; // 0 to 1
  metrics: ContentMetric[];
  redFlags: string[];
  factualAssessment: string;
  sources: ContentSource[];
}
