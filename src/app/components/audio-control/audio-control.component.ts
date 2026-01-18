import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-audio-control',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <button 
      mat-icon-button 
      class="audio-control-button"
      [matTooltip]="audioService.isMuted() ? 'Unmute audio' : 'Mute audio'"
      (click)="toggleMute()">
      <mat-icon>{{ audioService.isMuted() ? 'volume_off' : 'volume_up' }}</mat-icon>
    </button>
  `,
  styles: [`
    .audio-control-button {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }

      mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
    }
  `]
})
export class AudioControlComponent {
  audioService = inject(AudioService);

  toggleMute(): void {
    this.audioService.toggleMute();
  }
}
