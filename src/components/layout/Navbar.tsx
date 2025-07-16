
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">Plantéra</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
            Accueil
          </Link>
          <Link to="/#services" className="text-foreground hover:text-primary transition-colors font-medium">
            Services
          </Link>
          <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
            Dashboard
          </Link>
          <Link to="/#contact" className="text-foreground hover:text-primary transition-colors font-medium">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Notifications</h4>
                <div className="text-sm text-muted-foreground">
                  Vous n'avez pas de nouvelles notifications.
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full">
                <User className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <p className="font-medium">Jean Dupont</p>
                  <p className="text-sm text-muted-foreground">jean@example.com</p>
                </div>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">Mon profil</Button>
                  <Button variant="ghost" className="w-full justify-start">Paramètres</Button>
                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">Se déconnecter</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button className="bg-primary hover:bg-primary/90 shadow-md transition-all duration-300">
            Se connecter
          </Button>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            S'inscrire
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Notifications</h4>
                <div className="text-sm text-muted-foreground">
                  Vous n'avez pas de nouvelles notifications.
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button size="icon" variant="ghost" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md py-4 border-t border-border animate-fade-in">
          <div className="container flex flex-col gap-4">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={toggleMenu}
            >
              Accueil
            </Link>
            <Link
              to="/#services"
              className="text-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/dashboard"
              className="text-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/#contact"
              className="text-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Button className="bg-primary hover:bg-primary/90 shadow-md transition-all duration-300 w-full">
                Se connecter
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
