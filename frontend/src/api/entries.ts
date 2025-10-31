import { apiClient } from '@/lib/axios';
import { Entry, PaginatedResponse } from '@/types/entry';
import { z } from 'zod';

export const entrySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  type: z.enum(['Movie', 'TV Show']),
  director: z.string().max(200).optional(),
  budget: z.string().max(100).optional(),
  location: z.string().max(200).optional(),
  duration: z.string().max(100).optional(),
  year: z.string().max(100).optional(),
  posterUrl: z.string().optional(),
});

export type EntryFormData = z.infer<typeof entrySchema>;

export const entriesApi = {
  getAll: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
  }): Promise<PaginatedResponse> => {
    const response = await apiClient.get<PaginatedResponse>('/api/entries', { params });
    
    return response.data;
  },

  create: async (data: EntryFormData): Promise<Entry> => {
    const response = await apiClient.post<{ message: string; entry: Entry }>('/api/entries', data);
    return response.data.entry;
  },

  update: async (id: string, data: Partial<EntryFormData>): Promise<Entry> => {
    const response = await apiClient.put<{ message: string; entry: Entry }>(`/api/entries/${id}`, data);
    return response.data.entry;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/entries/${id}`);
  },

  uploadPoster: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<{ url: string }>('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.url;
  },
};
