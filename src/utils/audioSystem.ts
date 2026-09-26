import { Gender } from '../types';

class AudioSystem {
  private ctx: AudioContext | null = null;
  private musicGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private masterGainNode: GainNode | null = null;
  private isMusicPlaying = false;
  private musicInterval: number | null = null;
  private currentTheme: string = 'main';

  // Settings
  public soundEnabled = true;
  public musicEnabled = true;
  public soundVolume = 0.8;
  public musicVolume = 0.45;
  private isDucked = false;

  constructor() {
    this.loadSettings();
  }

  private loadSettings() {
    try {
      const saved = localStorage.getItem('pahlawan_gigi_audio_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.soundEnabled = parsed.soundEnabled ?? true;
        this.musicEnabled = parsed.musicEnabled ?? true;
        this.soundVolume = parsed.soundVolume ?? 0.8;
        this.musicVolume = parsed.musicVolume ?? 0.45;
      }
    } catch {
      // fallback
    }
  }

  public saveSettings() {
    try {
      localStorage.setItem(
        'pahlawan_gigi_audio_settings',
        JSON.stringify({
          soundEnabled: this.soundEnabled,
          musicEnabled: this.musicEnabled,
          soundVolume: this.soundVolume,
          musicVolume: this.musicVolume,
        })
      );
    } catch {
      // ignore
    }
  }

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.connect(this.ctx.destination);

      this.musicGainNode = this.ctx.createGain();
      this.musicGainNode.gain.setValueAtTime(this.musicEnabled ? this.musicVolume : 0, this.ctx.currentTime);
      this.musicGainNode.connect(this.masterGainNode);

      this.sfxGainNode = this.ctx.createGain();
      this.sfxGainNode.gain.setValueAtTime(this.soundEnabled ? this.soundVolume : 0, this.ctx.currentTime);
      this.sfxGainNode.connect(this.masterGainNode);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (this.sfxGainNode && this.ctx) {
      this.sfxGainNode.gain.setValueAtTime(enabled ? this.soundVolume : 0, this.ctx.currentTime);
    }
    this.saveSettings();
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (this.musicGainNode && this.ctx) {
      const targetVol = enabled ? (this.isDucked ? this.musicVolume * 0.4 : this.musicVolume) : 0;
      this.musicGainNode.gain.setValueAtTime(targetVol, this.ctx.currentTime);
    }
    if (enabled && !this.isMusicPlaying) {
      this.startMusic(this.currentTheme);
    } else if (!enabled && this.isMusicPlaying) {
      this.stopMusic();
    }
    this.saveSettings();
  }

  public setSoundVolume(vol: number) {
    this.soundVolume = vol;
    if (this.sfxGainNode && this.ctx && this.soundEnabled) {
      this.sfxGainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
    this.saveSettings();
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = vol;
    if (this.musicGainNode && this.ctx && this.musicEnabled) {
      const target = this.isDucked ? vol * 0.4 : vol;
      this.musicGainNode.gain.setValueAtTime(target, this.ctx.currentTime);
    }
    this.saveSettings();
  }

  // --- Sound Effects using Procedural Web Audio ---
  public playSfx(type: 'ting' | 'yeay' | 'sparkle' | 'bonus' | 'oops' | 'levelUp' | 'bossDefeat' | 'victory' | 'attack' | 'clean' | 'click') {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx || !this.sfxGainNode) return;

    const t = this.ctx.currentTime;

    switch (type) {
      case 'click': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.08);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.08);
        break;
      }
      case 'ting': {
        // Bright bell chime for correct answer (+10)
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          if (!this.ctx || !this.sfxGainNode) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + i * 0.06);
          gain.gain.setValueAtTime(0.4, t + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.4);
          osc.connect(gain);
          gain.connect(this.sfxGainNode);
          osc.start(t + i * 0.06);
          osc.stop(t + i * 0.06 + 0.45);
        });
        break;
      }
      case 'sparkle':
      case 'yeay': {
        // Joyful sparkle arpeggio
        const notes = [587.33, 739.99, 880, 1174.66, 1479.98];
        notes.forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGainNode) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + idx * 0.05);
          gain.gain.setValueAtTime(0.35, t + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.35);
          osc.connect(gain);
          gain.connect(this.sfxGainNode);
          osc.start(t + idx * 0.05);
          osc.stop(t + idx * 0.05 + 0.4);
        });
        break;
      }
      case 'bonus': {
        // Cheerful bonus chime
        const notes = [440, 554.37, 659.25, 880, 1108.73];
        notes.forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGainNode) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, t + idx * 0.07);
          gain.gain.setValueAtTime(0.2, t + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.3);
          osc.connect(gain);
          gain.connect(this.sfxGainNode);
          osc.start(t + idx * 0.07);
          osc.stop(t + idx * 0.07 + 0.32);
        });
        break;
      }
      case 'oops': {
        // Gentle comic 'uh-oh' (non-scary, playful)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(240, t + 0.18);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.32);
        break;
      }
      case 'clean': {
        // Scrubbing squeak / clean tooth sparkle
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800 + Math.random() * 400, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.08);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.1);
        break;
      }
      case 'attack': {
        // Hero dental blast sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(150, t + 0.2);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.25);
        break;
      }
      case 'levelUp': {
        // Level completion fanfare
        const notes = [392, 523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGainNode) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + idx * 0.1);
          gain.gain.setValueAtTime(0.4, t + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + (idx === notes.length - 1 ? 0.8 : 0.25));
          osc.connect(gain);
          gain.connect(this.sfxGainNode);
          osc.start(t + idx * 0.1);
          osc.stop(t + idx * 0.1 + (idx === notes.length - 1 ? 0.85 : 0.3));
        });
        break;
      }
      case 'bossDefeat':
      case 'victory': {
        // Grand victory fanfare
        const chords = [
          [523.25, 659.25, 783.99],
          [587.33, 739.99, 880],
          [659.25, 783.99, 987.77],
          [783.99, 987.77, 1046.5, 1318.5],
        ];
        chords.forEach((chord, step) => {
          const startTime = t + step * 0.22;
          chord.forEach(freq => {
            if (!this.ctx || !this.sfxGainNode) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, startTime);
            const duration = step === chords.length - 1 ? 1.2 : 0.25;
            gain.gain.setValueAtTime(0.3, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            osc.connect(gain);
            gain.connect(this.sfxGainNode);
            osc.start(startTime);
            osc.stop(startTime + duration + 0.05);
          });
        });
        break;
      }
    }
  }

  // --- Procedural Melodic Kids Adventure Backsound ---
  public startMusic(theme: string = 'main') {
    this.currentTheme = theme;
    if (!this.musicEnabled) return;
    this.init();
    if (!this.ctx || !this.musicGainNode) return;

    if (this.isMusicPlaying) {
      this.stopMusic();
    }

    this.isMusicPlaying = true;
    let step = 0;

    // Define light bouncy pentatonic melodies for cartoon kids game
    let melody: number[] = [];
    let tempoMs = 380;

    switch (theme) {
      case 'level1': // Desa Gigi Sehat: Sunny, gentle
        melody = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 329.63];
        tempoMs = 400;
        break;
      case 'level2': // Lembah Monster: Playful, comic staccato
        melody = [220.0, 246.94, 261.63, 293.66, 261.63, 246.94, 220.0, 196.0];
        tempoMs = 320;
        break;
      case 'level3': // Hutan Gusi: Peaceful, lush bells
        melody = [329.63, 392.0, 440.0, 523.25, 440.0, 392.0, 349.23, 329.63];
        tempoMs = 420;
        break;
      case 'level4': // Gunung Sariawan: Energetic expedition
        melody = [293.66, 369.99, 440.0, 587.33, 440.0, 369.99, 329.63, 293.66];
        tempoMs = 350;
        break;
      case 'level5': // Kota Nafas Segar: Light airy breeze
        melody = [392.0, 440.0, 523.25, 587.33, 659.25, 587.33, 523.25, 440.0];
        tempoMs = 340;
        break;
      case 'level6': // Benteng Sikat Gigi: Marching hero beat
        melody = [261.63, 261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 261.63];
        tempoMs = 310;
        break;
      case 'level7': // Kerajaan Makanan: Joyful bouncy market
        melody = [349.23, 440.0, 523.25, 659.25, 523.25, 440.0, 392.0, 349.23];
        tempoMs = 330;
        break;
      case 'level8': // Boss Monster Karies: Suspenseful yet cartoonish & epic
        melody = [220.0, 261.63, 329.63, 392.0, 440.0, 392.0, 329.63, 261.63];
        tempoMs = 300;
        break;
      default: // Main dashboard
        melody = [261.63, 329.63, 392.0, 523.25, 440.0, 392.0, 329.63, 293.66];
        tempoMs = 360;
    }

    this.musicInterval = window.setInterval(() => {
      if (!this.ctx || !this.musicGainNode || !this.musicEnabled) return;
      const t = this.ctx.currentTime;
      const freq = melody[step % melody.length];

      // Soft marimba / chime note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      // Play soft bass root every 4 beats
      if (step % 4 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(freq / 2, t);
        bassGain.gain.setValueAtTime(0.18, t);
        bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        bassOsc.connect(bassGain);
        bassGain.connect(this.musicGainNode);
        bassOsc.start(t);
        bassOsc.stop(t + 0.42);
      }

      const noteDuration = 0.25;
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + noteDuration);

      osc.connect(gain);
      gain.connect(this.musicGainNode);
      osc.start(t);
      osc.stop(t + noteDuration + 0.05);

      step++;
    }, tempoMs);
  }

  public stopMusic() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.isMusicPlaying = false;
  }

  // --- Speech & Voice System ---
  // Voice profiles: 'hero_boy', 'hero_girl', 'gigi', 'monster', 'peri'
  public speak(
    text: string,
    role: 'hero' | 'gigi' | 'monster' | 'peri' = 'hero',
    userGender: Gender = 'boy',
    onEnd?: () => void
  ) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';

    // Duck music volume when character speaks
    this.duckMusic(true);

    // Pick voice if Indonesian available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    // Set pitch & rate according to character specification
    if (role === 'hero') {
      if (userGender === 'boy') {
        utterance.pitch = 1.25; // Ceria, energik, ramah anak laki-laki
        utterance.rate = 1.05;
      } else {
        utterance.pitch = 1.35; // Ceria, energik, anak perempuan
        utterance.rate = 1.08;
      }
    } else if (role === 'gigi') {
      utterance.pitch = 1.6; // High-pitched cute tooth
      utterance.rate = 1.15;
    } else if (role === 'monster') {
      utterance.pitch = 0.75; // Grumpy raspy cartoon monster
      utterance.rate = 0.9;
    } else if (role === 'peri') {
      utterance.pitch = 1.45; // Soft magical fairy
      utterance.rate = 0.98;
    }

    utterance.onend = () => {
      this.duckMusic(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.duckMusic(false);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.duckMusic(false);
    }
  }

  // Audio ducking: lower music volume by 40-50% while character is talking
  private duckMusic(duck: boolean) {
    this.isDucked = duck;
    if (!this.musicGainNode || !this.ctx || !this.musicEnabled) return;
    const target = duck ? this.musicVolume * 0.45 : this.musicVolume;
    this.musicGainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.musicGainNode.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.15);
  }
}

export const audioSystem = new AudioSystem();
