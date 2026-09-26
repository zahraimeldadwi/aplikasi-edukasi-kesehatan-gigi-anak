import React, { useMemo } from 'react';
import { PlayerProfile, LeaderboardEntry } from '../types';
import { Trophy, Star, Award, ArrowLeft, Sparkles } from 'lucide-react';

interface LeaderboardScreenProps {
  player: PlayerProfile;
  onBackToMap: () => void;
}

const DEFAULT_RIVALS: LeaderboardEntry[] = [
  { name: 'Adit Sang Penjelajah', score: 480, gender: 'boy', badgesCount: 6, date: 'Hari ini' },
  { name: 'Siti Penjaga Senyum', score: 450, gender: 'girl', badgesCount: 5, date: 'Kemarin' },
  { name: 'Budi Ahli Sikat', score: 420, gender: 'boy', badgesCount: 5, date: '2 hari lalu' },
  { name: 'Rani Gigi Berkilau', score: 390, gender: 'girl', badgesCount: 4, date: '3 hari lalu' },
  { name: 'Fikri Pemburu Karies', score: 350, gender: 'boy', badgesCount: 3, date: 'Minggu ini' },
];

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  player,
  onBackToMap,
}) => {
  const leaderboardList = useMemo(() => {
    const list: LeaderboardEntry[] = [...DEFAULT_RIVALS];

    // Add current player
    const existingIndex = list.findIndex(e => e.name === player.name);
    const playerEntry: LeaderboardEntry = {
      name: player.name,
      score: player.score,
      gender: player.gender,
      badgesCount: player.badges.length,
      date: 'Baru saja',
      isCurrentUser: true,
    };

    if (existingIndex >= 0) {
      list[existingIndex] = playerEntry;
    } else {
      list.push(playerEntry);
    }

    return list.sort((a, b) => b.score - a.score);
  }, [player]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-3xl p-6 text-white shadow-lg border-4 border-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl">
            🏆
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Papan Kehormatan
            </span>
            <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-black mt-1">
              Papan Pahlawan Gigi
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 font-bold">
              Kumpulkan poin dari mini game dan kuis untuk menempati posisi teratas!
            </p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/40 text-center">
          <span className="text-xs font-bold text-white/90 block">Skormu:</span>
          <span className="font-['Fredoka'] text-2xl font-black text-amber-300">
            {player.score}
          </span>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-emerald-200 shadow-md space-y-3">
        {leaderboardList.map((entry, idx) => {
          let rankBadge = '';
          let rankColor = '';

          if (idx === 0) {
            rankBadge = '🥇';
            rankColor = 'bg-amber-100 border-amber-300 text-amber-950 font-black';
          } else if (idx === 1) {
            rankBadge = '🥈';
            rankColor = 'bg-slate-100 border-slate-300 text-slate-800 font-bold';
          } else if (idx === 2) {
            rankBadge = '🥉';
            rankColor = 'bg-orange-100 border-orange-300 text-orange-950 font-bold';
          } else {
            rankBadge = `#${idx + 1}`;
            rankColor = 'bg-white border-slate-200 text-slate-700';
          }

          return (
            <div
              key={idx}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${rankColor} ${
                entry.isCurrentUser ? 'ring-3 ring-emerald-400 shadow-sm' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/80 shadow-2xs flex items-center justify-center font-['Fredoka'] text-sm sm:text-base font-black shrink-0">
                  {rankBadge}
                </span>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-['Fredoka'] text-sm sm:text-base font-bold">
                      {entry.gender === 'boy' ? '👦' : '👧'} {entry.name}
                    </span>
                    {entry.isCurrentUser && (
                      <span className="text-[10px] font-black uppercase bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                        Kamu
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Award className="w-3 h-3 text-amber-500" /> {entry.badgesCount} Lencana · {entry.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span className="font-['Fredoka'] font-black text-slate-800 text-sm sm:text-base">
                  {entry.score}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <button
          onClick={onBackToMap}
          className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-['Fredoka'] font-bold text-sm rounded-2xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Petualangan</span>
        </button>
      </div>
    </div>
  );
};
