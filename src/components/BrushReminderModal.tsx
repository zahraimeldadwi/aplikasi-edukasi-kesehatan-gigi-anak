import React, { useState } from 'react';
import { notificationSystem } from '../utils/notificationSystem';
import { audioSystem } from '../utils/audioSystem';
import { Bell, Sun, Moon, Sparkles, Check, Flame } from 'lucide-react';

interface BrushReminderModalProps {
  playerName: string;
  isOpen: boolean;
  onClose: () => void;
  morningEnabled: boolean;
  morningTime: string;
  nightEnabled: boolean;
  nightTime: string;
  brushStreak: number;
  onUpdateReminder: (
    morningEnabled: boolean,
    morningTime: string,
    nightEnabled: boolean,
    nightTime: string
  ) => void;
  onIncrementStreak: () => void;
}

export const BrushReminderModal: React.FC<BrushReminderModalProps> = ({
  playerName,
  isOpen,
  onClose,
  morningEnabled,
  morningTime,
  nightEnabled,
  nightTime,
  brushStreak,
  onUpdateReminder,
  onIncrementStreak,
}) => {
  const [morningOn, setMorningOn] = useState(morningEnabled);
  const [morningVal, setMorningVal] = useState(morningTime);
  const [nightOn, setNightOn] = useState(nightEnabled);
  const [nightVal, setNightVal] = useState(nightTime);
  const [statusMsg, setStatusMsg] = useState('');
  const [brushedToday, setBrushedToday] = useState(false);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    audioSystem.playSfx('click');
    const granted = await notificationSystem.requestPermission();
    if (granted) {
      setStatusMsg('✅ Izin notifikasi aktif! Pengingat akan muncul di perangkatmu.');
      audioSystem.playSfx('ting');
    } else {
      setStatusMsg('⚠️ Izin notifikasi belum diaktifkan di browser.');
    }
  };

  const handleSave = () => {
    audioSystem.playSfx('click');
    onUpdateReminder(morningOn, morningVal, nightOn, nightVal);
    onClose();
  };

  const handleTestMorning = () => {
    notificationSystem.sendTestNotification(playerName, 'morning');
    setStatusMsg('🌅 Notifikasi pagi berhasil diuji!');
  };

  const handleTestNight = () => {
    notificationSystem.sendTestNotification(playerName, 'night');
    setStatusMsg('🌙 Notifikasi malam berhasil diuji!');
  };

  const handleRecordBrushed = () => {
    if (brushedToday) return;
    setBrushedToday(true);
    audioSystem.playSfx('bonus');
    audioSystem.speak(`Hebat, ${playerName}! Gigimu semakin sehat dan kuat!`, 'gigi');
    onIncrementStreak();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 border-4 border-sky-300 shadow-2xl space-y-5 animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-sky-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl">
              ⏰
            </div>
            <div>
              <h3 className="font-['Fredoka'] text-lg font-bold text-slate-800">
                Pengingat Sikat Gigi Harian
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Sikat setelah sarapan pagi & sebelum tidur malam
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

        {/* Streak Counter Card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs">
              <Flame className="w-6 h-6 fill-amber-950" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700 block">
                Streak Sikat Gigi:
              </span>
              <span className="font-['Fredoka'] text-lg font-black text-amber-900">
                {brushStreak} Hari Berturut-turut!
              </span>
            </div>
          </div>

          <button
            onClick={handleRecordBrushed}
            disabled={brushedToday}
            className={`px-3 py-1.5 rounded-xl font-['Fredoka'] font-bold text-xs transition-all ${
              brushedToday
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-xs cursor-pointer'
            }`}
          >
            {brushedToday ? '✓ Sudah Sikat' : '🦷 Sikat Gigi!'}
          </button>
        </div>

        {/* Settings Morning & Night */}
        <div className="space-y-3">
          {/* Morning Reminder */}
          <div className="p-3.5 rounded-2xl border-2 border-sky-100 bg-sky-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="font-['Fredoka'] text-sm font-bold text-slate-800 block">
                    Pagi (Setelah Sarapan)
                  </span>
                  <span className="text-[11px] text-slate-500">Membilas sisa sarapan pagi</span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={morningOn}
                onChange={e => setMorningOn(e.target.checked)}
                className="w-5 h-5 accent-sky-500 rounded cursor-pointer"
              />
            </div>

            {morningOn && (
              <div className="flex items-center justify-between pt-1">
                <input
                  type="time"
                  value={morningVal}
                  onChange={e => setMorningVal(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-sky-300 font-bold text-sm text-slate-800 bg-white"
                />
                <button
                  onClick={handleTestMorning}
                  className="text-xs text-sky-700 font-bold underline cursor-pointer hover:text-sky-900"
                >
                  Tes Notifikasi Pagi
                </button>
              </div>
            )}
          </div>

          {/* Night Reminder */}
          <div className="p-3.5 rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-500" />
                <div>
                  <span className="font-['Fredoka'] text-sm font-bold text-slate-800 block">
                    Malam (Sebelum Tidur)
                  </span>
                  <span className="text-[11px] text-slate-500">Kunci bebas karies di malam hari</span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={nightOn}
                onChange={e => setNightOn(e.target.checked)}
                className="w-5 h-5 accent-indigo-500 rounded cursor-pointer"
              />
            </div>

            {nightOn && (
              <div className="flex items-center justify-between pt-1">
                <input
                  type="time"
                  value={nightVal}
                  onChange={e => setNightVal(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-indigo-300 font-bold text-sm text-slate-800 bg-white"
                />
                <button
                  onClick={handleTestNight}
                  className="text-xs text-indigo-700 font-bold underline cursor-pointer hover:text-indigo-900"
                >
                  Tes Notifikasi Malam
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Permission Request Button */}
        {notificationSystem.getPermission() !== 'granted' && (
          <button
            onClick={handleRequestPermission}
            className="w-full py-2.5 px-4 bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Aktifkan Izin Notifikasi Browser</span>
          </button>
        )}

        {statusMsg && (
          <p className="text-xs text-emerald-700 font-bold text-center bg-emerald-50 p-2 rounded-xl border border-emerald-200">
            {statusMsg}
          </p>
        )}

        {/* Action Button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-['Fredoka'] font-bold text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-5 h-5" />
          <span>SIMPAN PENGATURAN</span>
        </button>
      </div>
    </div>
  );
};
