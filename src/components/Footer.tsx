
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from 'lucide-react'; // Using Lucide icons for consistency

const Footer = () => {
  const socialLinks = [
    { name: "Facebook", href: "#", icon: <Facebook size={20} /> },
    { name: "Instagram", href: "#", icon: <Instagram size={20} /> },
    { name: "Twitter", href: "#", icon: <Twitter size={20} /> },
  ];

  const footerSections = [
    {
      title: "Categories",
      ariaLabel: "Browse rental categories",
      links: [
        { name: "Fashion & Beauty", href: "#" },
        { name: "Pets & Animals", href: "#" },
        { name: "Furniture & Decor", href: "#" },
        { name: "Heavy Equipment", href: "#" },
        { name: "Events & Entertainment", href: "#" },
      ],
    },
    {
      title: "About",
      ariaLabel: "Learn more about Rentiverse",
      links: [
        { name: "How It Works", href: "#" },
        { name: "List Your Rental", href: "#" },
        { name: "Trust & Safety", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "About Us", href: "#" },
      ],
    },
    {
      title: "Support",
      ariaLabel: "Get help and support",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Accessibility", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Rentiverse Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rentiverse</h3>
            <p className="text-gray-400 mb-4 text-sm">
              The universe of all things rentable. Find anything you need, rent it for as long as you want.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`Visit Rentiverse on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.ariaLabel}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Rentiverse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
