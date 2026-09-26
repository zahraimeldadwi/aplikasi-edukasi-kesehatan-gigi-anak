import React, { useEffect } from 'react';
import { PlayerProfile, ScreenType } from '../types';
import { audioSystem } from '../utils/audioSystem';
import { CharacterAvatar } from './CharacterAvatar';
import {
  Trophy,
  Award,
  BookOpen,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Heart,
  HelpCircle,
} from 'lucide-react';

interface QuizResultsScreenProps {
  player: PlayerProfile;
  onNavigate: (screen: ScreenType) => void;
  onRetryQuiz: () => void;
}

export const QuizResultsScreen: React.FC<QuizResultsScreenProps> = ({
  player,
  onNavigate,
  onRetryQuiz,
}) => {
  const score = player.quizScore ?? 80;

  // Title category based on score
  let categoryTitle = '';
  let categoryIcon = '';
  let categoryColor = '';
  let speechMessage = '';

  if (score >= 90) {
    categoryTitle = 'PAHLAWAN GIGI SUPER';
    categoryIcon = '🏆';
    categoryColor = 'from-amber-400 to-yellow-500 text-amber-950';
    speechMessage = `Wow, ${player.name}! Hebat sekali! Kamu berhasil menjadi Pahlawan Gigi Super!`;
  } else if (score >= 75) {
    categoryTitle = 'PAHLAWAN GIGI HEBAT';
    categoryIcon = '🥇';
    categoryColor = 'from-emerald-400 to-teal-500 text-emerald-950';
    speechMessage = `Bagus sekali, ${player.name}! Kamu adalah Pahlawan Gigi Hebat!`;
  } else if (score >= 60) {
    categoryTitle = 'PENJAGA GIGI';
    categoryIcon = '🥈';
    categoryColor = 'from-sky-400 to-blue-500 text-sky-950';
    speechMessage = `Mantap, ${player.name}! Kamu adalah Penjaga Gigi yang cermat!`;
  } else if (score >= 40) {
    categoryTitle = 'CALON PAHLAWAN GIGI';
    categoryIcon = '🥉';
    categoryColor = 'from-indigo-400 to-purple-500 text-indigo-950';
    speechMessage = `Bagus, ${player.name}! Yuk belajar sedikit lagi supaya semakin jago!`;
  } else {
    categoryTitle = 'PAHLAWAN GIGI PEMULA';
    categoryIcon = '🌱';
    categoryColor = 'from-teal-400 to-emerald-500 text-teal-950';
    speechMessage = `Tidak apa-apa, ${player.name}! Yuk kita ulangi materi kesehatan gigi bersama-sama!`;
  }

  useEffect(() => {
    audioSystem.speak(speechMessage, 'peri', player.gender);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Result Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <CharacterAvatar type="hero" gender={player.gender} size="lg" action="happy" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            🎉 KUIS SELESAI!
          </span>
          <h2 className="font-['Fredoka'] text-3xl sm:text-4xl font-black text-slate-800">
            Hasil Ujian Pahlawan: {player.name}
          </h2>
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r ${categoryColor} font-['Fredoka'] font-black text-lg sm:text-xl shadow-md border-2 border-white`}
          >
            <span>{categoryIcon}</span>
            <span>{categoryTitle}</span>
          </div>
        </div>

        {/* Score Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-xs text-amber-700 font-bold block">Skor Kuis</span>
            <span className="font-['Fredoka'] text-2xl font-black text-amber-800">
              {score}/100
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <span className="text-xs text-emerald-700 font-bold block">Jawaban Benar</span>
            <span className="font-['Fredoka'] text-2xl font-black text-emerald-700">
              {player.quizCorrect}
            </span>
          </div>
          <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
            <span className="text-xs text-rose-700 font-bold block">Jawaban Belum Tepat</span>
            <span className="font-['Fredoka'] text-2xl font-black text-rose-600">
              {player.quizWrong}
            </span>
          </div>
          <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200">
            <span className="text-xs text-sky-700 font-bold block">Nyawa Tersisa</span>
            <div className="flex items-center justify-center gap-1 mt-1">
              {Array.from({ length: player.hearts }).map((_, i) => (
                <Heart key={i} className="w-4 h-4 fill-rose-500 text-rose-500" />
              ))}
            </div>
          </div>
        </div>

        {/* Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('certificate')}
            className="px-6 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-['Fredoka'] font-bold text-base rounded-2xl shadow-md hover:scale-103 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border-2 border-white"
          >
            <Award className="w-5 h-5" />
            <span>📜 LIHAT SERTIFIKAT</span>
          </button>

          <button
            onClick={() => onNavigate('badges')}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-amber-950 font-['Fredoka'] font-bold text-base rounded-2xl shadow-md hover:scale-103 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border-2 border-white"
          >
            <Trophy className="w-5 h-5" />
            <span>🏆 LIHAT LENCANA</span>
          </button>

          <button
            onClick={onRetryQuiz}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>🔄 Coba Kuis Lagi</span>
          </button>

          <button
            onClick={() => onNavigate('materials')}
            className="px-5 py-3 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-sm rounded-2xl border border-teal-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>📚 Ulangi Materi</span>
          </button>

          <button
            onClick={() => onNavigate('map')}
            className="px-5 py-3 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-sm rounded-2xl border border-sky-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>🏠 Peta Petualangan</span>
          </button>
        </div>
      </div>

      {/* Review Section: Yuk Lihat Jawaban Kita */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-sky-200 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <span className="text-2xl">📖</span>
          <div>
            <h3 className="font-['Fredoka'] text-xl font-bold text-slate-800">
              YUK LIHAT JAWABAN KITA
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Pelajari kembali soal yang belum tepat agar gigimu semakin terlindungi!
            </p>
          </div>
        </div>

        {player.quizMistakes.length === 0 ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200 text-center space-y-1">
            <span className="text-3xl">🌟</span>
            <h4 className="font-['Fredoka'] text-lg font-bold text-emerald-800">
              SEMPURNA! Tidak ada kesalahan sama sekali!
            </h4>
            <p className="text-xs text-emerald-700 font-semibold">
              Kamu benar-benar menguasai ilmu kesehatan gigi dan mulut!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {player.quizMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/70 space-y-2.5"
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm font-black text-slate-400">#{idx + 1}</span>
                  <h4 className="font-['Fredoka'] text-sm sm:text-base font-bold text-slate-800">
                    ❓ {mistake.question}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-rose-800 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Jawaban kamu:</span>
                      <span>{mistake.userAnswer}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-emerald-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Jawaban yang benar:</span>
                      <span>{mistake.correctAnswer}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-semibold flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">💡 Penjelasan: </span>
                    <span>{mistake.explanation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
