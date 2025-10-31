import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Plus, Loader2 } from "lucide-react";
import { Entry } from "@/types/entry";
import { useEntries } from "@/hooks/useEntries";
import { Navbar } from "@/components/Navbar";
import { SearchFilterBar } from "@/components/SearchFilterBar";
import { EntryTable } from "@/components/EntryCard";
import { EntryFormModal } from "@/components/EntryFormModal";
import { DeleteModal } from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const { ref, inView } = useInView();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useEntries(
    debouncedSearch || undefined,
    type !== "all" ? type : undefined
  );

  useEffect(() => {
    console.log("inView:", inView, "hasNextPage:", hasNextPage);

    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allEntries = data?.pages.flatMap((page) => page.data) ?? [];

  const handleEdit = (entry: Entry) => {
    setSelectedEntry(entry);
    setIsFormOpen(true);
  };

  const handleDelete = (entry: Entry) => {
    setSelectedEntry(entry);
    setIsDeleteOpen(true);
  };

  const handleAddNew = () => {
    setSelectedEntry(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-6 text-3xl font-bold text-foreground">
            Your Collection
          </h2>
          <SearchFilterBar
            search={search}
            onSearchChange={setSearch}
            type={type}
            onTypeChange={setType}
          />
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-destructive">
              Failed to load entries. Please try again.
            </p>
          </div>
        ) : allEntries.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
            <p className="text-lg text-muted-foreground">
              {debouncedSearch || type !== "all"
                ? "No entries found matching your filters"
                : "Your watchlist is empty"}
            </p>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Entry
            </Button>
          </div>
        ) : (
          <>
            <EntryTable
              entries={allEntries}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* Intersection observer trigger */}
            <div ref={ref} className="mt-8 flex justify-center">
              {isFetchingNextPage && (
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              )}
            </div>
          </>
        )}
      </main>

      {/* Floating Add Button */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-[var(--shadow-glow)] transition-transform hover:scale-110"
        onClick={handleAddNew}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <EntryFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        entry={selectedEntry}
      />

      <DeleteModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        entry={selectedEntry}
      />
    </div>
  );
}
