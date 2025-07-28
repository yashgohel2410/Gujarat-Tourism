import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EnquiryFormData } from "@/types";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function EnquiryButton() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, destination: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `New Trip Enquiry:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Destination: ${formData.destination}
Message: ${formData.message}`;
    
    // Your WhatsApp number (replace with your actual number)
    const whatsappNumber = "919427571817"; // Replace with your number
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Store in localStorage for backup
    const enquiries = JSON.parse(localStorage.getItem("enquiries") || "[]");
    enquiries.push({
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
    });
    localStorage.setItem("enquiries", JSON.stringify(enquiries));
    
    // Show success message
    toast.success("Redirecting to WhatsApp to send your enquiry!");
    
    // Reset form and close dialog
    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      message: "",
    });
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Button 
            onClick={() => setOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600"
            size="icon"
          >
            <MessageSquarePlus className="h-6 w-6" />
            <span className="sr-only">Open enquiry form</span>
          </Button>
        </motion.div>
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border shadow-xl">
          <DialogHeader>
            <DialogTitle>Plan Your Gujarat Trip</DialogTitle>
            <DialogDescription>
              Fill in your details and we'll help you plan the perfect trip to Gujarat.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destination">Destination of Interest</Label>
                <Select
                  value={formData.destination}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                    <SelectItem value="kutch">Kutch</SelectItem>
                    <SelectItem value="gir">Gir National Park</SelectItem>
                    <SelectItem value="dwarka">Dwarka</SelectItem>
                    <SelectItem value="statue-of-unity">Statue of Unity</SelectItem>
                    <SelectItem value="somnath">Somnath</SelectItem>
                    <SelectItem value="multiple">Multiple Destinations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600"
              >
                Submit Enquiry
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
