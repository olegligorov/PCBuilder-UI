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
import { Loader2, Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { useCreateBuild } from '@/hooks/useCreateBuild';
import { Component, ComponentMetadata } from '@/interfaces';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { AddComponentDialog } from './AddComponentDialog';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

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

export function BuilderTable() {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component>>({});

  const isBuildButtonDisabled = Object.values(selectedComponents).length < 1;

  console.log(isBuildButtonDisabled);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentComponentType, setCurrentComponentType] = useState<ComponentMetadata | undefined>(
    undefined,
  );
  const { mutate, isPending, isError } = useCreateBuild();
  const nameRef = useRef<HTMLInputElement>(null);

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

    if (nameRef.current === null || nameRef.current.value.trim() === '') {
      toast.error('Please enter a build name');
      return;
    }

    mutate(
      {
        name: nameRef.current?.value || '',
        components: requestComponents,
      },
      {
        onSuccess: (result) => {
          toast('Build created', {
            description: (
              <span>
                Build was successfully created.{' '}
                <a
                  href={`/builds/${result.id}`}
                  className="underline text-slate-300 font-semibold "
                >
                  View build
                </a>
              </span>
            ),
          });
        },
      },
    );
  };

  return (
    <>
      <div className="w-1/4 mb-4">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-300">
          Build Name
        </label>
        <Input id="name" ref={nameRef} required />
      </div>
      <Table>
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
            <TooltipTrigger asChild>
              <span>
                {isPending ? (
                  <Button onClick={handleBuildSave} disabled={true}>
                    Creating Build...
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </Button>
                ) : (
                  <Button onClick={handleBuildSave} disabled={isBuildButtonDisabled}>
                    Save Build
                  </Button>
                )}
              </span>
            </TooltipTrigger>
            {!isPending && isBuildButtonDisabled && (
              <TooltipContent side="top">Please select all components before saving</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {isError && (
        <div className="w-fit max-w-xl">
          <Alert variant="destructive">
            <AlertTitle>Build Creation Failed</AlertTitle>
            <AlertDescription>
              The build creation failed due to an error. Please try again later or contact support.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Toaster />
    </>
  );
}
