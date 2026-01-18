import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriveImageService {

  /**
   * Converts a Google Drive URL to a direct image URL
   * Also handles Imgur, ImgBB, and other direct image URLs
   */
  convertDriveUrl(url: string): string {
    if (!url) {
      return url;
    }

    // If it's already a direct image URL (Imgur, ImgBB, etc.), return as is
    if (this.isDirectImageUrl(url)) {
      return url;
    }

    // If it's not a Google Drive URL, return as is
    if (!url.includes('drive.google.com')) {
      return url;
    }

    // Extract file ID from various Google Drive URL formats
    let fileId = this.extractFileId(url);

    if (fileId) {
      // Note: Google Drive has CORS restrictions
      // For best results, use Imgur or ImgBB instead
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    // If we couldn't extract the file ID, return original URL
    return url;
  }

  /**
   * Checks if URL is a direct image URL (Imgur, ImgBB, etc.)
   */
  private isDirectImageUrl(url: string): boolean {
    const directImageDomains = [
      'i.imgur.com',
      'imgur.com/i/',
      'i.imgbb.com',
      'imgbb.com/i/',
      'ibb.co',
      'raw.githubusercontent.com',
      'cloudinary.com'
    ];

    return directImageDomains.some(domain => url.includes(domain)) ||
           /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  }

  /**
   * Extracts the file ID from various Google Drive URL formats
   */
  private extractFileId(url: string): string | null {
    // Format: https://drive.google.com/file/d/FILE_ID/view
    let match = url.match(/\/file\/d\/([^\/\?]+)/);
    if (match && match[1]) {
      return match[1];
    }

    // Format: https://drive.google.com/open?id=FILE_ID
    match = url.match(/[?&]id=([^&]+)/);
    if (match && match[1]) {
      return match[1];
    }

    // Format: https://drive.google.com/uc?id=FILE_ID
    match = url.match(/\/uc\?.*id=([^&]+)/);
    if (match && match[1]) {
      return match[1];
    }

    return null;
  }

  /**
   * Converts an array of image URLs (handles both Drive and regular URLs)
   */
  convertImageUrls(urls: string[]): string[] {
    return urls.map(url => this.convertDriveUrl(url));
  }
}
