import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];

  const socialLinks = [
    { icon: <GithubLogo size={20} />, href: "#", label: "GitHub" },
    { icon: <LinkedinLogo size={20} />, href: "#", label: "LinkedIn" },
    { icon: <EnvelopeSimple size={20} />, href: "mailto:hello@abir.dev", label: "Email" }
  ];

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // ScrollTrigger animation
    gsap.fromTo(footer,
      {
        opacity: 0,
        y: 60,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 px-8 lg:px-16 border-t border-border/50"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-neon-purple/5 rounded-full blur-xl float-animation" />
        <div className="absolute bottom-1/4 right-1/6 w-40 h-40 bg-neon-cyan/5 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-neon-pink/5 rounded-full blur-xl float-animation" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-glow mb-2">Abir</h3>
            <p className="text-muted-foreground text-sm">
              Crafting digital experiences with passion and precision.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <nav className="flex justify-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:text-glow"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-2 glass-card hover:neon-glow transition-all duration-300 group"
                aria-label={social.label}
              >
                <div className="text-muted-foreground group-hover:text-neon-cyan transition-colors">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            © 2024 Made with <Heart size={16} className="text-neon-pink" /> by Abir
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;