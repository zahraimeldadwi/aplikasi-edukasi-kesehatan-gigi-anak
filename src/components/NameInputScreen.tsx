import React, { useState } from 'react';
import { Gender } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { audioSystem } from '../utils/audioSystem';
import { Sparkles, ArrowRight, Rocket } from 'lucide-react';

interface NameInputScreenProps {
  onConfirm: (name: string, gender: Gender) => void;
}

export const NameInputScreen: React.FC<NameInputScreenProps> = ({ onConfirm }) => {
  const [name, setName] = useState('');
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [step, setStep] = useState<'enter_name' | 'choose_voice' | 'ready'>('enter_name');
  const [errorMsg, setErrorMsg] = useState('');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setErrorMsg('Tulis nama pahlawanmu dulu ya!');
      audioSystem.playSfx('oops');
      return;
    }
    setErrorMsg('');
    audioSystem.playSfx('click');
    setStep('choose_voice');
    audioSystem.speak(`Halo ${trimmed}! Sekarang pilih karakter suaramu ya!`, 'peri');
  };

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    audioSystem.playSfx('bonus');
    setStep('ready');
    const greetingText =
      gender === 'boy'
        ? `Halo, ${name}! Aku Pahlawan Gigi laki-laki yang siap berpetualang!`
        : `Halo, ${name}! Aku Pahlawan Gigi perempuan yang siap berpetualang!`;
    audioSystem.speak(greetingText, 'hero', gender);
  };

  const handleStartGame = () => {
    if (!name.trim() || !selectedGender) return;
    audioSystem.playSfx('levelUp');
    onConfirm(name.trim(), selectedGender);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-sky-200 shadow-2xl space-y-6">
        {/* Step 1: Input Name */}
        {step === 'enter_name' && (
          <form onSubmit={handleNameSubmit} className="space-y-6 text-center">
            <div className="flex justify-center">
              <CharacterAvatar type="gigi" size="lg" action="happy" />
            </div>

            <div className="space-y-2">
              <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-sky-700">
                Siapa nama Pahlawan Gigi hari ini?
              </h2>
              <p className="text-sm text-slate-600 font-semibold">
                Ketik nama panggilanmu agar Gigi Ceria dan Peri Senyum bisa mengenalmu!
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                maxLength={20}
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Tulis namamu di sini..."
                className="w-full text-center text-xl sm:text-2xl font-bold py-3 px-4 rounded-2xl border-3 border-sky-300 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-200 text-slate-800 placeholder-slate-400 bg-sky-50/50"
                autoFocus
              />
              {errorMsg && <p className="text-rose-500 text-sm font-bold">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 text-xl font-['Fredoka'] font-bold text-white bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>🦷 MULAI</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* Step 2: Choose Voice / Character Profile */}
        {step === 'choose_voice' && (
          <div className="space-y-6 text-center">
            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-wider text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
                Langkah 2 dari 2
              </span>
              <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-slate-800 pt-2">
                👤 PILIH KARAKTER SUARAMU
              </h2>
              <p className="text-sm text-slate-600">
                Pilih suara pahlawan yang akan menemanimu bersuara dan belajar:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Option Boy */}
              <button
                type="button"
                onClick={() => handleGenderSelect('boy')}
                className="group p-5 rounded-2xl border-4 border-sky-200 hover:border-sky-500 bg-sky-50/60 hover:bg-sky-100 transition-all flex flex-col items-center gap-3 text-center cursor-pointer hover:scale-103 active:scale-95 shadow-sm"
              >
                <CharacterAvatar type="hero" gender="boy" size="md" />
                <div>
                  <h3 className="font-['Fredoka'] text-lg font-bold text-sky-800 group-hover:text-sky-900">
                    👦 LAKI-LAKI
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Suara ceria, energik & ramah
                  </p>
                </div>
              </button>

              {/* Option Girl */}
              <button
                type="button"
                onClick={() => handleGenderSelect('girl')}
                className="group p-5 rounded-2xl border-4 border-pink-200 hover:border-pink-500 bg-pink-50/60 hover:bg-pink-100 transition-all flex flex-col items-center gap-3 text-center cursor-pointer hover:scale-103 active:scale-95 shadow-sm"
              >
                <CharacterAvatar type="hero" gender="girl" size="md" />
                <div>
                  <h3 className="font-['Fredoka'] text-lg font-bold text-pink-800 group-hover:text-pink-900">
                    👧 PEREMPUAN
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Suara ceria, cerdas & cerah
                  </p>
                </div>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Kamu bebas memilih sesuai suara favoritmu!
            </p>
          </div>
        )}

        {/* Step 3: Confirmation Greeting */}
        {step === 'ready' && selectedGender && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CharacterAvatar type="hero" gender={selectedGender} size="lg" action="happy" />
            </div>

            <div className="space-y-2 bg-gradient-to-r from-sky-50 to-emerald-50 p-4 rounded-2xl border-2 border-sky-200">
              <h2 className="font-['Fredoka'] text-3xl font-extrabold text-sky-700">
                Halo, {name}!
              </h2>
              <p className="text-lg font-bold text-emerald-700">
                Siap menyelamatkan gigi dari Monster Karies?
              </p>
              <p className="text-xs text-slate-600">
                Kumpulkan poin, jaga 5 nyawamu, dan dapatkan Lencana Master Pahlawan Gigi!
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleStartGame}
                className="w-full py-4 px-6 text-xl sm:text-2xl font-['Fredoka'] font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 rounded-2xl shadow-xl hover:scale-103 active:scale-98 transition-all flex items-center justify-center gap-3 border-2 border-white"
              >
                <Rocket className="w-6 h-6 animate-bounce" />
                <span>🚀 AYO MULAI!</span>
                <Sparkles className="w-5 h-5 text-amber-300" />
              </button>

              <button
                type="button"
                onClick={() => setStep('enter_name')}
                className="text-xs text-slate-400 hover:text-slate-600 underline font-semibold"
              >
                Ganti nama atau suara
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
