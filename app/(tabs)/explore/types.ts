export interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface CollapsibleContent {
  title: string;
  content: React.ReactNode;
}