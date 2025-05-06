import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { Button } from "./ui/button";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({
  product,
  open,
  onOpenChange,
}: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  // Calculate time remaining for special offers
  useEffect(() => {
    if (!product || !product.specialOffer || !product.offerEndsAt) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const endTime = new Date(product.offerEndsAt as string);
      const timeDiff = endTime.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeRemaining(null);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [product]);

  if (!product) return null;

  // Calculate the discounted price if there's a special offer
  const discountedPrice =
    product.specialOffer && product.discountPercentage
      ? product.price - product.price * (product.discountPercentage / 100)
      : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="aspect-[3/4] w-full rounded-lg object-cover cursor-pointer shadow-md hover:shadow-lg transition-all"
              onClick={() => setSelectedImage(null)}
            />
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={`${product.name} ${i + 1}`}
                  className={`aspect-square rounded-md object-cover cursor-pointer transition-all ${
                    selectedImage === image
                      ? "ring-2 ring-primary"
                      : "hover:ring-1 hover:ring-primary/50"
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-muted-foreground">{product.brand}</p>
            </div>

            {/* Price with special offer if available */}
            <div>
              {product.specialOffer && discountedPrice !== null ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold text-red-600">
                      {discountedPrice.toLocaleString()} EGP
                    </p>
                    <span className="rounded-md bg-red-600 text-white px-2 py-0.5 text-sm">
                      -{product.discountPercentage}%
                    </span>
                  </div>
                  <p className="text-muted-foreground line-through">
                    {product.price.toLocaleString()} EGP
                  </p>

                  {/* Countdown timer */}
                  {timeRemaining && (
                    <div className="mt-2 flex items-center text-sm font-medium text-red-600 bg-red-50 rounded-md p-2">
                      <Timer className="h-4 w-4 mr-2" />
                      <span>Offer ends in: {timeRemaining}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xl font-semibold">
                  {product.price.toLocaleString()} EGP
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="min-w-20 text-sm font-medium">Size:</span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-sm">
                  {product.size}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-20 text-sm font-medium">Color:</span>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-sm">
                    {product.color}
                  </span>
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: product.color.toLowerCase() }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-20 text-sm font-medium">Category:</span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-sm">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="rounded-md bg-secondary/50 p-3">
              <p className="text-sm whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
