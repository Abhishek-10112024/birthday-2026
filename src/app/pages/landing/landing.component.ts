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
    return this.memoryService.memories(); // Get all memories, not just first 5
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
    // Define positions for 15 clickable stars around the edges
    const positions = [
      // Top row (5 stars)
      { x: 10, y: 15 },   // Far top left
      { x: 25, y: 10 },   // Top left
      { x: 50, y: 8 },    // Top center
      { x: 75, y: 10 },   // Top right
      { x: 90, y: 15 },   // Far top right
      
      // Middle row (4 stars - left and right sides)
      { x: 5, y: 35 },    // Upper middle left
      { x: 95, y: 35 },   // Upper middle right
      { x: 5, y: 65 },    // Lower middle left
      { x: 95, y: 65 },   // Lower middle right
      
      // Bottom row (6 stars)
      { x: 10, y: 85 },   // Far bottom left
      { x: 25, y: 90 },   // Bottom left
      { x: 40, y: 92 },   // Bottom left-center
      { x: 60, y: 92 },   // Bottom right-center
      { x: 75, y: 90 },   // Bottom right
      { x: 90, y: 85 },   // Far bottom right
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
    // Smooth scroll to show more content or navigate to constellation
    gsap.to(window, {
      scrollTop: window.innerHeight,
      duration: 1,
      ease: 'power2.inOut'
    });
  }
}
