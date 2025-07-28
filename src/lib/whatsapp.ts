/**
 * WhatsApp Integration Utility
 * Handles sending messages to WhatsApp across different devices and platforms
 */

export interface WhatsAppMessage {
  phone: string;
  message: string;
}

/**
 * Detects if the user is on a mobile device
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Detects if WhatsApp is installed on the device
 */
export const isWhatsAppInstalled = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isMobileDevice()) {
      resolve(false);
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'whatsapp://';
    
    let timeout: NodeJS.Timeout;
    
    const cleanup = () => {
      clearTimeout(timeout);
      document.body.removeChild(iframe);
    };

    timeout = setTimeout(() => {
      cleanup();
      resolve(false);
    }, 1000);

    iframe.onload = () => {
      cleanup();
      resolve(true);
    };

    document.body.appendChild(iframe);
  });
};

/**
 * Opens WhatsApp with a pre-filled message
 * Tries multiple methods to ensure the best user experience
 */
export const sendWhatsAppMessage = async ({ phone, message }: WhatsAppMessage): Promise<boolean> => {
  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = phone.replace(/[^\d]/g, ''); // Remove non-numeric characters
  
  try {
    const mobile = isMobileDevice();
    const whatsappInstalled = mobile ? await isWhatsAppInstalled() : false;

    if (mobile && whatsappInstalled) {
      // Method 1: Try to open WhatsApp app directly (mobile with app installed)
      const appUrl = `whatsapp://send?phone=${cleanPhone}&text=${encodedMessage}`;
      window.location.href = appUrl;
      return true;
    } else if (mobile) {
      // Method 2: Use WhatsApp API for mobile without app
      const mobileUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
      window.open(mobileUrl, '_blank', 'noopener,noreferrer');
      return true;
    } else {
      // Method 3: Use WhatsApp Web for desktop
      const webUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
      
      // Try to open in the same tab first
      const newWindow = window.open(webUrl, '_blank', 'noopener,noreferrer');
      
      if (newWindow) {
        // Focus the new window
        newWindow.focus();
        return true;
      } else {
        // Fallback: change current location
        window.location.href = webUrl;
        return true;
      }
    }
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
    
    // Ultimate fallback: use the basic API URL
    const fallbackUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    return false;
  }
};

/**
 * Creates a formatted WhatsApp message for booking requests
 */
export const formatBookingMessage = (data: any): string => {
  const message = `🏛️ *NEW BOOKING REQUEST - DISCOVER GUJARAT*

👤 *Personal Details:*
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

🗺️ *Trip Details:*
Destination: ${data.destination}
Check-in Date: ${data.checkIn}
Check-out Date: ${data.checkOut}
Number of Guests: ${data.guests}
Travel Type: ${data.travelType}

🏨 *Accommodation:*
Room Type: ${data.roomType || 'Not specified'}
Budget Range: ${data.budget || 'Not specified'}

📝 *Special Requests:*
${data.specialRequests || 'None'}

✅ Terms & Conditions: Agreed

---
*Thank you for choosing Discover Gujarat! We'll get back to you within 24 hours with a customized itinerary and pricing.*

*Booking ID: ${Date.now()}*`;

  return message;
};

/**
 * Creates a formatted WhatsApp message for general enquiries
 */
export const formatEnquiryMessage = (data: any): string => {
  const message = `📞 *NEW ENQUIRY - DISCOVER GUJARAT*

👤 *Contact Details:*
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

🗺️ *Interest:*
Destination: ${data.destination}

📝 *Message:*
${data.message}

---
*Thank you for your interest in Gujarat! We'll respond to your enquiry shortly.*

*Enquiry ID: ${Date.now()}*`;

  return message;
};

/**
 * Validates phone number format
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

/**
 * Formats phone number for WhatsApp (adds country code if missing)
 */
export const formatPhoneNumber = (phone: string, defaultCountryCode: string = '91'): string => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  
  if (cleanPhone.startsWith(defaultCountryCode)) {
    return cleanPhone;
  }
  
  if (cleanPhone.length === 10) {
    return defaultCountryCode + cleanPhone;
  }
  
  return cleanPhone;
};
