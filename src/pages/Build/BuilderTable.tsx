import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, X } from "lucide-react"
import { useState } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area"

const componentOptions = {
  CPU: [
    { name: "AMD Ryzen 7 5800X", price: 299.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Intel Core i7-12700K", price: 379.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 9 5900X", price: 449.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 7 5800X", price: 299.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Intel Core i7-12700K", price: 379.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 9 5900X", price: 449.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 7 5800X", price: 299.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Intel Core i7-12700K", price: 379.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 9 5900X", price: 449.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 7 5800X", price: 299.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Intel Core i7-12700K", price: 379.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 9 5900X", price: 449.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 7 5800X", price: 299.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Intel Core i7-12700K", price: 379.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 9 5900X", price: 449.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 7 5800X", price: 299.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Intel Core i7-12700K", price: 379.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 9 5900X", price: 449.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 7 5800X", price: 299.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Intel Core i7-12700K", price: 379.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Ryzen 9 5900X", price: 449.99, image: "/placeholder.svg?height=50&width=50" },
  ],
  "CPU Cooler": [
    { name: "Corsair H100i RGB", price: 119.99 },
    { name: "NZXT Kraken X63", price: 149.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Noctua NH-D15", price: 89.99, image: "/placeholder.svg?height=50&width=50" },
  ],
  Motherboard: [
    { name: "ASUS ROG Strix B550-F", price: 179.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "MSI MPG Z690", price: 289.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Gigabyte B660 AORUS", price: 219.99, image: "/placeholder.svg?height=50&width=50" },
  ],
  Memory: [
    { name: "Corsair Vengeance 16GB DDR4", price: 79.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "G.Skill Trident Z 32GB DDR4", price: 149.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Crucial Ballistix 32GB DDR4", price: 129.99, image: "/placeholder.svg?height=50&width=50" },
  ],
  Storage: [
    { name: "Samsung 970 EVO 1TB", price: 129.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "WD Black SN850 2TB", price: 249.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Crucial P5 Plus 1TB", price: 119.99, image: "/placeholder.svg?height=50&width=50" },
  ],
  "Video Card": [
    { name: "NVIDIA RTX 3070", price: 599.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "AMD Radeon RX 6800 XT", price: 649.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "NVIDIA RTX 3080", price: 799.99, image: "/placeholder.svg?height=50&width=50" },
  ],
  Case: [
    { name: "Corsair 4000D Airflow", price: 94.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "NZXT H510", price: 89.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Lian Li O11 Dynamic", price: 149.99, image: "/placeholder.svg?height=50&width=50" },
  ],
  "Power Supply": [
    { name: "Corsair RM750x", price: 124.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "EVGA SuperNOVA 850 G5", price: 149.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Seasonic FOCUS GX-750", price: 119.99, image: "/placeholder.svg?height=50&width=50" },
  ],
  "Operating System": [
    { name: "Windows 11 Home", price: 139.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Windows 11 Pro", price: 199.99, image: "/placeholder.svg?height=50&width=50" },
    { name: "Windows 10 Home", price: 119.99, image: "/placeholder.svg?height=50&width=50" },
  ],
  Monitor: [
    { name: 'LG 27GL83A-B 27" 1440p', price: 379.99, image: "/placeholder.svg?height=50&width=50" },
    { name: 'ASUS TUF Gaming VG27AQ 27"', price: 329.99, image: "/placeholder.svg?height=50&width=50" },
    { name: 'Dell S2721DGF 27" 1440p', price: 399.99, image: "/placeholder.svg?height=50&width=50" },
  ],
}

interface Component {
  name: string;
  price: number;
  image?: string;
}

const components = [
  {
    type: "CPU",
    price: undefined,
  },
  {
    type: "CPU Cooler",
    price: undefined,
  },
  {
    type: "Motherboard",
    price: undefined,
  },
  {
    type: "Memory",
    price: undefined,
  },
  {
    type: "Storage",
    price: undefined,
  },
  {
    type: "Video Card",
    price: undefined,
  },
  {
    type: "Case",
    price: undefined,
  },
  {
    type: "Power Supply",
    price: undefined,
  },
  {
    type: "Operating System",
    price: undefined,
  },
  {
    type: "Monitor",
    price: undefined,
  },
]

interface AddComponentDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentComponentType: string;
  selectComponent: (component: Component) => void;
}

function AddComponentDialog({ dialogOpen, setDialogOpen, currentComponentType, selectComponent }: AddComponentDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOptions = () => {
    if (!currentComponentType) return [];

    const options = componentOptions[currentComponentType as keyof typeof componentOptions] || [];

    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();
    return options.filter(option => option.name.toLowerCase().includes(query))
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select {currentComponentType}</DialogTitle>
          <DialogDescription>Choose a {currentComponentType} for your build</DialogDescription>
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
                    <span>{option.name}</span>
                  </div>
                  <span className="font-medium">{option.price}</span>
                </div>
              ))
            ) : (
              <><div className="text-center py-6 text-muted-foreground">
                No components found matching "{searchQuery}"
              </div></>
            )}

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export function BuilderTable() {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component>>({ "CPU": { name: "Intel Core i7-12700K", price: 2, image: "asdf" } })
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentComponentType, setCurrentComponentType] = useState("");

  const totalSum = Object.values(selectedComponents).reduce((sum, component) => sum += component.price, 0)

  const openComponentDialog = (componentType: string) => {
    setCurrentComponentType(componentType)
    setDialogOpen(true)
  }

  const selectComponent = (component: Component) => {
    setSelectedComponents({
      ...selectedComponents,
      [currentComponentType]: component,
    })
    setDialogOpen(false)
  }

  const removeComponent = (componentType: string) => {
    const newSelectedComponents = { ...selectedComponents }
    delete newSelectedComponents[componentType];

    setSelectedComponents(newSelectedComponents);
  }

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
          {components.map((component) => (
            <TableRow key={component.type}>
              <TableCell className="font-medium">{component.type}</TableCell>
              <TableCell>
                {selectedComponents[component.type] ? (
                  <div className="flex items-center gap-2">
                    {/* TODO add image here */}
                    <span>{selectedComponents[component.type].name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeComponent(component.type)}>

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
                      onClick={() => openComponentDialog(component.type)}>
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell></TableCell>
              <TableCell align="right">
                {selectedComponents[component.type]?.price !== undefined && `$${selectedComponents[component.type]!.price}`}
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
            <TableCell className="text-right">${totalSum}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <AddComponentDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} currentComponentType={currentComponentType} selectComponent={selectComponent} />
    </>
  )
}

// scroll area
