import React, { useRef } from 'react';
import { PlayerProfile } from '../types';
import { audioSystem } from '../utils/audioSystem';
import { CharacterAvatar } from './CharacterAvatar';
import { Printer, Download, Award, Sparkles, ArrowLeft, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateScreenProps {
  player: PlayerProfile;
  onBackToMap: () => void;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({
  player,
  onBackToMap,
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const completionDate =
    player.dateCompleted ||
    new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const handlePrint = () => {
    audioSystem.playSfx('bonus');
    window.print();
  };

  const handleCelebrate = () => {
    audioSystem.playSfx('victory');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    audioSystem.speak(
      `Selamat kepada Pahlawan Gigi ${player.name} atas sertifikat kehormatan ini!`,
      'peri'
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 print:p-0 print:m-0">
      {/* Top Toolbar (hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm print:hidden">
        <button
          onClick={onBackToMap}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-sm px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCelebrate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm hover:bg-amber-200 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>🎉 Rayakan</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-['Fredoka'] font-bold text-sm shadow-md hover:scale-102 active:scale-95 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>🖨️ Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Canvas */}
      <div
        ref={certRef}
        className="relative bg-gradient-to-b from-amber-50/70 via-white to-sky-50/70 rounded-3xl p-6 sm:p-12 border-8 border-amber-300 shadow-2xl text-center space-y-6 print:border-4 print:shadow-none print:p-8"
      >
        {/* Certificate Decorative Inner Border */}
        <div className="border-4 border-dashed border-amber-200 rounded-2xl p-6 sm:p-10 space-y-6">
          {/* Header Seal & Title */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl sm:text-4xl">🦷</span>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-md border-3 border-white">
                <Award className="w-10 h-10 text-amber-950" />
              </div>
              <span className="text-3xl sm:text-4xl">✨</span>
            </div>

            <span className="font-['Fredoka'] text-xs sm:text-sm font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-4 py-1 rounded-full border border-amber-300">
              KEMENTERIAN SENYUM SEHAT & GIGI CERIA
            </span>

            <h1 className="font-['Fredoka'] text-3xl sm:text-5xl font-black text-sky-800 tracking-wide pt-1">
              SERTIFIKAT PAHLAWAN GIGI
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">
              Nomor: PG-{player.gender.toUpperCase()}-{player.score}-2026
            </p>
          </div>

          {/* Recipient Details */}
          <div className="space-y-4 py-2">
            <p className="text-xs sm:text-sm text-slate-600 font-semibold italic">
              Dengan penuh kebanggaan dan kehormatan diberikan kepada:
            </p>

            <div className="inline-block border-b-4 border-sky-400 pb-2 px-8">
              <h2 className="font-['Fredoka'] text-3xl sm:text-5xl font-black text-slate-900 tracking-wide">
                {player.name}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed font-semibold">
              Karena telah berhasil menyelesaikan seluruh petualangan, mengalahkan Monster Karies,
              serta berjanji untuk selalu merawat kesehatan gigi dan mulut 2 kali sehari secara teratur.
            </p>

            {/* Achievement Badge Status */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 px-6 py-2 rounded-2xl shadow-xs">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span className="font-['Fredoka'] font-black text-amber-900 text-base sm:text-lg">
                STATUS: ⭐ PAHLAWAN GIGI SEJATI ⭐
              </span>
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            </div>
          </div>

          {/* Signatures & Seal Footer */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t-2 border-amber-200 items-end text-center">
            {/* Fairy Signature */}
            <div className="space-y-1">
              <div className="h-10 flex items-center justify-center text-2xl font-serif italic text-pink-600">
                🧚 Peri Senyum
              </div>
              <div className="w-24 sm:w-32 h-0.5 bg-slate-300 mx-auto" />
              <p className="text-[10px] sm:text-xs font-bold text-slate-600">Peri Senyum</p>
              <p className="text-[9px] text-slate-400">Pembimbing Petualangan</p>
            </div>

            {/* Golden Medal Emblem */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-400 border-4 border-white shadow-lg flex items-center justify-center text-amber-950 font-black text-xs">
                RESMI
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-1">
                {completionDate}
              </span>
            </div>

            {/* Gigi Ceria Signature */}
            <div className="space-y-1">
              <div className="h-10 flex items-center justify-center text-2xl font-serif italic text-sky-600">
                🦷 Gigi Ceria
              </div>
              <div className="w-24 sm:w-32 h-0.5 bg-slate-300 mx-auto" />
              <p className="text-[10px] sm:text-xs font-bold text-slate-600">Gigi Ceria</p>
              <p className="text-[9px] text-slate-400">Duta Kesehatan Gigi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
