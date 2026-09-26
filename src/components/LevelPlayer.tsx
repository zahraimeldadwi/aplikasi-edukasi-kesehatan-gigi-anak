import React, { useState } from 'react';
import { LevelInfo, PlayerProfile, MaterialCard } from '../types';
import { ALL_MATERIALS } from '../data/materialsData';
import { audioSystem } from '../utils/audioSystem';
import { CharacterAvatar } from './CharacterAvatar';
import { GameLevel1TeethAnatomy } from './MiniGames/GameLevel1TeethAnatomy';
import { GameLevel2FoodCollector } from './MiniGames/GameLevel2FoodCollector';
import { GameLevel3PlaqueScrubber } from './MiniGames/GameLevel3PlaqueScrubber';
import { GameLevel4CankerCare } from './MiniGames/GameLevel4CankerCare';
import { GameLevel5FreshBreathMatch } from './MiniGames/GameLevel5FreshBreathMatch';
import { GameLevel6BrushingOrder } from './MiniGames/GameLevel6BrushingOrder';
import { GameLevel7HealthyFoodShop } from './MiniGames/GameLevel7HealthyFoodShop';
import { GameLevel8BossBattle } from './MiniGames/GameLevel8BossBattle';
import confetti from 'canvas-confetti';
import {
  Volume2,
  BookOpen,
  Gamepad2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Heart,
  CheckCircle,
} from 'lucide-react';

interface LevelPlayerProps {
  level: LevelInfo;
  player: PlayerProfile;
  onCompleteLevel: (levelId: number, earnedPoints: number) => void;
  onDeductHeart: () => void;
  onRestoreHearts: () => void;
  onBackToMap: () => void;
  onNextLevel: () => void;
}

export const LevelPlayer: React.FC<LevelPlayerProps> = ({
  level,
  player,
  onCompleteLevel,
  onDeductHeart,
  onRestoreHearts,
  onBackToMap,
  onNextLevel,
}) => {
  const [phase, setPhase] = useState<'study' | 'game' | 'complete'>('study');
  const [readingAudioId, setReadingAudioId] = useState<number | null>(null);

  // Filter associated materials for this level
  const materials: MaterialCard[] = ALL_MATERIALS.filter(m =>
    level.associatedMaterialIds.includes(m.id)
  );

  const handleStartMusic = () => {
    audioSystem.startMusic(level.bgSoundTheme);
  };

  React.useEffect(() => {
    handleStartMusic();
    audioSystem.speak(
      `Selamat datang di ${level.title}! Yuk kita pelajari materinya dulu ya!`,
      'gigi'
    );
    return () => {
      audioSystem.stopSpeaking();
    };
  }, [level.id]);

  const handleReadMaterial = (mat: MaterialCard) => {
    setReadingAudioId(mat.id);
    audioSystem.playSfx('click');
    audioSystem.speak(mat.audioSpeech, mat.character, player.gender, () => {
      setReadingAudioId(null);
    });
  };

  const handleMiniGameSuccess = (earnedPoints: number) => {
    audioSystem.playSfx('levelUp');
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 },
    });
    setPhase('complete');
    onCompleteLevel(level.id, earnedPoints + 50); // +50 level finish bonus!
    audioSystem.speak(
      `Level ${level.id} berhasil! Selamat ${player.name}, level berikutnya sudah terbuka!`,
      'peri'
    );
  };

  const handleRetryAfterGameOver = () => {
    onRestoreHearts();
    setPhase('game');
  };

  // Check Game Over state
  if (player.hearts <= 0) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border-4 border-rose-300 shadow-2xl text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-4xl animate-bounce">
          💔
        </div>
        <div className="space-y-2">
          <h3 className="font-['Fredoka'] text-3xl font-extrabold text-rose-700">
            Nyawamu Habis!
          </h3>
          <p className="text-slate-600 font-bold text-base">
            Jangan menyerah, Pahlawan Gigi {player.name}! Belajar dari kesalahan membuat gigi kita semakin terlindungi!
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleRetryAfterGameOver}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-['Fredoka'] font-bold text-lg rounded-2xl shadow-lg hover:scale-103 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>🔄 COBA LAGI (Isi 5 Nyawa)</span>
          </button>

          <button
            onClick={() => setPhase('study')}
            className="w-full py-3 px-6 bg-sky-100 text-sky-800 font-bold text-sm rounded-2xl hover:bg-sky-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Baca Ulang Materi Dulu</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Level Header Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg border-4 border-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToMap}
            className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            title="Kembali ke Peta"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              LEVEL {level.id} · {level.subtitle}
            </span>
            <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold flex items-center gap-2 mt-1">
              <span>{level.icon}</span> {level.title}
            </h2>
          </div>
        </div>

        {/* Phase Toggle Buttons */}
        <div className="flex items-center gap-2 bg-black/15 p-1 rounded-2xl backdrop-blur-xs">
          <button
            onClick={() => setPhase('study')}
            className={`px-3 py-1.5 rounded-xl font-['Fredoka'] font-bold text-xs flex items-center gap-1.5 transition-all ${
              phase === 'study' ? 'bg-white text-slate-800 shadow-sm' : 'text-white/80 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> 1. Materi
          </button>
          <button
            onClick={() => setPhase('game')}
            className={`px-3 py-1.5 rounded-xl font-['Fredoka'] font-bold text-xs flex items-center gap-1.5 transition-all ${
              phase === 'game' ? 'bg-white text-slate-800 shadow-sm' : 'text-white/80 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" /> 2. Mini Game
          </button>
        </div>
      </div>

      {/* PHASE 1: STUDY CARDS */}
      {phase === 'study' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-['Fredoka'] text-xl sm:text-2xl font-bold text-slate-800">
              📖 Materi Kesehatan Gigi Level {level.id}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Klik tombol suara 🔊 pada tiap kartu untuk mendengarkan penjelasannya!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map(mat => (
              <div
                key={mat.id}
                className="bg-white rounded-3xl p-5 border-3 border-sky-200 shadow-md flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{mat.icon}</span>
                      <h4 className="font-['Fredoka'] text-lg font-bold text-slate-800">
                        {mat.title}
                      </h4>
                    </div>

                    {/* Audio Read Aloud Button */}
                    <button
                      onClick={() => handleReadMaterial(mat)}
                      className={`p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-bold ${
                        readingAudioId === mat.id
                          ? 'bg-amber-400 text-amber-950 scale-105 animate-pulse'
                          : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                      }`}
                      title="Bacakan dengan suara"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{readingAudioId === mat.id ? 'Berbicara...' : 'Dengarkan'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-sky-800 font-bold bg-sky-50 p-2.5 rounded-xl border border-sky-100">
                    💡 {mat.summary}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-700 font-semibold">
                    {mat.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-500 font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {mat.funFact && (
                    <div className="text-[11px] bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-amber-900 font-semibold">
                      ⭐ <strong>Fakta Seru:</strong> {mat.funFact}
                    </div>
                  )}

                  {mat.importantNote && (
                    <div className="text-[11px] bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-emerald-900 font-semibold">
                      🛡️ <strong>Pesan Penting:</strong> {mat.importantNote}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Karakter: {mat.character === 'gigi' ? '🦷 Gigi Ceria' : mat.character === 'peri' ? '🧚 Peri Senyum' : '🦸 Pahlawan Gigi'}</span>
                  <span>Materi #{mat.id}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action button to proceed to Mini Game */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => {
                audioSystem.playSfx('bonus');
                setPhase('game');
                audioSystem.speak(`Yuk kita mulai mini game ${level.title}, ${player.name}!`, 'hero');
              }}
              className="py-4 px-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-['Fredoka'] font-bold text-lg sm:text-xl rounded-2xl shadow-xl hover:scale-103 active:scale-95 transition-all flex items-center gap-3 border-2 border-white cursor-pointer"
            >
              <Gamepad2 className="w-6 h-6" />
              <span>LANJUT KE MINI GAME LEVEL {level.id}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: MINI GAME */}
      {phase === 'game' && (
        <div>
          {level.id === 1 && (
            <GameLevel1TeethAnatomy
              playerName={player.name}
              onSuccess={handleMiniGameSuccess}
              onWrongAnswer={onDeductHeart}
            />
          )}
          {level.id === 2 && (
            <GameLevel2FoodCollector
              playerName={player.name}
              onSuccess={handleMiniGameSuccess}
              onWrongAnswer={onDeductHeart}
            />
          )}
          {level.id === 3 && (
            <GameLevel3PlaqueScrubber
              playerName={player.name}
              onSuccess={handleMiniGameSuccess}
              onWrongAnswer={onDeductHeart}
            />
          )}
          {level.id === 4 && (
            <GameLevel4CankerCare
              playerName={player.name}
              onSuccess={handleMiniGameSuccess}
              onWrongAnswer={onDeductHeart}
            />
          )}
          {level.id === 5 && (
            <GameLevel5FreshBreathMatch
              playerName={player.name}
              onSuccess={handleMiniGameSuccess}
              onWrongAnswer={onDeductHeart}
            />
          )}
          {level.id === 6 && (
            <GameLevel6BrushingOrder
              playerName={player.name}
              onSuccess={handleMiniGameSuccess}
              onWrongAnswer={onDeductHeart}
            />
          )}
          {level.id === 7 && (
            <GameLevel7HealthyFoodShop
              playerName={player.name}
              onSuccess={handleMiniGameSuccess}
              onWrongAnswer={onDeductHeart}
            />
          )}
          {level.id === 8 && (
            <GameLevel8BossBattle
              playerName={player.name}
              onSuccess={handleMiniGameSuccess}
              onWrongAnswer={onDeductHeart}
            />
          )}
        </div>
      )}

      {/* PHASE 3: LEVEL COMPLETE CELEBRATION */}
      {phase === 'complete' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-2xl text-center space-y-6">
          <div className="flex justify-center">
            <CharacterAvatar type="gigi" size="lg" action="happy" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              🎉 LEVEL SELESAI!
            </span>
            <h3 className="font-['Fredoka'] text-3xl sm:text-4xl font-black text-slate-800">
              Selamat, {player.name}!
            </h3>
            <p className="text-base sm:text-lg font-bold text-emerald-700">
              Kamu berhasil menuntaskan misi di {level.title}!
            </p>
          </div>

          {/* Points & Rewards Earned */}
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-2xl">⭐</span>
              <span className="block font-['Fredoka'] font-bold text-amber-800 text-base mt-1">
                +50 Poin Level
              </span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-2xl">🔓</span>
              <span className="block font-['Fredoka'] font-bold text-emerald-800 text-base mt-1">
                Level Terbuka
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onBackToMap}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 text-slate-700 hover:bg-slate-200 font-['Fredoka'] font-bold text-base rounded-2xl transition-colors cursor-pointer"
            >
              🗺️ Kembali ke Peta
            </button>

            {level.id < 8 && (
              <button
                onClick={onNextLevel}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-['Fredoka'] font-bold text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke Level {level.id + 1}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
