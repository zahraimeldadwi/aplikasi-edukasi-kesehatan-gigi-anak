import React, { useState } from 'react';
import { PlayerProfile, ScreenType } from '../types';
import { audioSystem } from '../utils/audioSystem';
import {
  Heart,
  Star,
  Volume2,
  VolumeX,
  Music,
  Sliders,
  Bell,
  HelpCircle,
  Home,
  BookOpen,
  Award,
  Trophy,
  FileText,
} from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';

interface HeaderProps {
  player: PlayerProfile;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenReminderModal: () => void;
  onOpenHelpModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  player,
  currentScreen,
  onNavigate,
  onOpenReminderModal,
  onOpenHelpModal,
}) => {
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [soundOn, setSoundOn] = useState(audioSystem.soundEnabled);
  const [musicOn, setMusicOn] = useState(audioSystem.musicEnabled);
  const [soundVol, setSoundVol] = useState(audioSystem.soundVolume);
  const [musicVol, setMusicVol] = useState(audioSystem.musicVolume);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    audioSystem.setSoundEnabled(next);
    if (next) audioSystem.playSfx('ting');
  };

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    audioSystem.setMusicEnabled(next);
  };

  const handleSoundVolChange = (v: number) => {
    setSoundVol(v);
    audioSystem.setSoundVolume(v);
  };

  const handleMusicVolChange = (v: number) => {
    setMusicVol(v);
    audioSystem.setMusicVolume(v);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-sky-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          {/* Logo / Player badge */}
          <div
            onClick={() => onNavigate('map')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <CharacterAvatar type="hero" gender={player.gender} size="sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Fredoka'] font-bold text-sky-600 text-base sm:text-lg group-hover:text-sky-700">
                  PAHLAWAN GIGI
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                  {player.gender === 'boy' ? '👦' : '👧'} {player.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Level {player.unlockedLevel}/8 · {player.badges.length} Lencana
              </p>
            </div>
          </div>

          {/* Hearts & Score */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Hearts indicator */}
            <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-rose-600 mr-1 hidden sm:inline">NYAWA:</span>
              {Array.from({ length: player.maxHearts }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                    i < player.hearts
                      ? 'fill-rose-500 text-rose-500 animate-pulse'
                      : 'fill-slate-200 text-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Score indicator */}
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl shadow-xs">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Skor</span>
                <span className="font-['Fredoka'] font-bold text-amber-700 text-sm sm:text-base">
                  {player.score}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 sm:gap-2 relative">
              {/* Daily Reminder toggle */}
              <button
                onClick={onOpenReminderModal}
                title="Pengingat Sikat Gigi Pagi & Malam"
                className="p-1.5 sm:p-2 rounded-xl text-sky-700 bg-sky-100 hover:bg-sky-200 transition-colors relative"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {(player.morningReminder || player.nightReminder) && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-ping" />
                )}
              </button>

              {/* Audio Dropdown Toggle */}
              <button
                onClick={() => setShowAudioSettings(!showAudioSettings)}
                title="Pengaturan Suara & Musik"
                className={`p-1.5 sm:p-2 rounded-xl transition-colors ${
                  showAudioSettings ? 'bg-amber-200 text-amber-800' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Help button */}
              <button
                onClick={onOpenHelpModal}
                title="Bantuan & Petunjuk Bermain"
                className="p-1.5 sm:p-2 rounded-xl bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
              >
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Audio Settings Floating Menu */}
              {showAudioSettings && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border-2 border-amber-200 p-4 z-50 text-slate-800">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-100 mb-3">
                    <span className="font-['Fredoka'] font-bold text-amber-700 text-sm">
                      🎵 Pengaturan Audio
                    </span>
                    <button
                      onClick={() => setShowAudioSettings(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Sound FX Toggle & Volume */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          {soundOn ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5 text-rose-500" />}
                          Efek Suara Karakter
                        </span>
                        <button
                          onClick={toggleSound}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                            soundOn ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {soundOn ? 'ON' : 'OFF'}
                        </button>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        disabled={!soundOn}
                        value={soundVol}
                        onChange={e => handleSoundVolChange(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    {/* Music Toggle & Volume */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <Music className={`w-3.5 h-3.5 ${musicOn ? 'text-sky-600' : 'text-slate-400'}`} />
                          Musik Petualangan
                        </span>
                        <button
                          onClick={toggleMusic}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                            musicOn ? 'bg-sky-100 text-sky-700' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {musicOn ? 'ON' : 'OFF'}
                        </button>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        disabled={!musicOn}
                        value={musicVol}
                        onChange={e => handleMusicVolChange(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                      />
                    </div>

                    <p className="text-[10px] text-slate-400 text-center pt-1 border-t border-slate-100">
                      Volume musik otomatis merendah saat karakter berbicara ✨
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 mt-2 pt-2 border-t border-slate-100 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
          <button
            onClick={() => onNavigate('map')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              currentScreen === 'map'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-sky-100'
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Peta Petualangan
          </button>

          <button
            onClick={() => onNavigate('materials')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              currentScreen === 'materials'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-teal-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> 14 Materi
          </button>

          <button
            onClick={() => onNavigate('grand_quiz')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              currentScreen === 'grand_quiz' || currentScreen === 'quiz_result'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-purple-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Kuis Besar
          </button>

          <button
            onClick={() => onNavigate('badges')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              currentScreen === 'badges'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-amber-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Lencana
          </button>

          <button
            onClick={() => onNavigate('leaderboard')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              currentScreen === 'leaderboard'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-emerald-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Papan Peringkat
          </button>

          <button
            onClick={() => onNavigate('certificate')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              currentScreen === 'certificate'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-rose-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Sertifikat
          </button>
        </nav>
      </div>
    </header>
  );
};
