import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Rejoignez notre </span>
            <span className="gradient-warm bg-clip-text text-transparent">mission</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Votre soutien peut transformer des vies. Découvrez les différentes façons de nous aider à répandre plus de sourires.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Faire un don */}
          <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2 gradient-soft border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-warm rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Faire un don 💝
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Votre générosité nous permet de continuer à apporter de la joie et de l'espoir. Chaque don, petit ou grand, fait la différence.
              </p>

              <div className="space-y-3 mb-6">
                <div className="text-sm text-muted-foreground">Moyens de paiement acceptés :</div>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-gold-light text-gold-foreground rounded-full text-xs font-medium">
                    Orange Money
                  </span>
                  <span className="px-3 py-1 bg-gold-light text-gold-foreground rounded-full text-xs font-medium">
                    MTN Money
                  </span>
                  <span className="px-3 py-1 bg-gold-light text-gold-foreground rounded-full text-xs font-medium">
                    Wave
                  </span>
                  <span className="px-3 py-1 bg-gold-light text-gold-foreground rounded-full text-xs font-medium">
                    PayPal
                  </span>
                </div>
              </div>

              <Button className="w-full shadow-warm" asChild>
                <Link to="/help">
                  Faire un don maintenant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Devenir bénévole */}
          <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-gold rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-gold-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Devenir bénévole 🙋‍♀️
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Donnez de votre temps et de votre énergie pour participer directement à nos missions. Ensemble, nous sommes plus forts.
              </p>

              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div>✓ Formation gratuite</div>
                <div>✓ Flexibilité des horaires</div>
                <div>✓ Impact direct sur les communautés</div>
                <div>✓ Expérience enrichissante</div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/help">
                  Rejoindre l'équipe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Nous contacter */}
          <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-10 h-10 text-secondary-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Nous contacter 📞
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Des questions ? Une idée de partenariat ? Nous sommes à votre écoute pour construire ensemble un avenir meilleur.
              </p>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center justify-center text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  +225 07 09 34 78 58
                </div>
                <div className="text-muted-foreground">
                  coeurdefemme9@gmail.com
                </div>
                <div className="text-muted-foreground">
                  Cocody, Abidjan
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact">
                  Prendre contact
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Message d'urgence ou d'appel spécial */}
        <div className="mt-16">
          <Card className="gradient-warm text-primary-foreground shadow-warm">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                🎄 Campagne spéciale de fin d'année
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Cette saison des fêtes, aidez-nous à devenir des Pères Noël pour encore plus de familles. 
                Objectif : 1000 sourires avant le 31 décembre !
              </p>
              <div className="flex justify-center items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">847</div>
                  <div className="text-sm opacity-75">sourires donnés</div>
                </div>
                <div className="text-4xl">🎯</div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1000</div>
                  <div className="text-sm opacity-75">objectif</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;