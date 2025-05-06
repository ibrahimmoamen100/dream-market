
import { create } from "zustand";
import { Product, Filter } from "@/types/product";
import initialData from "../data/store.json";
import { persist } from "zustand/middleware";

interface StoreState {
  products: Product[];
  cart: { product: Product; quantity: number }[];
  filters: Filter;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string, decrementOnly?: boolean) => void;
  setFilters: (filters: Filter) => void;
  exportToJSON: () => string;
  saveToJSONFile: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: initialData.products || [],
      cart: [],
      filters: {},
      setProducts: (products) => {
        console.log("Setting products:", products);
        set({ products });
        // Save to localStorage is handled by persist middleware
        get().saveToJSONFile();
      },
      addProduct: (product) =>
        set((state) => {
          console.log("Adding product:", product);
          const newProducts = [...(state.products || []), product];
          console.log("New products state:", newProducts);
          // Save to localStorage is handled by persist middleware
          setTimeout(() => get().saveToJSONFile(), 0);
          return { products: newProducts };
        }),
      updateProduct: (product) =>
        set((state) => {
          console.log("Updating product:", product);
          const updatedProducts = (state.products || []).map((p) =>
            p.id === product.id ? product : p
          );
          console.log("Updated products state:", updatedProducts);
          // Save to localStorage is handled by persist middleware
          setTimeout(() => get().saveToJSONFile(), 0);
          return { products: updatedProducts };
        }),
      deleteProduct: (id) =>
        set((state) => {
          console.log("Deleting product:", id);
          const filteredProducts = (state.products || []).filter((p) => p.id !== id);
          console.log("Remaining products:", filteredProducts);
          // Save to localStorage is handled by persist middleware
          setTimeout(() => get().saveToJSONFile(), 0);
          return { products: filteredProducts };
        }),
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
      removeFromCart: (productId, decrementOnly = false) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === productId
          );
          
          // If decrementOnly flag is true and item exists with quantity > 1, decrement quantity
          if (decrementOnly && existingItem && existingItem.quantity > 1) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }
          
          // Otherwise remove the item entirely
          return {
            cart: state.cart.filter((item) => item.product.id !== productId),
          };
        }),
      setFilters: (filters) => set({ filters }),
      exportToJSON: () => {
        const state = get();
        return JSON.stringify({ products: state.products }, null, 2);
      },
      saveToJSONFile: () => {
        // In client-side context, store data to localStorage
        const productsJSON = JSON.stringify({ products: get().products }, null, 2);
        
        // Log the data for debugging
        console.log("Data that would be saved to store.json:", productsJSON);
        
        // Store in localStorage for persistence
        localStorage.setItem('store-data-json', productsJSON);
        
        // If we're in a development environment with API access, save to file
        if (typeof window !== 'undefined') {
          try {
            // Optional: make an API call to save to JSON file during development
            fetch('/api/save-store', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: productsJSON
            }).catch(err => {
              // Silently fail on API error - we still have localStorage backup
              console.log("Note: API save failed, but data is in localStorage", err);
            });
          } catch (error) {
            console.error("Error saving data:", error);
          }
        }
      },
    }),
    {
      name: 'store-storage',
      partialize: (state) => ({ 
        products: state.products,
        cart: state.cart
      }),
    }
  )
);

// Initialize store with data from localStorage if available
if (typeof window !== 'undefined') {
  const storedData = localStorage.getItem("store-storage");
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (parsedData.state && parsedData.state.products) {
        console.log("Loaded products from localStorage:", parsedData.state.products);
        // No need to call setProducts here as persist middleware handles this
      }
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }
  } else {
    console.log("No stored data found, using initial data");
  }
}

// Export a utility function to export store data
export const exportStoreData = () => {
  return useStore.getState().exportToJSON();
};
