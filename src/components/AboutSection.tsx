import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Rocket, Users, Database, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: <Code size={32} />, name: 'Frontend', color: 'text-neon-cyan' },
    { icon: <Database size={32} />, name: 'Backend', color: 'text-neon-purple' },
    { icon: <Palette size={32} />, name: 'UI/UX', color: 'text-neon-pink' },
    { icon: <Globe size={32} />, name: 'Web3', color: 'text-neon-blue' },
    { icon: <Rocket size={32} />, name: 'Performance', color: 'text-neon-cyan' },
    { icon: <Users size={32} />, name: 'Collaboration', color: 'text-neon-purple' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Image hover animation
    const imageContainer = imageRef.current;
    if (imageContainer) {
      const handleMouseEnter = () => {
        gsap.to(imageContainer, {
          scale: 1.05,
          rotateY: 5,
          duration: 0.5,
          ease: "power2.out"
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(imageContainer, {
          scale: 1,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      };
      
      imageContainer.addEventListener('mouseenter', handleMouseEnter);
      imageContainer.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        imageContainer.removeEventListener('mouseenter', handleMouseEnter);
        imageContainer.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ScrollTrigger animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    // Image animation
    tl.fromTo(imageRef.current, 
      { 
        opacity: 0, 
        x: -100,
        filter: "blur(10px)"
      },
      { 
        opacity: 1, 
        x: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out"
      }
    );

    // Content animation
    tl.fromTo(contentRef.current,
      {
        opacity: 0,
        y: 50,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out"
      },
      "-=0.8"
    );

    // Skills animation
    const skillItems = skillsRef.current?.children;
    if (skillItems) {
      tl.fromTo(Array.from(skillItems),
        {
          opacity: 0,
          y: 30,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        },
        "-=0.5"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-8 lg:px-16"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div 
            ref={imageRef}
            className="relative"
          >
            <div className="glass-card p-8 text-center">
              <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden neon-glow">
                <img 
                  src="/lovable-uploads/e9a750f6-3654-4deb-91b0-16126299815e.png"
                  alt="Abir - Web Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-glow mb-2">Abir</h3>
              <p className="text-muted-foreground">Creative Developer</p>
            </div>
          </div>
          
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">Me</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate web developer with expertise in creating immersive digital experiences. 
                I specialize in modern web technologies, 3D integration, and cutting-edge animations 
                that bring ideas to life.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a keen eye for design and a deep understanding of user experience, 
                I craft websites that not only look stunning but also perform exceptionally.
              </p>
            </div>
            
            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Skills & Expertise</h3>
              <div 
                ref={skillsRef}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="glass-card p-4 text-center neon-glow hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div className={`${skill.color} mb-2 flex justify-center`}>
                      {skill.icon}
                    </div>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;