import { ShoppingCart, Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductSearch } from "@/components/ProductSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18next from "i18next";
export function Navbar() {
  const cart = useStore((state) => state.cart);
  const setFilters = useStore((state) => state.setFilters);
  const filters = useStore((state) => state.filters);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-blue-500 backdrop-blur supports-[backdrop-filter]:bg-blue-500 text-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold">
            <img src="/logo.png" alt="logo" className="w-28 h-28" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-sm font-medium">
            {t("navigation.products")}
          </Link>
          <Link to="/about" className="text-sm font-medium">
            {t("navigation.about")}
          </Link>
          <Link to="/locations" className="text-sm font-medium">
            {t("navigation.locations")}
          </Link>
          <Link to="/careers" className="text-sm font-medium">
            {t("navigation.careers")}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("navigation.search")}
              className="pl-8"
              value={filters.search || ""}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild className=" ">
              <Button variant="outline" size="icon" className="md:hidden ">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="py-6">
                <div className="mb-6">
                  <ProductSearch
                    value={filters.search || ""}
                    onChange={(value) =>
                      setFilters({ ...filters, search: value })
                    }
                  />
                </div>
                <div className="mb-10">
                  <ProductFilters />
                </div>
                <div className="space-y-4">
                  <Link to="/" className="block text-sm font-medium">
                    {t("navigation.home")}
                  </Link>
                  <Link to="/products" className="block text-sm font-medium">
                    {t("navigation.products")}
                  </Link>
                  <Link to="/about" className="block text-sm font-medium">
                    {t("navigation.about")}
                  </Link>
                  <Link to="/locations" className="block text-sm font-medium">
                    {t("navigation.locations")}
                  </Link>
                  <Link to="/careers" className="block text-sm font-medium">
                    {t("navigation.careers")}
                  </Link>

                  <Link to="/cart" className="block text-sm font-medium">
                    {t("navigation.cart")}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
