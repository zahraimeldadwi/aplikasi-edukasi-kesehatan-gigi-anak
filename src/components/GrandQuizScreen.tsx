import React, { useState } from 'react';
import { PlayerProfile, QuizQuestion } from '../types';
import { GRAND_QUIZ_QUESTIONS } from '../data/quizData';
import { audioSystem } from '../utils/audioSystem';
import { MOTIVATION_MESSAGES_CORRECT, MOTIVATION_MESSAGES_WRONG } from '../data/levelsData';
import { Heart, Star, CheckCircle, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrandQuizScreenProps {
  player: PlayerProfile;
  onFinishQuiz: (
    score: number,
    correctCount: number,
    wrongCount: number,
    mistakes: {
      questionId: number;
      question: string;
      userAnswer: string;
      correctAnswer: string;
      explanation: string;
    }[]
  ) => void;
  onDeductHeart: () => void;
  onRestoreHearts: () => void;
  onBackToHome: () => void;
}

export const GrandQuizScreen: React.FC<GrandQuizScreenProps> = ({
  player,
  onFinishQuiz,
  onDeductHeart,
  onRestoreHearts,
  onBackToHome,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredFeedback, setAnsweredFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [mistakes, setMistakes] = useState<
    {
      questionId: number;
      question: string;
      userAnswer: string;
      correctAnswer: string;
      explanation: string;
    }[]
  >([]);

  const questions = GRAND_QUIZ_QUESTIONS;
  const currentQ = questions[currentIdx];

  const handleSelectAnswer = (optIndex: number) => {
    if (answeredFeedback) return;
    setSelectedOption(optIndex);

    const isCorrect = optIndex === currentQ.correctIndex;

    if (isCorrect) {
      audioSystem.playSfx('ting');
      const cheer =
        MOTIVATION_MESSAGES_CORRECT[Math.floor(Math.random() * MOTIVATION_MESSAGES_CORRECT.length)];
      setAnsweredFeedback({ isCorrect: true, text: cheer });
      setCorrectCount(prev => prev + 1);
    } else {
      audioSystem.playSfx('oops');
      const wrongMsg =
        MOTIVATION_MESSAGES_WRONG[Math.floor(Math.random() * MOTIVATION_MESSAGES_WRONG.length)];
      setAnsweredFeedback({ isCorrect: false, text: wrongMsg });
      setWrongCount(prev => prev + 1);
      onDeductHeart();

      // Record mistake for review after quiz ends
      setMistakes(prev => [
        ...prev,
        {
          questionId: currentQ.id,
          question: currentQ.question,
          userAnswer: currentQ.options[optIndex],
          correctAnswer: currentQ.options[currentQ.correctIndex],
          explanation: currentQ.explanation,
        },
      ]);
    }

    setTimeout(() => {
      setAnsweredFeedback(null);
      setSelectedOption(null);

      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        // Finished all 20 questions!
        audioSystem.playSfx('victory');
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
        const totalScore = Math.round(((correctCount + (isCorrect ? 1 : 0)) / questions.length) * 100);
        onFinishQuiz(totalScore, correctCount + (isCorrect ? 1 : 0), wrongCount + (!isCorrect ? 1 : 0), mistakes);
      }
    }, 1400);
  };

  // If hearts run out during quiz
  if (player.hearts <= 0) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border-4 border-rose-300 shadow-2xl text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-4xl animate-bounce">
          💔
        </div>
        <div className="space-y-2">
          <h3 className="font-['Fredoka'] text-3xl font-extrabold text-rose-700">
            Nyawamu Habis!
          </h3>
          <p className="text-slate-600 font-bold text-base">
            Jangan menyerah, Pahlawan Gigi {player.name}! Kesalahan adalah kesempatan belajar terbaik!
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              onRestoreHearts();
              setCurrentIdx(0);
              setCorrectCount(0);
              setWrongCount(0);
              setMistakes([]);
            }}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-['Fredoka'] font-bold text-lg rounded-2xl shadow-lg hover:scale-103 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>🔄 COBA LAGI (Isi 5 Nyawa)</span>
          </button>

          <button
            onClick={onBackToHome}
            className="w-full py-3 px-6 bg-slate-100 text-slate-700 font-bold text-sm rounded-2xl hover:bg-slate-200 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Quiz Progress & Stats */}
      <div className="bg-white rounded-3xl p-5 border-3 border-purple-200 shadow-md space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <span className="font-['Fredoka'] text-base sm:text-lg font-bold text-purple-900 block leading-tight">
                Kuis Besar Pahlawan Gigi
              </span>
              <span className="text-xs text-purple-700 font-semibold">
                Soal {currentIdx + 1} dari {questions.length} · {currentQ.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Benar: {correctCount}</span>
            </div>
            <div className="flex items-center gap-1 text-rose-600 font-bold text-xs bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Nyawa: {player.hearts}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-purple-50 h-3 rounded-full overflow-hidden border border-purple-200">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-purple-200 shadow-lg space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-['Fredoka'] font-bold text-sm flex items-center justify-center">
              {currentIdx + 1}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              {currentQ.category}
            </span>
          </div>

          <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* 4 Choices */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;

            return (
              <button
                key={idx}
                disabled={answeredFeedback !== null}
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 cursor-pointer shadow-xs disabled:cursor-default ${
                  isSelected
                    ? answeredFeedback?.isCorrect
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-400 ring-2 ring-rose-200 text-rose-900'
                    : 'bg-white border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 text-slate-800 hover:scale-101 active:scale-98'
                }`}
              >
                <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 font-['Fredoka'] font-bold text-xs flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-bold text-sm sm:text-base flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Encouraging Feedback Flash */}
        {answeredFeedback && (
          <div
            className={`p-3.5 rounded-2xl border-2 text-center font-bold text-sm animate-bounce ${
              answeredFeedback.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}
          >
            {answeredFeedback.text}
          </div>
        )}
      </div>
    </div>
  );
};
