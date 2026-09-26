import React from 'react';
import { PlayerProfile, LevelInfo } from '../types';
import { GAME_LEVELS } from '../data/levelsData';
import { audioSystem } from '../utils/audioSystem';
import { Lock, CheckCircle2, Star, Trophy, Sparkles, ArrowRight, Play } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';

interface DashboardMapProps {
  player: PlayerProfile;
  onSelectLevel: (level: LevelInfo) => void;
  onGoToGrandQuiz: () => void;
}

export const DashboardMap: React.FC<DashboardMapProps> = ({
  player,
  onSelectLevel,
  onGoToGrandQuiz,
}) => {
  const completedCount = player.completedLevels.length;
  const progressPercent = Math.round((completedCount / GAME_LEVELS.length) * 100);

  const handleLevelClick = (level: LevelInfo) => {
    if (level.id > player.unlockedLevel) {
      audioSystem.playSfx('oops');
      audioSystem.speak(
        `Level ini masih terkunci, ${player.name}! Selesaikan level sebelumnya dulu ya!`,
        'gigi'
      );
      return;
    }
    audioSystem.playSfx('click');
    onSelectLevel(level);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Hero Progress Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg border-4 border-white">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <CharacterAvatar type="hero" gender={player.gender} size="md" action="happy" />
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  Peta Petualangan
                </span>
                <span className="text-amber-300 font-bold text-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Misi Penyelamatan
                </span>
              </div>
              <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold mt-1">
                Semangat, {player.name}!
              </h2>
              <p className="text-sky-100 text-sm font-semibold max-w-md">
                Selamatkan gigi ceria dari monster karies! Selesaikan tiap level untuk membuka kastil rahasia!
              </p>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-center min-w-[200px] w-full md:w-auto">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>Kemajuan Misi:</span>
              <span className="text-amber-200">{progressPercent}%</span>
            </div>
            <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-amber-300 to-yellow-400 h-full rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-white/90 font-bold mt-1.5">
              {completedCount} dari 8 Wilayah Dibebaskan ✨
            </p>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Map Header */}
      <div className="text-center space-y-1">
        <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center justify-center gap-2">
          <span>🗺️</span> PETA PETUALANGAN PAHLAWAN GIGI
        </h2>
        <p className="text-sm text-slate-600 font-semibold">
          Klik wilayah level yang sudah terbuka untuk memulai materi dan mini game serunya!
        </p>
      </div>

      {/* Grid of 8 Levels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GAME_LEVELS.map(level => {
          const isUnlocked = level.id <= player.unlockedLevel;
          const isCompleted = player.completedLevels.includes(level.id);
          const isCurrent = level.id === player.unlockedLevel && !isCompleted;

          return (
            <div
              key={level.id}
              onClick={() => handleLevelClick(level)}
              className={`relative rounded-3xl p-5 border-3 transition-all duration-300 flex flex-col justify-between select-none ${
                isUnlocked
                  ? 'cursor-pointer hover:-translate-y-1.5 hover:shadow-xl bg-white ' +
                    (isCurrent
                      ? 'border-sky-400 ring-4 ring-sky-200 shadow-lg'
                      : isCompleted
                      ? 'border-emerald-300 shadow-md'
                      : 'border-slate-200 shadow-sm')
                  : 'bg-slate-100/80 border-slate-200 opacity-65 cursor-not-allowed'
              }`}
            >
              {/* Level Number & Status Indicator */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`font-['Fredoka'] text-xs font-bold px-2.5 py-1 rounded-xl uppercase ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-700'
                      : isCurrent
                      ? 'bg-sky-100 text-sky-700 animate-pulse'
                      : isUnlocked
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  LEVEL {level.id}
                </span>

                {isCompleted ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" />
                    Selesai
                  </span>
                ) : isUnlocked ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                    <Play className="w-3 h-3 fill-sky-600" />
                    Buka
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" />
                    Terkunci
                  </span>
                )}
              </div>

              {/* Icon & Details */}
              <div className="text-center py-2 space-y-2">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl shadow-xs transition-transform ${
                    isUnlocked
                      ? `bg-gradient-to-tr ${level.themeColor} text-white group-hover:scale-110`
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isUnlocked ? level.icon : '🔒'}
                </div>

                <div>
                  <h3 className="font-['Fredoka'] text-lg font-bold text-slate-800 leading-tight">
                    {level.title}
                  </h3>
                  <p className="text-xs text-sky-700 font-semibold mt-0.5 italic">
                    “{level.subtitle}”
                  </p>
                </div>

                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                  {level.description}
                </p>
              </div>

              {/* Action Button Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center">
                {isUnlocked ? (
                  <button
                    className={`w-full py-2 px-3 rounded-xl font-['Fredoka'] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        : isCurrent
                        ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{isCompleted ? 'Main Lagi' : 'Mulai Misi'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Selesaikan Level {level.id - 1}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grand Quiz & Boss Challenge Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 rounded-3xl p-5 sm:p-6 text-white shadow-xl border-4 border-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
            🏆
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full mb-1">
              <Star className="w-3 h-3 fill-amber-950" /> Ujian Penutup
            </div>
            <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold">
              Kuis Besar Pahlawan Gigi (20 Soal)
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 max-w-lg">
              Uji seluruh kemampuan dan dapatkan gelar <strong>PAHLAWAN GIGI SUPER</strong> beserta Sertifikat Resmi!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            audioSystem.playSfx('bonus');
            onGoToGrandQuiz();
          }}
          className="whitespace-nowrap px-6 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-['Fredoka'] font-extrabold text-base rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-white cursor-pointer"
        >
          <Trophy className="w-5 h-5" />
          <span>IKUTI KUIS BESAR</span>
        </button>
      </div>
    </div>
  );
};
