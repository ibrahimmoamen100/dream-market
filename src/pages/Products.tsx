
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { Navbar } from "@/components/Navbar";
import { Topbar } from "@/components/Topbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/types/product";
import Footer from "@/components/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Products() {
  const { t } = useTranslation();
  const products = useStore((state) => state.products);
  const filters = useStore((state) => state.filters);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Apply filters to products
  const filteredProducts = products?.filter((product) => {
    let matchesSearch = true;
    let matchesCategory = true;
    let matchesBrand = true;
    let matchesColor = true;
    let matchesSize = true;

    if (filters.search) {
      matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
    }

    if (filters.category) {
      matchesCategory = product.category === filters.category;
    }

    if (filters.brand) {
      matchesBrand = product.brand === filters.brand;
    }

    if (filters.color) {
      matchesColor = product.color?.split(",").some(c => c.trim() === filters.color);
    }

    if (filters.size) {
      matchesSize = product.size?.split(",").some(s => s.trim() === filters.size);
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesColor && matchesSize;
  });

  // Apply sorting if needed
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (filters.sortBy === "price-asc") {
      return a.price - b.price;
    } else if (filters.sortBy === "price-desc") {
      return b.price - a.price;
    } else if (filters.sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (filters.sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Create page numbers array for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">{t("products.title")}</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  {t("filters.title")}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[385px]">
                <div className="py-6">
                  <h2 className="text-lg font-semibold mb-4">{t("filters.title")}</h2>
                  <ProductFilters />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-card rounded-lg border p-4 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">{t("filters.title")}</h2>
              <ProductFilters />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={() => handleViewProduct(product)}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>

                      {pageNumbers.map((number) => {
                        // Show first page, last page, current page, and pages adjacent to current page
                        if (
                          number === 1 || 
                          number === totalPages ||
                          (number >= currentPage - 1 && number <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={number}>
                              <PaginationLink
                                isActive={currentPage === number}
                                onClick={() => handlePageChange(number)}
                              >
                                {number}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        
                        // Show ellipsis
                        if (number === currentPage - 2 || number === currentPage + 2) {
                          return (
                            <PaginationItem key={number}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
      
      <Footer />
    </div>
  );
}
