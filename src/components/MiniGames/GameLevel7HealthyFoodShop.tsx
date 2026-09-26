import React, { useState } from 'react';
import { audioSystem } from '../../utils/audioSystem';
import { ShoppingBag, Coins, Sparkles, Check, Trash2 } from 'lucide-react';

interface GameLevel7Props {
  playerName: string;
  onSuccess: (earnedScore: number) => void;
  onWrongAnswer: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  healthPoints: number;
  category: 'good' | 'bad';
  desc: string;
}

const STORE_ITEMS: ShopItem[] = [
  { id: 's1', name: 'Apel Merah Renyah', icon: '🍎', price: 15, healthPoints: 10, category: 'good', desc: 'Serat pembersih alami' },
  { id: 's2', name: 'Wortel Segar', icon: '🥕', price: 15, healthPoints: 10, category: 'good', desc: 'Memperkuat gusi & gigi' },
  { id: 's3', name: 'Susu Kalsium', icon: '🥛', price: 20, healthPoints: 10, category: 'good', desc: 'Kaya kalsium email' },
  { id: 's4', name: 'Keju Lezat', icon: '🧀', price: 20, healthPoints: 10, category: 'good', desc: 'Mineral pelindung gigi' },
  { id: 's5', name: 'Air Putih Murni', icon: '💧', price: 10, healthPoints: 10, category: 'good', desc: 'Bebas gula & menyegarkan' },
  { id: 's6', name: 'Sayur Brokoli', icon: '🥦', price: 15, healthPoints: 10, category: 'good', desc: 'Vitamin gusi sehat' },
  { id: 's7', name: 'Permen Manis Lengket', icon: '🍬', price: 10, healthPoints: -5, category: 'bad', desc: 'Gula menempel memicu karies' },
  { id: 's8', name: 'Minuman Bersoda Manis', icon: '🥤', price: 15, healthPoints: -5, category: 'bad', desc: 'Asam & tinggi gula perusak gigi' },
];

export const GameLevel7HealthyFoodShop: React.FC<GameLevel7Props> = ({
  playerName,
  onSuccess,
  onWrongAnswer,
}) => {
  const [coins, setCoins] = useState(100);
  const [cart, setCart] = useState<ShopItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const totalHealthPoints = cart.reduce((acc, item) => acc + item.healthPoints, 0);

  const handleBuy = (item: ShopItem) => {
    if (coins < item.price) {
      audioSystem.playSfx('oops');
      setFeedback('Koinmu tidak cukup untuk membeli barang ini!');
      return;
    }

    audioSystem.playSfx('click');
    setCoins(prev => prev - item.price);
    setCart(prev => [...prev, item]);

    if (item.category === 'good') {
      audioSystem.playSfx('ting');
      setFeedback(`✨ Bagus! Membeli ${item.name} menambah +${item.healthPoints} Poin Kesehatan Gigi!`);
    } else {
      audioSystem.playSfx('oops');
      setFeedback(`⚠️ Hati-hati! ${item.name} mengandung banyak gula (${item.healthPoints} poin).`);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const item = cart[index];
    audioSystem.playSfx('click');
    setCoins(prev => prev + item.price);
    setCart(prev => prev.filter((_, i) => i !== index));
    setFeedback(`Mengembalikan ${item.name} ke rak.`);
  };

  const handleCheckout = () => {
    if (cart.length < 3) {
      audioSystem.playSfx('oops');
      setFeedback('Belanja minimal 3 makanan sehat dulu ya, Pahlawan!');
      return;
    }

    if (totalHealthPoints >= 30) {
      audioSystem.playSfx('levelUp');
      setFeedback(`🎉 Hebat, ${playerName}! Keranjang belanjamu sangat sehat (+${totalHealthPoints} Poin Gigi)!`);
      audioSystem.speak(`Hebat sekali, ${playerName}! Keranjang belanja gigimu penuh nutrisi!`, 'peri');
      setTimeout(() => {
        onSuccess(totalHealthPoints + 20); // health points converted to score + 20 bonus!
      }, 2000);
    } else {
      audioSystem.playSfx('oops');
      setFeedback('Keranjangmu masih terlalu banyak makanan manis! Kurangi permen/soda dan pilih buah/sayur.');
      audioSystem.speak('Kurangi makanan manis di keranjangmu ya!', 'hero');
      onWrongAnswer();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-amber-200 shadow-md space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            Mini Game: Toko Makanan Gigi Sehat
          </span>
          <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            Belanja Makanan Sehat untuk Gigimu!
          </h3>
        </div>

        {/* Virtual Wallet & Health Points */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-300">
            <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="font-['Fredoka'] font-bold text-amber-800 text-sm">
              {coins} Koin
            </span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-sm ${
              totalHealthPoints >= 30
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Poin Gigi: {totalHealthPoints}</span>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 font-semibold bg-amber-50/70 p-3 rounded-2xl border border-amber-200 text-center">
        🛒 Belanjakan koinmu untuk mengumpulkan <strong>minimal +30 Poin Gigi Sehat</strong>. Hindari makanan manis berlebih!
      </p>

      {/* Store Shelf Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STORE_ITEMS.map(item => {
          const canAfford = coins >= item.price;
          return (
            <button
              key={item.id}
              onClick={() => handleBuy(item)}
              disabled={!canAfford}
              className={`p-3.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between gap-2 shadow-xs cursor-pointer ${
                canAfford
                  ? item.category === 'good'
                    ? 'bg-white border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/50 hover:scale-102 active:scale-95'
                    : 'bg-white border-rose-200 hover:border-rose-400 hover:bg-rose-50/50 hover:scale-102 active:scale-95'
                  : 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h4 className="font-['Fredoka'] font-bold text-xs sm:text-sm text-slate-800">
                  {item.name}
                </h4>
                <span
                  className={`text-[10px] font-bold block ${
                    item.healthPoints > 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {item.healthPoints > 0 ? `+${item.healthPoints} Poin Gigi` : `${item.healthPoints} Poin Gigi`}
                </span>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1">
                💰 {item.price} koin
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs sm:text-sm font-bold text-sky-900 text-center">
          {feedback}
        </div>
      )}

      {/* Shopping Cart Drawer */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            <h4 className="font-['Fredoka'] font-bold text-sm text-slate-800">
              Keranjang Belanja Pahlawan ({cart.length} barang)
            </h4>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Target: ≥ 30 Poin Gigi
          </span>
        </div>

        {cart.length === 0 ? (
          <p className="text-xs text-slate-400 text-center italic py-2">
            Keranjang masih kosong. Pilih makanan di rak atas!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
            {cart.map((item, idx) => (
              <span
                key={idx}
                className="bg-white border border-slate-200 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-xs"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
                <button
                  onClick={() => handleRemoveFromCart(idx)}
                  className="text-slate-400 hover:text-rose-500 ml-1 cursor-pointer"
                  title="Keluarkan dari keranjang"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white font-['Fredoka'] font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-5 h-5" />
          <span>BAYAR & SELESAIKAN MISI BELANJA</span>
        </button>
      </div>
    </div>
  );
};
