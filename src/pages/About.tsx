import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Award, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 gradient-soft">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-foreground">À propos de </span>
                <span className="gradient-warm bg-clip-text text-transparent">notre ONG</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Découvrez l'histoire, les valeurs et l'engagement qui animent l'ONG Cœur de Femme 
                dans sa mission de répandre sourires et espoir.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Fondée en 2020
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Cocody, Abidjan
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  500+ familles aidées
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  <span className="text-foreground">Notre </span>
                  <span className="text-primary">histoire</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    L'ONG Cœur de Femme est née d'une vision simple mais puissante : 
                    <strong className="text-foreground"> redonner le sourire à ceux qui l'ont perdu</strong>. 
                    Fondée en 2020 au cœur d'Abidjan, notre organisation s'inspire de la générosité 
                    et de la bienveillance qui caractérisent l'esprit de Noël.
                  </p>
                  <p>
                    Comme des Pères Noël modernes, nous visitons les communautés les plus vulnérables 
                    avec un seul objectif : apporter de la joie, de l'espoir et un soutien concret 
                    aux enfants, femmes et hommes qui en ont le plus besoin.
                  </p>
                  <p>
                    Depuis nos débuts, nous avons touché plus de 500 familles à travers Abidjan et 
                    ses environs, créant un réseau de solidarité qui grandit chaque jour.
                  </p>
                </div>
              </div>
              <div>
                <Card className="shadow-warm">
                  <CardContent className="p-0">
                    <img 
                      src="/logo-ong.png" 
                      alt="Logo ONG Cœur de Femme" 
                      className="w-full h-64 object-contain bg-accent/50 rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                <span className="text-foreground">Nos </span>
                <span className="text-primary">valeurs</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ces principes fondamentaux guident chacune de nos actions et définissent notre approche humanitaire.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Compassion",
                  description: "Nous agissons avec empathie et bienveillance envers chaque personne que nous rencontrons.",
                  color: "text-primary"
                },
                {
                  icon: Target,
                  title: "Impact",
                  description: "Chaque action vise un changement concret et durable dans la vie des bénéficiaires.",
                  color: "text-gold"
                },
                {
                  icon: Users,
                  title: "Solidarité",
                  description: "Nous croyons en la force du collectif et en l'importance du soutien mutuel.",
                  color: "text-secondary"
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description: "Nous nous engageons à fournir une aide de qualité avec professionnalisme.",
                  color: "text-primary-soft"
                }
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`w-8 h-8 ${value.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                <span className="text-foreground">Notre </span>
                <span className="text-primary">équipe</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Une équipe passionnée et dévouée qui travaille sans relâche pour transformer des vies et répandre l'espoir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  role: "Fondatrice & Présidente",
                  description: "Visionnaire de l'ONG, elle coordonne toutes les actions et maintient la mission au cœur de nos activités."
                },
                {
                  role: "Coordinateur Terrain",
                  description: "Il organise les missions sur le terrain et assure le suivi direct avec les communautés bénéficiaires."
                },
                {
                  role: "Responsable Partenariats",
                  description: "Elle développe les relations avec les partenaires et coordonne les campagnes de sensibilisation."
                }
              ].map((member, index) => (
                <Card key={index} className="group hover:shadow-soft transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl text-primary-foreground">👤</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {member.role}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Card className="max-w-2xl mx-auto shadow-soft">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    Rejoignez notre équipe !
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Nous recherchons constamment des bénévoles passionnés pour nous aider à étendre notre impact. 
                    Votre temps et vos compétences peuvent faire la différence.
                  </p>
                  <Button asChild>
                    <Link to="/help">
                      <Users className="w-4 h-4 mr-2" />
                      Devenir bénévole
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 gradient-warm text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ensemble, créons plus de sourires
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Votre soutien nous permet de continuer à apporter espoir et joie dans les communautés. 
              Chaque geste compte, chaque don fait la différence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-opacity-90" asChild>
                <Link to="/help">
                  <Heart className="w-5 h-5 mr-2" />
                  Faire un don
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-opacity-90" asChild>
                <Link to="/contact">
                  Nous contacter
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;