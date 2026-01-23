import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { gsap } from 'gsap';
import { AudioService } from '../../services/audio.service';
import { MemoryService } from '../../services/memory.service';
import { MemoryDialogComponent } from '../../components/memory-dialog/memory-dialog.component';
import { AudioControlComponent } from '../../components/audio-control/audio-control.component';
import { Memory } from '../../models/memory.model';

@Component({
  selector: 'app-landing',
  imports: [MatButtonModule, MatIconModule, AudioControlComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  private router = inject(Router);
  private audioService = inject(AudioService);
  private dialog = inject(MatDialog);
  private memoryService = inject(MemoryService);
  
  showAudioHint = true;

  // Get memories from the service instead of duplicating
  get memories(): Memory[] {
    return this.memoryService.memories().slice(0, 5); // Only show first 5 memories on landing page
  }

  ngOnInit(): void {
    this.animateStars();
    this.animateTitle();
    // Start background music (will require user interaction due to browser autoplay policy)
    this.initBackgroundMusic();
    // Add click listener to start audio on first interaction
    this.setupAudioInteraction();
  }

  private initBackgroundMusic(): void {
    // Try to play background music
    // Note: Modern browsers require user interaction before playing audio
    this.audioService.playBackgroundMusic('/assets/audio/background/ambient-space.mp3');
  }

  private setupAudioInteraction(): void {
    // Listen for any click on the page to start audio
    const startAudio = () => {
      if (!this.audioService.isPlaying()) {
        this.audioService.playBackgroundMusic('/assets/audio/background/ambient-space.mp3');
      }
      // Hide the audio hint
      this.showAudioHint = false;
      // Remove listener after first interaction
      document.removeEventListener('click', startAudio);
    };
    
    document.addEventListener('click', startAudio, { once: true });
  }

  private animateStars(): void {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star) => {
      gsap.to(star, {
        opacity: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });
    });
  }

  private animateTitle(): void {
    gsap.from('.landing-title', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power3.out'
    });

    gsap.from('.landing-subtitle', {
      opacity: 0,
      y: 30,
      duration: 1.5,
      delay: 0.5,
      ease: 'power3.out'
    });

    gsap.from('.start-button', {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 1.5,
      ease: 'back.out(1.7)'
    });
  }

  startJourney(): void {
    // Play sound effect for button click
    this.audioService.playSoundEffect('star-click');
    
    // Ensure background music is playing (user interaction allows autoplay)
    if (!this.audioService.isPlaying()) {
      this.audioService.playBackgroundMusic('/assets/audio/background/ambient-space.mp3');
    }
    
    gsap.to('.landing-container', {
      opacity: 0,
      scale: 1.2,
      duration: 1,
      ease: 'power2.in',
      onComplete: () => {
        this.router.navigate(['/constellation']);
      }
    });
  }

  generateStars(): number[] {
    return Array.from({ length: 100 }, (_, i) => i);
  }

  // Get position for clickable stars (positioned outside content area)
  getClickableStarPosition(index: number): { x: number; y: number } {
    // Define positions for 5 clickable stars around the edges
    const positions = [
      { x: 15, y: 20 },   // Top left
      { x: 85, y: 25 },   // Top right
      { x: 10, y: 70 },   // Bottom left
      { x: 50, y: 85 },   // Bottom center
      { x: 90, y: 75 },   // Bottom right
    ];
    
    // Return position for this memory index, or default if more memories than positions
    return positions[index] || { x: 50, y: 50 };
  }

  onStarClick(memoryIndex: number): void {
    // Get the memory at this index
    if (memoryIndex < this.memories.length) {
      const memory = this.memories[memoryIndex];
      
      // Unlock the memory (will be saved to localStorage)
      this.memoryService.unlockMemory(memory.id);
      
      // Play star click sound effect
      this.audioService.playSoundEffect('star-click');
      
      // Animate the clicked star
      const clickableStars = document.querySelectorAll('.clickable-star');
      if (clickableStars[memoryIndex]) {
        gsap.to(clickableStars[memoryIndex], {
          scale: 1.5,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        });
      }

      // Fade out background music when opening dialog
      this.audioService.fadeOutBackground(500);

      // Open memory dialog
      const dialogRef = this.dialog.open(MemoryDialogComponent, {
        data: memory,
        width: '90vw',
        maxWidth: '600px',
        panelClass: 'memory-dialog-panel'
      });

      // Fade in background music when dialog closes
      dialogRef.afterClosed().subscribe(() => {
        this.audioService.fadeInBackground(500);
      });
    }
  }

  scrollToContent(): void {
    // Play sound effect
    this.audioService.playSoundEffect('star-click');
    
    // Ensure background music is playing
    if (!this.audioService.isPlaying()) {
      this.audioService.playBackgroundMusic('/assets/audio/background/ambient-space.mp3');
    }
    
    gsap.to('.landing-container', {
      opacity: 0,
      scale: 1.2,
      duration: 1,
      ease: 'power2.in',
      onComplete: () => {
        this.router.navigate(['/constellation']);
      }
    });
  }
}
