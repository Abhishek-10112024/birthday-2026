import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private platformId = inject(PLATFORM_ID);
  private backgroundAudio: HTMLAudioElement | null = null;
  private isBrowser: boolean;

  // Signals for reactive state
  isMuted = signal<boolean>(false);
  isPlaying = signal<boolean>(false);
  volume = signal<number>(0.3); // 30% volume for background music

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Load mute preference from localStorage
    if (this.isBrowser) {
      const savedMute = localStorage.getItem('audioMuted');
      if (savedMute !== null) {
        this.isMuted.set(savedMute === 'true');
      }
    }
  }

  /**
   * Initialize and play background music
   * @param url URL to the audio file
   */
  playBackgroundMusic(url: string): void {
    if (!this.isBrowser) return;

    try {
      // Create audio element if it doesn't exist
      if (!this.backgroundAudio) {
        this.backgroundAudio = new Audio(url);
        this.backgroundAudio.loop = true;
        this.backgroundAudio.volume = this.isMuted() ? 0 : this.volume();
        
        // Event listeners
        this.backgroundAudio.addEventListener('play', () => {
          this.isPlaying.set(true);
        });
        
        this.backgroundAudio.addEventListener('pause', () => {
          this.isPlaying.set(false);
        });
        
        this.backgroundAudio.addEventListener('error', (e) => {
          console.error('Audio playback error:', e);
          this.isPlaying.set(false);
        });
      }

      // Play the audio
      const playPromise = this.backgroundAudio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Background music started');
          })
          .catch((error) => {
            // Auto-play was prevented
            console.log('Auto-play prevented. User interaction required:', error);
          });
      }
    } catch (error) {
      console.error('Error playing background music:', error);
    }
  }

  /**
   * Pause background music
   */
  pauseBackgroundMusic(): void {
    if (this.backgroundAudio && !this.backgroundAudio.paused) {
      this.backgroundAudio.pause();
    }
  }

  /**
   * Resume background music
   */
  resumeBackgroundMusic(): void {
    if (this.backgroundAudio && this.backgroundAudio.paused) {
      this.backgroundAudio.play().catch(error => {
        console.error('Error resuming background music:', error);
      });
    }
  }

  /**
   * Fade out background music
   * @param duration Duration in milliseconds
   */
  fadeOutBackground(duration: number = 1000): void {
    if (!this.backgroundAudio || this.isMuted()) return;

    const startVolume = this.backgroundAudio.volume;
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      currentStep++;
      const newVolume = Math.max(0, startVolume - (volumeStep * currentStep));
      
      if (this.backgroundAudio) {
        this.backgroundAudio.volume = newVolume;
      }

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        this.pauseBackgroundMusic();
      }
    }, stepDuration);
  }

  /**
   * Fade in background music
   * @param duration Duration in milliseconds
   */
  fadeInBackground(duration: number = 1000): void {
    if (!this.backgroundAudio || this.isMuted()) return;

    const targetVolume = this.volume();
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    // Start from 0 volume
    this.backgroundAudio.volume = 0;
    this.resumeBackgroundMusic();

    const fadeInterval = setInterval(() => {
      currentStep++;
      const newVolume = Math.min(targetVolume, volumeStep * currentStep);
      
      if (this.backgroundAudio) {
        this.backgroundAudio.volume = newVolume;
      }

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
      }
    }, stepDuration);
  }

  /**
   * Toggle mute on/off
   */
  toggleMute(): void {
    const newMutedState = !this.isMuted();
    this.isMuted.set(newMutedState);

    // Save preference
    if (this.isBrowser) {
      localStorage.setItem('audioMuted', newMutedState.toString());
    }

    // Update audio volume
    if (this.backgroundAudio) {
      this.backgroundAudio.volume = newMutedState ? 0 : this.volume();
    }
  }

  /**
   * Set volume (0 to 1)
   * @param volume Volume level
   */
  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.volume.set(clampedVolume);

    if (this.backgroundAudio && !this.isMuted()) {
      this.backgroundAudio.volume = clampedVolume;
    }
  }

  /**
   * Play sound effect
   * @param effectName Name of the sound effect file (without extension)
   */
  playSoundEffect(effectName: string): void {
    if (!this.isBrowser || this.isMuted()) return;

    try {
      const audio = new Audio(`/assets/audio/effects/${effectName}.mp3`);
      audio.volume = 0.4; // Sound effects at 40% volume
      audio.play().catch(error => {
        console.error(`Error playing sound effect ${effectName}:`, error);
      });
    } catch (error) {
      console.error(`Error creating sound effect ${effectName}:`, error);
    }
  }

  /**
   * Play memory-specific audio
   * @param audioUrl URL to the memory audio file
   */
  playMemoryAudio(audioUrl: string): HTMLAudioElement | null {
    if (!this.isBrowser || this.isMuted()) return null;

    try {
      const audio = new Audio(audioUrl);
      audio.volume = this.volume();
      audio.play().catch(error => {
        console.error('Error playing memory audio:', error);
      });
      return audio;
    } catch (error) {
      console.error('Error creating memory audio:', error);
      return null;
    }
  }

  /**
   * Stop all audio and cleanup
   */
  stopAll(): void {
    if (this.backgroundAudio) {
      this.backgroundAudio.pause();
      this.backgroundAudio.currentTime = 0;
    }
  }

  /**
   * Cleanup on service destroy
   */
  ngOnDestroy(): void {
    this.stopAll();
    if (this.backgroundAudio) {
      this.backgroundAudio.remove();
      this.backgroundAudio = null;
    }
  }
}
