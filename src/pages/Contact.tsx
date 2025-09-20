import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, Heart } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 gradient-soft">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-foreground">Contactez-</span>
                <span className="gradient-warm bg-clip-text text-transparent">nous</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Nous sommes là pour répondre à vos questions, écouter vos idées et explorer 
                ensemble comment nous pouvons créer plus de sourires.
              </p>
            </div>
          </div>
        </section>

        {/* Informations de contact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulaire de contact */}
              <div>
                <Card className="shadow-warm">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-foreground">
                      Envoyez-nous un message
                    </h2>
                    
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Prénom *</Label>
                          <Input 
                            id="firstName" 
                            placeholder="Votre prénom"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Nom *</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Votre nom"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="votre.email@exemple.com"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+225 XX XX XX XX XX"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject">Sujet *</Label>
                        <Input 
                          id="subject" 
                          placeholder="Objet de votre message"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Partagez-nous votre message, vos questions ou vos idées..."
                          rows={5}
                          className="mt-1"
                        />
                      </div>

                      <Button className="w-full shadow-warm">
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Informations de contact */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">
                    Nos coordonnées
                  </h2>
                  <div className="space-y-6">
                    <Card className="hover:shadow-soft transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                            <p className="text-muted-foreground">
                              Cocody, Abidjan<br />
                              Côte d'Ivoire
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-soft transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-6 h-6 text-gold" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                            <a 
                              href="tel:+2250709347858" 
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              +225 07 09 34 78 58
                            </a>
                            <p className="text-sm text-muted-foreground mt-1">
                              Disponible 24h/7j pour les urgences
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-soft transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Email</h3>
                            <a 
                              href="mailto:coeurdefemme9@gmail.com" 
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              coeurdefemme9@gmail.com
                            </a>
                            <p className="text-sm text-muted-foreground mt-1">
                              Réponse sous 24-48h
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-soft transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Horaires</h3>
                            <div className="text-muted-foreground text-sm space-y-1">
                              <p>Lundi - Vendredi : 8h00 - 18h00</p>
                              <p>Samedi : 9h00 - 16h00</p>
                              <p>Dimanche : Urgences uniquement</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Message d'encouragement */}
                <Card className="gradient-soft shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">
                      Votre voix compte
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Chaque message que nous recevons nous aide à mieux comprendre les besoins 
                      de notre communauté et à améliorer nos actions. N'hésitez pas à nous écrire !
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ rapide */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Questions fréquentes
              </h2>
              <p className="text-muted-foreground">
                Trouvez rapidement des réponses aux questions les plus courantes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "Comment puis-je faire un don ?",
                  answer: "Vous pouvez faire un don via Orange Money, MTN Money, Wave ou PayPal. Contactez-nous pour obtenir les détails de paiement."
                },
                {
                  question: "Comment devenir bénévole ?",
                  answer: "Contactez-nous par téléphone ou email. Nous organisons des sessions d'orientation régulières pour accueillir de nouveaux bénévoles."
                },
                {
                  question: "Dans quelles zones intervenez-vous ?",
                  answer: "Nous intervenons principalement à Abidjan et ses environs, mais nous étudions toute demande d'aide dans d'autres régions de Côte d'Ivoire."
                },
                {
                  question: "Comment proposer un partenariat ?",
                  answer: "Envoyez-nous un email détaillant votre proposition. Nous étudions toutes les opportunités de collaboration pour maximiser notre impact."
                }
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-soft transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;