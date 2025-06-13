'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Users,
  Camera,
  Star
} from 'lucide-react';
import Link from 'next/link';

const footerSections = [
  {
    title: 'Modèles',
    links: [
      { title: 'Tous les Modèles', href: '/models' },
      { title: 'Mannequins', href: '/models?category=mannequin' },
      { title: 'Hôtesses d\'Accueil', href: '/models?category=hotesse' },
      { title: 'Vlogueuses', href: '/models?category=vlogueuse' }
    ]
  },
  {
    title: 'Contributeurs',
    links: [
      { title: 'Photographes', href: '/contributors/photographers' },
      { title: 'Infographes', href: '/contributors/infographes' },
      { title: 'Coiffeurs', href: '/contributors/coiffeurs' },
      { title: 'Stylistes', href: '/contributors/stylistes' }
    ]
  },
  {
    title: 'Entreprise',
    links: [
      { title: 'À Propos', href: '/about' },
      { title: 'Nos Services', href: '/services' },
      { title: 'Carrières', href: '/careers' },
      { title: 'Presse', href: '/press' }
    ]
  },
  {
    title: 'Support',
    links: [
      { title: 'Centre d\'Aide', href: '/help' },
      { title: 'Contact', href: '/contact' },
      { title: 'Conditions d\'Utilisation', href: '/terms' },
      { title: 'Politique de Confidentialité', href: '/privacy' }
    ]
  }
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Restez Informé des Dernières Opportunités
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Recevez les dernières offres de missions, les nouveaux profils et les actualités de notre plateforme
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100 font-medium">
                S'Abonner
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Elite Models</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              La plateforme de référence pour connecter les talents créatifs avec les professionnels de l'industrie. 
              Découvrez et collaborez avec les meilleurs modèles et contributeurs.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-purple-400" />
                contact@elitemodels.fr
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-purple-400" />
                +33 1 23 45 67 89
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-purple-400" />
                Paris, France
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-gray-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="h-4 w-4" />
              <span className="text-sm">500+ Professionnels</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Camera className="h-4 w-4" />
              <span className="text-sm">2000+ Projets</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Star className="h-4 w-4" />
              <span className="text-sm">4.9/5 Satisfaction</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; 2024 Elite Models & Contributors Platform. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}