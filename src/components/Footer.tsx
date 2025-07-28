import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Footer() {
  const { t } = useTranslation();
  const products = useStore((state) => state.products) || [];
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  return (
    <footer className="bg-secondary/10 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-primary">Hema</h2>
            </div>
            <h3 className="font-bold text-lg mb-4">{t("footer.aboutUs")}</h3>
            <p className="text-muted-foreground">
              {t("footer.aboutDescription")}
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("footer.products")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("footer.careers")}
                </Link>
              </li>
              <li>
                <Link
                  to="/locations"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("footer.locations")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.categories")}</h3>
            <ul className="space-y-2">
              {categories.length === 0 ? (
                <li className="text-muted-foreground">
                  {t("filters.allCategories")}
                </li>
              ) : (
                categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      to={`/products?category=${encodeURIComponent(cat)}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {cat}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  الفرع الأول: ش. مؤسسة الزكاة بجوار برج الفاروق، الشرفا، المرج
                  <br />
                  الفرع الثاني: ش. مؤسسة الزكاة بجوار مدرسة الحسين الخاصة،
                  الشرفا، المرج
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="tel:01155652162"
                  className="text-muted-foreground hover:text-primary"
                >
                  01155652162
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="mailto:info@example.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  info@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} - {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
