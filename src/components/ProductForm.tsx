import { useState } from "react";
import { Product, ProductSchema } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, X, Calendar as CalendarIcon, Timer } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  onSubmit: (product: Product) => void;
}

// Common color options
const commonColors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#FF0000" },
  { name: "Green", value: "#008000" },
  { name: "Blue", value: "#0000FF" },
  { name: "Yellow", value: "#FFFF00" },
  { name: "Purple", value: "#800080" },
  { name: "Orange", value: "#FFA500" },
  { name: "Pink", value: "#FFC0CB" },
  { name: "Gray", value: "#808080" },
];

// Common size options
const commonSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size"];

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    name: "",
    brand: "",
    price: "",
    category: "",
    color: "",
    size: "",
    images: [] as string[],
    description: "",
    specialOffer: false,
    discountPercentage: "",
    offerEndsAt: "",
  });
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [offerEndDate, setOfferEndDate] = useState<Date | undefined>(undefined);

  const addColor = (colorValue: string) => {
    if (!colors.includes(colorValue)) {
      setColors([...colors, colorValue]);
    }
  };

  const removeColor = (colorToRemove: string) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };

  const addSize = (size: string) => {
    if (!sizes.includes(size)) {
      setSizes([...sizes, size]);
    }
  };

  const removeSize = (sizeToRemove: string) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  const addImageUrl = () => {
    if (imageUrl && !formData.images.includes(imageUrl)) {
      setFormData({ ...formData, images: [...formData.images, imageUrl] });
      setImageUrl("");
    }
  };

  const removeImage = (urlToRemove: string) => {
    setFormData({
      ...formData,
      images: formData.images.filter((url) => url !== urlToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.brand || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate special offer fields if special offer is enabled
    if (formData.specialOffer) {
      if (!formData.discountPercentage) {
        toast.error("Please enter a discount percentage for the special offer");
        return;
      }
      if (!offerEndDate) {
        toast.error("Please select an end date for the special offer");
        return;
      }
    }

    try {
      const product = ProductSchema.parse({
        ...formData,
        price: Number(formData.price),
        color: colors.length > 0 ? colors.join(",") : "",
        size: sizes.length > 0 ? sizes.join(",") : "",
        discountPercentage: formData.specialOffer ? Number(formData.discountPercentage) : undefined,
        offerEndsAt: formData.specialOffer && offerEndDate ? offerEndDate.toISOString() : undefined,
      });

      // Try to save via API first, but fallback to direct store update for local development
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        if (!response.ok) {
          throw new Error('API endpoint not available');
        }
      } catch (apiError) {
        console.log('API endpoint not available, using direct store update');
        // This is the fallback for local development - directly call onSubmit
      }

      // Always call onSubmit to update the store
      onSubmit(product);
      
      // Reset form
      setFormData({
        id: crypto.randomUUID(),
        name: "",
        brand: "",
        price: "",
        category: "",
        color: "",
        size: "",
        images: [],
        description: "",
        specialOffer: false,
        discountPercentage: "",
        offerEndsAt: "",
      });
      setColors([]);
      setSizes([]);
      setImageUrl("");
      setOfferEndDate(undefined);
      toast.success("Product added successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Validation error: ${error.message}`);
      } else {
        toast.error("Invalid product data");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Name *</label>
          <Input
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium">Brand *</label>
          <Input
            required
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium">Price *</label>
          <Input
            required
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium">Category *</label>
          <Input
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>
      </div>
      
      {/* Special Offer Section */}
      <div className="rounded-md border p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="special-offer"
            checked={formData.specialOffer}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, specialOffer: checked })
            }
          />
          <Label htmlFor="special-offer" className="font-medium">
            Special Offer
          </Label>
        </div>
        
        {formData.specialOffer && (
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div>
              <label className="text-sm font-medium">Discount Percentage *</label>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  max="99"
                  value={formData.discountPercentage}
                  onChange={(e) =>
                    setFormData({ ...formData, discountPercentage: e.target.value })
                  }
                  className="flex-1"
                />
                <span className="ms-2 text-lg">%</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Offer End Date *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !offerEndDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {offerEndDate ? format(offerEndDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={offerEndDate}
                    onSelect={setOfferEndDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
      
      <div>
        <label className="text-sm font-medium">Colors *</label>
        <div className="space-y-2">
          <Select onValueChange={addColor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              {commonColors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-4 w-4 rounded-full border" 
                      style={{ backgroundColor: color.value }}
                    ></div>
                    {color.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {colors.map((color, index) => {
              const colorInfo = commonColors.find(c => c.value === color) || { name: color, value: color };
              return (
                <div key={index} className="relative inline-flex items-center">
                  <div
                    className="h-8 w-8 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                  <div className="ml-2">{colorInfo.name}</div>
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Sizes *</label>
        <div className="space-y-2">
          <Select onValueChange={addSize}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              {commonSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {sizes.map((size, index) => (
              <div
                key={index}
                className="relative inline-flex items-center rounded-md border bg-background px-3 py-1"
              >
                {size}
                <button
                  type="button"
                  onClick={() => removeSize(size)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Images</label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={addImageUrl} 
              variant="outline"
              className="flex gap-1 items-center"
            >
              <PlusCircle className="h-4 w-4" />
              Add
            </Button>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {formData.images.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="aspect-square rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <Button type="submit" className="w-full">
        Add Product
      </Button>
    </form>
  );
}
