export interface MediaItem {
  url: string;              // Google Drive URL or regular URL
  type: 'image' | 'pdf';    // Media type
  caption?: string;         // Optional caption for the media
}

export interface Memory {
  id: number;
  title: string;
  date: string;
  description: string;
  media: MediaItem[];       // Array of media items (first one is thumbnail)
  audioUrl?: string;        // Optional audio file for this memory
  x: number; // Position on canvas (percentage)
  y: number; // Position on canvas (percentage)
  unlocked: boolean;
}

export interface ConstellationLine {
  from: number; // Memory ID
  to: number;   // Memory ID
}
