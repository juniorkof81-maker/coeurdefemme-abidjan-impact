import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Handshake, Smile } from "lucide-react";

const MissionSection = () => {
  const missions = [
    {
      icon: Heart,
      title: "Notre mission",
      description: "Donner du sourire aux enfants, femmes et hommes qui en ont besoin",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Notre combat",
      description: "Visiter le plus d'endroits possible pour répandre la joie et l'espoir",
      color: "text-gold"
    },
    {
      icon: Handshake,
      title: "Nos moyens",
      description: "Votre aide et votre cœur ❤️ sont nos plus précieux atouts",
      color: "text-secondary"
    },
    {
      icon: Smile,
      title: "Notre vision",
      description: "Un monde où chaque personne peut retrouver le sourire et l'espoir",
      color: "text-primary-soft"
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Notre </span>
            <span className="gradient-warm bg-clip-text text-transparent">engagement</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les valeurs qui nous animent et l'impact que nous créons ensemble dans les communautés que nous servons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${mission.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {mission.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {mission.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Citation inspirante */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto shadow-soft">
            <CardContent className="p-8">
              <blockquote className="text-2xl lg:text-3xl font-light text-foreground italic mb-4">
                "La générosité consiste moins à donner beaucoup qu'à donner à propos."
              </blockquote>
              <p className="text-muted-foreground">
                Cette philosophie guide chacune de nos actions et nous rappelle que chaque geste compte.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;