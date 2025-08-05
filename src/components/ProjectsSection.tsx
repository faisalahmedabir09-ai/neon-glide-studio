import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "3D Interactive Web Experience",
      description: "Immersive 3D portfolio with GSAP animations and Spline integration",
      image: "/lovable-uploads/d02770fb-86ec-4277-98fe-47f0a9c8bc55.png",
      tech: ["React", "GSAP", "Spline", "TypeScript"],
      link: "#",
      github: "#"
    },
    {
      id: 2,
      title: "Gaming UI Dashboard",
      description: "Next-level gaming interface with real-time data visualization",
      image: "/lovable-uploads/6d74bc0e-d88b-461a-b97a-f8eeb3170c6e.png",
      tech: ["Vue.js", "D3.js", "WebGL", "Node.js"],
      link: "#",
      github: "#"
    },
    {
      id: 3,
      title: "3D Portfolio Website",
      description: "Premium portfolio featuring glassmorphic design and 3D elements",
      image: "/lovable-uploads/8fe925ed-0abf-432e-873f-b956e35dd201.png",
      tech: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
      link: "#",
      github: "#"
    },
    {
      id: 4,
      title: "Gaming Platform",
      description: "Comprehensive gaming platform with character management",
      image: "/lovable-uploads/49df0dc1-0913-4459-baf9-92fbddefd8c0.png",
      tech: ["React", "WebGL", "Socket.io", "MongoDB"],
      link: "#",
      github: "#"
    },
    {
      id: 5,
      title: "Animation Tools Website",
      description: "Professional website showcasing web animation capabilities",
      image: "/lovable-uploads/33cbd1a6-5aa8-46f8-aadc-6b6434c88453.png",
      tech: ["Gatsby", "GSAP", "Lottie", "GraphQL"],
      link: "#",
      github: "#"
    },
    {
      id: 6,
      title: "Developer Portfolio",
      description: "Clean, animated portfolio with smooth transitions",
      image: "/lovable-uploads/9fb4ccc7-d68c-4665-8247-b462c7a91d94.png",
      tech: ["React", "GSAP", "Locomotive", "Tailwind"],
      link: "#",
      github: "#"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    // ScrollTrigger for cards
    const cardElements = cards.children;
    
    gsap.fromTo(Array.from(cardElements),
      {
        opacity: 0,
        y: 100,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-8 lg:px-16"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcase of innovative web experiences that push the boundaries of modern development
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    tech: string[];
    link: string;
    github: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="glass-card p-6 group cursor-pointer"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-xl mb-6">
        <img 
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Info */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold group-hover:text-glow transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-sm font-medium rounded-lg hover:scale-105 transition-transform">
            <span>View Live</span>
            <ArrowUpRight size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border text-sm font-medium rounded-lg hover:bg-secondary transition-colors">
            <GithubLogo size={16} />
            <span>Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;