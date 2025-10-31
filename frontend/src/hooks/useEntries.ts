import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { entriesApi, EntryFormData } from '@/api/entries';
import { toast } from '@/hooks/use-toast';

export const useEntries = (search?: string, type?: string) => {
  return useInfiniteQuery({
    queryKey: ['entries', search, type],
    queryFn: ({ pageParam = 1 }) =>
      entriesApi.getAll({
        page: pageParam,
        limit: 10,
        search,
        type,
      }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useCreateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EntryFormData) => entriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
      toast({
        title: 'Success',
        description: 'Entry created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create entry',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EntryFormData> }) =>
      entriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
      toast({
        title: 'Success',
        description: 'Entry updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update entry',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => entriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
      toast({
        title: 'Success',
        description: 'Entry deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete entry',
        variant: 'destructive',
      });
    },
  });
};

export const useUploadPoster = () => {
  return useMutation({
    mutationFn: (file: File) => entriesApi.uploadPoster(file),
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to upload image',
        variant: 'destructive',
      });
    },
  });
};
