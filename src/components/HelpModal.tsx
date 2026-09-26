import React from 'react';
import { HelpCircle, Heart, Star, Shield, Volume2, Bell } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 border-4 border-purple-300 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-purple-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
              ❓
            </div>
            <div>
              <h3 className="font-['Fredoka'] text-lg font-bold text-slate-800">
                Bantuan & Petunjuk Bermain
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Panduan petualangan Pahlawan Gigi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
          >
            ✕
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          {/* Nyawa */}
          <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
            <h4 className="font-['Fredoka'] font-bold text-rose-800 text-sm flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              Sistem 5 Nyawa
            </h4>
            <p className="text-slate-600">
              Kamu memulai petualangan dengan 5 nyawa ❤️. Jika menjawab salah, nyawa berkurang 1.
              Jika nyawa habis, jangan sedih! Kamu bisa mencoba lagi dan nyawamu akan kembali penuh menjadi 5.
            </p>
          </div>

          {/* Skor & Poin */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
            <h4 className="font-['Fredoka'] font-bold text-amber-800 text-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              Perhitungan Skor
            </h4>
            <ul className="space-y-1 text-slate-600 font-semibold text-xs">
              <li>• Jawaban Benar: +10 Poin</li>
              <li>• Menyelesaikan Mini Game: +20 Poin</li>
              <li>• Menyelesaikan Tiap Level: +50 Poin</li>
              <li>• Kuis Besar: Total 100 Poin Ujian</li>
            </ul>
          </div>

          {/* Audio & Suara */}
          <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
            <h4 className="font-['Fredoka'] font-bold text-sky-800 text-sm flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-sky-600" />
              Suara & Backsound
            </h4>
            <p className="text-slate-600 text-xs">
              Kamu bisa menyalakan atau mematikan musik dan efek suara karakter melalui tombol slider di bagian atas.
              Pada tiap materi, klik tombol 🔊 Dengarkan agar karakter membacakan materi untukmu!
            </p>
          </div>

          {/* Pesan Medis Penting */}
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
            <h4 className="font-['Fredoka'] font-bold text-emerald-800 text-sm flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              Catatan Kesehatan Penting
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Aplikasi ini adalah sarana belajar dan bermain yang menyenangkan. Jika kamu mengalami sakit gigi berdenyut,
              gusi bengkak, atau gigi patah saat bermain di dunia nyata, selalu berani beritahu ayah atau ibu untuk diperiksa
              ke dokter gigi ya!
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-['Fredoka'] font-bold text-sm rounded-2xl shadow-md transition-colors cursor-pointer"
        >
          Mengerti, Ayo Lanjut Main!
        </button>
      </div>
    </div>
  );
};
