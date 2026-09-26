import React, { useState } from 'react';
import { ALL_MATERIALS } from '../data/materialsData';
import { MaterialCard } from '../types';
import { audioSystem } from '../utils/audioSystem';
import { BookOpen, Volume2, Search, ArrowLeft, Sparkles, Heart } from 'lucide-react';

interface AllMaterialsScreenProps {
  onBackToMap: () => void;
}

export const AllMaterialsScreen: React.FC<AllMaterialsScreenProps> = ({ onBackToMap }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<number | null>(null);

  const filteredMaterials = ALL_MATERIALS.filter(
    m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.points.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRead = (mat: MaterialCard) => {
    setPlayingId(mat.id);
    audioSystem.playSfx('click');
    audioSystem.speak(mat.audioSpeech, mat.character, 'boy', () => {
      setPlayingId(null);
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 rounded-3xl p-6 text-white shadow-lg border-4 border-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl">
            📚
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Pustaka Gigi Pintar
            </span>
            <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-black mt-1">
              14 Materi Lengkap Kesehatan Gigi
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 font-bold">
              Pelajari semua rahasia menjaga senyum indah, gusi sehat, dan gigi bebas karies!
            </p>
          </div>
        </div>

        <button
          onClick={onBackToMap}
          className="px-5 py-2.5 rounded-2xl bg-white text-teal-800 font-['Fredoka'] font-bold text-sm hover:bg-teal-50 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Cari materi (contoh: sikat gigi, karies, lidah)..."
          className="w-full py-3 pl-11 pr-4 rounded-2xl border-2 border-teal-200 bg-white shadow-xs focus:outline-none focus:border-teal-500 text-sm font-semibold text-slate-800"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Grid of 14 Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map(mat => (
          <div
            key={mat.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-teal-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{mat.icon}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                      Materi #{mat.id}
                    </span>
                    <h3 className="font-['Fredoka'] text-lg font-bold text-slate-800 mt-0.5">
                      {mat.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => handleRead(mat)}
                  className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    playingId === mat.id
                      ? 'bg-amber-400 text-amber-950 animate-pulse'
                      : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                  }`}
                  title="Dengarkan pembacaan suara"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {playingId === mat.id ? 'Berbicara...' : 'Dengarkan'}
                  </span>
                </button>
              </div>

              <p className="text-xs text-teal-900 font-bold bg-teal-50/70 p-2.5 rounded-xl border border-teal-100">
                💡 {mat.summary}
              </p>

              <ul className="space-y-1.5 text-xs text-slate-700 font-semibold">
                {mat.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-500 font-bold">✓</span>
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

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Penjelasan Ramah Anak
              </span>
              <span>Pahlawan Gigi Indonesia</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
