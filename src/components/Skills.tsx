import { useEffect, useRef, useState } from "react";

const technicalSkills = [
  { name: "Python", level: 75, category: "Programming" },
  { name: "OpenCV", level: 70, category: "Computer Vision" },
  { name: "Machine Learning", level: 65, category: "AI/ML" },
  { name: "Scratch", level: 65, category: "Programming" },
  { name: "C/C++", level: 60, category: "Programming" },
  { name: "Java", level: 55, category: "Programming" },
  { name: "Blender", level: 55, category: "Design/3D" },
  { name: "Figma", level: 60, category: "Design" },
  { name: "Git", level: 65, category: "Tools" },
  { name: "HTML/CSS/JS", level: 55, category: "Web" },
];

const softSkills = [
  "Problem Solving",
  "Critical Thinking", 
  "Team Collaboration",
  "Fast Learning",
  "Adaptability",
  "Communication",
  "Project Management",
  "Research Skills",
];

const SkillBar = ({ skill, index }: { skill: typeof technicalSkills[0]; index: number }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), index * 100);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="skill-bar h-2">
        <div
          className={`skill-progress h-full transition-all duration-1000 ease-out ${
            animated ? '' : 'w-0'
          }`}
          style={{ width: animated ? `${skill.level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Skills & Expertise
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Technical proficiencies and soft skills that drive my AI/ML projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Technical Skills */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-8 text-foreground">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
          
          {/* Soft Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-8 text-foreground">Soft Skills</h3>
            <div className="space-y-4">
              {softSkills.map((skill, index) => (
                <div
                  key={skill}
                  className="card-elevated p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow/20 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-sm font-medium text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Skills Categories Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 card-elevated rounded-lg">
            <div className="text-2xl font-bold text-primary mb-2">4+</div>
            <div className="text-sm text-muted-foreground">Programming Languages</div>
          </div>
          <div className="text-center p-6 card-elevated rounded-lg">
            <div className="text-2xl font-bold text-primary mb-2">3+</div>
            <div className="text-sm text-muted-foreground">AI/ML Frameworks</div>
          </div>
          <div className="text-center p-6 card-elevated rounded-lg">
            <div className="text-2xl font-bold text-primary mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center p-6 card-elevated rounded-lg">
            <div className="text-2xl font-bold text-primary mb-2">2+</div>
            <div className="text-sm text-muted-foreground">Years Learning</div>
          </div>
        </div>
      </div>
    </section>
  );
}