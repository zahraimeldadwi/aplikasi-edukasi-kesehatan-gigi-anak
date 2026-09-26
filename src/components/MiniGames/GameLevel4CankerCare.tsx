import React, { useState } from 'react';
import { audioSystem } from '../../utils/audioSystem';
import { CharacterAvatar } from '../CharacterAvatar';
import { MOTIVATION_MESSAGES_CORRECT, MOTIVATION_MESSAGES_WRONG } from '../../data/levelsData';
import { Star, CheckCircle, HelpCircle } from 'lucide-react';

interface GameLevel4Props {
  playerName: string;
  onSuccess: (earnedScore: number) => void;
  onWrongAnswer: () => void;
}

interface Scenario {
  id: number;
  situation: string;
  question: string;
  options: { text: string; isCorrect: boolean; explanation: string }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    situation: 'Kamu merasakan luka kecil yang perih di bibir bagian dalam (sariawan).',
    question: 'Pilihan makanan & minuman manakah yang paling baik saat sariawan?',
    options: [
      { text: 'Makan keripik sambal pedas berlevel tinggi', isCorrect: false, explanation: 'Makanan pedas membuat sariawan makin perih!' },
      { text: 'Minum air putih cukup dan makan sup buah bergizi', isCorrect: true, explanation: 'Air putih dan makanan bervitamin membantu pemulihan luka di mulut.' },
      { text: 'Minum minuman bersoda asam yang sangat dingin', isCorrect: false, explanation: 'Soda asam dapat mengiritasi luka sariawan.' },
      { text: 'Tidak mau makan dan minum seharian', isCorrect: false, explanation: 'Tubuh butuh nutrisi dan air agar lekas pulih.' },
    ],
  },
  {
    id: 2,
    situation: 'Temanmu ingin menyentuh sariawan di mulutnya karena terasa aneh.',
    question: 'Tindakan apa yang sebaiknya dilakukan terhadap luka sariawan?',
    options: [
      { text: 'Mengorek luka dengan kuku jari atau tusuk gigi', isCorrect: false, explanation: 'Kuku membawa kuman kotor yang bisa menyebabkan infeksi!' },
      { text: 'Menempelkan permen permen manis di lukanya', isCorrect: false, explanation: 'Gula manis justru disukai kuman!' },
      { text: 'Menjaga kebersihan mulut dengan menyikat gigi secara lembut', isCorrect: true, explanation: 'Mulut yang bersih membantu sariawan sembuh tanpa kuman berlebih.' },
      { text: 'Membiarkan makanan basi terselip di luka', isCorrect: false, explanation: 'Sisa makanan mengundang kuman berkembang biak.' },
    ],
  },
  {
    id: 3,
    situation: 'Sariawan di mulutmu sudah lebih dari seminggu dan masih terasa sakit.',
    question: 'Apa langkah bijak yang harus kamu lakukan, Pahlawan Gigi?',
    options: [
      { text: 'Beri tahu orang tua agar diperiksa ke dokter', isCorrect: true, explanation: 'Orang tua dan dokter akan membantu memberikan obat yang aman.' },
      { text: 'Diam saja dan menahan sakit sendirian', isCorrect: false, explanation: 'Pahlawan gigi harus berani jujur jika merasa sakit.' },
      { text: 'Memasang plester luka ke dalam mulut', isCorrect: false, explanation: 'Plester kulit tidak boleh ditempel di dalam mulut.' },
      { text: 'Berhenti berbicara selamanya', isCorrect: false, explanation: 'Cukup beritahu orang tua ya!' },
    ],
  },
];

export const GameLevel4CankerCare: React.FC<GameLevel4Props> = ({
  playerName,
  onSuccess,
  onWrongAnswer,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [earnedScore, setEarnedScore] = useState(0);

  const scenario = SCENARIOS[currentIdx];

  const handleSelectOption = (opt: { isCorrect: boolean; explanation: string }) => {
    if (feedback) return;

    if (opt.isCorrect) {
      audioSystem.playSfx('ting');
      const cheer =
        MOTIVATION_MESSAGES_CORRECT[Math.floor(Math.random() * MOTIVATION_MESSAGES_CORRECT.length)];
      setFeedback({
        isCorrect: true,
        text: `${cheer} ${opt.explanation}`,
      });
      setEarnedScore(prev => prev + 10);
      audioSystem.speak(`Tepat sekali, ${playerName}! ${opt.explanation}`, 'peri');

      setTimeout(() => {
        setFeedback(null);
        if (currentIdx + 1 < SCENARIOS.length) {
          setCurrentIdx(prev => prev + 1);
        } else {
          audioSystem.playSfx('levelUp');
          onSuccess(earnedScore + 10 + 20); // +20 bonus mini-game
        }
      }, 2500);
    } else {
      audioSystem.playSfx('oops');
      const wrong =
        MOTIVATION_MESSAGES_WRONG[Math.floor(Math.random() * MOTIVATION_MESSAGES_WRONG.length)];
      setFeedback({
        isCorrect: false,
        text: `Ups! ${opt.explanation} ${wrong}`,
      });
      audioSystem.speak(`Ups, belum tepat! ${opt.explanation}`, 'hero');
      onWrongAnswer();

      setTimeout(() => {
        setFeedback(null);
      }, 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-orange-200 shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-800">
            Mini Game: Misi Sariawan ({currentIdx + 1}/{SCENARIOS.length})
          </span>
          <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            Rawat Mulut dari Sariawan
          </h3>
        </div>
        <div className="flex items-center gap-1 text-amber-600 font-bold text-sm bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>+10 Poin</span>
        </div>
      </div>

      {/* Scenario Situation Card */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex items-center gap-4">
        <div className="text-3xl">🌋</div>
        <div>
          <span className="text-xs font-bold text-orange-800 uppercase tracking-wide">
            Situasi Sariawan:
          </span>
          <p className="font-semibold text-slate-800 text-sm">{scenario.situation}</p>
          <p className="font-['Fredoka'] text-base font-bold text-orange-950 mt-1">
            ❓ {scenario.question}
          </p>
        </div>
      </div>

      {/* Options Grid */}
      <div className="space-y-3">
        {scenario.options.map((opt, i) => (
          <button
            key={i}
            disabled={feedback !== null}
            onClick={() => handleSelectOption(opt)}
            className="w-full text-left p-4 rounded-2xl border-2 border-slate-200 hover:border-orange-400 bg-white hover:bg-orange-50/40 transition-all font-bold text-slate-800 text-sm flex items-center justify-between cursor-pointer hover:scale-101 active:scale-98 shadow-xs disabled:opacity-60"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-['Fredoka'] text-sm font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt.text}</span>
            </div>
            <HelpCircle className="w-4 h-4 text-slate-300" />
          </button>
        ))}
      </div>

      {/* Feedback Message */}
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
