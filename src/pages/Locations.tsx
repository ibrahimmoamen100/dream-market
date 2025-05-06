
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
      name: "Main Store",
      address: "123 Main Street, City Center",
      phone: "+1 234 567 890",
      hours: "9:00 AM - 9:00 PM",
      coordinates: { lat: 30.0444, lng: 31.2357 }, // Cairo
    },
    {
      id: 2,
      name: "North Branch",
      address: "456 North Avenue, North District",
      phone: "+1 234 567 891",
      hours: "10:00 AM - 8:00 PM",
      coordinates: { lat: 31.2001, lng: 29.9187 }, // Alexandria
    },
    {
      id: 3,
      name: "East Side Store",
      address: "789 East Boulevard, Eastern Area",
      phone: "+1 234 567 892",
      hours: "10:00 AM - 10:00 PM",
      coordinates: { lat: 25.6872, lng: 32.6396 }, // Luxor
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Our Locations</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground mb-6">
              Visit one of our store locations to experience our products in person. 
              Our friendly staff is ready to assist you with all your needs.
            </p>
            
            <div className="space-y-4">
              {locations.map((location) => (
                <Card key={location.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">{location.name}</h3>
                        <p className="text-muted-foreground">{location.address}</p>
                        <p className="mt-1">{location.phone}</p>
                        <p className="text-sm mt-1">
                          <span className="font-semibold">Hours:</span> {location.hours}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="h-[400px] md:h-auto">
            {!mapApiKey ? (
              <div className="border rounded-lg p-6 h-full flex flex-col items-center justify-center text-center">
                <Pin className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Map Preview</h3>
                <p className="text-muted-foreground mb-4">
                  To display an interactive map of our store locations, please enter your Mapbox API key.
                </p>
                <div className="w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Enter Mapbox public token"
                    className="w-full p-2 border rounded"
                    value={mapApiKey}
                    onChange={(e) => setMapApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    You can get a free Mapbox API key at mapbox.com
                  </p>
                </div>
              </div>
            ) : (
              <div className="border rounded-lg h-full">
                <iframe 
                  src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=true&access_token=${mapApiKey}#center=31.5,30.5&zoom=6`}
                  title="Store Locations"
                  className="w-full h-full rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
