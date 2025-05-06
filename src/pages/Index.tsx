import { useState, useEffect } from "react";
import { Topbar } from "@/components/Topbar";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { useStore } from "@/store/useStore";
import { Product } from "@/types/product";
import { useTranslation } from "react-i18next";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductSearch } from "@/components/ProductSearch";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const products = useStore((state) => state.products) || [];
  const filters = useStore((state) => state.filters) || {};
  const setFilters = useStore((state) => state.setFilters);
  const { t } = useTranslation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.id.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }
      if (filters.color && !product.color.includes(filters.color)) {
        return false;
      }
      if (filters.size && !product.size.includes(filters.size)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  // Get special offers
  const specialOffersProducts = products.filter(
    (product) =>
      product.specialOffer &&
      new Date(product.offerEndsAt as string) > new Date()
  );

  // Get paginated products (exclude special offers from pagination)
  const regularProducts = filteredProducts.filter(
    (product) =>
      !product.specialOffer ||
      new Date(product.offerEndsAt as string) <= new Date()
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = regularProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(regularProducts.length / productsPerPage);

  // Component for mobile filters drawer
  const MobileFilters = () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Filter className="h-4 w-4" />
          <span className="sr-only">{t("filters.title")}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <div className="p-4 max-h-full overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">{t("filters.title")}</h3>
          <ProductSearch
            value={filters.search || ""}
            onChange={(value) => setFilters({ ...filters, search: value })}
          />
          <div className="mt-4">
            <ProductFilters />
          </div>
          <DrawerClose asChild>
            <Button className="w-full mt-4">{t("common.apply")}</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );

  // Handle pagination click
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate pagination items
  const getPaginationItems = () => {
    const items = [];

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );

    // First page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => paginate(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue; // Skip first and last pages as they're added separately
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => paginate(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 4) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Last page (if there are more than 1 page)
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => paginate(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          className={
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />

      <main className="container py-4 px-4 md:px-8">
        {/* Hero Carousel Section */}
        <section className="mb-8 md:mb-12">
          <Carousel className="mx-auto">
            <CarouselContent>
              <CarouselItem>
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
                  <img
                    src="https://scontent.fcai20-3.fna.fbcdn.net/v/t39.30808-6/482225333_614824224854919_8332725618033071556_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=T9D8Of-_skcQ7kNvwFg5elA&_nc_oc=Adn5l87cRBaXwCD7OPIuVqQrfD7fbwswEiODJanPvdoikf7yi0YYWlM5ku4ZiX_zkj0&_nc_zt=23&_nc_ht=scontent.fcai20-3.fna&_nc_gid=8NaEIUAf9flFEgvveAO1OA&oh=00_AfLd8RbT_G2g-wKaSEguaeSRgbTrkzI1iwkWbhyB-dNm8g&oe=681FB619"
                    alt="Hero Image 1"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                    <div className="p-6 md:p-10 max-w-md">
                      <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4">
                        {t("hero.title1")}
                      </h2>
                      <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4">
                        {t("hero.description1")}
                      </p>
                      <Button size="sm" className="sm:py-2 md:py-6">
                        {t("hero.shopNow")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
                  <img
                    src="https://scontent.fcai20-5.fna.fbcdn.net/v/t39.30808-6/492007927_652148987789109_3587969974607605344_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZeZuze1DmooQ7kNvwG1g7BI&_nc_oc=AdnE-xLzEw7AAnJWKcNrXaKSZeZiYunx2ACyOz0Pa8W02a5zBkDee8gXytcpSuhhvmE&_nc_zt=23&_nc_ht=scontent.fcai20-5.fna&_nc_gid=6DuTClggd9j71CWXJ-BwCw&oh=00_AfKv6UzZFmOtEHC0iWgpMavVLW937Yaud1sfQVN2-Z3zLg&oe=681FCF26"
                    alt="Hero Image 2"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                    <div className="p-6 md:p-10 max-w-md">
                      <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4">
                        {t("hero.title2")}
                      </h2>
                      <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4">
                        {t("hero.description2")}
                      </p>
                      <Button size="sm" className="sm:py-2 md:py-6">
                        {t("hero.shopNow")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
                  <img
                    src="https://scontent.fcai20-5.fna.fbcdn.net/v/t39.30808-6/492033452_652148944455780_5398985310117504831_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=dn2LNymmNzwQ7kNvwFgttvP&_nc_oc=AdlmeOePoAu9Lw3ymtYLdfbQzeKhi9XHMutR0Ypx9VNz4SMop4JM0m1Z9XZ7tMjC5N0&_nc_zt=23&_nc_ht=scontent.fcai20-5.fna&_nc_gid=6eAD1J8l3Zbbzd3xxEH99w&oh=00_AfLPBro4DhfX6bsgmrzor3tNUT0MtZG72-vANAJKHbscqg&oe=681FCE42"
                    alt="Hero Image 3"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                    <div className="p-6 md:p-10 max-w-md">
                      <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4">
                        {t("hero.title3")}
                      </h2>
                      <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4">
                        {t("hero.description3")}
                      </p>
                      <Button size="sm" className="sm:py-2 md:py-6">
                        {t("hero.shopNow")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </div>
          </Carousel>
        </section>

        {/* Special Offers Section */}
        {specialOffersProducts.length > 0 && (
          <section className="mb-8 md:mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold">
                {t("specialOffers.title")}
              </h2>
              <Button variant="link">{t("specialOffers.viewAll")}</Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {specialOffersProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={() => {
                    setSelectedProduct(product);
                    setModalOpen(true);
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Regular Products Section */}
        <section className="mb-8 md:mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold">
              {t("products.title")}
            </h2>
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <ProductFilters />
              </div>
              <MobileFilters />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={() => {
                  setSelectedProduct(product);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>{getPaginationItems()}</PaginationContent>
              </Pagination>
            </div>
          )}
        </section>

        {/* About Company Articles Section */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            {t("about.title")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{t("about.article1.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-48 rounded-md overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1508658179012-2dee3dca3871?q=80&w=600"
                    alt="Company story"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardDescription>{t("about.article1.content")}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t("about.readMore")}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("about.article2.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-48 rounded-md overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600"
                    alt="Quality commitment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardDescription>{t("about.article2.content")}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t("about.readMore")}
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>{t("about.article3.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-48 rounded-md overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1533749047139-189de3cf06d3?q=80&w=600"
                    alt="Customer service"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardDescription>{t("about.article3.content")}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t("about.readMore")}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      <Footer />
    </div>
  );
};

export default Index;
