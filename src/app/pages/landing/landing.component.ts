import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { gsap } from 'gsap';
import { AudioService } from '../../services/audio.service';
import { DriveImageService } from '../../services/drive-image.service';
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
  private driveImageService = inject(DriveImageService);

  // Dummy memory data for stars
  private memories: Memory[] = [
    {
      id: 1,
      title: 'First Day Together',
      date: 'January 15, 2020',
      description: 'The day we met at the coffee shop. You ordered a cappuccino with extra foam, and I knew right then that this was the beginning of something special.',
      imageUrl: 'https://i.ibb.co/VcFPDZMR/first-date.jpg',
      // imageUrl: 'https://drive.google.com/file/d/1bDAlFrxrMe2slQZ6T-4B6INvNqZ6GyJu/view?usp=drive_link',
      x: 20,
      y: 30,
      unlocked: true
    },
    {
      id: 2,
      title: 'Beach Sunset',
      date: 'July 4, 2020',
      description: 'Watching the sunset at the beach, our feet in the sand, talking about our dreams and the future. The sky was painted in shades of orange and pink.',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      x: 45,
      y: 25,
      unlocked: true
    },
    {
      id: 3,
      title: 'Mountain Adventure',
      date: 'September 12, 2020',
      description: 'Our first hiking trip together. We reached the summit just as the sun was rising, and the view took our breath away almost as much as the climb did.',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      x: 70,
      y: 40,
      unlocked: true
    },
    {
      id: 4,
      title: 'Cozy Winter Night',
      date: 'December 24, 2020',
      description: 'Snuggled up by the fireplace, hot chocolate in hand, watching the snow fall outside. The perfect end to a perfect year.',
      imageUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&q=80',
      x: 30,
      y: 60,
      unlocked: true
    },
    {
      id: 5,
      title: 'Spring Picnic',
      date: 'April 8, 2021',
      description: 'A spontaneous picnic in the park surrounded by blooming cherry blossoms. We laughed until our sides hurt and made plans for a thousand more adventures.',
      imageUrl: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?w=800&q=80',
      x: 55,
      y: 70,
      unlocked: true
    }
  ];

  ngOnInit(): void {
    this.animateStars();
    this.animateTitle();
    // Convert Drive URLs to direct image URLs
    this.memories = this.memories.map(memory => ({
      ...memory,
      imageUrl: memory.imageUrl ? this.driveImageService.convertDriveUrl(memory.imageUrl) : undefined
    }));
    // Audio disabled for now - add your own audio file later
    // this.audioService.loadAudio('assets/audio/ambient.mp3');
  }

  private animateStars(): void {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
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

  onStarClick(starIndex: number): void {
    // Map star clicks to memories (first 5 stars are clickable)
    if (starIndex < this.memories.length) {
      const memory = this.memories[starIndex];

      // Animate the clicked star
      const starElement = document.querySelectorAll('.star')[starIndex];
      gsap.to(starElement, {
        scale: 1.5,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });

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
