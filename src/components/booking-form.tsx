import { useState } from "react";
import { Calendar, Users, MapPin, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { sendWhatsAppMessage, formatBookingMessage, formatPhoneNumber, validatePhoneNumber } from "@/lib/whatsapp";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
  specialRequests: string;
  budget: string;
  travelType: string;
  agreeToTerms: boolean;
}

interface BookingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingForm({ open, onOpenChange }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    roomType: "",
    specialRequests: "",
    budget: "",
    travelType: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      // Your WhatsApp number (replace with your actual number)
      const whatsappNumber = "919427571817"; // Replace with your number

      // Format the message
      const message = formatBookingMessage(formData);

      // Format phone number
      const formattedPhone = formatPhoneNumber(whatsappNumber);

      // Store booking in localStorage for backup
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      bookings.push({
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
        status: "pending"
      });
      localStorage.setItem("bookings", JSON.stringify(bookings));

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Send WhatsApp message
      const success = await sendWhatsAppMessage({
        phone: formattedPhone,
        message: message
      });

      if (success) {
        toast.success("Booking request sent successfully! Opening WhatsApp...");
      } else {
        toast.success("Opening WhatsApp... Please send the message manually if needed.");
      }

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: "",
        roomType: "",
        specialRequests: "",
        budget: "",
        travelType: "",
        agreeToTerms: false,
      });

      // Close dialog after a short delay
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);

    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const destinations = [
    "Ahmedabad",
    "Kutch (Rann of Kutch)",
    "Gir National Park",
    "Dwarka",
    "Statue of Unity",
    "Somnath",
    "Vadodara",
    "Rajkot",
    "Bhuj",
    "Diu",
    "Saputara",
    "Palitana",
    "Multiple Destinations"
  ];

  const roomTypes = [
    "Standard Room",
    "Deluxe Room",
    "Suite",
    "Family Room",
    "Heritage Room",
    "Tent/Camp",
    "Homestay",
    "Resort Villa"
  ];

  const budgetRanges = [
    "₹5,000 - ₹10,000 per person",
    "₹10,000 - ₹20,000 per person",
    "₹20,000 - ₹35,000 per person",
    "₹35,000 - ₹50,000 per person",
    "₹50,000+ per person"
  ];

  const travelTypes = [
    "Family Trip",
    "Couple/Honeymoon",
    "Solo Travel",
    "Friends Group",
    "Business Trip",
    "Adventure Tour",
    "Cultural Tour",
    "Wildlife Safari"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/90 dark:bg-gray-950/90 border shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Book Your Gujarat Adventure
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Fill in your details and we'll create a personalized Gujarat travel experience for you.
            <br />
            <span className="text-xs text-muted-foreground mt-1 block">
              📱 Your booking request will be sent directly via WhatsApp for instant processing
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-11 text-base"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-11 text-base"
                  placeholder="+91 9876543210"
                  pattern="[0-9+\-\s\(\)]+"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Include country code (e.g., +91 for India)
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="h-11 text-base"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Trip Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-sm font-medium">Destination *</Label>
                <Select value={formData.destination} onValueChange={(value) => handleSelectChange("destination", value)}>
                  <SelectTrigger className="h-11 text-base">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((destination) => (
                      <SelectItem key={destination} value={destination}>
                        {destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="travelType" className="text-sm font-medium">Travel Type *</Label>
                <Select value={formData.travelType} onValueChange={(value) => handleSelectChange("travelType", value)}>
                  <SelectTrigger className="h-11 text-base">
                    <SelectValue placeholder="Select travel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {travelTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkIn" className="text-sm font-medium">Check-in Date *</Label>
                <Input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="h-11 text-base"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOut" className="text-sm font-medium">Check-out Date *</Label>
                <Input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="h-11 text-base"
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests" className="text-sm font-medium">Number of Guests *</Label>
                <Select value={formData.guests} onValueChange={(value) => handleSelectChange("guests", value)}>
                  <SelectTrigger className="h-11 text-base">
                    <SelectValue placeholder="Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                    <SelectItem value="10+">10+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Accommodation & Budget */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Accommodation & Budget
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomType" className="text-sm font-medium">Accommodation Type</Label>
                <Select value={formData.roomType} onValueChange={(value) => handleSelectChange("roomType", value)}>
                  <SelectTrigger className="h-11 text-base">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                  <SelectTrigger className="h-11 text-base">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="text-sm font-medium">Special Requests</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="min-h-[100px] text-base resize-none"
              placeholder="Any special requirements, dietary restrictions, accessibility needs, or preferences..."
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={handleCheckboxChange}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . I understand that this booking request will be sent via WhatsApp for immediate processing.
            </Label>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600 h-11 text-base touch-manipulation"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </motion.div>
              ) : (
                "Book Now via WhatsApp"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
