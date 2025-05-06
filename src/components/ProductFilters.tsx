
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function ProductFilters() {
  const filters = useStore((state) => state.filters) || {};
  const setFilters = useStore((state) => state.setFilters);
  const products = useStore((state) => state.products) || [];
  const { t } = useTranslation();
  
  // Independent state for each collapsible filter
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Filter out empty strings and get unique values
  const categories = Array.from(
    new Set(products?.map((p) => p.category).filter(Boolean) || [])
  );
  const brands = Array.from(
    new Set(products?.map((p) => p.brand).filter(Boolean) || [])
  );
  const colors = Array.from(
    new Set(
      products
        ?.map((p) => p.color)
        .filter(Boolean)
        .flatMap((color) => color.split(","))
    ) || []
  );
  const sizes = Array.from(
    new Set(
      products
        ?.map((p) => p.size)
        .filter(Boolean)
        .flatMap((size) => size.split(","))
    ) || []
  );

  const MobileFilter = ({ 
    label, 
    children, 
    isOpen, 
    setIsOpen 
  }: { 
    label: string, 
    children: React.ReactNode, 
    isOpen: boolean, 
    setIsOpen: (open: boolean) => void 
  }) => (
    <Collapsible className="w-full mb-3" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-2 text-left font-medium">
          {label}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" 
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-1 pb-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  // Color component for color filter
  const ColorOption = ({ color, selected, onClick }: { color: string, selected: boolean, onClick: () => void }) => {
    // Handle both hex colors and named colors
    const isHex = color.startsWith('#');
    const backgroundColor = isHex ? color : color;
    
    return (
      <div className="flex items-center space-x-2 mb-2" onClick={onClick}>
        <div 
          className={`h-5 w-5 rounded-full border ${selected ? 'ring-2 ring-offset-2 ring-primary' : ''}`} 
          style={{ backgroundColor }}
        />
        <span>{color}</span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Mobile view - accordion style filters */}
      <div className="md:hidden w-full space-y-2">
        <MobileFilter 
          label={t("filters.sortBy")} 
          isOpen={sortOpen} 
          setIsOpen={setSortOpen}
        >
          <Select
            value={filters.sortBy || "default"}
            onValueChange={(value: any) =>
              setFilters({ ...filters, sortBy: value === "default" ? undefined : value })
            }
          >
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder={t("filters.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </MobileFilter>
        
        <MobileFilter 
          label={t("filters.category")} 
          isOpen={categoryOpen} 
          setIsOpen={setCategoryOpen}
        >
          <Select
            value={filters.category || "all"}
            onValueChange={(value) =>
              setFilters({ ...filters, category: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder={t("filters.category")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.allCategories")}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </MobileFilter>
        
        <MobileFilter 
          label={t("filters.brand")} 
          isOpen={brandOpen} 
          setIsOpen={setBrandOpen}
        >
          <Select
            value={filters.brand || "all"}
            onValueChange={(value) =>
              setFilters({ ...filters, brand: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder={t("filters.brand")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.allBrands")}</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </MobileFilter>
        
        <MobileFilter 
          label={t("filters.color")} 
          isOpen={colorOpen} 
          setIsOpen={setColorOpen}
        >
          <div className="py-2">
            <div className="flex flex-col space-y-1">
              {colors.map((color) => (
                <ColorOption 
                  key={color}
                  color={color}
                  selected={filters.color === color}
                  onClick={() => setFilters({ 
                    ...filters, 
                    color: filters.color === color ? undefined : color 
                  })}
                />
              ))}
              {colors.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-2" 
                  onClick={() => setFilters({ ...filters, color: undefined })}
                >
                  {t("filters.allColors")}
                </Button>
              )}
            </div>
          </div>
        </MobileFilter>
        
        <MobileFilter 
          label={t("filters.size")} 
          isOpen={sizeOpen} 
          setIsOpen={setSizeOpen}
        >
          <Select
            value={filters.size || "all"}
            onValueChange={(value) =>
              setFilters({ ...filters, size: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder={t("filters.size")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.allSizes")}</SelectItem>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </MobileFilter>
      </div>
      
      {/* Desktop view - horizontal filters */}
      <div className="hidden md:flex flex-wrap gap-4">
        <Select
          value={filters.sortBy || "default"}
          onValueChange={(value: any) =>
            setFilters({ ...filters, sortBy: value === "default" ? undefined : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("filters.sortBy")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.category || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, category: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("filters.category")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.allCategories")}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.brand || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, brand: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("filters.brand")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.allBrands")}</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <Select
            value={filters.color || "all"}
            onValueChange={(value) =>
              setFilters({ ...filters, color: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("filters.color")} />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectItem value="all">{t("filters.allColors")}</SelectItem>
              {colors.map((color) => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center">
                    <div 
                      className="h-4 w-4 rounded-full mr-2" 
                      style={{ backgroundColor: color }} 
                    />
                    {color}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Select
          value={filters.size || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, size: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("filters.size")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.allSizes")}</SelectItem>
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
