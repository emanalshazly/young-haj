export type StepType = "quiz" | "memory" | "maze" | "ordering";

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  valueLearned: string;
  iconName: string;
  type?: StepType;
  question?: string;
  options?: Option[];
  successMessage: string;
  locale: "ar" | "en";
  review: {
    status: "pending" | "reviewed";
    receiptId?: string;
  };
}

export type GameState = "welcome" | "playing" | "completed";
