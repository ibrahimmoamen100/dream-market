import { Globe, Facebook, Instagram, Twitter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export function Topbar() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    // Update document direction based on language
    document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex h-10 items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="tel:+201024911062" className="text-sm">
            01024911062
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground/80"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground/80"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground/80"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <Select onValueChange={handleLanguageChange} defaultValue="ar">
          <SelectTrigger className="w-[120px]  bg-dark border-none outline-none text-white hover:bg-gray-800">
            <Globe className="mr-0 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">العربية</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
