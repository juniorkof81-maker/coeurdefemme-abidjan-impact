import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ActionsPreview = () => {
  const recentActions = [
    {
      title: "Distribution de nourriture - Quartier Abobo",
      date: "15 Décembre 2024",
      location: "Abobo, Abidjan",
      beneficiaries: 150,
      description: "Distribution de repas chauds et de vivres aux familles dans le besoin",
      status: "Réalisée",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      title: "Soutien scolaire pour enfants",
      date: "20 Décembre 2024",
      location: "Cocody, Abidjan",
      beneficiaries: 80,
      description: "Fournitures scolaires et livres pour la rentrée",
      status: "En cours",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      title: "Visite médicale gratuite",
      date: "25 Décembre 2024",
      location: "Yopougon, Abidjan",
      beneficiaries: 200,
      description: "Consultations médicales gratuites et distribution de médicaments",
      status: "Planifiée",
      statusColor: "bg-gold-light text-gold-foreground"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Nos </span>
            <span className="gradient-warm bg-clip-text text-transparent">actions récentes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment nous transformons des vies et apportons de l'espoir dans les communautés d'Abidjan et au-delà.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentActions.map((action, index) => (
            <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={action.statusColor}>
                    {action.status}
                  </Badge>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Users className="w-4 h-4 mr-1" />
                      {action.beneficiaries}
                    </div>
                    <div className="text-xs text-muted-foreground">bénéficiaires</div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {action.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  {action.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {action.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {action.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Témoignage */}
        <div className="mb-12">
          <Card className="max-w-4xl mx-auto shadow-soft">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">😊</span>
                </div>
                <blockquote className="text-lg lg:text-xl text-foreground italic mb-4">
                  "Grâce à l'ONG Cœur de Femme, mes enfants ont pu retourner à l'école avec tout le matériel nécessaire. Leur sourire n'a pas de prix."
                </blockquote>
                <p className="text-muted-foreground font-medium">
                  Aminata K., mère de famille à Abobo
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild className="shadow-soft">
            <Link to="/actions">
              Voir toutes nos actions
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActionsPreview;