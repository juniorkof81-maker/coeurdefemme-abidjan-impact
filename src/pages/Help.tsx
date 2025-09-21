import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, CreditCard, Smartphone, Banknote, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const HelpPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    donorName: "",
    amount: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.donorName || !formData.amount) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-donation', {
        body: {
          email: formData.email,
          donorName: formData.donorName,
          amount: parseFloat(formData.amount),
          message: formData.message
        }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        // Redirect to Paystack payment page
        window.location.href = data.authorization_url;
      } else {
        throw new Error(data.error || "Erreur lors de l'initialisation du paiement");
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const quickAmounts = [5000, 10000, 25000, 50000, 100000];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Aidez-nous à </span>
            <span className="gradient-warm bg-clip-text text-transparent">répandre des sourires</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Votre générosité transforme des vies. Chaque don, petit ou grand, nous rapproche de notre mission : 
            devenir des Pères Noël toute l'année pour ceux qui en ont besoin.
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              <span>+1000 familles aidées</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              <span>847 sourires cette année</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Donation Form */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Heart className="w-6 h-6 mr-2 text-red-500" />
                Faire un don
              </CardTitle>
              <CardDescription>
                Votre contribution nous aide à continuer notre mission humanitaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDonation} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre.email@exemple.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donorName">Nom complet *</Label>
                  <Input
                    id="donorName"
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Montant du don (FCFA) *</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        className="h-12"
                        onClick={() => setFormData({...formData, amount: amount.toString()})}
                      >
                        {amount.toLocaleString()} F
                      </Button>
                    ))}
                  </div>
                  <Input
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Montant personnalisé"
                    min="500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (optionnel)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Un petit mot d'encouragement..."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg shadow-warm"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Traitement..." : "Procéder au paiement"}
                  <CreditCard className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Payment Methods & Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-6 h-6 mr-2" />
                  Moyens de paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center p-3 border rounded-lg">
                    <Smartphone className="w-8 h-8 mr-3 text-orange-500" />
                    <span className="font-medium">Orange Money</span>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <Smartphone className="w-8 h-8 mr-3 text-yellow-500" />
                    <span className="font-medium">MTN Money</span>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <Smartphone className="w-8 h-8 mr-3 text-blue-500" />
                    <span className="font-medium">Wave</span>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <Banknote className="w-8 h-8 mr-3 text-green-500" />
                    <span className="font-medium">Carte bancaire</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Paiements sécurisés par <strong>Paystack</strong>
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-warm text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">🎯 Impact de votre don</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>5 000 F</span>
                    <span>1 repas pour 5 enfants</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10 000 F</span>
                    <span>Fournitures scolaires pour 1 enfant</span>
                  </div>
                  <div className="flex justify-between">
                    <span>25 000 F</span>
                    <span>Soins médicaux pour 1 famille</span>
                  </div>
                  <div className="flex justify-between">
                    <span>50 000 F</span>
                    <span>1 mois de nourriture pour 1 famille</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold mb-3">🔒 Sécurité & Transparence</h3>
                <p className="text-sm text-muted-foreground">
                  Tous les dons sont traités de manière sécurisée. Vous recevrez un reçu par email 
                  et pourrez suivre l'utilisation de votre contribution sur nos réseaux sociaux.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;