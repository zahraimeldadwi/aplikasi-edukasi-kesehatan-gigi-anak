import React, { useState } from 'react';
import { audioSystem } from '../../utils/audioSystem';
import { CharacterAvatar } from '../CharacterAvatar';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface GameLevel3Props {
  playerName: string;
  onSuccess: (earnedScore: number) => void;
  onWrongAnswer: () => void;
}

interface PlaqueSpot {
  id: number;
  x: number; // percentage
  y: number;
  cleaned: boolean;
  size: number;
}

const INITIAL_SPOTS: PlaqueSpot[] = [
  { id: 1, x: 22, y: 35, cleaned: false, size: 28 },
  { id: 2, x: 38, y: 30, cleaned: false, size: 32 },
  { id: 3, x: 50, y: 40, cleaned: false, size: 26 },
  { id: 4, x: 64, y: 32, cleaned: false, size: 30 },
  { id: 5, x: 78, y: 36, cleaned: false, size: 28 },
  { id: 6, x: 30, y: 55, cleaned: false, size: 25 },
  { id: 7, x: 45, y: 60, cleaned: false, size: 29 },
  { id: 8, x: 60, y: 58, cleaned: false, size: 27 },
  { id: 9, x: 72, y: 52, cleaned: false, size: 26 },
];

export const GameLevel3PlaqueScrubber: React.FC<GameLevel3Props> = ({
  playerName,
  onSuccess,
}) => {
  const [spots, setSpots] = useState<PlaqueSpot[]>(INITIAL_SPOTS);
  const [isCompleted, setIsCompleted] = useState(false);
  const [monsterAction, setMonsterAction] = useState<'idle' | 'hurt' | 'defeated'>('idle');

  const cleanedCount = spots.filter(s => s.cleaned).length;
  const cleanPercentage = Math.round((cleanedCount / spots.length) * 100);

  const cleanSpot = (id: number) => {
    if (isCompleted) return;

    setSpots(prev => {
      const target = prev.find(s => s.id === id);
      if (!target || target.cleaned) return prev;

      audioSystem.playSfx('clean');
      const updated = prev.map(s => (s.id === id ? { ...s, cleaned: true } : s));
      const newlyCleaned = updated.filter(s => s.cleaned).length;

      if (newlyCleaned === updated.length) {
        // Complete!
        setIsCompleted(true);
        setMonsterAction('defeated');
        audioSystem.playSfx('sparkle');
        audioSystem.playSfx('bonus');
        audioSystem.speak(
          `Yeay! Hebat sekali, ${playerName}! Gigi dan gusi sekarang bersih berkilau, Monster Plak kabur!`,
          'gigi'
        );

        setTimeout(() => {
          onSuccess(20 + 20); // +20 points + 20 mini-game bonus
        }, 2200);
      } else {
        setMonsterAction('hurt');
        setTimeout(() => setMonsterAction('idle'), 400);
      }

      return updated;
    });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-teal-200 shadow-md space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
            Mini Game: Selamatkan Gusi
          </span>
          <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            Gosok Plak Kuning dengan Sikat Gigimu!
          </h3>
        </div>

        {/* Clean Progress Meter */}
        <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
          <span className="text-xs font-bold text-teal-700">Kebersihan:</span>
          <span className="font-['Fredoka'] font-bold text-teal-800 text-base">
            {cleanPercentage}%
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 font-semibold bg-sky-50 p-3 rounded-2xl border border-sky-200 text-center">
        👆 <strong>Sentuh atau usap bulatan plak kuning</strong> di atas gigi dan tepi gusi sampai bersih berkilau!
      </p>

      {/* Interactive Dental Row with Plaque & Gums */}
      <div className="relative w-full max-w-xl mx-auto bg-gradient-to-b from-sky-50 to-emerald-50 rounded-3xl p-6 border-3 border-teal-300 shadow-inner overflow-hidden select-none">
        {/* Animated Healthy/Inflamed Gums Header */}
        <div
          className={`h-12 w-full rounded-t-2xl transition-colors duration-500 flex items-center justify-center font-['Fredoka'] font-bold text-xs ${
            isCompleted
              ? 'bg-rose-200 text-rose-800'
              : 'bg-rose-400 text-white animate-pulse'
          }`}
        >
          {isCompleted ? '✨ Gusi Sehat Berwarna Merah Muda Segar ✨' : '⚠️ Gusi Mengalami Radang karena Plak!'}
        </div>

        {/* Teeth Row Display */}
        <div className="relative bg-white border-x-4 border-b-4 border-slate-200 rounded-b-2xl h-48 flex items-center justify-center overflow-hidden">
          {/* Smiling Teeth Illustration */}
          <div className="flex gap-2 sm:gap-4 items-center justify-center w-full px-4">
            {['seri1', 'seri2', 'taring1', 'geraham1', 'geraham2'].map((_, idx) => (
              <div
                key={idx}
                className={`w-14 sm:w-16 h-28 rounded-b-3xl border-3 border-slate-300 bg-white flex flex-col justify-end p-2 transition-transform shadow-xs ${
                  isCompleted ? 'scale-105 border-sky-400 bg-sky-50/30' : ''
                }`}
              >
                <div className="w-full h-1 bg-slate-100 rounded-full mb-1" />
                <div className="w-full h-1 bg-slate-100 rounded-full mb-1" />
              </div>
            ))}
          </div>

          {/* Plaque Spots that child scrubs */}
          {spots.map(spot => (
            <button
              key={spot.id}
              onClick={() => cleanSpot(spot.id)}
              onMouseEnter={() => cleanSpot(spot.id)}
              onTouchStart={() => cleanSpot(spot.id)}
              style={{
                top: `${spot.y}%`,
                left: `${spot.x}%`,
                width: `${spot.size}px`,
                height: `${spot.size}px`,
              }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
                spot.cleaned
                  ? 'scale-0 opacity-0 pointer-events-none'
                  : 'bg-yellow-400 hover:bg-yellow-500 border-2 border-amber-600 shadow-md animate-pulse'
              }`}
            >
              <span className="text-[10px] font-black text-amber-900">🦠</span>
            </button>
          ))}

          {/* Sparkles when cleaned */}
          {isCompleted && (
            <div className="absolute inset-0 bg-white/40 flex items-center justify-center gap-4 animate-bounce">
              <span className="text-4xl">✨</span>
              <span className="font-['Fredoka'] text-xl sm:text-2xl font-extrabold text-teal-700">
                Gigi Bersih Berkilau!
              </span>
              <span className="text-4xl">✨</span>
            </div>
          )}
        </div>

        {/* Sikat Gigi Cursor Helper */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 font-bold text-teal-700">
            <Sparkles className="w-4 h-4 text-teal-500" /> Sisa Plak: {spots.length - cleanedCount}
          </span>
          <span className="text-slate-400">Gunakan sikat lembut selama 2 menit!</span>
        </div>
      </div>

      {/* Monster Plak Reaction Footer */}
      <div className="flex items-center justify-center gap-4 bg-teal-50/70 p-3 rounded-2xl border border-teal-200">
        <CharacterAvatar type="monster_plak" size="sm" action={monsterAction} />
        <p className="font-['Fredoka'] text-xs sm:text-sm font-bold text-teal-900">
          {isCompleted
            ? '👾 Monster Plak: "Waduuuh! Giginya bersih sekali, tidak ada sisa kotoran lagi! Aku kaburrr!"'
            : '👾 Monster Plak: "Hehehe, aku menempel di sela gigi kalau kamu jarang sikat gigi!"'}
        </p>
      </div>
    </div>
  );
};
