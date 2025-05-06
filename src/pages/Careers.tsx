
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

  // Available job positions
  const jobPositings = [
    {
      id: 1,
      title: "Sales Associate",
      location: "Main Store",
      type: "Full-time",
      department: "Retail",
      description: "We're looking for energetic and customer-focused Sales Associates to join our team. The ideal candidate has excellent communication skills and a passion for delivering exceptional customer service.",
      responsibilities: [
        "Assisting customers and providing product information",
        "Processing sales transactions and maintaining cash register",
        "Arranging merchandise displays and keeping the store tidy",
        "Meeting sales targets and contributing to team goals",
        "Handling customer inquiries and resolving issues",
      ],
      requirements: [
        "Previous retail experience (preferred but not required)",
        "Excellent communication and interpersonal skills",
        "Basic math skills and computer literacy",
        "Ability to stand for extended periods and lift up to 20 lbs",
        "Flexibility to work evenings, weekends, and holidays",
      ],
    },
    {
      id: 2,
      title: "Warehouse Specialist",
      location: "Distribution Center",
      type: "Full-time",
      department: "Logistics",
      description: "We are seeking a detail-oriented Warehouse Specialist to join our distribution team. The successful candidate will help ensure efficient inventory management and order fulfillment.",
      responsibilities: [
        "Receiving and processing incoming stock and materials",
        "Picking and filling orders from stock",
        "Packing and shipping orders",
        "Organizing and maintaining the warehouse layout",
        "Performing regular inventory counts",
      ],
      requirements: [
        "Previous warehouse experience (1+ years preferred)",
        "Ability to operate forklifts and other equipment (certification a plus)",
        "Strong attention to detail and organizational skills",
        "Physical stamina to stand, walk, and lift throughout the shift",
        "Basic computer skills for inventory management systems",
      ],
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      location: "Head Office",
      type: "Full-time",
      department: "Marketing",
      description: "We're looking for a creative Digital Marketing Specialist to help grow our online presence and drive e-commerce sales. The ideal candidate has experience with social media, email marketing, and analytics.",
      responsibilities: [
        "Creating and managing content for social media platforms",
        "Developing and executing email marketing campaigns",
        "Analyzing marketing performance data and optimizing campaigns",
        "Collaborating with the product team on promotional strategies",
        "Staying up-to-date with digital marketing trends",
      ],
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "2+ years experience in digital marketing",
        "Proficiency with social media platforms and email marketing tools",
        "Understanding of SEO and analytics tools",
        "Excellent written and verbal communication skills",
      ],
    },
    {
      id: 4,
      title: "Customer Service Representative",
      location: "Remote",
      type: "Part-time",
      department: "Customer Support",
      description: "We're seeking a Customer Service Representative to provide support via phone, email, and chat. The ideal candidate is patient, articulate, and enjoys helping customers solve problems.",
      responsibilities: [
        "Answering customer inquiries via phone, email, and chat",
        "Processing returns, exchanges, and addressing complaints",
        "Documenting customer interactions in the CRM system",
        "Escalating complex issues to the appropriate departments",
        "Providing product information and assistance",
      ],
      requirements: [
        "High school diploma or equivalent",
        "Previous customer service experience (preferred)",
        "Strong verbal and written communication skills",
        "Ability to remain calm and professional in stressful situations",
        "Computer literacy and fast typing skills",
      ],
    },
  ];

  const handleViewJob = (jobId: number) => {
    setOpenJobId(openJobId === jobId ? null : jobId);
  };

  const handleApply = (jobId: number) => {
    setOpenJobId(jobId);
    setIsApplyDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
              <p className="text-xl text-muted-foreground">
                We're always looking for talented individuals to grow with us. Explore our current openings below.
              </p>
            </div>
          </div>
        </div>
        
        {/* Why Join Us */}
        <div className="container py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Work With Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                <p className="text-muted-foreground">
                  We invest in our employees' development with training programs and clear career advancement paths.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Competitive Benefits</h3>
                <p className="text-muted-foreground">
                  We offer competitive salaries, health insurance, paid time off, and employee discounts.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Inclusive Workplace</h3>
                <p className="text-muted-foreground">
                  We celebrate diversity and are committed to creating an inclusive environment for all employees.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Work-Life Balance</h3>
                <p className="text-muted-foreground">
                  We respect our employees' time and strive to maintain a healthy work-life balance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Open Positions */}
        <div className="container py-12">
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          <div className="space-y-6">
            {jobPositings.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="p-6 cursor-pointer" 
                    onClick={() => handleViewJob(job.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <div className="text-muted-foreground mt-1">
                          <span>{job.department}</span> • <span>{job.location}</span> • <span>{job.type}</span>
                        </div>
                      </div>
                      <Button 
                        variant="secondary" 
                        className="mt-4 md:mt-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job.id);
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                  
                  {openJobId === job.id && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t">
                        <p className="mb-4">{job.description}</p>
                        
                        <h4 className="font-bold mt-4 mb-2">Responsibilities:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.responsibilities.map((item, index) => (
                            <li key={index} className="text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-bold mt-4 mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.requirements.map((item, index) => (
                            <li key={index} className="text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                        
                        <Button 
                          className="mt-6" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApply(job.id);
                          }}
                        >
                          Apply for this Position
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      {/* Application Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for Position</DialogTitle>
            <DialogDescription>
              Complete the form below to submit your application. We'll review it and get back to you soon.
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
                <Label htmlFor="message">Why are you interested in this position?</Label>
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
              <Button type="button" variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
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
