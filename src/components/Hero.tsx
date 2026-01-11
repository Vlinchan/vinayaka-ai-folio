import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import vinayakaPortrait from "@/assets/vinayaka-portrait.jpg";
import { Robot3D } from "./Robot3D";

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid scanlines">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(180_100%_50%_/_0.1),_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(320_100%_60%_/_0.1),_transparent_50%)]"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8 animate-fade-up">
              <div className="mx-auto lg:mx-0 w-32 h-32 mb-8 relative">
                <img
                  src={vinayakaPortrait}
                  alt="Vinayaka Linchan"
                  className="w-full h-full rounded-sm object-cover border-2 border-primary/50 shadow-neon-cyan"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 animate-glow-pulse"></div>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl uppercase">
                <span className="block text-foreground glitch" data-text="Vinayaka Linchan">Vinayaka Linchan</span>
                <span className="block text-gradient mt-2">AI & ML Engineer</span>
              </h1>
              
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Building <span className="text-neon-cyan">computer vision</span> and <span className="text-neon-magenta">real-time applications</span>. Passionate about 
                artificial intelligence and machine learning technologies.
              </p>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-up">
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
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 animate-fade-up">
              <a
                href="https://github.com/Vlinchan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary hover:shadow-neon-cyan transition-all duration-300 p-2 border border-primary/30 hover:border-primary"
                aria-label="GitHub Profile"
                style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/Vinayaka-Linchan-14747926b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent hover:shadow-neon-magenta transition-all duration-300 p-2 border border-accent/30 hover:border-accent"
                aria-label="LinkedIn Profile"
                style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Right side - 3D Robot */}
          <div className="hidden lg:block h-[500px] relative">
            <div className="absolute inset-0 border border-primary/20 bg-background/30 backdrop-blur-sm"
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
            >
              <Robot3D />
            </div>
            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-accent"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-accent"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary"></div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            onClick={() => scrollToSection("#about")}
            className="p-2 hover:bg-primary/10 border border-primary/30 hover:border-primary hover:shadow-neon-cyan transition-all duration-300"
            aria-label="Scroll to About section"
          >
            <ArrowDown className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>
    </section>
  );
}