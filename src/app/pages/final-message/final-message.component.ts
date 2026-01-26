import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { gsap } from 'gsap';
import { AudioService } from '../../services/audio.service';
import { AudioControlComponent } from '../../components/audio-control/audio-control.component';

@Component({
  selector: 'app-final-message',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, AudioControlComponent],
  templateUrl: './final-message.component.html',
  styleUrl: './final-message.component.scss'
})
export class FinalMessageComponent implements OnInit {
  audioService = inject(AudioService);
  
  // Update this URL with your photo
  photoUrl = 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/photo_2026-01-26_17-23-16.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9waG90b18yMDI2LTAxLTI2XzE3LTIzLTE2LmpwZyIsImlhdCI6MTc2OTQyODQyMSwiZXhwIjoxODAwOTY0NDIxfQ.JxTQdPamyzUfzMefMQHXWEKfhGmxqeHhY_twY90t5DA';
  photoLoading = signal(true);

  ngOnInit(): void {
    // Play a special completion sound
    this.audioService.playSoundEffect('star-click');
    this.animateContent();
    this.loadPhoto();
  }

  private loadPhoto(): void {
    const img = new Image();
    img.onload = () => {
      this.photoLoading.set(false);
    };
    img.onerror = () => {
      this.photoLoading.set(false);
      console.error('Failed to load photo');
    };
    img.src = this.photoUrl;
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

  openWhatsApp(): void {
    // Replace with your WhatsApp number (include country code without + or spaces)
    const phoneNumber = '9479308616'; // Update this with actual number
    const message = encodeURIComponent('Hi! I just finished exploring the constellation of memories. ✨');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
