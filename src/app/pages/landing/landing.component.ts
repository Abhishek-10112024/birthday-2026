import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { gsap } from 'gsap';
import { AudioService } from '../../services/audio.service';
import { MemoryService } from '../../services/memory.service';
import { MemoryDialogComponent } from '../../components/memory-dialog/memory-dialog.component';
import { Memory } from '../../models/memory.model';

@Component({
  selector: 'app-landing',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  private router = inject(Router);
  private audioService = inject(AudioService);
  private dialog = inject(MatDialog);
  private memoryService = inject(MemoryService);

  // Get memories from the service instead of duplicating
  get memories(): Memory[] {
    return this.memoryService.memories().slice(0, 5); // Only show first 5 memories on landing page
  }

  ngOnInit(): void {
    this.animateStars();
    this.animateTitle();
    // Audio disabled for now - add your own audio file later
    // this.audioService.loadAudio('assets/audio/ambient.mp3');
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
    this.audioService.play();
    
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

      // Open memory dialog
      this.dialog.open(MemoryDialogComponent, {
        data: memory,
        width: '90vw',
        maxWidth: '600px',
        panelClass: 'memory-dialog-panel'
      });
    }
  }

  scrollToContent(): void {
    // Navigate to constellation page
    this.audioService.play();
    
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
