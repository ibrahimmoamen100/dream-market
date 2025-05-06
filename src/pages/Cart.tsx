import { useStore } from "@/store/useStore";
import { ProductModal } from "@/components/ProductModal";
import { useState } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { MessageCircle, Trash2, Eye, Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Topbar } from "@/components/Topbar";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

interface DeliveryFormData {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  notes?: string;
}

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const addToCart = useStore((state) => state.addToCart);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  
  const { register, handleSubmit, formState: { errors } } = useForm<DeliveryFormData>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      notes: ""
    }
  });

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const onSubmit = (data: DeliveryFormData) => {
    const itemsMessage = cart
      .map(
        (item) =>
          `${item.product.name} (${item.quantity}x) - ${item.product.price * item.quantity} EGP`
      )
      .join("\n");
    
    const totalMessage = `\n${t("cart.total")}: ${total} EGP`;
    
    const customerInfo = `
${t("cart.fullName")}: ${data.fullName}
${t("cart.phoneNumber")}: ${data.phoneNumber}
${t("cart.address")}: ${data.address}
${t("cart.city")}: ${data.city}
${data.notes ? `${t("cart.notes")}: ${data.notes}` : ""}
    `;
    
    const encodedMessage = encodeURIComponent(itemsMessage + totalMessage + "\n\n" + customerInfo);
    window.open(`https://wa.me/201024911062?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <main className="container py-8">
        <h1 className="mb-8 text-3xl font-bold">{t("cart.title")}</h1>
        {cart.length === 0 ? (
          <p className="text-center text-muted-foreground">
            {t("cart.empty")}
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-3 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.product.brand}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-md border px-2 py-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          disabled={item.quantity <= 1}
                          onClick={() => removeFromCart(item.product.id, true)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-5 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => addToCart(item.product)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-medium">{item.product.price * item.quantity} EGP</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedProduct(item.product);
                        setModalOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="md:col-span-2">
              <div className="rounded-lg border bg-card p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">{t("cart.deliveryInfo")}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                      {t("cart.fullName")}*
                    </label>
                    <Input
                      id="fullName"
                      {...register("fullName", { required: true })}
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive mt-1">{t("cart.fieldRequired")}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                      {t("cart.phoneNumber")}*
                    </label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      {...register("phoneNumber", { required: true })}
                      className={errors.phoneNumber ? "border-destructive" : ""}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-destructive mt-1">{t("cart.fieldRequired")}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      {t("cart.address")}*
                    </label>
                    <Textarea
                      id="address"
                      {...register("address", { required: true })}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">{t("cart.fieldRequired")}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      {t("cart.city")}*
                    </label>
                    <Input
                      id="city"
                      {...register("city", { required: true })}
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive mt-1">{t("cart.fieldRequired")}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-1">
                      {t("cart.notes")}
                    </label>
                    <Textarea
                      id="notes"
                      {...register("notes")}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="mb-4 flex justify-between text-lg font-semibold">
                      <span>{t("cart.total")}</span>
                      <span>{total} EGP</span>
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {t("cart.completeOrder")}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <ProductModal
          product={selectedProduct}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </main>
    </div>
  );
};

export default Cart;
