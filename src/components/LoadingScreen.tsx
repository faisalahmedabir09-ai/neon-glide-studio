import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set([textRef.current, progressBarRef.current], { opacity: 0, y: 30 });
    
    // Animation sequence
    tl.to([textRef.current, progressBarRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to(progressBarRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const progress = Math.round(tl.progress() * 100);
        if (counterRef.current) {
          counterRef.current.textContent = `${progress}%`;
        }
      }
    })
    .to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.5,
      onComplete: () => {
        onComplete();
      }
    });
    
    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center space-y-8">
        {/* Animated Logo/Text */}
        <div ref={textRef} className="space-y-4">
          <h1 className="text-6xl font-bold text-glow">
            Abir
          </h1>
          <p className="text-lg text-muted-foreground">
            Web Developer
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-2">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="loading-bar h-full origin-left scale-x-0"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Loading... <span ref={counterRef}>0%</span>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-purple/20 rounded-full blur-xl float-animation" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-neon-cyan/20 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-neon-pink/20 rounded-full blur-xl float-animation" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
};

export default LoadingScreen;