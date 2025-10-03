import { ExternalLink, Github, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "Face Detection & Multi-Face Tracker",
    description: "Real-time webcam application that detects and tracks multiple faces simultaneously with bounding boxes and ID tracking. Implements advanced computer vision algorithms for robust face recognition.",
    longDescription: "Built using Python and OpenCV, this application demonstrates real-time computer vision capabilities with multi-face detection and tracking functionality.",
    techStack: ["Python", "OpenCV", "NumPy", "Threading"],
    features: [
      "Real-time face detection",
      "Multiple face tracking with IDs",
      "Bounding box visualization",
      "Performance optimized"
    ],
    githubUrl: "https://github.com/vinayaka/face-tracker",
    demoUrl: "",
    status: "Completed"
  },
  {
    id: 2,
    title: "Object Detection",
    description: "Real-time object detection system using OpenCV and Python, capable of identifying multiple objects in images, videos, and live webcam feeds.",
    longDescription: "Developed a comprehensive object detection system with support for multiple input sources including images, videos, and live webcam feeds.",
    techStack: ["Python", "OpenCV"],
    features: [
      "Real-time object detection",
      "Image detection support",
      "Video detection support",
      "Live webcam detection"
    ],
    githubUrl: "https://github.com/Vlinchan/ObjectDetection-2",
    demoUrl: "",
    status: "Completed"
  },
  {
    id: 3,
    title: "Real-time Web Application",
    description: "Modern web application showcasing real-time data processing and visualization. Demonstrates full-stack development skills with responsive design and efficient architecture.",
    longDescription: "MERN stack application with real-time capabilities, demonstrating modern web development practices and API integration.",
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    features: [
      "Real-time data updates",
      "Responsive design",
      "RESTful API integration",
      "Modern UI/UX"
    ],
    githubUrl: "https://github.com/vinayaka/realtime-app",
    demoUrl: "https://vinayaka-realtime-app.netlify.app",
    status: "In Progress"
  }
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <div className="card-interactive p-6 rounded-lg group">
      <div className="flex items-center justify-between mb-4">
        <Badge 
          variant={project.status === "Completed" ? "default" : "secondary"}
          className="text-xs"
        >
          {project.status}
        </Badge>
        <div className="flex space-x-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github className="h-4 w-4" />
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`View ${project.title} demo`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {project.description}
      </p>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          {project.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          className="btn-outline flex-1"
          onClick={() => window.open(project.githubUrl, "_blank")}
        >
          <Github className="mr-2 h-4 w-4" />
          Code
        </Button>
        {project.demoUrl && (
          <Button
            size="sm"
            className="btn-primary flex-1"
            onClick={() => window.open(project.demoUrl, "_blank")}
          >
            <Play className="mr-2 h-4 w-4" />
            Demo
          </Button>
        )}
      </div>
    </div>
  );
};

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            AI/ML projects showcasing practical applications and technical expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Want to see more projects or collaborate?
          </p>
          <Button
            variant="outline"
            className="btn-outline"
            onClick={() => window.open("https://github.com/vinayaka", "_blank")}
          >
            <Github className="mr-2 h-4 w-4" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}