import { useState } from "react";
import { Menu, X, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/about" },
    { name: "Nos actions", href: "/actions" },
    { name: "Nous aider", href: "/help" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 transition-warm hover:scale-105">
            <img src="/logo-ong.png" alt="ONG COEUR DE FEMME" className="h-10 w-auto" />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-primary">ONG COEUR DE FEMME</h1>
              <p className="text-xs text-muted-foreground">Donner du sourire</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-warm relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/help">
                <Heart className="w-4 h-4 mr-2" />
                Faire un don
              </Link>
            </Button>
            
            {!loading && (
              user ? (
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
              ) : (
                <Button size="sm" asChild>
                  <Link to="/auth">
                    <User className="w-4 h-4 mr-2" />
                    Connexion
                  </Link>
                </Button>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-accent transition-warm"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-warm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4 space-y-2">
                <Button className="w-full" asChild>
                  <Link to="/help" onClick={() => setIsMenuOpen(false)}>
                    <Heart className="w-4 h-4 mr-2" />
                    Faire un don
                  </Link>
                </Button>
                
                {!loading && (
                  user ? (
                    <Button variant="outline" className="w-full" onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Se déconnecter
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <User className="w-4 h-4 mr-2" />
                        Connexion
                      </Link>
                    </Button>
                  )
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;