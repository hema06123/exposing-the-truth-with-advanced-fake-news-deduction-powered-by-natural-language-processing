
import { ContentType } from "../types/content";

// Helper function to get a random integer
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get a random item from an array
const getRandomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Mock data for text analysis
const textRedFlags = [
  "Uses emotional language to manipulate readers",
  "Contains unverified claims without sources",
  "Presents opinions as facts without distinction",
  "Uses misleading statistics without context",
  "Omits important context that changes interpretation",
  "Contains logical fallacies in reasoning",
  "Attributes claims to unnamed or vague sources",
  "Uses loaded language designed to provoke emotion",
  "Makes claims that contradict established scientific consensus",
  "Uses old information presented as current"
];

const textFactualAssessments = [
  "The content makes several claims that are not substantiated by evidence. While some elements may be factual, the overall framing is misleading.",
  "Our analysis found that while the basic facts presented are accurate, important context is missing that would significantly change how readers interpret the information.",
  "The content appears to be mostly factual, with proper attributions and verifiable claims. There are some minor inaccuracies but they don't significantly impact the overall message.",
  "Our analysis indicates that this content contains several factual inaccuracies and misleading statements. The central claims are not supported by available evidence.",
  "The content presents accurate information and properly attributes sources. Claims made are in line with expert consensus on the subject.",
  "While some facts presented are accurate, they are arranged in a way that creates a misleading narrative. Several claims lack proper context or substantiation."
];

// Mock data for URL analysis
const urlSources = [
  { 
    title: "Reuters Fact Check", 
    url: "https://www.reuters.com/fact-check", 
    description: "Independent verification of related claims" 
  },
  { 
    title: "Associated Press Fact Check", 
    url: "https://apnews.com/hub/ap-fact-check", 
    description: "Additional context on this topic" 
  },
  { 
    title: "PolitiFact", 
    url: "https://www.politifact.com/", 
    description: "Rating of similar claims" 
  },
  { 
    title: "FactCheck.org", 
    url: "https://www.factcheck.org/", 
    description: "Detailed analysis of this subject" 
  },
  { 
    title: "Snopes", 
    url: "https://www.snopes.com/", 
    description: "Investigation of viral claims on this topic" 
  }
];

// Metrics definitions
const metricsDefinitions = [
  {
    name: "Source Credibility",
    description: "Evaluation of the source's reputation and reliability"
  },
  {
    name: "Factual Accuracy",
    description: "Assessment of verifiable facts presented in the content"
  },
  {
    name: "Context Fairness",
    description: "Whether appropriate context is provided for claims"
  },
  {
    name: "Emotional Language",
    description: "Presence of manipulative or highly charged language"
  },
  {
    name: "Citation Quality",
    description: "Credibility and relevance of sources cited"
  }
];

// Mock article titles
const articleTitles = [
  "New Study Reveals Surprising Link Between Diet and Longevity",
  "Government Announces Major Policy Change on Climate Initiatives",
  "Tech Company Unveils Revolutionary AI Technology",
  "Scientists Discover Potential Breakthrough in Cancer Treatment",
  "Economic Report Shows Unexpected Growth in Third Quarter",
  "Health Officials Issue Warning About New Virus Strain",
  "International Relations Strained After Diplomatic Incident",
  "Research Suggests Benefits of New Educational Approach",
  "Environmental Group Challenges Industrial Development Plan",
  "Financial Markets React to Central Bank's Interest Rate Decision"
];

// Create a mock analysis function
export const mockAnalyze = async (content: string, type: 'text' | 'url'): Promise<ContentType> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Generate a semi-random truth score
  // If the content contains certain keywords, bias the score
  let baseScore = Math.random();
  
  // Lower words make it more likely to be rated as misleading
  const lowerWords = ['secret', 'shocking', 'they don\'t want you to know', 'conspiracy', 
                      'never reported', 'mainstream media', 'cover-up', 'hoax'];
  
  // Higher words make it more likely to be rated as truthful
  const higherWords = ['research', 'study', 'evidence', 'according to experts', 
                       'verified', 'peer-reviewed', 'multiple sources', 'data shows'];
                       
  const contentLower = content.toLowerCase();
  
  // Adjust score based on keywords
  lowerWords.forEach(word => {
    if (contentLower.includes(word)) baseScore -= 0.15;
  });
  
  higherWords.forEach(word => {
    if (contentLower.includes(word)) baseScore += 0.1;
  });
  
  // Ensure score is between 0 and 1
  const truthScore = Math.max(0.1, Math.min(0.9, baseScore));
  
  // Generate metrics with scores that align with the overall truth score
  const metrics = metricsDefinitions.map(metric => ({
    ...metric,
    score: Math.max(0.1, Math.min(0.9, truthScore + (Math.random() * 0.4 - 0.2)))
  }));
  
  // Select random red flags based on the truth score
  // Lower truth score = more red flags
  const numRedFlags = Math.max(0, Math.min(5, Math.round((1 - truthScore) * 6)));
  const redFlags = Array.from({ length: numRedFlags }, () => 
    getRandomItem(textRedFlags)
  ).filter((flag, index, self) => self.indexOf(flag) === index); // Remove duplicates
  
  // Select a factual assessment based on truth score
  const factualAssessmentIndex = Math.floor(truthScore * textFactualAssessments.length);
  const factualAssessment = textFactualAssessments[factualAssessmentIndex];
  
  // Generate random sources if it's a URL analysis
  const sources = type === 'url' ? 
    Array.from({ length: getRandomInt(1, 3) }, () => getRandomItem(urlSources))
      .filter((source, index, self) => self.findIndex(s => s.url === source.url) === index) // Remove duplicates
    : [];
  
  // Create excerpt
  let excerpt = content;
  if (content.length > 150) {
    excerpt = content.slice(0, 147) + '...';
  }
  
  // Select a random title or use the first part of the content
  const title = getRandomItem(articleTitles);
  
  return {
    id: Date.now().toString(),
    type,
    title,
    content,
    excerpt,
    analyzedAt: new Date(),
    truthScore,
    metrics,
    redFlags,
    factualAssessment,
    sources
  };
};
