import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import vinayakaPortrait from "@/assets/vinayaka-portrait.jpg";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Vinayaka_Linchan_Resume.pdf';
    link.download = 'Vinayaka_Linchan_Resume.pdf';
    link.click();
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 animate-fade-up">
            <div className="mx-auto w-32 h-32 mb-8 relative">
              <img
                src={vinayakaPortrait}
                alt="Vinayaka Linchan"
                className="w-full h-full rounded-full object-cover shadow-glow border-2 border-primary/20"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-glow-pulse"></div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">Vinayaka Linchan</span>
              <span className="block text-gradient mt-2">AI & ML Engineer</span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Building computer vision and real-time applications. Passionate about 
              artificial intelligence and machine learning technologies.
            </p>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-up">
            <Button 
              onClick={() => scrollToSection("#projects")}
              className="btn-primary text-base px-8 py-3"
            >
              See Projects
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadResume}
              className="btn-outline text-base px-8 py-3"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 animate-fade-up">
            <a
              href="https://github.com/vinayaka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/vinayaka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#about")}
              className="p-2 hover:bg-secondary/50"
              aria-label="Scroll to About section"
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}