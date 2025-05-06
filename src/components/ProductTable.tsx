
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Timer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ProductTableProps {
  products: Product[];
  searchQuery: string;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({
  products = [], // Add default empty array
  searchQuery,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const filteredProducts = (products || []).filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTimeLeft = (endDateString: string) => {
    if (!endDateString) return null;
    
    const now = new Date();
    const endDate = new Date(endDateString);
    
    if (endDate <= now) return "Expired";
    
    return formatDistanceToNow(endDate, { addSuffix: true });
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Colors</TableHead>
            <TableHead>Special Offer</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-mono text-sm">{product.id}</TableCell>
              <TableCell>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>
                {product.specialOffer && product.discountPercentage ? (
                  <div className="flex flex-col">
                    <span className="font-bold">${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</span>
                    <span className="text-muted-foreground line-through text-xs">${product.price}</span>
                  </div>
                ) : (
                  <span>${product.price}</span>
                )}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {product.color.split(",").map((color, index) => (
                    <div
                      key={index}
                      className="h-6 w-6 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {product.specialOffer && product.discountPercentage ? (
                  <div className="flex flex-col gap-1">
                    <Badge variant="destructive" className="w-fit">
                      {product.discountPercentage}% off
                    </Badge>
                    {product.offerEndsAt && (
                      <div className="flex items-center text-xs gap-1">
                        <Timer className="h-3 w-3" />
                        <span>{calculateTimeLeft(product.offerEndsAt)}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <span>-</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
