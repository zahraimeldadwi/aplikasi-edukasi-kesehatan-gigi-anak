import React, { useState } from 'react';
import { audioSystem } from '../../utils/audioSystem';
import { CharacterAvatar } from '../CharacterAvatar';
import { MOTIVATION_MESSAGES_CORRECT } from '../../data/levelsData';
import { Shield, Sparkles, Heart } from 'lucide-react';

interface GameLevel2Props {
  playerName: string;
  onSuccess: (earnedScore: number) => void;
  onWrongAnswer: () => void;
}

interface FoodItem {
  id: string;
  name: string;
  icon: string;
  isGood: boolean;
  desc: string;
}

const FOOD_ITEMS: FoodItem[] = [
  { id: 'f1', name: 'Apel Segar', icon: '🍎', isGood: true, desc: 'Renyah dan kaya serat alami' },
  { id: 'f2', name: 'Permen Manis', icon: '🍬', isGood: false, desc: 'Lengket dan banyak gula pasir' },
  { id: 'f3', name: 'Wortel Sehat', icon: '🥕', isGood: true, desc: 'Kaya vitamin & membersihkan sela gigi' },
  { id: 'f4', name: 'Minuman Bersoda', icon: '🥤', isGood: false, desc: 'Sangat asam dan tinggi gula' },
  { id: 'f5', name: 'Air Putih Bersih', icon: '💧', isGood: true, desc: 'Membilas sisa makanan dan menyegarkan' },
  { id: 'f6', name: 'Lolipop Gula', icon: '🍭', isGood: false, desc: 'Menempel lama di gigi' },
  { id: 'f7', name: 'Susu Segar', icon: '🥛', isGood: true, desc: 'Kaya kalsium memperkuat email gigi' },
  { id: 'f8', name: 'Kue Cokelat Manis', icon: '🍫', isGood: false, desc: 'Gula manis disukai kuman karies' },
];

export const GameLevel2FoodCollector: React.FC<GameLevel2Props> = ({
  playerName,
  onSuccess,
  onWrongAnswer,
}) => {
  const [monsterHp, setMonsterHp] = useState(4);
  const [basket, setBasket] = useState<FoodItem[]>([]);
  const [availableItems, setAvailableItems] = useState<FoodItem[]>(FOOD_ITEMS);
  const [battleMessage, setBattleMessage] = useState<string>(
    'Pilih makanan yang baik untuk gigi agar Pahlawan Gigi bisa menyerang Monster Karies!'
  );
  const [heroAction, setHeroAction] = useState<'idle' | 'attacking' | 'happy'>('idle');
  const [monsterAction, setMonsterAction] = useState<'idle' | 'hurt' | 'defeated'>('idle');

  const handleSelectItem = (item: FoodItem) => {
    // Remove clicked item from available list
    setAvailableItems(prev => prev.filter(f => f.id !== item.id));

    if (item.isGood) {
      // Good food: Hero attacks Monster
      audioSystem.playSfx('attack');
      audioSystem.playSfx('ting');
      const nextHp = Math.max(0, monsterHp - 1);
      setMonsterHp(nextHp);
      setBasket(prev => [...prev, item]);

      setHeroAction('attacking');
      setMonsterAction('hurt');

      const cheer =
        MOTIVATION_MESSAGES_CORRECT[Math.floor(Math.random() * MOTIVATION_MESSAGES_CORRECT.length)];
      setBattleMessage(
        `💥 SERANGAN GIGI BERSIH! ${item.name} berhasil ditambahkan! ${cheer}`
      );
      audioSystem.speak(`Hebat, ${playerName}! ${item.name} sangat baik untuk gigi!`, 'hero');

      setTimeout(() => {
        setHeroAction('idle');
        setMonsterAction('idle');

        if (nextHp <= 0) {
          // Monster defeated!
          setMonsterAction('defeated');
          audioSystem.playSfx('bossDefeat');
          setBattleMessage('🎉 YEEEAY! Monster Karies berhasil dikalahkan!');
          audioSystem.speak('Monster Karies berhasil dikalahkan! Gigimu selamat!', 'gigi');

          setTimeout(() => {
            onSuccess(20 + 20); // +20 points + 20 mini-game bonus
          }, 2000);
        }
      }, 1200);
    } else {
      // Bad food chosen
      audioSystem.playSfx('oops');
      setMonsterAction('idle');
      setBattleMessage(`👾 Waduh! ${item.name} adalah makanan manis yang membuat Monster Karies senang!`);
      audioSystem.speak(`Ups, ${playerName}! Makanan manis membuat kuman bertambah kuat!`, 'monster');
      onWrongAnswer();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-purple-200 shadow-md space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
            Mini Game: Lawan Monster Karies
          </span>
          <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            Kumpulkan Makanan Baik ke Keranjang Pahlawan!
          </h3>
        </div>

        {/* Monster HP Hearts */}
        <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
          <span className="text-xs font-bold text-purple-700">Darah Monster:</span>
          {Array.from({ length: 4 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-4 h-4 ${
                i < monsterHp ? 'fill-purple-600 text-purple-600' : 'fill-slate-200 text-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Battle Arena Graphic */}
      <div className="relative bg-gradient-to-r from-sky-100 via-indigo-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200 flex items-center justify-around min-h-[140px]">
        {/* Pahlawan Gigi Side */}
        <div className="text-center">
          <CharacterAvatar type="hero" size="md" action={heroAction} />
          <span className="text-xs font-bold text-sky-800 block mt-1">
            🦸 Pahlawan {playerName}
          </span>
        </div>

        <div className="text-center px-2">
          <div className="text-2xl font-black text-purple-400">VS</div>
          <span className="text-[11px] font-bold text-purple-700 bg-white/80 px-2 py-0.5 rounded-full shadow-xs">
            Pertarungan
          </span>
        </div>

        {/* Monster Karies Side */}
        <div className="text-center">
          <CharacterAvatar type="monster_karies" size="md" action={monsterAction} />
          <span className="text-xs font-bold text-purple-800 block mt-1">
            👾 Monster Karies
          </span>
        </div>
      </div>

      {/* Battle Commentary */}
      <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-center">
        <p className="font-['Fredoka'] text-sm sm:text-base font-bold text-purple-900">
          {battleMessage}
        </p>
      </div>

      {/* Food Choices Grid */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Pilih makanan sahabat gigi:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {availableItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleSelectItem(item)}
              className="p-3 bg-white border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 rounded-2xl transition-all flex flex-col items-center gap-1.5 shadow-xs hover:scale-103 active:scale-95 cursor-pointer text-center"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="font-['Fredoka'] font-bold text-xs text-slate-800">
                {item.name}
              </span>
              <span className="text-[10px] text-slate-500 line-clamp-1">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero's Basket Collection */}
      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
        <div className="text-2xl">🧺</div>
        <div className="flex-1">
          <span className="text-xs font-bold text-emerald-800 block">
            Keranjang Pahlawan Gigi ({basket.length} Makanan Sehat):
          </span>
          <div className="flex flex-wrap gap-2 mt-1">
            {basket.length === 0 ? (
              <span className="text-xs text-emerald-600 italic">
                Pilih makanan sehat di atas untuk mengisi keranjang!
              </span>
            ) : (
              basket.map(item => (
                <span
                  key={item.id}
                  className="bg-white px-2 py-0.5 rounded-lg border border-emerald-300 text-xs font-bold text-emerald-700 flex items-center gap-1"
                >
                  <span>{item.icon}</span> {item.name}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
