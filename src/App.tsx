/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Award, 
  Globe, 
  ChevronDown, 
  Linkedin, 
  Send,
  HeartPulse,
  Utensils,
  Shirt,
  Smartphone,
  Sprout,
  Package,
  Coffee,
  ExternalLink,
  Palette
} from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { EQXLogo, DatoDurianLogo } from './components/Icons';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'problem', 'how-it-works', 'proof', 'market', 'team'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const navLinks = [
    { name: 'Problem', href: '#problem', id: 'problem' },
    { name: 'How it Works', href: '#how-it-works', id: 'how-it-works' },
    { name: 'Proof', href: '#proof', id: 'proof' },
    { name: 'Market', href: '#market', id: 'market' },
    { name: 'Team', href: '#team', id: 'team' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isScrolled ? 'translate-y-0' : 'translate-y-0'
      }`}
    >
      <div className="max-w-[1200px] mx-auto glass-nav px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EQXLogo className="h-8 text-accent-primary" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`transition-colors text-sm font-medium ${
                activeSection === link.id ? 'text-text-accent' : 'text-text-secondary hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="btn-primary text-sm py-2 px-4">List Your Brand</button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-background-primary z-40 flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <EQXLogo className="w-8 h-8 text-accent-primary" />
                <span className="font-display font-bold text-xl tracking-tight">EQX</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-2xl font-display font-bold ${
                    activeSection === link.id ? 'text-text-accent' : 'text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <button className="btn-primary mt-4 w-full">List Your Brand</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const StatCounter = ({ value, suffix = "", label }: { value: number, suffix?: string, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-6xl font-display font-bold mb-2">
        {suffix === "$" ? `$${count.toLocaleString()}` : `${count.toLocaleString()}${suffix}`}
      </div>
      <div className="text-text-secondary font-medium uppercase tracking-wider text-xs md:text-sm">{label}</div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border-default">
      <button 
        className="w-full py-6 flex items-center justify-between text-left hover:text-accent-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-lg">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-text-secondary leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DotAnimation = () => {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      <div className="absolute inset-0 bg-accent-primary/20 blur-[120px] rounded-full"></div>
      <div className="grid grid-cols-10 gap-4 opacity-40">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-accent-primary"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- Sections ---

const Hero = () => {
  const scrollToProblem = () => {
    const element = document.getElementById('problem');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Animation (Subtle Dot Grid) */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#1E293B 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      <div className="max-content w-full grid md:grid-cols-[1.5fr_1fr] gap-12 items-center z-10">
        <div>
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-text-accent text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
              Licensed and Regulated | Labuan FSA
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] mb-6">
              The Future of Loyalty is <span className="text-accent-primary">Ownership.</span>
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-[600px] leading-relaxed">
              EQX is the first Consumer Equities Exchange. We let brands turn their customers into real shareholders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">List Your Brand</button>
              <button className="btn-secondary" onClick={scrollToProblem}>
                Learn More
              </button>
            </div>
          </FadeIn>
        </div>
        
        <div className="hidden md:block relative">
          <FadeIn delay={0.2}>
            <DotAnimation />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Problem = () => (
  <section id="problem" className="py-24 md:py-32 bg-background-primary">
    <div className="max-content">
      <FadeIn>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Loyalty programs are broken.</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <FadeIn delay={0.1}>
            <div className="card-base p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-background-hover flex items-center justify-center overflow-hidden p-2">
                  <img src="https://i.imgur.com/AsGzzmr.png" alt="Grab" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <span className="font-semibold">Grab Rewards</span>
              </div>
              <div className="text-warning text-sm font-medium">Points Expiring</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="card-base p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-background-hover flex items-center justify-center overflow-hidden p-2">
                  <img src="https://i.imgur.com/a4gUMEV.png" alt="Shopee" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <span className="font-semibold">Shopee Coins</span>
              </div>
              <div className="text-warning text-sm font-medium">Devaluing</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="card-base p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-background-hover flex items-center justify-center overflow-hidden p-2">
                  <img src="https://i.imgur.com/CGrgRBk.png" alt="Tealive" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <span className="font-semibold">Tealive Points</span>
              </div>
              <div className="text-warning text-sm font-medium">Limited Use</div>
            </div>
          </FadeIn>
        </div>
        
        <div>
          <FadeIn delay={0.4}>
            <div className="text-6xl md:text-8xl font-display font-bold text-accent-primary mb-6">$100B+</div>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Spent on loyalty programs every year. Points expire. Rewards devalue. None of it gives customers anything real.
            </p>
            <div className="p-6 border-l-4 border-accent-primary bg-accent-primary/5 rounded-r-xl">
              <p className="text-white font-bold text-xl">The answer is not better points. It is real ownership.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 md:py-32 bg-background-card">
    <div className="max-content">
      <div className="text-center mb-20">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">EQX makes brands ownable.</h2>
          <p className="text-xl text-text-secondary">Loyalty was never real. Ownership is.</p>
        </FadeIn>
      </div>
      
        <div className="grid md:grid-cols-4 gap-8 mb-20">
        {[
          { icon: ShoppingBag, title: "1. Buy", desc: "Purchase a product from a participating brand." },
          { icon: Award, title: "2. Receive", desc: "Get asset-backed tokens automatically on-chain." },
          { icon: Users, title: "3. Own", desc: "Hold real equity or dividend rights in the brand." },
          { icon: TrendingUp, title: "4. Earn", desc: "Stake tokens to earn EQX. Grow your portfolio." }
        ].map((item, i) => (
          <div key={i}>
            <FadeIn delay={i * 0.1}>
              <div className="card-base p-8 h-full card-hover group">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center mb-6 group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          </div>
        ))}
      </div>
      
      <FadeIn delay={0.4}>
        <div className="p-8 rounded-2xl bg-background-primary border border-border-default text-center">
          <p className="text-text-secondary font-medium">
            Works across every repeat-purchase category: 
            <span className="text-white ml-2">Bubble Tea, Noodles, Coffee Chains, E-Commerce, Agriculture, Ice Cream, Any Brand with Loyal Customers</span>
          </p>
        </div>
      </FadeIn>
    </div>
  </section>
);

const Proof = () => (
  <section id="proof" className="py-24 md:py-32 bg-background-primary overflow-hidden">
    <div className="max-content">
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-center">
        <FadeIn>
          <div className="relative">
            <div className="absolute inset-0 bg-accent-primary/30 blur-[80px] rounded-full"></div>
            <img 
              src="https://i.imgur.com/3vw5HwS.png" 
              alt="DatoDurian Product" 
              className="relative z-10 rounded-2xl shadow-2xl border border-border-default"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 z-20 bg-background-card border border-border-default p-6 rounded-xl shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-warning" />
                <span className="font-bold">Best Startup</span>
              </div>
              <div className="text-xs text-text-secondary">WOW Summit Winner</div>
            </div>
          </div>
        </FadeIn>
        
        <div>
          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-12">DatoDurian: The thesis, proven.</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              <StatCounter value={3.35} suffix="M" label="Total Raised" />
              <StatCounter value={300} suffix="+" label="Shareholders" />
              <StatCounter value={3500} suffix="kg" label="Moved in Month 1" />
            </div>
            
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                DatoDurian is our flagship proof-of-concept. We transformed a traditional agriculture business into a modern, ownable brand.
              </p>
              <ul className="space-y-4">
                {[
                  "First dividend delivered to 300+ shareholders.",
                  "Won Best Startup at WOW Summit.",
                  "Licensed under Labuan FSA.",
                  "Expanded to 4 regional markets."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-success mt-1 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

const Market = () => (
  <section id="market" className="py-24 md:py-32 bg-background-card">
    <div className="max-content">
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
        <div>
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Any brand. Any product. Any market.</h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              EQX works for any industry where consumers buy products. That is every industry.
            </p>
            <button className="btn-primary">Explore Opportunities</button>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: HeartPulse, name: "Healthcare", size: "$8.5T" },
            { icon: Utensils, name: "Food & Bev", size: "$4.9T" },
            { icon: Shirt, name: "Fashion", size: "$1.8T" },
            { icon: Smartphone, name: "Electronics", size: "$978B" },
            { icon: Sprout, name: "Agriculture", size: "$640B" },
            { icon: Package, name: "CPG", size: "$569B" },
            { icon: Coffee, name: "Specialty Drinks", size: "$50B" }
          ].map((item, i) => (
            <div key={i}>
              <FadeIn delay={i * 0.05}>
                <div className="card-base p-6 card-hover flex flex-col items-center text-center">
                  <item.icon className="text-accent-primary mb-4" size={32} />
                  <div className="font-bold text-sm mb-1">{item.name}</div>
                  <div className="text-text-accent font-display font-bold text-lg">{item.size}</div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ForBrands = () => (
  <section className="py-24 md:py-32 bg-accent-primary relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" 
         style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
    </div>
    <div className="max-content relative z-10">
      <div className="max-w-[800px] mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-12 text-accent-contrast">Turn your customers into your most powerful investors.</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
            {[
              "Raise capital from your existing customer base, no VCs needed.",
              "Turn one-time buyers into lifelong shareholders who market your brand for free.",
              "Licensed, regulated, and fully managed by EQX. You focus on your business."
            ].map((prop, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-accent-contrast/20 flex items-center justify-center flex-shrink-0 text-accent-contrast">
                  <CheckCircle2 size={16} />
                </div>
                <p className="text-accent-contrast/90 text-sm font-medium leading-relaxed">{prop}</p>
              </div>
            ))}
          </div>
          <button className="bg-accent-contrast text-accent-primary hover:opacity-90 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-200">
            List Your Brand
          </button>
        </FadeIn>
      </div>
    </div>
  </section>
);

const ListingJourney = () => (
  <section className="py-24 md:py-32 bg-background-primary">
    <div className="max-content">
      <div className="text-center mb-20">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">From Regional Brand to Globally-Traded Equity.</h2>
        </FadeIn>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            phase: "Phase 1",
            title: "Regional Launch",
            desc: "Brand gets verified and token structure is configured on EQX. Customers earn equity tokens with every purchase, building a real community of consumer-shareholders."
          },
          {
            phase: "Phase 2",
            title: "Going Global",
            desc: "The consumer community lists on EQX for public trading. International investors buy in. Early holders capture the upside. Phase 1 community becomes the brand's most powerful marketing asset."
          }
        ].map((item, i) => (
          <div key={i}>
            <FadeIn delay={i * 0.2}>
              <div className="card-base p-10 h-full border-l-4 border-l-accent-primary">
                <div className="text-accent-primary font-bold uppercase tracking-widest text-sm mb-4">{item.phase}</div>
                <h3 className="text-2xl font-display font-bold mb-6">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed text-lg">{item.desc}</p>
              </div>
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Team = () => (
  <section id="team" className="py-24 md:py-32 bg-background-card">
    <div className="max-content">
      <div className="text-center mb-20">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Built by operators, not theorists.</h2>
        </FadeIn>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Bobby Sim",
            role: "Co-Founder",
            desc: "10+ years financial services. Former COO at RSG (192 podium finishes, 7-figure revenue). Built DatoDurian from zero to $3.35M across 4 markets.",
            img: "https://framerusercontent.com/images/cMaTWOsxwQksLthYV2Ovnvov5R4.png"
          },
          {
            name: "Calvin Ng",
            role: "Chairman",
            desc: "GP at Plutus VC ($400M+ fund). Co-founded Mantra. Former VP at CITIC Pacific. 200+ Web3 investments.",
            img: "https://framerusercontent.com/images/a7DegkBSTFiMviNyIpg2HKIZ5c.png"
          },
          {
            name: "Rishen Naidoo",
            role: "VP Finance",
            desc: "Oxford Brookes. 8+ years group-level finance across fintech, pharma, agriculture. Labuan FSA compliance for EQX.",
            img: "https://framerusercontent.com/images/XvYIvv26z8Fse98huWWyovDfdak.png"
          }
        ].map((member, i) => (
          <div key={i}>
            <FadeIn delay={i * 0.1}>
              <div className="card-base p-8 card-hover h-full flex flex-col items-center text-center">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-40 h-40 rounded-full mb-8 object-cover border-4 border-accent-primary/20"
                  referrerPolicy="no-referrer"
                />
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <div className="text-accent-primary font-medium text-sm mb-6">{member.role}</div>
                <p className="text-text-secondary text-sm leading-relaxed flex-grow">{member.desc}</p>
              </div>
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Roadmap = () => (
  <section className="py-24 md:py-32 bg-background-primary overflow-hidden">
    <div className="max-content">
      <div className="text-center mb-20">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Where we are. Where we are going.</h2>
        </FadeIn>
      </div>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-px bg-border-default md:-translate-x-1/2"></div>
        
        <div className="space-y-12">
          {[
            { year: "2024", title: "DatoDurian Launch", desc: "$3.35M raised. 300+ shareholders. 4 markets." },
            { year: "2025", title: "EQX Platform MVP", desc: "Labuan FSA licensing. First dividend delivered." },
            { year: "2026", title: "BNB Chain Deployment", desc: "20 project onboarded with min revenue of 1 million each" },
            { year: "2027+", title: "Multi-chain Expansion", desc: "AI-powered platform. Education and consulting vertical." }
          ].map((item, i) => (
            <div key={i} className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="hidden md:block md:w-1/2"></div>
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-accent-primary border-4 border-background-primary md:-translate-x-1/2 z-10"></div>
              <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <FadeIn delay={i * 0.1}>
                  <div className="card-base p-8">
                    <div className="text-accent-primary font-display font-bold text-2xl mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24 md:py-32 bg-background-card">
    <div className="max-content">
      <div className="max-w-[800px] mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Common questions.</h2>
          <div className="space-y-2">
            <FAQItem 
              question="What is EQX?" 
              answer="EQX is the world's first Consumer Equities Exchange. We provide a platform where brands can tokenize their equity and distribute it to their customers as loyalty rewards, turning consumers into real shareholders." 
            />
            <FAQItem 
              question="How is this different from loyalty points?" 
              answer="Loyalty points are liabilities for a brand and often have no real-world value, expiring or devaluing over time. EQX tokens are asset-backed and represent real equity or dividend rights, giving you true ownership and potential financial upside." 
            />
            <FAQItem 
              question="Is EQX regulated?" 
              answer="Yes, EQX is licensed and regulated under the Labuan Financial Services Authority (FSA), ensuring high standards of security, compliance, and investor protection." 
            />
            <FAQItem 
              question="What blockchain does EQX use?" 
              answer="EQX primarily utilizes the BNB Chain for its high performance and low transaction costs, with plans to expand to other major chains in the future." 
            />
            <FAQItem 
              question="How do brands list on EQX?" 
              answer="Brands undergo a rigorous verification process. Once approved, we help structure their equity tokens and integrate our distribution system into their existing sales channels." 
            />
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-24 bg-background-primary border-t border-border-default">
    <div className="max-content">
      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to make your brand ownable?</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary px-10">List Your Brand</button>
            <button className="btn-secondary px-10">Contact Us</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-white font-bold mb-6">Contact</div>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Send size={16} /> Telegram @bobbysim
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Linkedin size={16} /> LinkedIn
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Globe size={16} /> Labuan FSA
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold mb-6">Legal</div>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Risk Disclosure</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-border-default flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <EQXLogo className="w-8 h-8 text-accent-primary" />
        </div>
        <div className="text-text-secondary text-sm">
          Copyright 2026 EQX. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded bg-background-card border border-border-default text-[10px] font-bold text-text-secondary uppercase tracking-widest">
            Licensed & Regulated
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [theme, setTheme] = useState<'default' | 'yellow'>('yellow');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'yellow') {
      root.classList.add('theme-yellow');
    } else {
      root.classList.remove('theme-yellow');
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log('Toggling theme from:', theme);
    setTheme(prev => prev === 'default' ? 'yellow' : 'default');
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Proof />
        <Market />
        <ForBrands />
        <ListingJourney />
        <Team />
        <Roadmap />
        <FAQ />
      </main>
      <Footer />

      {/* Floating Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-[9999] w-14 h-14 rounded-full bg-accent-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
        aria-label="Toggle Theme"
      >
        <Palette size={24} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
