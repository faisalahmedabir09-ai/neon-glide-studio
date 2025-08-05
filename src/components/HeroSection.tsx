import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Initial states
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    });
    
    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100
    });
    
    // Animation sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");
    
    // CTA hover animation
    const handleMouseEnter = () => {
      gsap.to(ctaRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(ctaRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const ctaButton = ctaRef.current;
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', handleMouseEnter);
      ctaButton.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      tl.kill();
      if (ctaButton) {
        ctaButton.removeEventListener('mouseenter', handleMouseEnter);
        ctaButton.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-between px-8 lg:px-16 overflow-hidden"
    >
      {/* Left Content */}
      <div className="flex-1 max-w-2xl z-10">
        <h1 
          ref={headlineRef}
          className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Hi, I'm{' '}
          <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
            Abir
          </span>
          <br />
          Web Developer
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl"
        >
          Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
        </p>
        
        <button 
          ref={ctaRef}
          className="hero-button text-lg font-semibold"
        >
          Hire Me
        </button>
      </div>
      
      {/* Right Content - Spline 3D */}
      <div 
        ref={splineRef}
        className="flex-1 h-screen relative"
      >
        <iframe 
          src='https://my.spline.design/orb-XpZ9UBCVC4Xmof5gjx0kCWq5/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="absolute inset-0"
        />
      </div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-neon-pink/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '6s' }} />
      </div>
    </section>
  );
};

export default HeroSection;