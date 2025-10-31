import { Calendar, Clock, Edit, MapPin, Trash2, Tv } from 'lucide-react';
import { Entry } from '@/types/entry';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EntryTableProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}

export const EntryTable = ({ entries, onEdit, onDelete }: EntryTableProps) => {
  return (
    <div className="w-full rounded-lg border border-border bg-card shadow-lg">
      <table className="w-full">
        <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground whitespace-nowrap">
              Poster
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground whitespace-nowrap">
              Title
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground whitespace-nowrap">
              Type
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground whitespace-nowrap">
              Director
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground whitespace-nowrap">
              Year
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground whitespace-nowrap">
              Duration
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground whitespace-nowrap">
              Location
            </th>
           
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground whitespace-nowrap">
              Budget
            </th>
           
            <th className="px-4 py-3 text-right text-sm font-semibold text-foreground whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr 
              key={entry.id} 
              className="border-b border-border transition-colors hover:bg-muted/50"
            >
              {/* Poster */}
              <td className="px-4 py-3">
                <div className="h-16 w-12 overflow-hidden rounded border border-border bg-muted flex-shrink-0">
                  {entry.posterUrl ? (
                    <img
                      src={entry.posterUrl}
                      alt={entry.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Tv className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              </td>

              {/* Title */}
              <td className="px-4 py-3">
                <div className="min-w-[200px] max-w-xs">
                  <p className="font-medium text-foreground">{entry.title}</p>
                </div>
              </td>

              {/* Type */}
              <td className="px-4 py-3">
                <Badge variant={entry.type === 'Movie' ? 'default' : 'secondary'}>
                  {entry.type}
                </Badge>
              </td>

              {/* Director */}
              <td className="px-4 py-3">
                <p className="text-sm text-muted-foreground min-w-[150px] max-w-xs">
                  {entry.director || '-'}
                </p>
              </td>

              {/* Year */}
              <td className="px-4 py-3">
                {entry.year ? (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
                    <Calendar className="h-3 w-3" />
                    <span>{entry.year}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </td>

              {/* Duration */}
              <td className="px-4 py-3">
                {entry.duration ? (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
                    <Clock className="h-3 w-3" />
                    <span>{entry.duration}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </td>

              {/* Location */}
              <td className="px-4 py-3">
                {entry.location ? (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground min-w-[120px] max-w-xs">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{entry.location}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </td>

          

              {/* Budget */}
              <td className="px-4 py-3">
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                  {entry.budget ? `${entry.budget}` : '-'}
                </p>
              </td>

            

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => onEdit(entry)}
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete(entry)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};