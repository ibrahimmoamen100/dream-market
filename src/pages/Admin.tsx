
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Product } from "@/types/product";
import { Navbar } from "@/components/Navbar";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditProductModal } from "@/components/EditProductModal";
import { ProductSearch } from "@/components/ProductSearch";
import { ProductTable } from "@/components/ProductTable";
import { ProductForm } from "@/components/ProductForm";
import { toast } from "sonner";
import { exportStoreToFile } from "@/utils/exportStore";
import { Download } from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { products, addProduct, deleteProduct, updateProduct } = useStore();

  console.log("Products in Admin:", products);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "45086932") {
      setIsAuthenticated(true);
    } else {
      toast.error("Invalid password");
    }
  };

  const handleExport = () => {
    try {
      exportStoreToFile();
      toast.success("Store data exported successfully");
    } catch (error) {
      toast.error("Failed to export store data");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id: string) => {
    try {
      deleteProduct(id);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    try {
      updateProduct(updatedProduct);
      setEditingProduct(null);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <main className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export Store Data
            </Button>
          </div>
          
          <ProductForm onSubmit={addProduct} />

          <div className="my-8">
            <ProductSearch value={searchQuery} onChange={setSearchQuery} />
          </div>

          <ProductTable
            products={products}
            searchQuery={searchQuery}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      <EditProductModal
        product={editingProduct}
        open={!!editingProduct}
        onOpenChange={(open) => !open && setEditingProduct(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Admin;
