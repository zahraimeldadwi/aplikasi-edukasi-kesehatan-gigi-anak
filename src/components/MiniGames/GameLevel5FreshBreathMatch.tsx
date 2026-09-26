import React, { useState } from 'react';
import { audioSystem } from '../../utils/audioSystem';
import { Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

interface GameLevel5Props {
  playerName: string;
  onSuccess: (earnedScore: number) => void;
  onWrongAnswer: () => void;
}

interface MatchPair {
  id: string;
  habit: string;
  habitIcon: string;
  result: string;
  resultIcon: string;
}

const PAIRS: MatchPair[] = [
  {
    id: 'p1',
    habit: 'Menyikat gigi 2 kali sehari',
    habitIcon: '🪥',
    result: 'Gigi bersih dari sisa makanan & kuman',
    resultIcon: '😁',
  },
  {
    id: 'p2',
    habit: 'Rajin minum air putih',
    habitIcon: '💧',
    result: 'Mulut tetap basah & tidak kering',
    resultIcon: '💦',
  },
  {
    id: 'p3',
    habit: 'Membersihkan lidah dengan lembut',
    habitIcon: '👅',
    result: 'Napas harum, segar & bebas bau',
    resultIcon: '💨',
  },
  {
    id: 'p4',
    habit: 'Terlalu sering makan permen manis',
    habitIcon: '🍬',
    result: 'Monster Karies datang bikin gigi berlubang',
    resultIcon: '👾',
  },
];

export const GameLevel5FreshBreathMatch: React.FC<GameLevel5Props> = ({
  playerName,
  onSuccess,
  onWrongAnswer,
}) => {
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  // Shuffled results order
  const [shuffledResults] = useState(() =>
    [...PAIRS].sort(() => Math.random() - 0.5)
  );
  const [message, setMessage] = useState('Pilih satu kebiasaan di sebelah kiri, lalu pilih hasil yang cocok di sebelah kanan!');

  const handleSelectHabit = (id: string) => {
    if (matchedIds.includes(id)) return;
    audioSystem.playSfx('click');
    setSelectedHabitId(id);
    setMessage('Sekarang pilih hasil yang cocok di sebelah kanan!');
  };

  const handleSelectResult = (resultId: string) => {
    if (matchedIds.includes(resultId)) return;
    if (!selectedHabitId) {
      setMessage('Pilih dulu kebiasaan di sebelah kiri ya!');
      return;
    }

    if (selectedHabitId === resultId) {
      // Correct match!
      audioSystem.playSfx('ting');
      const updated = [...matchedIds, resultId];
      setMatchedIds(updated);
      setSelectedHabitId(null);
      setMessage('✨ Hebat! Pasangannya tepat sekali!');
      audioSystem.speak(`Benar sekali, ${playerName}!`, 'hero');

      if (updated.length === PAIRS.length) {
        audioSystem.playSfx('bonus');
        audioSystem.playSfx('levelUp');
        setMessage('🎉 SEMUA COCOK! Napasmu segar sepanjang hari!');
        audioSystem.speak('Luar biasa! Kamu sudah tahu cara menjaga napas tetap segar!', 'gigi');
        setTimeout(() => {
          onSuccess(20 + 20); // +20 points + 20 mini-game bonus
        }, 2200);
      }
    } else {
      // Wrong match
      audioSystem.playSfx('oops');
      setMessage('Ups! Pasangan belum cocok. Coba dipikirkan lagi ya!');
      audioSystem.speak('Ups! Belum cocok, coba lagi ya!', 'hero');
      onWrongAnswer();
      setSelectedHabitId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-cyan-200 shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-100 text-cyan-800">
            Mini Game: Misi Napas Segar
          </span>
          <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            Cocokkan Kebiasaan dengan Hasilnya!
          </h3>
        </div>
        <span className="text-xs font-bold bg-cyan-50 border border-cyan-200 text-cyan-700 px-3 py-1.5 rounded-xl">
          {matchedIds.length} dari 4 Cocok
        </span>
      </div>

      <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 text-center font-bold text-sky-900 text-xs sm:text-sm">
        💡 {message}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left Column: Habits */}
        <div className="space-y-3">
          <h4 className="font-['Fredoka'] text-sm font-bold text-slate-700 uppercase tracking-wider text-center">
            Kebiasaan Kita 👈
          </h4>
          {PAIRS.map(pair => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedHabitId === pair.id;

            return (
              <button
                key={pair.id}
                disabled={isMatched}
                onClick={() => handleSelectHabit(pair.id)}
                className={`w-full p-4 rounded-2xl border-3 text-left transition-all flex items-center gap-3 cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-300 opacity-60 cursor-default'
                    : isSelected
                    ? 'bg-cyan-100 border-cyan-500 ring-4 ring-cyan-200 shadow-md scale-102'
                    : 'bg-white border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 shadow-xs'
                }`}
              >
                <span className="text-3xl">{pair.habitIcon}</span>
                <span className="font-bold text-xs sm:text-sm text-slate-800 flex-1">
                  {pair.habit}
                </span>
                {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Right Column: Results */}
        <div className="space-y-3">
          <h4 className="font-['Fredoka'] text-sm font-bold text-slate-700 uppercase tracking-wider text-center">
            👉 Hasil pada Mulut & Gigi
          </h4>
          {shuffledResults.map(item => {
            const isMatched = matchedIds.includes(item.id);

            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleSelectResult(item.id)}
                className={`w-full p-4 rounded-2xl border-3 text-left transition-all flex items-center gap-3 cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-300 opacity-60 cursor-default'
                    : 'bg-white border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 shadow-xs active:scale-98'
                }`}
              >
                <span className="text-3xl">{item.resultIcon}</span>
                <span className="font-bold text-xs sm:text-sm text-slate-800 flex-1">
                  {item.result}
                </span>
                {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
