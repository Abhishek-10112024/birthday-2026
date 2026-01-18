import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  isPlaying = signal<boolean>(false);
  isMuted = signal<boolean>(false);

  loadAudio(src: string): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = 0.3;
  }

  play(): void {
    if (this.audio && !this.isPlaying()) {
      this.audio.play().then(() => {
        this.isPlaying.set(true);
      }).catch(err => {
        console.error('Audio play failed:', err);
      });
    }
  }

  pause(): void {
    if (this.audio && this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
    }
  }

  toggle(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  toggleMute(): void {
    if (this.audio) {
      this.isMuted.update(muted => !muted);
      this.audio!.muted = this.isMuted();
    }
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }
}
