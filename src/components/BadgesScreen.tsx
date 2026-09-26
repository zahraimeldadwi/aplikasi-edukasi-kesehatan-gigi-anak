import React from 'react';
import { PlayerProfile, Badge } from '../types';
import { GAME_BADGES } from '../data/levelsData';
import { audioSystem } from '../utils/audioSystem';
import { Lock, Sparkles, CheckCircle2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BadgesScreenProps {
  player: PlayerProfile;
  onBackToMap: () => void;
}

export const BadgesScreen: React.FC<BadgesScreenProps> = ({ player, onBackToMap }) => {
  const unlockedBadges = player.badges;

  const handleInspectBadge = (badge: Badge) => {
    const isUnlocked = unlockedBadges.includes(badge.id);
    if (isUnlocked) {
      audioSystem.playSfx('sparkle');
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
      });
      audioSystem.speak(
        `Selamat! Kamu sudah memiliki Lencana ${badge.title}! ${badge.description}`,
        'peri'
      );
    } else {
      audioSystem.playSfx('oops');
      audioSystem.speak(
        `Lencana ${badge.title} masih terkunci. Syaratnya: ${badge.requirement}!`,
        'hero'
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-6 text-amber-950 shadow-lg border-4 border-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/40 backdrop-blur-xs flex items-center justify-center text-3xl shadow-xs">
            🎖️
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider bg-white/50 px-2.5 py-0.5 rounded-full">
              Koleksi Prestasi
            </span>
            <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-black mt-1">
              Koleksi Lencana Pahlawan Gigi
            </h2>
            <p className="text-xs sm:text-sm text-amber-900 font-bold">
              Kumpulkan semua 7 lencana kehormatan dengan menyelesaikan misi petualangan!
            </p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white text-center">
          <span className="text-xs font-bold text-amber-900 block">Terkumpul:</span>
          <span className="font-['Fredoka'] text-2xl font-black text-amber-950">
            {unlockedBadges.length} / {GAME_BADGES.length}
          </span>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GAME_BADGES.map(badge => {
          const isUnlocked = unlockedBadges.includes(badge.id);

          return (
            <div
              key={badge.id}
              onClick={() => handleInspectBadge(badge)}
              className={`rounded-3xl p-5 border-3 transition-all flex flex-col justify-between cursor-pointer select-none ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-md hover:scale-102 hover:shadow-xl hover:border-amber-400'
                  : 'bg-slate-100/70 border-slate-200 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs transition-transform ${
                      isUnlocked
                        ? 'bg-amber-100 text-amber-900 scale-105'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? badge.icon : '🔒'}
                  </div>

                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terbuka
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" /> Terkunci
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-['Fredoka'] text-base sm:text-lg font-bold text-slate-800">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500 flex items-center justify-between">
                <span>Syarat: {badge.requirement}</span>
                {isUnlocked && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onBackToMap}
          className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-['Fredoka'] font-bold text-base rounded-2xl shadow-md transition-all cursor-pointer"
        >
          🗺️ Kembali ke Peta Petualangan
        </button>
      </div>
    </div>
  );
};
