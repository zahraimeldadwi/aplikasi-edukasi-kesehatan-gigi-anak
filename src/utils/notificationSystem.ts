import { audioSystem } from './audioSystem';

export interface BrushReminderConfig {
  morningEnabled: boolean;
  morningTime: string; // e.g. "06:30"
  nightEnabled: boolean;
  nightTime: string; // e.g. "20:00"
}

class NotificationSystem {
  private timerId: number | null = null;
  private lastAlertMinute: string = '';

  public isSupported(): boolean {
    return 'Notification' in window;
  }

  public getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  public async requestPermission(): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      const result = await Notification.requestPermission();
      return result === 'granted';
    } catch {
      return false;
    }
  }

  public sendNotification(title: string, body: string, icon = '🦷') {
    audioSystem.playSfx('bonus');

    if (this.isSupported() && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico', // fallback
          badge: '/favicon.ico',
        });
        return;
      } catch {
        // Continue to fallback
      }
    }
  }

  public sendTestNotification(playerName: string, type: 'morning' | 'night') {
    const isMorning = type === 'morning';
    const title = isMorning ? '🌅 Waktunya Sikat Gigi Pagi, Pahlawan Gigi!' : '🌙 Waktunya Sikat Gigi Malam!';
    const body = isMorning
      ? `Halo ${playerName || 'Pahlawan Gigi'}! Jangan lupa sikat gigi setelah sarapan ya. Bersihkan selama 2 menit!`
      : `Halo ${playerName || 'Pahlawan Gigi'}! Sikat gigi sebelum tidur yuk, agar Monster Karies tidak datang malam ini!`;

    this.sendNotification(title, body);
    audioSystem.speak(body, 'gigi');
  }

  public startChecker(config: BrushReminderConfig, playerName: string) {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }

    this.timerId = window.setInterval(() => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;

      if (currentTimeStr === this.lastAlertMinute) return;

      if (config.morningEnabled && currentTimeStr === config.morningTime) {
        this.lastAlertMinute = currentTimeStr;
        this.sendTestNotification(playerName, 'morning');
      } else if (config.nightEnabled && currentTimeStr === config.nightTime) {
        this.lastAlertMinute = currentTimeStr;
        this.sendTestNotification(playerName, 'night');
      }
    }, 15000);
  }

  public stopChecker() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

export const notificationSystem = new NotificationSystem();
