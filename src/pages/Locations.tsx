import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Topbar } from "@/components/Topbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pin, Building } from "lucide-react";

export default function Locations() {
  const { t } = useTranslation();
  const [mapApiKey, setMapApiKey] = useState<string>("");

  // Sample store locations
  const locations = [
    {
      id: 1,
      name: "الفرع الأول",
      address: "ش. مؤسسة الزكاة بجوار برج الفاروق، الشرفا، المرج، القاهرة، مصر",
      phone: "01155652162",
      hours: "9:00 ص - 11:00 م",
      coordinates: { lat: 30.2101, lng: 31.3676 }, // تقريبية للمرج
    },
    {
      id: 2,
      name: "الفرع الثاني",
      address:
        "ش. مؤسسة الزكاة بجوار مدرسة الحسين الخاصة، الشرفا، المرج، القاهرة، مصر",
      phone: "01155652162",
      hours: "9:00 ص - 11:00 م",
      coordinates: { lat: 30.2135, lng: 31.3699 }, // تقريبية للمرج
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">موقعنا</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground mb-6">
              قم بزيارة أحد فروعنا لتجربة منتجاتنا بنفسك. فريق عملنا الودود جاهز
              لمساعدتك في جميع احتياجاتك
            </p>

            <div className="space-y-4">
              {locations.map((location) => (
                <Card key={location.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">{location.name}</h3>
                        <p className="text-muted-foreground">
                          {location.address}
                        </p>
                        <p className="mt-1">{location.phone}</p>
                        <p className="text-sm mt-1">
                          <span className="font-semibold">Hours:</span>{" "}
                          {location.hours}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-[400px] md:h-auto">
            <div className="border rounded-lg h-full overflow-hidden">
              <iframe
                title="Hema Location"
                src="https://www.google.com/maps?q=30.141071463482,31.347328&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
