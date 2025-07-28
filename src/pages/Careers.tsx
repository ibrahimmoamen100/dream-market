import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Topbar } from "@/components/Topbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Careers() {
  const { t } = useTranslation();
  const [openJobId, setOpenJobId] = useState<number | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });

  // قائمة الوظائف من الصورة
  const jobPostings = [
    { id: 1, title: "مدير فرع", subtitle: "Branch Manager" },
    { id: 2, title: "مدير فرع مسائي", subtitle: "Evening Branch Manager" },
    { id: 3, title: "مدير صالة", subtitle: "Hall Manager" },
    { id: 4, title: "محاسب موردين", subtitle: "Supplier Accountant" },
    { id: 5, title: "محاسب فرع", subtitle: "Branch Accountant" },
    {
      id: 6,
      title: "محاسب مولتي وفروزن",
      subtitle: "Multi & Frozen Coordinator",
    },
    { id: 7, title: "موظفين أمن", subtitle: "Security Staff" },
    { id: 8, title: "موظفين استلامات", subtitle: "Receipts Officer" },
    { id: 9, title: "مراقب كاميرات", subtitle: "Camera Monitor" },
    { id: 10, title: "مساعد بقال", subtitle: "Grocer Assistant" },
    { id: 11, title: "بائع بقالة", subtitle: "Grocery Seller" },
    { id: 12, title: "بائع لحوم", subtitle: "Meat Seller" },
    { id: 13, title: "بائع لحوم مستورد", subtitle: "Imported Meat Seller" },
    { id: 14, title: "بائع عطور", subtitle: "Perfume Seller" },
    { id: 15, title: "كاشير", subtitle: "Cashier" },
    { id: 16, title: "منسق مخزن", subtitle: "Warehouse Coordinator" },
    { id: 17, title: "منسق ممرات", subtitle: "Corridor Coordinator" },
  ];

  const handleViewJob = (jobId: number) => {
    setOpenJobId(openJobId === jobId ? null : jobId);
  };

  const handleApply = (jobId: number) => {
    setOpenJobId(jobId);
    setIsApplyDialogOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value,
    });
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the application data to your backend
    toast.success("Application submitted successfully!", {
      description: "We'll review your application and get back to you soon.",
    });

    // Reset form and close dialog
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      message: "",
    });
    setIsApplyDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-primary/5 py-16">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
              {/* النص */}
              <div className="flex-1 text-center lg:text-right lg:pr-8">
                <h1 className="text-4xl font-bold mb-4">شركة دريم 1 ماركت</h1>
                <p className="text-xl font-bold text-yellow-500 mb-2">
                  تعلن إدارة الموارد البشرية عن توفر فرص عمل شاغرة بالوظائف
                  الآتية:
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Hema is hiring for the following positions:
                </p>
                <p className="text-md text-blue-700 font-semibold">
                  انضم إلينا الآن!
                </p>
              </div>
              {/* الصورة */}
              <div className="flex-1 flex justify-center mt-8 lg:mt-0">
                <img
                  src="/images/hiring-hero.jpg"
                  alt="Hema Hiring"
                  className="max-w-xs w-full rounded-xl shadow-lg border-4 border-yellow-400"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="container py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Work With Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                <p className="text-muted-foreground">
                  We invest in our employees' development with training programs
                  and clear career advancement paths.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Competitive Benefits</h3>
                <p className="text-muted-foreground">
                  We offer competitive salaries, health insurance, paid time
                  off, and employee discounts.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Inclusive Workplace</h3>
                <p className="text-muted-foreground">
                  We celebrate diversity and are committed to creating an
                  inclusive environment for all employees.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Work-Life Balance</h3>
                <p className="text-muted-foreground">
                  We respect our employees' time and strive to maintain a
                  healthy work-life balance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Positions */}
        <div className="container py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            الوظائف المتاحة
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobPostings.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-muted-foreground">{job.subtitle}</p>
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => setIsApplyDialogOpen(true)}
                  >
                    تقدم الآن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Contact Info Section */}
        <div className="container py-8 text-center">
          <h3 className="text-2xl font-bold mb-2 text-blue-800">للاستفسار:</h3>
          <p className="text-lg font-semibold mb-2">01155652162</p>
          <p className="text-md">
            ش. مؤسسة الذكاة بجوار مدرسة الحسين، المرج – القاهرة
          </p>
        </div>
      </main>

      {/* Application Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for Position</DialogTitle>
            <DialogDescription>
              Complete the form below to submit your application. We'll review
              it and get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitApplication}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={applicationData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={applicationData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={applicationData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="experience">Relevant Experience (years)</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="text"
                  value={applicationData.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">
                  Why are you interested in this position?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={applicationData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsApplyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
