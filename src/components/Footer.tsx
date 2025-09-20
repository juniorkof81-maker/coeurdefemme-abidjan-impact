import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/logo-ong.png" alt="ONG COEUR DE FEMME" className="h-12 w-auto" />
              <div>
                <h3 className="font-bold text-lg text-primary">ONG COEUR DE FEMME</h3>
                <p className="text-sm text-muted-foreground">Donner du sourire</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Nous devenons des Pères Noël chez vous 🎗 pour apporter sourires, espoir et chaleur humaine aux enfants, femmes et hommes qui en ont besoin.
            </p>
          </div>

          {/* Navigation rapide */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { name: "À propos", href: "/about" },
                { name: "Nos actions", href: "/actions" },
                { name: "Nous aider", href: "/help" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-warm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Cocody, Abidjan<br />
                  Côte d'Ivoire
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+2250709347858" className="text-sm text-muted-foreground hover:text-primary transition-warm">
                  +225 07 09 34 78 58
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:coeurdefemme9@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-warm">
                  coeurdefemme9@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Suivez-nous */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Suivez-nous</h4>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-accent rounded-lg hover:bg-primary hover:text-primary-foreground transition-warm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-accent rounded-lg hover:bg-primary hover:text-primary-foreground transition-warm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-accent rounded-lg hover:bg-primary hover:text-primary-foreground transition-warm">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4">
              <Link
                to="/help"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-soft transition-warm text-sm font-medium"
              >
                <Heart className="w-4 h-4 mr-2" />
                Faire un don
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 ONG COEUR DE FEMME. Tous droits réservés. Fait avec ❤️ pour donner du sourire.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;