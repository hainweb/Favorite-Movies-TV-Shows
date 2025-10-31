import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import { Entry } from '@/types/entry';
import { EntryFormData, entrySchema } from '@/api/entries';
import { useCreateEntry, useUpdateEntry, useUploadPoster } from '@/hooks/useEntries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface EntryFormModalProps {
  open: boolean;
  onClose: () => void;
  entry?: Entry | null;
}

export const EntryFormModal = ({ open, onClose, entry }: EntryFormModalProps) => {
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const createMutation = useCreateEntry();
  const updateMutation = useUpdateEntry();
  const uploadMutation = useUploadPoster();

  const form = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: '',
      type: 'Movie',
      director: '',
      budget: '',
      location: '',
      duration: '',
      year: '',
      poster: '',
    },
  });

  useEffect(() => {
    if (entry) {
      form.reset(entry);
      setPosterPreview(entry.poster || null);
    } else {
      form.reset({
        title: '',
        type: 'Movie',
        director: '',
        budget: '',
        location: '',
        duration: '',
        year: '',
        poster: '',
      });
      setPosterPreview(null);
    }
    setPosterFile(null);
  }, [entry, form, open]);

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePoster = () => {
    setPosterFile(null);
    setPosterPreview(null);
    form.setValue('poster', '');
  };

  const onSubmit = async (data: EntryFormData) => {
    try {
      let posterUrl = data.poster;

      // Upload poster if a new file is selected
      if (posterFile) {
        posterUrl = await uploadMutation.mutateAsync(posterFile);
      }

      const finalData = { ...data,  posterUrl };
      console.log('final data is',finalData);
      

      if (entry) {
        await updateMutation.mutateAsync({ id: entry.id, data: finalData });
      } else {
        await createMutation.mutateAsync(finalData);
      }

      onClose();
    } catch (error) {
      // Error handling is done in the mutation hooks
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || uploadMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{entry ? 'Edit Entry' : 'Add New Entry'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div>
                <FormLabel>Poster Image</FormLabel>
                <div className="mt-2">
                  {posterPreview ? (
                    <div className="relative inline-block">
                      <img
                        src={posterPreview}
                        alt="Poster preview"
                        className="h-48 w-32 rounded-lg border border-border object-cover"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute -right-2 -top-2 h-6 w-6"
                        onClick={removePoster}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex h-48 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors hover:bg-muted">
                      <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePosterChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Movie">Movie</SelectItem>
                        <SelectItem value="TV Show">TV Show</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="director"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Director</FormLabel>
                      <FormControl>
                        <Input placeholder="Director name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2h 30m" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $100M" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Filming location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {entry ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
