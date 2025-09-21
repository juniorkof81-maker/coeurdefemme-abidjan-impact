import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Home, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [donationData, setDonationData] = useState<any>(null);

  useEffect(() => {
    const reference = searchParams.get('reference');
    
    if (reference) {
      verifyDonation(reference);
    } else {
      setVerificationStatus('failed');
    }
  }, [searchParams]);

  const verifyDonation = async (reference: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-donation', {
        body: { reference }
      });

      if (error) {
        throw error;
      }

      if (data.success && data.status === 'success') {
        setVerificationStatus('success');
        setDonationData(data);
      } else {
        setVerificationStatus('failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('failed');
    }
  };

  if (verificationStatus === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-bold mb-2">Vérification en cours...</h2>
            <p className="text-muted-foreground">Nous vérifions votre paiement</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md shadow-warm">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-600">Don réussi ! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">
              Merci <strong>{donationData?.metadata?.donor_name}</strong> pour votre générosité !
            </p>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Montant du don</p>
              <p className="text-2xl font-bold text-green-600">
                {donationData?.amount?.toLocaleString()} FCFA
              </p>
            </div>

            {donationData?.metadata?.message && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Votre message</p>
                <p className="italic">"{donationData.metadata.message}"</p>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <p>Vous recevrez un reçu par email à :</p>
              <p className="font-medium">{donationData?.customer?.email}</p>
            </div>

            <div className="pt-4 space-y-3">
              <Button asChild className="w-full">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/help">
                  <Heart className="w-4 h-4 mr-2" />
                  Faire un autre don
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-2xl text-red-600">Échec du paiement</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>Le paiement n'a pas pu être traité. Veuillez réessayer.</p>
          
          <div className="pt-4 space-y-3">
            <Button asChild className="w-full">
              <Link to="/help">
                <Heart className="w-4 h-4 mr-2" />
                Réessayer le don
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationSuccess;