
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Topbar } from "@/components/Topbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const { t } = useTranslation();

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      position: "Founder & CEO",
      image: "https://i.pravatar.cc/150?img=1",
      bio: "Ahmed founded the company in 2010 with a vision to create exceptional products that enhance people's lives.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Creative Director",
      image: "https://i.pravatar.cc/150?img=5",
      bio: "Sarah brings 15 years of design experience to our team, ensuring each product meets our high aesthetic standards.",
    },
    {
      id: 3,
      name: "Mohammed Ali",
      position: "Head of Operations",
      image: "https://i.pravatar.cc/150?img=3",
      bio: "Mohammed oversees our supply chain and ensures smooth day-to-day operations across all our locations.",
    },
    {
      id: 4,
      name: "Layla Ibrahim",
      position: "Customer Experience Manager",
      image: "https://i.pravatar.cc/150?img=9",
      bio: "Layla is dedicated to creating exceptional experiences for our customers both online and in-store.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-primary/5 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">{t("about.title")}</h1>
              <p className="text-xl text-muted-foreground">
                We're on a mission to deliver exceptional products and experiences to our customers around the world.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="container py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("about.article1.title")}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {t("about.article1.content")}
                </p>
                <p>
                  What started as a small passion project has grown into a beloved brand with customers across the country.
                  Our journey hasn't always been easy, but our commitment to quality and customer satisfaction has never wavered.
                </p>
                <p>
                  Today, we continue to innovate and expand, always staying true to our core values and the vision that started it all.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Our team working together"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="bg-primary/5 py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Quality</h3>
                  <p className="text-muted-foreground">
                    We never compromise on quality. Each product we offer meets the highest standards of craftsmanship and durability.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We're constantly exploring new ideas, technologies, and approaches to improve our products and services.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to environmentally responsible practices throughout our business operations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
                  <p className="text-muted-foreground">
                    We put our customers at the center of everything we do, always striving to exceed expectations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Integrity</h3>
                  <p className="text-muted-foreground">
                    We operate with honesty, transparency, and ethical business practices in all our dealings.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    We believe in giving back and making a positive impact in the communities where we operate.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Our Team */}
        <div className="container py-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-0">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-4">
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.position}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
