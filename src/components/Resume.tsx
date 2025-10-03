import { Download, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const education = [
  {
    id: 1,
    degree: "Bachelor of Technology in Computer Science",
    institution: "Engineering College",
    location: "India",
    duration: "2022 - 2026",
    description: "Specializing in Artificial Intelligence and Machine Learning with focus on computer vision and real-time applications.",
    gpa: "8.5/10",
    coursework: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Computer Vision", 
      "Artificial Intelligence",
      "Database Management Systems",
      "Software Engineering"
    ]
  },
  {
    id: 2,
    degree: "Higher Secondary Education",
    institution: "ABC Higher Secondary School",
    location: "India", 
    duration: "2020 - 2022",
    description: "Completed with distinction in Science stream with Mathematics, Physics, and Chemistry.",
    gpa: "92%",
    coursework: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Computer Science"
    ]
  }
];

const certifications = [
  "Machine Learning Specialization - Coursera",
  "Deep Learning Fundamentals - edX",
  "Python for Data Science - DataCamp",
  "Computer Vision Basics - Udacity"
];

const TimelineItem = ({ item, isLast }: { item: typeof education[0]; isLast: boolean }) => {
  return (
    <div className="relative">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        
        <div className="ml-6 flex-grow">
          <div className="card-elevated p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground">{item.degree}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {item.duration}
              </div>
            </div>
            
            <p className="text-primary font-medium mb-1">{item.institution}</p>
            <p className="text-sm text-muted-foreground mb-3">{item.location}</p>
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {item.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">GPA: {item.gpa}</span>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Key Coursework:</h4>
              <div className="flex flex-wrap gap-2">
                {item.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-2 py-1 text-xs bg-secondary rounded-md text-secondary-foreground"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
      )}
    </div>
  );
};

export function Resume() {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Vinayaka_Linchan_Resume.pdf';
    link.download = 'Vinayaka_Linchan_Resume.pdf';
    link.click();
  };

  return (
    <section id="resume" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Education & Resume
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Academic background and professional development
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Education Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-8 text-foreground">Education Timeline</h3>
            <div className="space-y-8">
              {education.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <TimelineItem item={item} isLast={index === education.length - 1} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Resume Download & Certifications */}
          <div className="space-y-8">
            {/* Resume Download */}
            <div className="card-elevated p-6 rounded-lg text-center animate-fade-up">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Download Resume</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Get a comprehensive overview of my skills, experience, and projects.
              </p>
              <Button
                onClick={handleDownloadResume}
                className="btn-primary w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF Resume
              </Button>
            </div>
            
            {/* Certifications */}
            <div className="card-elevated p-6 rounded-lg animate-fade-up">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-2 rounded hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="card-elevated p-6 rounded-lg animate-fade-up">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Year</span>
                  <span className="font-medium text-foreground">3rd Year BTech</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Specialization</span>
                  <span className="font-medium text-foreground">AI & ML</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projects</span>
                  <span className="font-medium text-foreground">5+ Completed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Availability</span>
                  <span className="font-medium text-tech-success">Open to Internships</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}