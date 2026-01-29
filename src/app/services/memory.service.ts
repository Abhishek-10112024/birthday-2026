import { Injectable, signal } from '@angular/core';
import { Memory, ConstellationLine } from '../models/memory.model';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  private readonly STORAGE_KEY = 'constellation_unlocked_memories';

  constructor() {
    // Load unlocked state from localStorage on initialization
    this.loadUnlockedState();
  }

  // Signal-based state management
  memories = signal<Memory[]>([
    {
      id: 1,
      title: 'First Date',
      description: 'Our first date, meri pehli kiss kitni buri thi, lekin uske baad hi doosri 😍😍😍',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/first%20date.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9maXJzdCBkYXRlLmpwZyIsImlhdCI6MTc2ODc0Nzk1MiwiZXhwIjoxODMxODE5OTUyfQ.O3ZyMuILfInr1wWnNAEcESyFcRWjooI2fcb3xrkubb8',
          type: 'image',
          caption: 'If I look back and remember then meri life ka one of the best day tha'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/first%20data%20-2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9maXJzdCBkYXRhIC0yLmpwZyIsImlhdCI6MTc2ODc0ODA4OSwiZXhwIjoxODMxODIwMDg5fQ.IKsZxTjhE1VQYvRhbaP1JVasrQPsa1mBMabcbghpYss',
          type: 'image',
          caption: 'Tumhe shayad ye photo buri lage, lekin mere liye bahut achhi hai. Love your smile 😍😍😍'
        },
      ],
      x: 36,
      y: 12,
      unlocked: false
    },
    {
      id: 2,
      title: 'Dumna Adventures',
      description: 'Brownie par gaye the na Dumna? Mujhe to esa hi yaad hai',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/photo_1_2026-01-24_00-01-49.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9waG90b18xXzIwMjYtMDEtMjRfMDAtMDEtNDkuanBnIiwiaWF0IjoxNzY5MTkzMjA0LCJleHAiOjE4MzIyNjUyMDR9.qh08VyeKFIkr1dMmWf6ESsP5Rzz4rw6P4g64Fzc-P4o',
          type: 'image',
          caption: 'Kitni pyari shakal hai... 😘😘😘'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.00.45%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAwLjQ1ICgxKS5qcGVnIiwiaWF0IjoxNzY5MTkzMzE3LCJleHAiOjE4MzgzMTMzMTd9.1cuzWNGgyRMwast69G3gVQYhSLsz4wztnwF3FNRfQf4',
          type: 'image',
          caption: 'Chhoti Bhiyus 💕💕💕'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.00.45.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAwLjQ1LmpwZWciLCJpYXQiOjE3NjkxOTMzMzcsImV4cCI6MTgwMDcyOTMzN30.fxjaPawkrGaL35bCwpfwJHNWIMXvzgm_K2x_zy6T-bc',
          type: 'image',
          caption: 'Lamba lagne ki poori koshish...'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.01.04.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAxLjA0LmpwZWciLCJpYXQiOjE3NjkxOTMzNDcsImV4cCI6MTgwMDcyOTM0N30.I2-unaUCC05mqtyoxnaW12jvXUdWa2JLD2uiQVFe1VU',
          type: 'image',
          caption: 'Naak to tedi thi hi, pet pe hath rakh ke use bhi teda kar rahi'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.01.05.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAxLjA1LmpwZWciLCJpYXQiOjE3NjkxOTMzNjIsImV4cCI6MTgwMDcyOTM2Mn0.Fe_1LH-eOJzWLILk0b5hOeMv1lV9em7dXdlWkf2H9vE',
          type: 'image',
          caption: 'Zero pose and dressing sense hai mujhe 😂😂😂'
        }, {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-23%20at%2023.43.56%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTIzIGF0IDIzLjQzLjU2ICgyKS5qcGVnIiwiaWF0IjoxNzY5MTkzNDQ1LCJleHAiOjE4MDA3Mjk0NDV9.PNHY_qVAAtBW4PR_XKp1kcY-ACwJLmh3Ig-3nIiJnlo',
          type: 'image',
          caption: 'Cute couple 💕'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.34.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjM0LmpwZWciLCJpYXQiOjE3NjkxOTM5OTYsImV4cCI6MTgwMDcyOTk5Nn0.Ijw6jqxjeLv0RR5V_2qKa3lv8O8u5wDOiNZxlSG0Ut0',
          type: 'image',
          caption: 'Dancer bhiyus'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.33%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjMzICgyKS5qcGVnIiwiaWF0IjoxNzY5MTk0MTM3LCJleHAiOjE4MDA3MzAxMzd9.E6bGG5XInAQXkV4ZKipGl-fd4lGz8XQpDiu6rRl9n60',
          type: 'image',
          caption: '₹700/- ki dress ka show off karte hui stree'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.32.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjMyLmpwZWciLCJpYXQiOjE3NjkxOTQyNDQsImV4cCI6MTgwMDczMDI0NH0.AmU3sTNVXoHEu_DXRYuTWeL3qW_Sv-B5vfMz6N1EM6M',
          type: 'image',
          caption: 'Ek photo bina chashme ke bhi'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.32%20(3).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjMyICgzKS5qcGVnIiwiaWF0IjoxNzY5MTk0MjgzLCJleHAiOjE4MDA3MzAyODN9.vO25aWAAfCdoEyfWyCbbj3Je54wPsbkiZoNNa3BUKEU',
          type: 'image',
          caption: 'Haaye sundarta, jungle ke janwar bhi dekh ke sharma jaaye 🙈🙈🙈'
        }
      ],

      x: 53,
      y: 5,
      unlocked: false
    },
    {
      id: 3,
      title: 'A Random Day',
      description: 'Esi random photos dekh ke samjh aa raha hai ki photos kyu delete nahi karti thi tum',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.00.06%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAwLjA2ICgxKS5qcGVnIiwiaWF0IjoxNzY5MTk0OTkyLCJleHAiOjE4MDA3MzA5OTJ9.DyAFZm9BD2ix8IwRzjnFqP6WDBG7ucjAksPCDQCkRn0',
          type: 'image',
          caption: 'Esi jeev abhi bhi bahar nikalta hu, aur ab to pehle se bhi jyada, tum hi theek kar sakti ho ye aadat ab'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.00.06%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAwLjA2ICgyKS5qcGVnIiwiaWF0IjoxNzY5MTk1MTUzLCJleHAiOjE4MDA3MzExNTN9.Uu9NpprB0mARSY3FM4IqJCc66R0uDMjPdNFpZkEScc8',
          type: 'image',
          caption: 'No Comments 🤤🤤🤤'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.00.06.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAwLjA2LmpwZWciLCJpYXQiOjE3NjkxOTUyMTgsImV4cCI6MTgwMDczMTIxOH0.yE6pjXHIxrBpzzCVDGFOQCITrM8wPnlaVZ4aCtUtcg8',
          type: 'image',
          caption: 'Strong Bhiyus 💪🏻💪🏻💪🏻'
        }
      ],
      x: 67,
      y: 8,

      unlocked: false
    },
    {
      id: 4,
      title: 'Kuchh cringe bhi to chahiye',
      description: 'Wonderful dance',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/photo_1_2026-01-26_15-40-52.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9waG90b18xXzIwMjYtMDEtMjZfMTUtNDAtNTIuanBnIiwiaWF0IjoxNzY5NDIyMzc0LCJleHAiOjE4MDA5NTgzNzR9.ui8NzWfefaGKlY41TSrQn-Oq0Xn5NzlElDawdvtBdvE',
          type: 'image',
          caption: 'Art and culture'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/video_2026-01-26_15-40-34.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy92aWRlb18yMDI2LTAxLTI2XzE1LTQwLTM0Lm1wNCIsImlhdCI6MTc2OTQyMjQ0NiwiZXhwIjoxODAwOTU4NDQ2fQ.c5KIeFOGboSs8fEsRZAQcA2SagDHPgKN-WlIHHq8RBQ',
          type: 'video',
          caption: 'Beauty everywhere'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/video_2026-01-26_15-40-34.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy92aWRlb18yMDI2LTAxLTI2XzE1LTQwLTM0Lm1wNCIsImlhdCI6MTc2OTQyMjQ0NiwiZXhwIjoxODAwOTU4NDQ2fQ.c5KIeFOGboSs8fEsRZAQcA2SagDHPgKN-WlIHHq8RBQ',
          type: 'video',
          caption: 'Beauty everywhere'
        }
      ],
      x: 68,
      y: 23,

      unlocked: false
    },
    {
      id: 5,
      title: 'Our Birthday Together',
      description: 'Thank you iss special birthday ke liye',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-23%20at%2023.43.55.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTIzIGF0IDIzLjQzLjU1LmpwZWciLCJpYXQiOjE3NjkyMzQyODgsImV4cCI6MTgwMDc3MDI4OH0.0lla7Kw0THBHsmob5yaKcyspDYlNmbeezD__mR74PUE',
          type: 'image',
          caption: 'I wish ki esi closeness ham waapas se laa sake 🥺'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.01.33.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAxLjMzLmpwZWciLCJpYXQiOjE3NjkyMzQ0OTQsImV4cCI6MTgwMDc3MDQ5NH0.xSjaOg3OICkah7TD-W86daCNKE8MOt0LymLU98rWCLg',
          type: 'image',
          caption: 'Pata nahi kiski nazar lag gayi hame 😭'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.01.33%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAxLjMzICgxKS5qcGVnIiwiaWF0IjoxNzY5MjM0NTQzLCJleHAiOjE4MDA3NzA1NDN9.gLok3sjMO9XSnGkQ4KOKq87CJg_5f_6rIRDPbnek7fA',
          type: 'image',
          caption: 'We deserve one more chance'
        }
      ],
      x: 68,
      y: 43,

      unlocked: false
    },
    {
      id: 6,
      title: 'CRY BABY',
      description: 'I understand ki kitne lucky ho tum agar tumhara partner tumhare pass ro raha hai to',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2023.00.07.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIzLjAwLjA3LmpwZWciLCJpYXQiOjE3NjkyMzQ3MDksImV4cCI6MTgwMDc3MDcwOX0.4eA_wMdLtM_fW_XpLGqd7hewrs_LWhXspg3GMLAqvaU',
          type: 'image',
          caption: 'I miss these moments... 🥺'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2011.41.06.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDExLjQxLjA2LmpwZWciLCJpYXQiOjE3NjkyMzUxMTEsImV4cCI6MTgwMDc3MTExMX0.FqGTy4ofk4pPmXh1nh4eg4QLRoQ3p9_FbZ38GvutlKU',
          type: 'image',
          caption: 'Abse ye red wala baau nahi, bhiyus hai'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Video%202026-01-24%20at%2014.10.32.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBWaWRlbyAyMDI2LTAxLTI0IGF0IDE0LjEwLjMyLm1wNCIsImlhdCI6MTc2OTI0NTU4MiwiZXhwIjoxODAwNzgxNTgyfQ.V5MUnDVFOP2SYf4V1x9f1FjjEA-HaMyKWEiv9oyjnGk',
          type: 'video',
          caption: '🤣🤣🤣🤣🤣🤣🤣'
        }
      ],
      x: 55,
      y: 34,


      unlocked: false
    },
    {
      id: 7,
      title: 'Bahut Mehga hotel in Jabalpur',
      description: 'Yaad to hoga hi tumhe, Shivom le gaya tha kitni mehgi jagah, mere poore pese khatam ho gaye the 😖😖😖',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/photo_10_2026-01-26_14-10-40.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9waG90b18xMF8yMDI2LTAxLTI2XzE0LTEwLTQwLmpwZyIsImlhdCI6MTc2OTQxODMzNywiZXhwIjoxODAwOTU0MzM3fQ.YOpynOjcUNvs_s6SXtRANk4JiEgFElbGuMPyOwCvUh8',
          type: 'image',
          caption: 'Need you to look at me again this way, and I promise iss baar me bhi apni emotional side explore kar saku tumhare sath'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/photo_13_2026-01-26_14-10-40.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9waG90b18xM18yMDI2LTAxLTI2XzE0LTEwLTQwLmpwZyIsImlhdCI6MTc2OTQxODU5MiwiZXhwIjoxODAwOTU0NTkyfQ.5ufS3Ra80pKYcTw1GOKVMM3m4Sj1RHYj3ujLIt98gjU',
          type: 'image',
          caption: '❣️🖤❣️🖤❣️🖤❣️'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/photo_9_2026-01-26_14-10-40.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9waG90b185XzIwMjYtMDEtMjZfMTQtMTAtNDAuanBnIiwiaWF0IjoxNzY5NDE4NjUzLCJleHAiOjE4MDA5NTQ2NTN9.zSi6ZJacjuDVIDGNO0OX6EnTVc9dD5Mf3a93HrzCBxI',
          type: 'image',
          caption: 'Everything about us is not perfect, lekin me use accept karne ready hu aur taiyar hu dheere dheere perfect banane'
        }
      ],
      x: 56,
      y: 46,



      unlocked: false
    },
    {
      id: 8,
      title: 'Stargazing Night',
      date: 'July 2024',
      description: 'Lying under the stars, and Dwivedi ki chhat',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-21%20at%2010.26.04.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTIxIGF0IDEwLjI2LjA0LmpwZWciLCJpYXQiOjE3Njk0MTg5NDMsImV4cCI6MTgwMDk1NDk0M30.Ji1BR2CzTX026R_z8n6j3ktrEr4s6uIqKceRhy2Akfs',
          type: 'image',
          caption: 'Model Poornima'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-26%20at%2014.43.15.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI2IGF0IDE0LjQzLjE1LmpwZWciLCJpYXQiOjE3Njk0MTg5OTgsImV4cCI6MTgwMDk1NDk5OH0.G1AONCnbdvh0DTWlIrfvok57lURbJWCApC01JQAc4Hw',
          type: 'image',
          caption: 'I miss us so much 🥺🥺🥺🥺'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2011.39.42.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDExLjM5LjQyLmpwZWciLCJpYXQiOjE3Njk0MTkwNjIsImV4cCI6MTgwMDk1NTA2Mn0.4L-kErJg_RTuBgftzQ2lvyL7eP0E_kiLpdUP_Z-gtvY',
          type: 'image',
          caption: 'Raat ko bhiyus akele ghar se bhagte hue pakdi gayi'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-18%20at%2022.59.04.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTE4IGF0IDIyLjU5LjA0LmpwZWciLCJpYXQiOjE3Njk0MjA3NDEsImV4cCI6MTgwMDk1Njc0MX0.n_hZ1ZohXlTbyb_lLbcNLQOwkAizrIbmrzZqTKIQP30',
          type: 'image',
          caption: 'Tumne kaha tha achhi nahi lag rahi photo, lekin mujhe to kaafi pasand hai'
        }
      ],
      x: 78,
      y: 55,
      unlocked: false
    },
    {
      id: 9,
      title: 'Memories captured together',
      description: 'Har photo lagate hue yahi lag raha ki we should be have clicked more photos together 😔',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.31%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjMxICgyKS5qcGVnIiwiaWF0IjoxNzY5NDE5MzIxLCJleHAiOjE4MDA5NTUzMjF9.QM1GN9r-6WDfKAzcKybWlxF-UPqd9xhcoQJb2olF4PI',
          type: 'image',
          caption: '❣️🖤❣️🖤❣️🖤❣️'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.29.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjI5LmpwZWciLCJpYXQiOjE3Njk0MTkzNTEsImV4cCI6MTgwMDk1NTM1MX0.5rAlWuR-Axh_sQ9iBMvTLYpFizpLgerdUU5erdpmoSQ',
          type: 'image',
          caption: 'Smiles and togetherness ❣️🖤❣️🖤❣️🖤❣️'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.28.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjI4LmpwZWciLCJpYXQiOjE3Njk0MTk0MjAsImV4cCI6MTgwMDk1NTQyMH0.H94iE-5pEyZZaRzbKoqvm735eS-ierfgQEV750HvpGE',
          type: 'image',
          caption: 'Cuteness at its peak ❣️🖤❣️🖤❣️🖤❣️'
        }
      ],
      x: 65,
      y: 96,
      unlocked: false
    },
    {
      id: 10,
      title: 'Met after a long time',
      description: 'Pune se aake kitne time baad mile the apan 🥺',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.24%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjI0ICgyKS5qcGVnIiwiaWF0IjoxNzY5NDIwMDEyLCJleHAiOjE4MDA5NTYwMTJ9.ZVj1fRX3fQkBqS6lWXy3tOVJ6GQNx1AetaC3yY_bs-w',
          type: 'image',
          caption: 'Tumhare lambe baal kaafi achhe lagte hain 😘'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.23.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjIzLmpwZWciLCJpYXQiOjE3Njk0MjAwNTQsImV4cCI6MTgwMDk1NjA1NH0.qcIQBlY2jMHRKb73WjINSXJhuXj6Ax3DWFxbbuyH9MU',
          type: 'image',
          caption: 'Ye ghadi mere pass hai, aur sach kaha tumne, ye nahi lag rahi tumhare hath par achhi 🤣'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.22.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjIyLmpwZWciLCJpYXQiOjE3Njk0MjAxNTEsImV4cCI6MTgwMDk1NjE1MX0.7eB-Xq9j_cjA-yx0Sg2AKVVxAZrOV8FCWm2cwy7TQYY',
          type: 'image',
          caption: 'Ye kabki photo hai wo tum hi bata sakti ho, mujhe to yaad bhi nahi hai, but mujhe ye din waapas chahiye'
        },
      ],
      x: 35,
      y: 96,
      unlocked: false
    },
    {
      id: 11,
      title: 'Photo obsessed cutie',
      description: 'Farq nahi padta ki filter wali photo hai ya unfilter, yahi photos hai mere pass tumhari yaad ke liye',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.22%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjIyICgyKS5qcGVnIiwiaWF0IjoxNzY5NDIwMjc1LCJleHAiOjE4MDA5NTYyNzV9.Y6iB7GF60W8QOiFgqsLqsojluXzasinyXtoAhGrhiKg',
          type: 'image',
          caption: '❣️'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.22%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjIyICgxKS5qcGVnIiwiaWF0IjoxNzY5NDIwMjk0LCJleHAiOjE4MDA5NTYyOTR9.0Un7Wo68dSRRUn1Fwdu_2rA2Qlw18dz7huYDUr8ngIE',
          type: 'image',
          caption: '🖤'
        }
      ],
      x: 25,
      y: 54,
      unlocked: false
    },
    {
      id: 12,
      title: 'Black Couple (BLK)',
      description: 'Ham dono hi black me achhe lagte hain!!!',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-23%20at%2023.43.56%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTIzIGF0IDIzLjQzLjU2ICgxKS5qcGVnIiwiaWF0IjoxNzY5NDIwMzUyLCJleHAiOjE4MDA5NTYzNTJ9.LsOnhl0o5puI64vGfnz_kuI-Cl7urxBiNb7oVoeNqOI',
          type: 'image',
          caption: 'Lost in blackness together'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.25.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjI1LmpwZWciLCJpYXQiOjE3Njk0MjA1MTIsImV4cCI6MTgwMDk1NjUxMn0.rxY01YdjitB71n180g676eS5DhJ5kzOUii5Qtt3ZQYQ',
          type: 'image',
          caption: 'Finding treasures 🤤'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-24%20at%2000.14.24.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTI0IGF0IDAwLjE0LjI0LmpwZWciLCJpYXQiOjE3Njk0MjE3MDEsImV4cCI6MTgwMDk1NzcwMX0.WV60Z-cGHRyYHHH6knb9mWNjmqWgkDPOruyZHcQ5xrU',
          type: 'image',
          caption: 'Found treasures 🤤'
        }
      ],
      x: 45,
      y: 46,
      unlocked: false
    },
    {
      id: 13,
      title: 'Movie night',
      description: 'Packed with winter specials in the chilly night',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/photo_2_2026-01-24_00-01-49.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9waG90b18yXzIwMjYtMDEtMjRfMDAtMDEtNDkuanBnIiwiaWF0IjoxNzY5NDIxMDU1LCJleHAiOjE4MDA5NTcwNTV9.MnEDX8_YYLucT4NZ0gOzjPRHWJnmRdI9QkLQfutAH1Q',
          type: 'image',
          caption: 'Holiday magic'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-23%20at%2023.43.54%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTIzIGF0IDIzLjQzLjU0ICgxKS5qcGVnIiwiaWF0IjoxNzY5NDIxNDk4LCJleHAiOjE4MDA5NTc0OTh9.6gJHwIlls4--DZ-Q7ZqBC1gcMk4CxnlVSkxW3qR0WzM',
          type: 'image',
          caption: 'Lights and wonder'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-23%20at%2023.43.55%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTIzIGF0IDIzLjQzLjU1ICgxKS5qcGVnIiwiaWF0IjoxNzY5NDIxNjM3LCJleHAiOjE4MDA5NTc2Mzd9.zMeGZDcZZbrvG_YeboVCe8B49Q7j3RN32h6Z5Yv3HEM',
          type: 'image',
          caption: 'I want you to look at me the way you are looking at camera with hope and love'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-23%20at%2023.43.54.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTIzIGF0IDIzLjQzLjU0LmpwZWciLCJpYXQiOjE3Njk0MjE1ODMsImV4cCI6MTgwMDk1NzU4M30.5PP2SGg9YH5LZodCa35E-oXvWISKkRyMLjywhvl73WI',
          type: 'image',
          caption: 'Hamari model movie dekhne chali'
        }
      ],
      x: 44,
      y: 34,
      unlocked: false
    },
    {
      id: 14,
      title: 'Ride together',
      description: 'Honestly mujhe ye bhi yaad nahi kabki hai',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-23%20at%2023.43.52.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTIzIGF0IDIzLjQzLjUyLmpwZWciLCJpYXQiOjE3Njk0MjE4MDQsImV4cCI6MTgwMDk1NzgwNH0.2S0oynFjr8bnK9owlUb2zfgHH891Tm8h__oQnFF2_KQ',
          type: 'image',
          caption: 'Mujhe hamari rides yaad hai sath wali, tumhe rukna jyada pasand tha, aur mujhe chalana, but wo realisation hi kya jo samay par ho jaye'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/WhatsApp%20Image%202026-01-23%20at%2023.43.53%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9XaGF0c0FwcCBJbWFnZSAyMDI2LTAxLTIzIGF0IDIzLjQzLjUzICgxKS5qcGVnIiwiaWF0IjoxNzY5NDIxODkzLCJleHAiOjE4MDA5NTc4OTN9.yE9BblQrscjSHfK--g-zaIAqYGdpFnwtX1D3N6JbRUk',
          type: 'image',
          caption: 'Cute ❤️'
        }
      ],
      x: 35,
      y: 36,
      unlocked: false
    },

    {
      id: 15,
      title: '😍😍😍😍',
      description: 'Every day with you is a new adventure. Here is to all the memories we had',
      media: [
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/photo_2026-01-26_15-50-51.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy9waG90b18yMDI2LTAxLTI2XzE1LTUwLTUxLmpwZyIsImlhdCI6MTc2OTQyMjkxMiwiZXhwIjoxODAwOTU4OTEyfQ.QgDs-bsdtjoZNH7sjTcFyB3kfqFq4YxUXhGjslcdr5k',
          type: 'image',
          caption: '☺️'
        },
        {
          url: 'https://lcoggykjjrgyiwxcjksc.supabase.co/storage/v1/object/sign/memories/video_2026-01-26_15-40-36.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYzRmMjZlMy03ZDkxLTRiNmItOTNjYy1iMDVjOGMxYTFhMDgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZW1vcmllcy92aWRlb18yMDI2LTAxLTI2XzE1LTQwLTM2Lm1wNCIsImlhdCI6MTc2OTQyMjU3NSwiZXhwIjoxODAwOTU4NTc1fQ.QSOKS6qg3axftj_-Bg6gNFFBA3TjDpJabvQPzv_YwiM',
          type: 'video',
          caption: 'Yaha tak aagye ho to gusse me phone to nahi feka hoga, isliye ek aur bold move'
        }
      ],
      x: 33,
      y: 28,
      unlocked: false
    }
  ]);

  // Sequential constellation lines: 1→2→3→4→...→15→1 (closed loop)
  constellationLines = signal<ConstellationLine[]>([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 6, to: 7 },
    { from: 7, to: 8 },
    { from: 8, to: 9 },
    { from: 9, to: 10 },
    { from: 10, to: 11 },
    { from: 11, to: 12 },
    { from: 12, to: 13 },
    { from: 13, to: 14 },
    { from: 14, to: 15 },
    { from: 15, to: 1 }
  ]);

  unlockedCount = signal<number>(0); // Start with 0 unlocked

  // Load unlocked state from localStorage
  private loadUnlockedState(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const unlockedIds: number[] = JSON.parse(stored);
        this.memories.update(memories =>
          memories.map(m => ({
            ...m,
            unlocked: unlockedIds.includes(m.id)
          }))
        );
        this.unlockedCount.set(unlockedIds.length);
      }
    } catch (error) {
      console.error('Error loading unlocked state from localStorage:', error);
    }
  }

  // Save unlocked state to localStorage
  private saveUnlockedState(): void {
    try {
      const unlockedIds = this.memories()
        .filter(m => m.unlocked)
        .map(m => m.id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(unlockedIds));
    } catch (error) {
      console.error('Error saving unlocked state to localStorage:', error);
    }
  }

  unlockMemory(id: number): void {
    const memory = this.memories().find(m => m.id === id);
    // Only unlock if not already unlocked AND if it can be unlocked (sequential order)
    if (memory && !memory.unlocked && this.canUnlockMemory(id)) {
      this.memories.update(memories =>
        memories.map(m => m.id === id ? { ...m, unlocked: true } : m)
      );
      this.unlockedCount.update(count => count + 1);
      this.saveUnlockedState(); // Save to localStorage
      return;
    }
  }

  // Check if a memory can be unlocked (sequential order)
  canUnlockMemory(id: number): boolean {
    // Memory 1 can always be unlocked
    if (id === 1) return true;

    // For other memories, check if the previous memory is unlocked
    const previousMemory = this.memories().find(m => m.id === id - 1);
    return previousMemory?.unlocked === true;
  }

  getMemoryById(id: number): Memory | undefined {
    return this.memories().find(m => m.id === id);
  }

  areAllMemoriesUnlocked(): boolean {
    return this.memories().every(m => m.unlocked);
  }

  // Get the actual count of unlocked memories
  getUnlockedCount(): number {
    return this.memories().filter(m => m.unlocked).length;
  }

  // Helper method to convert Google Drive sharing URL to direct image URL
  convertDriveUrl(url: string): string {
    // Convert Google Drive sharing URL to direct link format
    // Example: https://drive.google.com/file/d/FILE_ID/view
    // Convert to: https://drive.google.com/thumbnail?id=FILE_ID&sz=s4000
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=s4000`;
    }
    return url;
  }
}
