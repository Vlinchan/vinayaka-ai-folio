import { Brain, Target, Users, Zap } from "lucide-react";

const features = [
  {
    name: "Self-Learner",
    description: "Continuously exploring new AI/ML technologies and staying updated with industry trends.",
    icon: Brain,
  },
  {
    name: "Goal-Oriented",
    description: "Career-focused with clear objectives to support family and build expertise in AI/ML.",
    icon: Target,
  },
  {
    name: "Team Player",
    description: "Collaborative approach to problem-solving and effective communication skills.",
    icon: Users,
  },
  {
    name: "Fast Learner",
    description: "Quick to adapt and implement new concepts in practical AI/ML applications.",
    icon: Zap,
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Me
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Passionate AI & ML student focused on building practical solutions
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg leading-relaxed text-foreground">
                  I'm a dedicated computer science student specializing in Artificial Intelligence 
                  and Machine Learning. Currently pursuing my degree while actively working on 
                  real-world projects that combine theoretical knowledge with practical applications.
                </p>
                
                <p className="text-lg leading-relaxed text-foreground">
                  My motivation stems from a desire to support my family while building a 
                  successful career in technology. I focus on computer vision, real-time 
                  applications, and machine learning solutions that solve meaningful problems.
                </p>
              </div>
            </div>
            
            <div className="animate-fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={feature.name}
                      className="card-elevated p-6 rounded-lg hover:shadow-glow/20 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground">{feature.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}