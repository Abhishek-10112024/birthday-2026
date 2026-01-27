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
  private touchCurrentX = 0;
  private isSwipeGesture = false;
  private readonly SWIPE_THRESHOLD = 50;
  private readonly SWIPE_VELOCITY_THRESHOLD = 0.3;
  private touchStartTime = 0;
  
  // Swipe animation state
  swipeOffset = signal<number>(0);
  isAnimating = signal<boolean>(false);

  // Current item computed
  currentItem = computed(() => {
    const index = this.currentIndex();
    const itemsList = this.items();
    return itemsList[index] || null;
  });

  // Previous and next items for smooth transition
  prevItem = computed(() => {
    const index = this.currentIndex();
    const itemsList = this.items();
    return index > 0 ? itemsList[index - 1] : null;
  });

  nextItem = computed(() => {
    const index = this.currentIndex();
    const itemsList = this.items();
    return index < itemsList.length - 1 ? itemsList[index + 1] : null;
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
    // Lower background music to ~5% when video plays (reduce by 0.25 from 0.3)
    this.audioService.lowerVolume(0.25);
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

  // Swipe gesture handlers for smooth Instagram-style navigation
  onSwipeStart(event: TouchEvent): void {
    if (this.isAnimating()) return;
    
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.touchCurrentX = this.touchStartX;
    this.touchStartTime = Date.now();
    this.isSwipeGesture = false;
  }

  onSwipeMove(event: TouchEvent): void {
    if (this.isAnimating()) return;
    
    this.touchCurrentX = event.touches[0].clientX;
    const deltaX = this.touchCurrentX - this.touchStartX;
    const deltaY = event.touches[0].clientY - this.touchStartY;
    
    // Determine if this is a horizontal swipe
    if (!this.isSwipeGesture && Math.abs(deltaX) > 10) {
      this.isSwipeGesture = Math.abs(deltaX) > Math.abs(deltaY);
    }
    
    if (this.isSwipeGesture) {
      event.preventDefault();
      
      // Apply resistance at edges
      let offset = deltaX;
      if ((deltaX > 0 && !this.prevItem()) || (deltaX < 0 && !this.nextItem())) {
        offset = deltaX * 0.3; // Resistance when no more items
      }
      
      this.swipeOffset.set(offset);
    }
  }

  onSwipeEnd(event: TouchEvent): void {
    if (this.isAnimating()) return;
    
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;
    const deltaTime = Date.now() - this.touchStartTime;
    const velocity = Math.abs(deltaX) / deltaTime;
    
    // Determine if we should navigate based on distance or velocity
    const shouldNavigate = Math.abs(deltaX) > this.SWIPE_THRESHOLD || velocity > this.SWIPE_VELOCITY_THRESHOLD;
    
    if (this.isSwipeGesture && shouldNavigate) {
      if (deltaX > 0 && this.prevItem()) {
        this.animateSwipe(1); // Animate to previous (slide right)
      } else if (deltaX < 0 && this.nextItem()) {
        this.animateSwipe(-1); // Animate to next (slide left)
      } else {
        this.animateSwipe(0); // Snap back
      }
    } else {
      this.animateSwipe(0); // Snap back
    }
    
    this.isSwipeGesture = false;
  }

  private animateSwipe(direction: number): void {
    this.isAnimating.set(true);
    
    const containerWidth = isPlatformBrowser(this.platformId) ? window.innerWidth : 400;
    const targetOffset = direction * containerWidth;
    
    // Animate to target position
    const startOffset = this.swipeOffset();
    const startTime = Date.now();
    const duration = 250; // ms
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentOffset = startOffset + (targetOffset - startOffset) * easeOut;
      
      this.swipeOffset.set(currentOffset);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        this.swipeOffset.set(0);
        this.isAnimating.set(false);
        
        if (direction !== 0) {
          this.navigate(direction > 0 ? -1 : 1);
        }
      }
    };
    
    requestAnimationFrame(animate);
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
