import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/booking-form";
import { motion, AnimatePresence } from "framer-motion";

export function EnquiryButton() {
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Button
            onClick={() => setBookingFormOpen(true)}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 touch-manipulation"
            size="icon"
          >
            <MessageSquarePlus className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Open booking form</span>
          </Button>
        </motion.div>
      </AnimatePresence>

      <BookingForm open={bookingFormOpen} onOpenChange={setBookingFormOpen} />
    </>
  );
}
