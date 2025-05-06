
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart, Timer } from "lucide-react";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: Product;
  onView: () => void;
}

export function ProductCard({ product, onView }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  // Calculate time remaining for special offers
  useEffect(() => {
    if (!product.specialOffer || !product.offerEndsAt) return;
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endTime = new Date(product.offerEndsAt as string);
      const timeDiff = endTime.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setTimeRemaining(null);
        return;
      }
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      }
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, [product.specialOffer, product.offerEndsAt]);

  const handleAddToCart = () => {
    addToCart(product);
    toast("Product added to cart", {
      description: "What would you like to do?",
      action: {
        label: "Checkout",
        onClick: () => navigate("/cart"),
      },
      cancel: {
        label: "Continue Shopping",
        onClick: () => {},
      },
    });
  };

  // Calculate the discounted price if there's a special offer
  const discountedPrice = product.specialOffer && product.discountPercentage 
    ? product.price - (product.price * (product.discountPercentage / 100))
    : null;

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[1/1] sm:aspect-[3/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {product.specialOffer && timeRemaining && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold">
          -{product.discountPercentage}%
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={onView}>
          <Eye className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-2 sm:p-4">
        <h3 className="font-medium text-sm sm:text-base line-clamp-1">{product.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{product.brand}</p>
        <div className="mt-1 sm:mt-2 flex gap-2 items-baseline">
          {discountedPrice !== null ? (
            <>
              <p className="font-semibold text-sm sm:text-base text-red-600">
                {discountedPrice.toFixed(2)} EGP
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground line-through">
                {product.price} EGP
              </p>
            </>
          ) : (
            <p className="font-semibold text-sm sm:text-base">
              {product.price} EGP
            </p>
          )}
        </div>
        {product.specialOffer && timeRemaining && (
          <div className="mt-1 flex items-center text-xs font-medium text-red-600">
            <Timer className="h-3 w-3 mr-1" /> {timeRemaining}
          </div>
        )}
      </div>
    </div>
  );
}
