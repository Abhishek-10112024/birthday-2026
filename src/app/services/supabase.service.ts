import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
  }

  /**
   * Upload a file to Supabase Storage
   * @param file File to upload
   * @param bucket Storage bucket name (default: 'memories')
   * @param path Optional path within bucket
   * @returns Public URL of uploaded file
   */
  async uploadFile(
    file: File,
    bucket: string = 'memories',
    path?: string
  ): Promise<string> {
    const fileName = path || `${Date.now()}_${file.name}`;
    
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    return this.getPublicUrl(bucket, data.path);
  }

  /**
   * Get public URL for a file in storage
   * @param bucket Storage bucket name
   * @param path File path in bucket
   * @returns Public URL
   */
  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }

  /**
   * Delete a file from storage
   * @param bucket Storage bucket name
   * @param path File path to delete
   */
  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await this.supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw error;
    }
  }

  /**
   * Get all memories from database
   */
  async getMemories() {
    const { data, error } = await this.supabase
      .from('memories')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Create a new memory
   */
  async createMemory(memory: any) {
    const { data, error } = await this.supabase
      .from('memories')
      .insert([memory])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Update an existing memory
   */
  async updateMemory(id: number, updates: any) {
    const { data, error } = await this.supabase
      .from('memories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Delete a memory
   */
  async deleteMemory(id: number) {
    const { error } = await this.supabase
      .from('memories')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }

  /**
   * Get Supabase client for direct access
   */
  getClient(): SupabaseClient {
    return this.supabase;
  }
}
