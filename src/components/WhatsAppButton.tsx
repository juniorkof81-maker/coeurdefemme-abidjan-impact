import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "2250709347858"; // +225 07 09 34 78 58
  const message = "Bonjour ! Je souhaite obtenir plus d'informations sur ONG COEUR DE FEMME.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        asChild
      >
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter via WhatsApp"
        >
          <MessageCircle className="w-8 h-8" />
        </a>
      </Button>
    </div>
  );
};

export default WhatsAppButton;