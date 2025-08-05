import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Phone, MapPin } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ScrollTrigger animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    // Form inputs animation
    const inputs = formRef.current?.querySelectorAll('input, textarea, button');
    if (inputs) {
      tl.fromTo(Array.from(inputs),
        {
          opacity: 0,
          x: -50,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit button animation
    const submitBtn = e.currentTarget.querySelector('button[type="submit"]');
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
    
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const socialLinks = [
    { icon: <GithubLogo size={24} />, href: "#", label: "GitHub" },
    { icon: <LinkedinLogo size={24} />, href: "#", label: "LinkedIn" },
    { icon: <EnvelopeSimple size={24} />, href: "mailto:hello@abir.dev", label: "Email" }
  ];

  const contactInfo = [
    { icon: <EnvelopeSimple size={20} />, label: "Email", value: "hello@abir.dev" },
    { icon: <Phone size={20} />, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: <MapPin size={20} />, label: "Location", value: "San Francisco, CA" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-8 lg:px-16"
      id="contact"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">Send Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="glass-input"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="glass-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="glass-input resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full hero-button pulse-glow"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-neon-cyan">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-3 glass-card hover:neon-glow transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <div className="text-muted-foreground group-hover:text-neon-cyan transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;