import { fetchItems } from '@/api/items';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Component, ComponentMetadata } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface AddComponentDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentComponentType: ComponentMetadata;
  selectComponent: (component: Component) => void;
}

export function AddComponentDialog({
  dialogOpen,
  setDialogOpen,
  currentComponentType,
  selectComponent,
}: AddComponentDialogProps) {
  const itemType = currentComponentType.technicalType;
  const { data, isLoading, error } = useQuery({
    queryKey: ['items', itemType],
    queryFn: () => fetchItems(itemType),
  });

  const itemsResult = data?.items;

  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = () => {
    if (!currentComponentType) return [];

    const options = itemsResult || [];

    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();
    return options.filter((option) => option.title.toLowerCase().includes(query));
  };

  if (isLoading || error)
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select {currentComponentType.type}</DialogTitle>
            <DialogDescription>
              Choose a {currentComponentType.type} for your build
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center">
            {isLoading && (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                <div>Loading {currentComponentType.type}s</div>
              </>
            )}
            {error && <div>{(error as Error).message}</div>}
          </div>
        </DialogContent>
      </Dialog>
    );

  if (!currentComponentType) return <></>;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="min-w-1/2">
        <DialogHeader>
          <DialogTitle>Select {currentComponentType.type}</DialogTitle>
          <DialogDescription>Choose a {currentComponentType.type} for your build</DialogDescription>
          <div className="relative mt-3">
            <input
              type="text"
              placeholder={`Search ${currentComponentType}s...`}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 py-4">
            {filteredOptions().length > 0 ? (
              filteredOptions().map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted mr-4"
                  onClick={() => selectComponent(option)}
                >
                  <div className="flex items-center gap-3">
                    {/* {option.image && <img
                    src={option.image}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />} */}
                    <span>{option.title}</span>
                  </div>
                  <span className="font-medium">
                    {`${option.standard_price} ${option.currency}`}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="text-center py-6 text-muted-foreground">
                  No components found matching "{searchQuery}"
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
