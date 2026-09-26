export type Gender = 'boy' | 'girl';

export type ScreenType =
  | 'welcome'
  | 'name_input'
  | 'map'
  | 'materials'
  | 'level_play'
  | 'grand_quiz'
  | 'quiz_result'
  | 'leaderboard'
  | 'badges'
  | 'certificate';

export interface PlayerProfile {
  name: string;
  gender: Gender;
  hearts: number;
  maxHearts: number;
  score: number;
  unlockedLevel: number; // 1 to 8
  completedLevels: number[];
  badges: string[];
  quizCompleted: boolean;
  quizScore: number | null;
  quizCorrect: number;
  quizWrong: number;
  quizMistakes: {
    questionId: number;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
  dateCompleted?: string;
  morningReminder: boolean;
  morningTime: string;
  nightReminder: boolean;
  nightTime: string;
  brushStreak: number;
  lastBrushedDate?: string;
}

export interface LevelInfo {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  badgeId: string;
  description: string;
  themeColor: string;
  bgSoundTheme: 'level1' | 'level2' | 'level3' | 'level4' | 'level5' | 'level6' | 'level7' | 'level8';
  associatedMaterialIds: number[];
}

export interface MaterialCard {
  id: number;
  title: string;
  icon: string;
  summary: string;
  points: string[];
  funFact?: string;
  importantNote?: string;
  audioSpeech: string;
  character: 'gigi' | 'hero' | 'peri' | 'monster';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  icon: string;
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  description: string;
  requirement: string;
  color: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  gender: Gender;
  badgesCount: number;
  date: string;
  isCurrentUser?: boolean;
}
