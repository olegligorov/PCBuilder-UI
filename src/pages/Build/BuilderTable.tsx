import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { fetchItems } from '@/api/items';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCreateBuild } from '@/hooks/useCreateBuild';
import { Component } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@radix-ui/react-tooltip';

// const componentOptions = {
//   CPU: [
//     { name: 'AMD Ryzen 7 5800X', price: 299.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Intel Core i7-12700K', price: 379.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 9 5900X', price: 449.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 7 5800X', price: 299.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Intel Core i7-12700K', price: 379.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 9 5900X', price: 449.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 7 5800X', price: 299.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Intel Core i7-12700K', price: 379.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 9 5900X', price: 449.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 7 5800X', price: 299.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Intel Core i7-12700K', price: 379.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 9 5900X', price: 449.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 7 5800X', price: 299.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Intel Core i7-12700K', price: 379.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 9 5900X', price: 449.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 7 5800X', price: 299.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Intel Core i7-12700K', price: 379.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 9 5900X', price: 449.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 7 5800X', price: 299.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Intel Core i7-12700K', price: 379.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Ryzen 9 5900X', price: 449.99, image: '/placeholder.svg?height=50&width=50' },
//   ],
//   'CPU Cooler': [
//     { name: 'Corsair H100i RGB', price: 119.99 },
//     { name: 'NZXT Kraken X63', price: 149.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Noctua NH-D15', price: 89.99, image: '/placeholder.svg?height=50&width=50' },
//   ],
//   Motherboard: [
//     { name: 'ASUS ROG Strix B550-F', price: 179.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'MSI MPG Z690', price: 289.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Gigabyte B660 AORUS', price: 219.99, image: '/placeholder.svg?height=50&width=50' },
//   ],
//   Memory: [
//     {
//       name: 'Corsair Vengeance 16GB DDR4',
//       price: 79.99,
//       image: '/placeholder.svg?height=50&width=50',
//     },
//     {
//       name: 'G.Skill Trident Z 32GB DDR4',
//       price: 149.99,
//       image: '/placeholder.svg?height=50&width=50',
//     },
//     {
//       name: 'Crucial Ballistix 32GB DDR4',
//       price: 129.99,
//       image: '/placeholder.svg?height=50&width=50',
//     },
//   ],
//   Storage: [
//     { name: 'Samsung 970 EVO 1TB', price: 129.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'WD Black SN850 2TB', price: 249.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Crucial P5 Plus 1TB', price: 119.99, image: '/placeholder.svg?height=50&width=50' },
//   ],
//   'Video Card': [
//     { name: 'NVIDIA RTX 3070', price: 599.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'AMD Radeon RX 6800 XT', price: 649.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'NVIDIA RTX 3080', price: 799.99, image: '/placeholder.svg?height=50&width=50' },
//   ],
//   Case: [
//     { name: 'Corsair 4000D Airflow', price: 94.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'NZXT H510', price: 89.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Lian Li O11 Dynamic', price: 149.99, image: '/placeholder.svg?height=50&width=50' },
//   ],
//   'Power Supply': [
//     { name: 'Corsair RM750x', price: 124.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'EVGA SuperNOVA 850 G5', price: 149.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Seasonic FOCUS GX-750', price: 119.99, image: '/placeholder.svg?height=50&width=50' },
//   ],
//   'Operating System': [
//     { name: 'Windows 11 Home', price: 139.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Windows 11 Pro', price: 199.99, image: '/placeholder.svg?height=50&width=50' },
//     { name: 'Windows 10 Home', price: 119.99, image: '/placeholder.svg?height=50&width=50' },
//   ],
//   Monitor: [
//     { name: 'LG 27GL83A-B 27" 1440p', price: 379.99, image: '/placeholder.svg?height=50&width=50' },
//     {
//       name: 'ASUS TUF Gaming VG27AQ 27"',
//       price: 329.99,
//       image: '/placeholder.svg?height=50&width=50',
//     },
//     {
//       name: 'Dell S2721DGF 27" 1440p',
//       price: 399.99,
//       image: '/placeholder.svg?height=50&width=50',
//     },
//   ],
// };

// interface Component {
//   name: string;
//   price: number;
//   image?: string;
// }

interface ComponentMetadata {
  type: string;
  technicalType: string;
}

const componentsMetadata: ComponentMetadata[] = [
  {
    type: 'CPU',
    technicalType: 'cpus',
  },
  // {
  //   type: 'CPU Cooler',
  //   technicalType: 'cpu_coolers',
  // },
  {
    type: 'Graphics Card',
    technicalType: 'gpus',
  },
  {
    type: 'Motherboard',
    technicalType: 'motherboards',
  },
  {
    type: 'RAM Memory',
    technicalType: 'ram',
  },
  {
    type: 'HDD Storage',
    technicalType: 'hdd',
  },
  {
    type: 'SSD Storage',
    technicalType: 'ssd',
  },
  // {
  //   type: 'Case',
  //   technicalType: 'case',
  // },
  {
    type: 'Power Supply',
    technicalType: 'power_supply',
  },
  // {
  //   type: 'Operating System',
  //   technicalType: 'os',
  // },
  // {
  //   type: 'Monitor',
  //   technicalType: 'monitor',
  // },
];

interface AddComponentDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentComponentType: ComponentMetadata;
  selectComponent: (component: Component) => void;
}

function AddComponentDialog({
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

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
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted"
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

export function BuilderTable() {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component>>({});

  const isBuildButtonDisabled = Object.values(selectedComponents).length < 7;

  console.log(isBuildButtonDisabled);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentComponentType, setCurrentComponentType] = useState<ComponentMetadata | undefined>(
    undefined,
  );
  const { mutate } = useCreateBuild();
  // const { mutate, isPending, isError } = useCreateBuild();

  const totalSum = Object.values(selectedComponents).reduce(
    (sum, component) => (sum += Number(component.standard_price)),
    0,
  );

  const openComponentDialog = (componentMetadata: ComponentMetadata) => {
    setCurrentComponentType(componentMetadata);
    setDialogOpen(true);
  };

  const selectComponent = (component: Component) => {
    if (currentComponentType) {
      setSelectedComponents({
        ...selectedComponents,
        [currentComponentType.type]: component,
      });
    }
    setDialogOpen(false);
  };

  const removeComponent = (componentType: string) => {
    const newSelectedComponents = { ...selectedComponents };
    delete newSelectedComponents[componentType];

    setSelectedComponents(newSelectedComponents);
  };

  const handleBuildSave = () => {
    const requestComponents = Object.fromEntries(
      Object.values(selectedComponents).map((component) => [component.type, component._id]),
    );

    mutate({
      name: 'FirstNameTest',
      components: requestComponents,
    });
  };

  return (
    <>
      <Table>
        {/* <TableCaption>List of your components</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Component</TableHead>
            <TableHead>Selection</TableHead>
            <TableHead>Store</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {componentsMetadata.map((component) => (
            <TableRow key={component.type}>
              <TableCell className="font-medium">{component.type}</TableCell>
              <TableCell className="h-14">
                {selectedComponents[component.type] ? (
                  <div className="flex items-center gap-2">
                    {/* TODO add image here */}
                    <span>{selectedComponents[component.type].title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeComponent(component.type)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove {component.type}</span>
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => openComponentDialog(component)}
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>{selectedComponents[component.type]?.source}</TableCell>
              <TableCell align="right">
                {selectedComponents[component.type]?.standard_price !== undefined &&
                  `${selectedComponents[component.type]!.standard_price} ден.`}
              </TableCell>
              {/* <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            {/* calculate total */}
            <TableCell className="text-right">{totalSum} ден.</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {currentComponentType && dialogOpen && (
        <AddComponentDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          currentComponentType={currentComponentType}
          selectComponent={selectComponent}
        />
      )}

      <div className="w-full flex justify-end my-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button onClick={handleBuildSave} disabled={isBuildButtonDisabled}>
                Save Build
              </Button>
            </TooltipTrigger>
            {isBuildButtonDisabled && (
              <TooltipContent side="top">Please select all components before saving</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}

// scroll area
