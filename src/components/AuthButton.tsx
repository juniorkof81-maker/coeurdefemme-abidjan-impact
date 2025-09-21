import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthButtonProps {
  mobile?: boolean;
  onMobileMenuClose?: () => void;
}

export default function AuthButton({ mobile = false, onMobileMenuClose }: AuthButtonProps) {
  const { user, signOut, loading } = useAuth();

  if (loading) return null;

  if (user) {
    if (mobile) {
      return (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => {
            signOut();
            onMobileMenuClose?.();
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Se déconnecter
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4 mr-2" />
            Mon compte
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (mobile) {
    return (
      <Button variant="outline" className="w-full" asChild>
        <Link to="/auth" onClick={onMobileMenuClose}>
          <User className="w-4 h-4 mr-2" />
          Connexion
        </Link>
      </Button>
    );
  }

  return (
    <Button size="sm" asChild>
      <Link to="/auth">
        <User className="w-4 h-4 mr-2" />
        Connexion
      </Link>
    </Button>
  );
}