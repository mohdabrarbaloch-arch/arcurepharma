export const CONTACT_CONFIG = {
  // Owner Contact Information
  ownerWhatsApp: '923162647620',
  ownerWhatsAppFormatted: '0316 2647620',
  ownerWhatsAppInternational: '+92 316 2647620',
  ownerEmail: 'faizanfaisal12345@gmail.com',
  companyEmail: 'arcurepharma3007@gmail.com',
  officialEmail: 'info@arcurepharma.com',
  website: 'https://arcurepharma.com',
  websiteDisplay: 'arcurepharma.com',
  address: 'Plot No. E99/B, Site Super Highway, Karachi, Pakistan',
  
  // Helpers
  getWhatsAppUrl: (message?: string) => {
    const baseUrl = `https://wa.me/923162647620`;
    if (!message) return baseUrl;
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  },
  
  getTelUrl: () => `tel:+923162647620`,
  getMailtoUrl: (subject?: string) => {
    const email = 'faizanfaisal12345@gmail.com';
    if (!subject) return `mailto:${email}`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  },
};
