import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Gift, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background avec gradient */}
      <div className="absolute inset-0 gradient-soft"></div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu principal */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gold-light rounded-full text-gold-foreground text-sm font-medium">
                🎗 ONG humanitaire depuis Abidjan
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Nous devenons des</span>
                <br />
                <span className="gradient-warm bg-clip-text text-transparent">Pères Noël</span>
                <br />
                <span className="text-foreground">chez vous</span>
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Notre mission : <strong className="text-primary">Donner du sourire</strong> aux enfants, femmes et hommes qui en ont besoin. 
                Ensemble, apportons de la joie et de l'espoir dans chaque foyer.
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/help">
                  <Gift className="w-5 h-5 mr-2" />
                  Faire un don 💝
                </Link>
              </Button>
              
              <Button variant="gold" size="lg" asChild>
                <Link to="/help">
                  <Users className="w-5 h-5 mr-2" />
                  Nous rejoindre 🙋‍♀️
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Nous contacter 📞
                </Link>
              </Button>
            </div>

            {/* Statistiques d'impact */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Familles aidées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Missions réalisées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Sourires donnés</div>
              </div>
            </div>
          </div>

          {/* Image héro */}
          <div className="relative">
            <Card className="overflow-hidden shadow-warm">
              <img 
                src="/hero-humanitarian.jpg" 
                alt="ONG Cœur de Femme apporte sourires et espoir aux familles" 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm font-medium text-foreground">
                    "Chaque sourire compte, chaque geste a de l'importance"
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    - ONG Cœur de Femme
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;