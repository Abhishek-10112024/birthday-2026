import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { gsap } from 'gsap';
import { MemoryService } from '../../services/memory.service';
import { AudioService } from '../../services/audio.service';
import { AudioControlComponent } from '../../components/audio-control/audio-control.component';
import { Memory } from '../../models/memory.model';
import { MemoryDialogComponent } from '../../components/memory-dialog/memory-dialog.component';

@Component({
  selector: 'app-constellation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    AudioControlComponent
  ],
  templateUrl: './constellation.component.html',
  styleUrl: './constellation.component.scss'
})
export class ConstellationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private router = inject(Router);
  private dialog = inject(MatDialog);
  memoryService = inject(MemoryService);
  audioService = inject(AudioService);

  private ctx!: CanvasRenderingContext2D;
  hoveredStar = signal<number | null>(null);

  ngOnInit(): void {
    this.animateIntro();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.drawConstellation();
    this.animateStars();
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement!;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    this.ctx = canvas.getContext('2d')!;
  }

  private drawConstellation(): void {
    if (!this.ctx) return;

    const canvas = this.canvasRef.nativeElement;
    const memories = this.memoryService.memories();
    const lines = this.memoryService.constellationLines();

    // Clear canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines between unlocked memories
    this.ctx.strokeStyle = 'rgba(168, 192, 255, 0.3)';
    this.ctx.lineWidth = 2;

    lines.forEach(line => {
      const fromMemory = memories.find(m => m.id === line.from);
      const toMemory = memories.find(m => m.id === line.to);

      if (fromMemory?.unlocked && toMemory?.unlocked) {
        const fromX = (fromMemory.x / 100) * canvas.width;
        const fromY = (fromMemory.y / 100) * canvas.height;
        const toX = (toMemory.x / 100) * canvas.width;
        const toY = (toMemory.y / 100) * canvas.height;

        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();
      }
    });
  }

  private animateIntro(): void {
    gsap.from('.constellation-header', {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from('.progress-container', {
      opacity: 0,
      x: -30,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out'
    });
  }

  private animateStars(): void {
    const stars = document.querySelectorAll('.memory-star');
    stars.forEach((star, index) => {
      // Set initial state
      gsap.set(star, { scale: 1, opacity: 1 });
      
      // Animate from scale 0
      gsap.from(star, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'back.out(1.7)'
      });
    });
  }

  onStarClick(memory: Memory): void {
    // Check if this memory can be unlocked (sequential order)
    if (!memory.unlocked && !this.memoryService.canUnlockMemory(memory.id)) {
      // Show feedback that this memory is locked
      const starElement = document.querySelector(`[data-memory-id="${memory.id}"]`);
      if (starElement) {
        // Shake animation for locked star
        gsap.to(starElement, {
          x: -10,
          duration: 0.1,
          yoyo: true,
          repeat: 5,
          ease: 'power2.inOut'
        });
      }
      return; // Don't unlock or open dialog for locked memories
    }
    
    // Play star click sound
    this.audioService.playSoundEffect('star-click');
    
    if (!memory.unlocked) {
      this.memoryService.unlockMemory(memory.id);
      this.animateUnlock(memory);
      this.drawConstellation();
      
      setTimeout(() => {
        this.openMemoryDialog(memory);
      }, 500);

      // Check if all memories are unlocked
      if (this.memoryService.areAllMemoriesUnlocked()) {
        setTimeout(() => {
          this.showFinalMessage();
        }, 2000);
      }
    } else {
      this.openMemoryDialog(memory);
    }
  }

  private animateUnlock(memory: Memory): void {
    const starElement = document.querySelector(`[data-memory-id="${memory.id}"]`);
    if (starElement) {
      gsap.to(starElement, {
        scale: 1.5,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });

      // Particle burst effect
      this.createParticleBurst(memory);
    }
  }

  private createParticleBurst(memory: Memory): void {
    const container = document.querySelector('.constellation-container');
    if (!container) return;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${memory.x}%`;
      particle.style.top = `${memory.y}%`;
      container.appendChild(particle);

      const angle = (i / 12) * Math.PI * 2;
      const distance = 50 + Math.random() * 50;

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => particle.remove()
      });
    }
  }

  private openMemoryDialog(memory: Memory): void {
    // Fade out background music when opening dialog
    this.audioService.fadeOutBackground(500);
    
    const dialogRef = this.dialog.open(MemoryDialogComponent, {
      data: memory,
      width: '90vw',
      maxWidth: '600px',
      panelClass: 'memory-dialog'
    });
    
    // Fade in background music when dialog closes
    dialogRef.afterClosed().subscribe(() => {
      this.audioService.fadeInBackground(500);
    });
  }

  private showFinalMessage(): void {
    // Play completion sound effect
    this.audioService.playSoundEffect('star-click');
    
    gsap.to('.constellation-container', {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        this.router.navigate(['/final-message']);
      }
    });
  }

  onStarHover(memoryId: number | null): void {
    this.hoveredStar.set(memoryId);
  }

  getProgress(): number {
    const total = this.memoryService.memories().length;
    const unlocked = this.memoryService.getUnlockedCount();
    return (unlocked / total) * 100;
  }

  generateBackgroundStars(): number[] {
    return Array.from({ length: 150 }, (_, i) => i);
  }
}
