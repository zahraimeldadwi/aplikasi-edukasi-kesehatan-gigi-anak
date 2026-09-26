import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioSystem } from '../../utils/audioSystem';
import { CharacterAvatar } from '../CharacterAvatar';
import { Heart, Sparkles, Trophy, Zap } from 'lucide-react';

interface GameLevel8Props {
  playerName: string;
  onSuccess: (earnedScore: number) => void;
  onWrongAnswer: () => void;
}

interface BossQuestion {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const BOSS_QUESTIONS: BossQuestion[] = [
  {
    id: 1,
    question: 'Berapa kali minimal kita harus memeriksakan gigi ke dokter gigi?',
    options: ['Setiap 6 bulan sekali', 'Hanya 10 tahun sekali', 'Saat gigi sudah hilang semua', 'Tidak pernah'],
    correctIdx: 0,
    explanation: 'Rutin periksa tiap 6 bulan mencegah lubang gigi sejak dini!',
  },
  {
    id: 2,
    question: 'Apa bahayanya jika kita suka menggigit benda keras seperti pensil atau es batu?',
    options: ['Gigi bisa retak atau patah', 'Gigi menjadi berwarna emas', 'Gigi bisa melompat', 'Napas jadi wangi'],
    correctIdx: 0,
    explanation: 'Benda keras bisa membuat email gigi retak atau patah!',
  },
  {
    id: 3,
    question: 'Kapan waktu paling berbahaya bagi kuman karies merusak gigi jika kita tidak menyikat gigi?',
    options: ['Malam hari saat kita tidur', 'Saat kita sedang berenang', 'Saat membaca buku', 'Saat mencuci piring'],
    correctIdx: 0,
    explanation: 'Saat tidur, air liur berkurang sehingga kuman lebih mudah memakan sisa makanan dan memproduksi asam!',
  },
  {
    id: 4,
    question: 'Apa yang harus dilakukan jika gigi sakit atau gusi terus berdarah?',
    options: ['Segera beritahu orang tua untuk periksa ke dokter', 'Diam saja di kamar', 'Makan permen manis lebih banyak', 'Mengorek gigi dengan peniti'],
    correctIdx: 0,
    explanation: 'Orang tua dan dokter gigi siap membantu merawat gigimu!',
  },
  {
    id: 5,
    question: 'Mineral apakah yang terkandung dalam pasta gigi yang bertugas memperkuat email gigi?',
    options: ['Fluoride', 'Garam dapur', 'Pewarna baju', 'Minyak goreng'],
    correctIdx: 0,
    explanation: 'Fluoride adalah mineral perisai pelindung gigi dari asam kuman!',
  },
  {
    id: 6,
    question: 'Apa yang membuat mulut terasa segar dan bebas bau napas?',
    options: ['Menyikat gigi dan membersihkan lidah dengan lembut', 'Makan permen karet sebelum tidur', 'Tidak minum air seharian', 'Menutup hidung'],
    correctIdx: 0,
    explanation: 'Menyikat gigi dan lidah mengangkat kuman penyebab bau napas!',
  },
  {
    id: 7,
    question: 'Mengapa karang gigi tidak boleh dicungkil sendiri dengan jarum?',
    options: ['Karena berbahaya melukai gusi dan infeksi', 'Karena jarum rasanya manis', 'Karena karang gigi bisa meledak', 'Karena karang gigi adalah permen'],
    correctIdx: 0,
    explanation: 'Hanya dokter gigi yang punya alat bersih steril untuk membersihkan karang gigi!',
  },
  {
    id: 8,
    question: 'Berapa durasi waktu yang tepat saat menyikat seluruh gigi kita?',
    options: ['Sekitar 2 menit', 'Hanya 5 detik', '1 jam penuh', '30 menit'],
    correctIdx: 0,
    explanation: 'Waktu 2 menit sudah cukup membersihkan semua sisi gigi dengan menyeluruh!',
  },
  {
    id: 9,
    question: 'Makanan manakah yang kaya kalsium untuk pertumbuhan gigi yang kuat?',
    options: ['Susu dan keju', 'Minuman soda bersoda', 'Keripik pedas', 'Permen jeli'],
    correctIdx: 0,
    explanation: 'Susu dan keju memberikan kalsium alami bagi gigi dan tulang!',
  },
  {
    id: 10,
    question: 'Apa kunci utama agar Monster Karies tidak pernah kembali?',
    options: ['Rajin sikat gigi setelah sarapan & sebelum tidur', 'Makan cokelat sepanjang malam', 'Malas berkumur', 'Takut ke dokter gigi'],
    correctIdx: 0,
    explanation: 'Sikat gigi 2 kali sehari secara teratur adalah perisai terhebat Pahlawan Gigi!',
  },
];

export const GameLevel8BossBattle: React.FC<GameLevel8Props> = ({
  playerName,
  onSuccess,
  onWrongAnswer,
}) => {
  const [bossHp, setBossHp] = useState(5);
  const [qIndex, setQIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [heroAction, setHeroAction] = useState<'idle' | 'attacking' | 'happy'>('idle');
  const [bossAction, setBossAction] = useState<'idle' | 'hurt' | 'defeated' | 'happy'>('idle');
  const [bossDefeated, setBossDefeated] = useState(false);

  const currentQ = BOSS_QUESTIONS[qIndex];

  const handleAnswer = (optionIdx: number) => {
    if (feedback || bossDefeated) return;

    if (optionIdx === currentQ.correctIdx) {
      // Correct! Boss loses 1 HP
      audioSystem.playSfx('attack');
      audioSystem.playSfx('ting');
      const nextBossHp = Math.max(0, bossHp - 1);
      setBossHp(nextBossHp);

      setHeroAction('attacking');
      setBossAction('hurt');

      setFeedback({
        isCorrect: true,
        text: `⚡ SERANGAN CAHAYA GIGI! ${currentQ.explanation}`,
      });
      audioSystem.speak(`Serangan tepat, ${playerName}!`, 'hero');

      setTimeout(() => {
        setHeroAction('idle');
        setBossAction('idle');
        setFeedback(null);

        if (nextBossHp <= 0 || qIndex + 1 >= BOSS_QUESTIONS.length) {
          // Boss Defeated!
          setBossDefeated(true);
          setBossAction('defeated');
          audioSystem.playSfx('bossDefeat');
          audioSystem.playSfx('victory');

          // Trigger confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });

          audioSystem.speak(
            `Aaaah! Monster Karies kalah! Yeay! Kamu berhasil menjadi Pahlawan Gigi Sejati, ${playerName}!`,
            'gigi'
          );

          setTimeout(() => {
            onSuccess(50 + 50); // Grand boss score bonus!
          }, 3000);
        } else {
          setQIndex(prev => prev + 1);
        }
      }, 1800);
    } else {
      // Wrong answer
      audioSystem.playSfx('oops');
      setBossAction('happy');
      setFeedback({
        isCorrect: false,
        text: `👾 Monster Karies menyerang balik! Jawaban belum tepat.`,
      });
      audioSystem.speak(`Waduh, belum tepat! Tetap semangat, ${playerName}!`, 'monster');
      onWrongAnswer();

      setTimeout(() => {
        setBossAction('idle');
        setFeedback(null);
      }, 2000);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-violet-400 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-100 text-rose-800 uppercase tracking-wider animate-pulse">
            ⚔️ PERTARUNGAN BOSS AKHIR
          </span>
          <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-black text-slate-800 mt-1">
            Kastil Pahlawan: Lawan Monster Karies Besar!
          </h3>
        </div>

        {/* Boss Energy Hearts */}
        <div className="flex items-center gap-1.5 bg-purple-100 px-3.5 py-2 rounded-2xl border-2 border-purple-300 shadow-xs">
          <span className="text-xs font-black text-purple-900 uppercase">Energi Boss:</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${
                i < bossHp ? 'fill-purple-700 text-purple-700 animate-pulse' : 'fill-slate-200 text-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Epic Battle Stage */}
      <div className="relative bg-gradient-to-r from-sky-100 via-purple-100 to-rose-100 rounded-3xl p-6 border-3 border-violet-300 flex items-center justify-between min-h-[170px] overflow-hidden">
        {/* Hero Side */}
        <div className="flex flex-col items-center">
          <CharacterAvatar type="hero" size="lg" action={heroAction} />
          <span className="text-xs font-black text-sky-800 mt-1 bg-white/90 px-2.5 py-0.5 rounded-full border border-sky-300">
            🦸 Pahlawan {playerName}
          </span>
        </div>

        {/* Lightning Energy Clash Center */}
        <div className="text-center px-4">
          <div className="w-12 h-12 rounded-full bg-white shadow-md border-2 border-violet-300 flex items-center justify-center mx-auto text-amber-500 animate-bounce">
            <Zap className="w-6 h-6 fill-amber-400" />
          </div>
          <span className="text-[11px] font-black text-purple-800 block mt-1">
            Soal {qIndex + 1}/10
          </span>
        </div>

        {/* Boss Side */}
        <div className="flex flex-col items-center">
          <div className="scale-120">
            <CharacterAvatar type="monster_karies" size="lg" action={bossAction} />
          </div>
          <span className="text-xs font-black text-purple-900 mt-2 bg-white/90 px-2.5 py-0.5 rounded-full border border-purple-300">
            👾 Monster Karies Besar
          </span>
        </div>
      </div>

      {/* Victory Announcement if Defeated */}
      {bossDefeated ? (
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl text-white text-center space-y-2 animate-bounce shadow-xl">
          <Trophy className="w-12 h-12 mx-auto text-amber-300 animate-spin" />
          <h4 className="font-['Fredoka'] text-2xl sm:text-3xl font-black">
            🎉 MONSTER KARIES BERHASIL DIKALAHKAN!
          </h4>
          <p className="text-sm text-emerald-100 font-bold">
            Gigi di seluruh kerajaan kembali bersih, berkilau, dan sehat berkatmu, Pahlawan {playerName}!
          </p>
        </div>
      ) : (
        /* Question & Attack Options */
        <div className="space-y-4">
          <div className="p-4 bg-violet-50 border-2 border-violet-200 rounded-2xl text-center">
            <p className="font-['Fredoka'] text-base sm:text-lg font-bold text-violet-950">
              ⚔️ {currentQ.question}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={feedback !== null}
                onClick={() => handleAnswer(idx)}
                className="p-3.5 bg-white border-2 border-slate-200 hover:border-violet-400 hover:bg-violet-50/50 rounded-2xl text-left font-bold text-slate-800 text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer hover:scale-101 active:scale-98 shadow-xs disabled:opacity-60"
              >
                <span className="w-7 h-7 rounded-xl bg-violet-100 text-violet-800 flex items-center justify-center font-['Fredoka'] font-bold text-xs shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            ))}
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div
              className={`p-3.5 rounded-2xl border-2 text-center text-xs sm:text-sm font-bold ${
                feedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-rose-50 border-rose-300 text-rose-800'
              }`}
            >
              {feedback.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
