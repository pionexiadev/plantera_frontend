import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">Plantéra</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Révolutionnez votre agriculture avec notre plateforme intelligente et durable.
            </p>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard/cultures" className="text-muted-foreground hover:text-primary transition-colors">Gestion des cultures</Link></li>
              <li><Link to="/dashboard/livestock" className="text-muted-foreground hover:text-primary transition-colors">Élevage</Link></li>
              <li><Link to="/dashboard/irrigation" className="text-muted-foreground hover:text-primary transition-colors">Irrigation IoT</Link></li>
              <li><Link to="/dashboard/analytics" className="text-muted-foreground hover:text-primary transition-colors">Analytics</Link></li>
              <li><Link to="/dashboard/marketplace" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard/training" className="text-muted-foreground hover:text-primary transition-colors">Formation</Link></li>
              <li><Link to="/dashboard/ai" className="text-muted-foreground hover:text-primary transition-colors">Assistant IA</Link></li>
              <li><Link to="/dashboard/settings" className="text-muted-foreground hover:text-primary transition-colors">Paramètres</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@plantera.sn</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+221 77 123 45 67</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Dakar, Sénégal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Plantéra. Tous droits réservés. Fait avec ❤️ pour l'agriculture sénégalaise.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;