import {
  Component,
  input,
  output,
  computed,
  inject,
  effect,
  signal,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  HostListener,
  OnDestroy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MediaItem } from '../../models/memory.model';
import { MemoryService } from '../../services/memory.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-lightbox',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightboxComponent implements OnDestroy {
  private memoryService = inject(MemoryService);
  private platformId = inject(PLATFORM_ID);
  private audioService = inject(AudioService);

  // Inputs
  items = input.required<MediaItem[]>();
  currentIndex = input.required<number>();

  // Outputs
  close = output<void>();
  indexChange = output<number>();

  // Loading state
  imageLoading = signal<boolean>(true);
  
  // Video playback speed control
  isSpeedingUp = signal<boolean>(false);
  private videoElement: HTMLVideoElement | null = null;

  // Swipe gesture tracking
  private touchStartX = 0;
  private touchStartY = 0;
  private readonly SWIPE_THRESHOLD = 50; // Minimum distance for swipe

  // Current item computed
  currentItem = computed(() => {
    const index = this.currentIndex();
    const itemsList = this.items();
    return itemsList[index] || null;
  });

  constructor() {
    // Prevent body scroll when lightbox is open
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
      return undefined;
    });

    // Reset loading state when index changes
    effect(() => {
      this.currentIndex(); // Track index changes
      this.imageLoading.set(true); // Set loading to true when index changes
    });
  }

  onImageLoad(): void {
    this.imageLoading.set(false);
  }

  onImageError(): void {
    this.imageLoading.set(false);
  }

  onVideoLoaded(event: Event): void {
    this.videoElement = event.target as HTMLVideoElement;
  }

  onVideoPlay(): void {
    // Lower background music to 10% when video plays
    this.audioService.lowerVolume(0.2);
  }

  onVideoPause(): void {
    // Restore background music volume when video pauses or ends
    this.audioService.restoreVolume();
  }

  onTouchStart(event: TouchEvent): void {
    if (this.videoElement && this.currentItem()?.type === 'video') {
      event.preventDefault(); // Prevent default tap behavior on speed zones
      event.stopPropagation();
      this.isSpeedingUp.set(true);
      this.videoElement.playbackRate = 2.0;
    }
  }

  onTouchEnd(): void {
    if (this.videoElement && this.currentItem()?.type === 'video') {
      this.isSpeedingUp.set(false);
      this.videoElement.playbackRate = 1.0;
    }
  }

  // Swipe gesture handlers for navigation
  onSwipeStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  onSwipeEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        // Swipe right -> go to previous
        this.navigate(-1);
      } else {
        // Swipe left -> go to next
        this.navigate(1);
      }
    }
  }

  // Ensure body overflow is restored if the component is destroyed without close
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.handleClose();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.navigate(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.navigate(1);
        break;
    }
  }

  navigate(direction: number): void {
    const newIndex = this.currentIndex() + direction;
    if (newIndex >= 0 && newIndex < this.items().length) {
      this.indexChange.emit(newIndex);
    }
  }

  handleClose(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
    this.close.emit();
  }

  onBackdropClick(): void {
    this.handleClose();
  }

  getImageUrl(url: string): string {
    return this.memoryService.convertDriveUrl(url);
  }
}
