export type Signal = {
  id: number;
  tag: string;
  headline: string;
  detail: string;
  metric: string;
  metricLabel: string;
};

export type FrameworkCategory =
  | "Compute"
  | "Stream Processing"
  | "Query Engines"
  | "Lakehouse"
  | "Orchestration"
  | "Ingestion"
  | "AI & ML"
  | "Governance"
  | "Visualization"
  | "Infrastructure";

export type Framework = {
  id: string;
  name: string;
  short: string;
  category: FrameworkCategory;
  color: string;
  tagline: string;
  signals: Signal[];
};

export const CATEGORIES: FrameworkCategory[] = [
  "Compute",
  "Stream Processing",
  "Query Engines",
  "Lakehouse",
  "Orchestration",
  "Ingestion",
  "AI & ML",
  "Governance",
  "Visualization",
  "Infrastructure",
];
