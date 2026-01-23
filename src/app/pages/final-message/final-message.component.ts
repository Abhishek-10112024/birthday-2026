import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { AudioService } from '../../services/audio.service';
import { AudioControlComponent } from '../../components/audio-control/audio-control.component';

@Component({
  selector: 'app-final-message',
  imports: [CommonModule, MatButtonModule, MatIconModule, AudioControlComponent],
  templateUrl: './final-message.component.html',
  styleUrl: './final-message.component.scss'
})
export class FinalMessageComponent implements OnInit {
  audioService = inject(AudioService);

  ngOnInit(): void {
    // Play a special completion sound
    this.audioService.playSoundEffect('star-click');
    this.animateContent();
  }

  private animateContent(): void {
    // Animate constellation reveal
    gsap.from('.final-constellation', {
      opacity: 0,
      scale: 0.5,
      duration: 2,
      ease: 'power2.out'
    });

    // Animate message
    gsap.from('.final-title', {
      opacity: 0,
      y: 50,
      duration: 1.5,
      delay: 1,
      ease: 'power3.out'
    });

    gsap.from('.final-message', {
      opacity: 0,
      y: 30,
      duration: 1.5,
      delay: 1.5,
      ease: 'power3.out'
    });

    gsap.from('.final-signature', {
      opacity: 0,
      duration: 1.5,
      delay: 2,
      ease: 'power3.out'
    });

    gsap.from('.action-buttons', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 2.5,
      ease: 'power3.out'
    });

    // Animate hearts
    this.animateHearts();
  }

  private animateHearts(): void {
    const hearts = document.querySelectorAll('.floating-heart');
    hearts.forEach((heart, index) => {
      gsap.to(heart, {
        y: -100,
        opacity: 0,
        duration: 3 + Math.random() * 2,
        delay: 3 + index * 0.5,
        repeat: -1,
        ease: 'power1.out'
      });
    });
  }

  generateHearts(): number[] {
    return Array.from({ length: 20 }, (_, i) => i);
  }
}
