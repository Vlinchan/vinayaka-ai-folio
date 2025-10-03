import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Vlinchan",
    icon: Github,
  },
  {
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/Vinayaka-Linchan-14747926b/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:vinayakalinchan@gmail.com",
    icon: Mail,
  },
];

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              Vinayaka Linchan
            </button>
            <p className="mt-4 text-muted-foreground max-w-md">
              AI & ML Engineer in training, passionate about building computer vision 
              and real-time applications. Always learning, always growing.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Get in Touch</h3>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Open to opportunities
              </p>
              <a
                href="mailto:vinayakalinchan@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors block"
              >
                vinayakalinchan@gmail.com
              </a>
              <p className="text-sm text-muted-foreground">
                Karnataka, India
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vinayaka Linchan. All rights reserved.
            </p>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>using React & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}