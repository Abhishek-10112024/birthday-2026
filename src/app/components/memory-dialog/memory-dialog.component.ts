import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { Memory, MediaItem } from '../../models/memory.model';
import { LightboxComponent } from '../lightbox/lightbox.component';
import { MemoryService } from '../../services/memory.service';

@Component({
  selector: 'app-memory-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    LightboxComponent
  ],
  templateUrl: './memory-dialog.component.html',
  styleUrl: './memory-dialog.component.scss'
})
export class MemoryDialogComponent implements OnInit {
  showGallery = signal<boolean>(false);
  currentMediaIndex = signal<number>(0);

  constructor(
    @Inject(MAT_DIALOG_DATA) public memory: Memory,
    private dialogRef: MatDialogRef<MemoryDialogComponent>,
    public memoryService: MemoryService
  ) {}

  ngOnInit(): void {
    this.animateContent();
  }

  private animateContent(): void {
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      const dialogImage = document.querySelector('.dialog-image');
      if (dialogImage) {
        gsap.from('.dialog-image', {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: 'back.out(1.7)'
        });
      }

      gsap.from('.dialog-title', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.out'
      });

      gsap.from('.dialog-date', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out'
      });

      gsap.from('.dialog-description', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.4,
        ease: 'power2.out'
      });
    }, 0);
  }

  close(): void {
    this.dialogRef.close();
  }

  openGallery(startIndex: number = 0): void {
    this.currentMediaIndex.set(startIndex);
    this.showGallery.set(true);
  }

  closeGallery(): void {
    this.showGallery.set(false);
  }

  onGalleryIndexChange(newIndex: number): void {
    this.currentMediaIndex.set(newIndex);
  }

  getThumbnailUrl(): string {
    // Use first media item as thumbnail, or fall back to imageUrl
    if (this.memory.media && this.memory.media.length > 0) {
      return this.memoryService.convertDriveUrl(this.memory.media[0].url);
    }
    return this.memory.imageUrl || '';
  }

  hasMedia(): boolean {
    return (this.memory.media && this.memory.media.length > 0) || !!this.memory.imageUrl;
  }

  getMediaCount(): number {
    return this.memory.media?.length || 0;
  }
}
