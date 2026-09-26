import React, { useState } from 'react';
import { audioSystem } from '../../utils/audioSystem';
import { CheckCircle2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

interface GameLevel6Props {
  playerName: string;
  onSuccess: (earnedScore: number) => void;
  onWrongAnswer: () => void;
}

interface BrushStep {
  correctOrder: number;
  label: string;
  icon: string;
  tip: string;
}

const BRUSH_STEPS: BrushStep[] = [
  { correctOrder: 1, label: 'Siapkan sikat gigi & pasta gigi berfluoride secukupnya', icon: '🪥', tip: 'Gunakan bulu sikat yang lembut' },
  { correctOrder: 2, label: 'Sikat bagian luar gigi memutar dari gusi ke gigi', icon: '🔄', tip: 'Gerakan memutar lembut' },
  { correctOrder: 3, label: 'Sikat bagian dalam gigi dengan lembut', icon: '🦷', tip: 'Jangan lewatkan sela dalam' },
  { correctOrder: 4, label: 'Sikat permukaan kunyah geraham maju mundur', icon: '↔️', tip: 'Permukaan kunyah yang lebar' },
  { correctOrder: 5, label: 'Bersihkan lidah dengan lembut dari belakang ke depan', icon: '👅', tip: 'Mengusir kuman bau napas' },
  { correctOrder: 6, label: 'Keluarkan busa pasta, berkumur air bersih & cuci sikat gigi', icon: '💧', tip: 'Jangan menelan busanya ya' },
];

export const GameLevel6BrushingOrder: React.FC<GameLevel6Props> = ({
  playerName,
  onSuccess,
  onWrongAnswer,
}) => {
  // Pool of available steps (randomized)
  const [availablePool, setAvailablePool] = useState<BrushStep[]>(() =>
    [...BRUSH_STEPS].sort(() => Math.random() - 0.5)
  );
  // User ordered steps
  const [userSequence, setUserSequence] = useState<BrushStep[]>([]);
  const [feedback, setFeedback] = useState<{ isSuccess: boolean; msg: string } | null>(null);

  const handlePickStep = (step: BrushStep) => {
    if (feedback) return;
    audioSystem.playSfx('click');
    setAvailablePool(prev => prev.filter(s => s.correctOrder !== step.correctOrder));
    setUserSequence(prev => [...prev, step]);
  };

  const handleReset = () => {
    audioSystem.playSfx('click');
    setAvailablePool([...BRUSH_STEPS].sort(() => Math.random() - 0.5));
    setUserSequence([]);
    setFeedback(null);
  };

  const handleCheckOrder = () => {
    if (userSequence.length < BRUSH_STEPS.length) {
      audioSystem.playSfx('oops');
      setFeedback({
        isSuccess: false,
        msg: `Susun dulu semua 6 langkah ya, ${playerName}!`,
      });
      return;
    }

    // Validate order
    const isCorrect = userSequence.every((step, idx) => step.correctOrder === idx + 1);

    if (isCorrect) {
      audioSystem.playSfx('ting');
      audioSystem.playSfx('levelUp');
      setFeedback({
        isSuccess: true,
        msg: `🎉 LUAR BIASA, ${playerName}! Urutan menyikat gigimu 100% tepat! Gigi siap terlindungi 2 menit!`,
      });
      audioSystem.speak(`Hebat sekali, ${playerName}! Urutan sikat gigimu tepat!`, 'hero');

      setTimeout(() => {
        onSuccess(20 + 20); // +20 points + 20 bonus
      }, 2400);
    } else {
      audioSystem.playSfx('oops');
      setFeedback({
        isSuccess: false,
        msg: 'Ups! Ada urutan yang belum tepat. Yuk klik tombol Ulangi dan coba lagi!',
      });
      audioSystem.speak('Ups! Ada langkah yang tertukar. Yuk ulangi lagi!', 'gigi');
      onWrongAnswer();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-blue-200 shadow-md space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
            Mini Game: Balap Sikat Gigi
          </span>
          <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            Susun 6 Urutan Menyikat Gigi yang Benar!
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Ulangi
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 font-semibold bg-blue-50 p-3 rounded-2xl border border-blue-200 text-center">
        👇 Klik langkah-langkah di bawah sesuai urutan dari <strong>Langkah 1 sampai 6</strong>!
      </p>

      {/* Slots Ordered by Child */}
      <div className="space-y-2">
        <h4 className="font-['Fredoka'] text-sm font-bold text-blue-900">
          Urutan Pilihanmu ({userSequence.length}/6):
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 min-h-[160px] bg-slate-50 p-3 rounded-2xl border-2 border-dashed border-blue-300">
          {userSequence.length === 0 ? (
            <div className="col-span-full flex items-center justify-center text-xs text-slate-400 italic font-semibold">
              Belum ada langkah yang dipilih. Klik kartu di bawah untuk memasukkan ke sini!
            </div>
          ) : (
            userSequence.map((step, idx) => (
              <div
                key={step.correctOrder}
                className="bg-white border-2 border-blue-300 rounded-xl p-2.5 flex items-center gap-2.5 shadow-xs"
              >
                <span className="w-6 h-6 rounded-lg bg-blue-500 text-white font-['Fredoka'] font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xl">{step.icon}</span>
                <span className="text-xs font-bold text-slate-800 flex-1">{step.label}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Available Choices Pool */}
      {availablePool.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-['Fredoka'] text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pilih Langkah Berikutnya:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availablePool.map(step => (
              <button
                key={step.correctOrder}
                onClick={() => handlePickStep(step)}
                className="p-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-xl text-left flex items-center gap-3 transition-all cursor-pointer hover:scale-101 active:scale-98 shadow-xs"
              >
                <span className="text-2xl">{step.icon}</span>
                <div className="flex-1">
                  <span className="font-bold text-xs text-slate-800 block">{step.label}</span>
                  <span className="text-[10px] text-slate-400">{step.tip}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback & Check Button */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl border-2 text-center text-xs sm:text-sm font-bold ${
            feedback.isSuccess
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}
        >
          {feedback.msg}
        </div>
      )}

      {userSequence.length === BRUSH_STEPS.length && !feedback?.isSuccess && (
        <button
          onClick={handleCheckOrder}
          className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-['Fredoka'] font-bold text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>PERIKSA URUTAN SIKAT GIGI</span>
        </button>
      )}
    </div>
  );
};
