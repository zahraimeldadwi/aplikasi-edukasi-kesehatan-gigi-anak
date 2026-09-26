import React from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { audioSystem } from '../utils/audioSystem';
import { Play, Sparkles, Shield, Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const handleStart = () => {
    audioSystem.init();
    audioSystem.playSfx('bonus');
    audioSystem.startMusic('main');
    audioSystem.speak('Halo teman-teman! Selamat datang di Petualangan Pahlawan Gigi!', 'gigi');
    onStart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Floating Clouds and Stars */}
      <div className="absolute top-10 left-8 text-4xl animate-bounce duration-1000 opacity-80">☁️</div>
      <div className="absolute top-24 right-12 text-3xl animate-bounce delay-300 opacity-80">☁️</div>
      <div className="absolute bottom-20 left-16 text-3xl animate-pulse">✨</div>
      <div className="absolute top-1/3 right-10 text-3xl animate-pulse text-amber-400">⭐</div>
      <div className="absolute bottom-28 right-24 text-2xl animate-spin text-amber-400">🌟</div>

      <div className="max-w-xl w-full text-center z-10 space-y-6">
        {/* Animated Main Characters Ensemble */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6 py-4">
          <div className="transform -rotate-6 animate-pulse">
            <CharacterAvatar type="monster_karies" size="md" />
          </div>
          <div className="transform scale-110 z-10 animate-bounce">
            <CharacterAvatar type="gigi" size="lg" />
          </div>
          <div className="transform rotate-6 animate-pulse">
            <CharacterAvatar type="hero" gender="boy" size="md" />
          </div>
        </div>

        {/* Title Badge & Main Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-sky-300 text-sky-700 shadow-sm text-sm sm:text-base font-bold">
            <Shield className="w-4 h-4 text-sky-500" />
            <span>Game Edukasi Kesehatan Gigi & Mulut Anak SD</span>
          </div>

          <h1 className="font-['Fredoka'] text-4xl sm:text-6xl font-extrabold text-sky-700 tracking-wide drop-shadow-sm">
            🦷 PAHLAWAN GIGI
          </h1>

          <p className="font-['Fredoka'] text-xl sm:text-2xl text-emerald-700 font-bold">
            “Petualangan Menyelamatkan Gigi dari Monster Karies!”
          </p>

          <p className="text-slate-600 font-semibold text-base sm:text-lg">
            Yuk, belajar menjaga gigi sehat, bersih, dan kuat sambil bermain seru!
          </p>
        </div>

        {/* Feature Highlights for Kids */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 py-2 text-xs sm:text-sm font-bold">
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border-2 border-sky-200 shadow-xs flex flex-col items-center">
            <span className="text-2xl mb-1">🗺️</span>
            <span className="text-sky-800">8 Level Seru</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border-2 border-amber-200 shadow-xs flex flex-col items-center">
            <span className="text-2xl mb-1">🎮</span>
            <span className="text-amber-800">Mini Game Keren</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border-2 border-emerald-200 shadow-xs flex flex-col items-center">
            <span className="text-2xl mb-1">🏆</span>
            <span className="text-emerald-800">Sertifikat Digital</span>
          </div>
        </div>

        {/* Main Start Adventure Button */}
        <div className="pt-2">
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 text-xl sm:text-2xl font-['Fredoka'] font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-4 border-white"
          >
            <Play className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
            <span>▶ MULAI PETUALANGAN</span>
            <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
          </button>
        </div>

        {/* Safe Educational Note */}
        <p className="text-xs text-slate-500 pt-2 flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          Ramah anak, tanpa iklan, dan menjaga kesehatan gigi bersama keluarga!
        </p>
      </div>
    </div>
  );
};
