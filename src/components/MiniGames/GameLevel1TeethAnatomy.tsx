import React, { useState } from 'react';
import { audioSystem } from '../../utils/audioSystem';
import { MOTIVATION_MESSAGES_CORRECT, MOTIVATION_MESSAGES_WRONG } from '../../data/levelsData';
import { Star, CheckCircle, Sparkles } from 'lucide-react';

interface GameLevel1Props {
  playerName: string;
  onSuccess: (earnedScore: number) => void;
  onWrongAnswer: () => void;
}

interface QuestionRound {
  title: string;
  hint: string;
  targetType: 'seri' | 'taring' | 'geraham';
  questionText: string;
  explanation: string;
}

const ROUNDS: QuestionRound[] = [
  {
    title: 'Misi 1: Gigi Seri',
    hint: 'Gigi depan yang pipih untuk memotong makanan',
    targetType: 'seri',
    questionText: 'Manakah gigi yang berfungsi MEMOTONG makanan saat kita pertama kali menggigit?',
    explanation: 'Gigi seri berada paling depan, pipih dan tajam untuk memotong buah atau roti!',
  },
  {
    title: 'Misi 2: Gigi Taring',
    hint: 'Gigi di sudut yang berujung runcing untuk merobek makanan',
    targetType: 'taring',
    questionText: 'Manakah gigi yang runcing dan berfungsi MEROBEK makanan liat seperti daging?',
    explanation: 'Gigi taring berujung runcing kuat, posisinya di sebelah gigi seri.',
  },
  {
    title: 'Misi 3: Gigi Geraham',
    hint: 'Gigi belakang yang lebar untuk mengunyah dan menghaluskan',
    targetType: 'geraham',
    questionText: 'Manakah gigi besar di belakang yang bertugas MENGUNYAH & MENGHALUSKAN makanan?',
    explanation: 'Gigi geraham memiliki permukaan lebar untuk melumat makanan agar mudah ditelan!',
  },
];

export const GameLevel1TeethAnatomy: React.FC<GameLevel1Props> = ({
  playerName,
  onSuccess,
  onWrongAnswer,
}) => {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [scoreEarned, setScoreEarned] = useState(0);

  const round = ROUNDS[currentRoundIdx];

  const handleSelectTeeth = (chosen: 'seri' | 'taring' | 'geraham') => {
    if (feedback) return;

    if (chosen === round.targetType) {
      audioSystem.playSfx('ting');
      const randomCheer =
        MOTIVATION_MESSAGES_CORRECT[Math.floor(Math.random() * MOTIVATION_MESSAGES_CORRECT.length)];
      setFeedback({
        isCorrect: true,
        text: `${randomCheer} ${round.explanation}`,
      });
      setScoreEarned(prev => prev + 10);
      audioSystem.speak(`Benar sekali, ${playerName}! ${round.explanation}`, 'gigi');

      setTimeout(() => {
        setFeedback(null);
        if (currentRoundIdx + 1 < ROUNDS.length) {
          setCurrentRoundIdx(prev => prev + 1);
        } else {
          audioSystem.playSfx('levelUp');
          onSuccess(scoreEarned + 10 + 20); // +20 bonus mini-game
        }
      }, 2500);
    } else {
      audioSystem.playSfx('oops');
      const randomWrong =
        MOTIVATION_MESSAGES_WRONG[Math.floor(Math.random() * MOTIVATION_MESSAGES_WRONG.length)];
      setFeedback({
        isCorrect: false,
        text: `Ups! Belum tepat. ${randomWrong}`,
      });
      audioSystem.speak(`Ups! Belum tepat, ${playerName}. Ingat petunjuknya ya!`, 'hero');
      onWrongAnswer();

      setTimeout(() => {
        setFeedback(null);
      }, 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-emerald-200 shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Mini Game: Kenali Gigimu ({currentRoundIdx + 1}/{ROUNDS.length})
          </span>
          <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            {round.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-amber-600 font-bold text-sm bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>+10 Poin per Benar</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 text-center">
        <p className="font-['Fredoka'] text-lg sm:text-xl font-bold text-sky-900">
          ❓ “{round.questionText}”
        </p>
        <p className="text-xs text-sky-700 mt-1 font-semibold">💡 Petunjuk: {round.hint}</p>
      </div>

      {/* Interactive Mouth Model with 3 Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Gigi Seri Button */}
        <button
          onClick={() => handleSelectTeeth('seri')}
          disabled={feedback !== null}
          className="group relative p-4 rounded-2xl border-3 border-sky-200 hover:border-sky-500 bg-gradient-to-b from-sky-50 to-white hover:from-sky-100 transition-all text-center flex flex-col items-center gap-2 cursor-pointer shadow-sm hover:scale-102 active:scale-95 disabled:opacity-60"
        >
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-sky-300 shadow-xs flex items-center justify-center text-3xl group-hover:rotate-3 transition-transform">
            🦷
          </div>
          <div>
            <h4 className="font-['Fredoka'] text-lg font-bold text-slate-800 group-hover:text-sky-700">
              Gigi Seri
            </h4>
            <span className="text-[11px] font-semibold text-slate-500 block">Bagian Depan</span>
          </div>
          <span className="text-xs font-bold text-sky-600 bg-sky-100 px-2.5 py-1 rounded-full mt-1">
            Pilih Gigi Ini
          </span>
        </button>

        {/* Gigi Taring Button */}
        <button
          onClick={() => handleSelectTeeth('taring')}
          disabled={feedback !== null}
          className="group relative p-4 rounded-2xl border-3 border-amber-200 hover:border-amber-500 bg-gradient-to-b from-amber-50 to-white hover:from-amber-100 transition-all text-center flex flex-col items-center gap-2 cursor-pointer shadow-sm hover:scale-102 active:scale-95 disabled:opacity-60"
        >
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-300 shadow-xs flex items-center justify-center text-3xl group-hover:rotate-3 transition-transform">
            💎
          </div>
          <div>
            <h4 className="font-['Fredoka'] text-lg font-bold text-slate-800 group-hover:text-amber-700">
              Gigi Taring
            </h4>
            <span className="text-[11px] font-semibold text-slate-500 block">Ujung Runcing</span>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full mt-1">
            Pilih Gigi Ini
          </span>
        </button>

        {/* Gigi Geraham Button */}
        <button
          onClick={() => handleSelectTeeth('geraham')}
          disabled={feedback !== null}
          className="group relative p-4 rounded-2xl border-3 border-emerald-200 hover:border-emerald-500 bg-gradient-to-b from-emerald-50 to-white hover:from-emerald-100 transition-all text-center flex flex-col items-center gap-2 cursor-pointer shadow-sm hover:scale-102 active:scale-95 disabled:opacity-60"
        >
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-emerald-300 shadow-xs flex items-center justify-center text-3xl group-hover:rotate-3 transition-transform">
            🛡️
          </div>
          <div>
            <h4 className="font-['Fredoka'] text-lg font-bold text-slate-800 group-hover:text-emerald-700">
              Gigi Geraham
            </h4>
            <span className="text-[11px] font-semibold text-slate-500 block">Lebar di Belakang</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full mt-1">
            Pilih Gigi Ini
          </span>
        </button>
      </div>

      {/* Instant Feedback Message */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border-2 text-center animate-bounce ${
            feedback.isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}
        >
          <p className="font-['Fredoka'] font-bold text-base flex items-center justify-center gap-2">
            {feedback.isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : '💔'}
            {feedback.text}
          </p>
        </div>
      )}
    </div>
  );
};
