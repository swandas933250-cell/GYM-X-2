/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Dumbbell, 
  Users, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Facebook, 
  MapPin, 
  Phone, 
  Mail,
  Menu,
  X,
  Play
} from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import bodyImage from "./assets/body.jpg";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Membership", href: "#membership" },
    { name: "Trainers", href: "#trainers" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-bg/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg">
            <Dumbbell className="text-bg w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-black tracking-tighter italic">GYM X</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold uppercase tracking-widest text-white/70 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2 bg-primary text-bg font-bold rounded-full text-sm hover:scale-105 transition-transform">
            JOIN NOW
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-4 bg-primary text-bg font-bold rounded-xl mt-2">
              JOIN NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax and Overlay */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <img 
          src={bodyImage} 
          alt="Gym Hero"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-bg/10 via-bg/40 to-bg" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </motion.div>

      {/* Floating Accent Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-32 h-32 border border-primary/20 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-[25%] right-[15%] w-48 h-48 bg-primary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black tracking-[0.4em] uppercase">
              Elite Performance Hub
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-display text-6xl sm:text-8xl md:text-[10rem] font-black italic tracking-tighter leading-[0.85] mb-8">
            <span className="block overflow-hidden">
              TRANSFORM
            </span>
            <span className="text-primary italic block drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
              YOUR LIMITS
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-12 leading-relaxed font-light">
            Forge your physique in our state-of-the-art facility. Join a high-octane community where every rep brings you closer to greatness.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:row items-center justify-center gap-6">
            <button className="relative group px-12 py-6 bg-primary text-bg font-black rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all text-xl shadow-[0_0_30px_rgba(250,204,21,0.2)]">
              <span className="relative z-10 flex items-center gap-2">
                JOIN THE REVOLUTION <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20" />
            </button>
            <button className="px-10 py-6 glass text-white font-bold rounded-full flex items-center gap-3 hover:bg-white/10 transition-all text-lg group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-bg transition-colors">
                <Play className="w-4 h-4 fill-current ml-1" />
              </div>
              VIRTUAL TOUR
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Scrolling Text Bar */}
      <div className="absolute bottom-0 w-full overflow-hidden whitespace-nowrap py-4 border-t border-white/5 bg-white/2 backdrop-blur-sm">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-block"
        >
          <span className="text-[10px] font-black tracking-[0.6em] uppercase mx-8 text-white/20">STRENGTH • ENDURANCE • RECOVERY • COMMUNITY • PERFORMANCE • GRIT • STRENGTH • ENDURANCE • RECOVERY • COMMUNITY • PERFORMANCE • GRIT •</span>
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeading = ({ children, subtitle, align = "center" }: { children: ReactNode, subtitle?: string, align?: "left" | "center" }) => {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      {subtitle && (
        <span className="text-primary font-black tracking-widest uppercase text-xs mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-6xl font-black uppercase italic leading-none">{children}</h2>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { label: "Elite Members", value: "2.5k+" },
    { label: "Expert Coaches", value: "20+" },
    { label: "Premium Gear", value: "150+" },
    { label: "Global Locations", value: "12" },
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-4xl md:text-6xl font-black text-primary mb-2 tracking-tighter italic">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Programs = () => {
  const programs = [
    {
      title: "Strength Lab",
      desc: "Advanced powerlifting and bodybuilding focused routines to maximize raw strength.",
      icon: <Dumbbell className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "HIIT Core",
      desc: "High-intensity metabolic conditioning designed to melt fat and build endurance.",
      icon: <Play className="w-8 h-8" />,
      img: bodyImage
    },
    {
      title: "Elite Boxing",
      desc: "Functional combat movements for agility, coordination, and explosive power.",
      icon: <Trophy className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop"
    },
  ];

  return (
    <section id="programs" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeading subtitle="What We Offer">Training Programs</SectionHeading>
      <div className="grid md:grid-cols-3 gap-8">
        {programs.map((prog, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            className="group relative h-[500px] overflow-hidden rounded-3xl cursor-pointer"
          >
            <img 
              src={prog.img} 
              alt={prog.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="w-16 h-16 bg-primary flex items-center justify-center rounded-2xl mb-6 shadow-xl group-hover:bg-white transition-colors duration-300">
                <span className="text-bg">{prog.icon}</span>
              </div>
              <h3 className="font-display text-3xl font-black italic uppercase mb-3">{prog.title}</h3>
              <p className="text-white/60 mb-6 group-hover:text-white transition-colors">{prog.desc}</p>
              <button className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                Explore Plan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Membership = () => {
  const plans = [
    {
      name: "Standard",
      price: "49",
      features: ["24/7 Gym Access", "Standard Equipment", "Locker Room Access", "Basic Fitness Assessment"],
      popular: false
    },
    {
      name: "Pro Elite",
      price: "89",
      features: ["All Standard Features", "Unlimited Group Classes", "Personal Coach Session", "Premium Hydration Lounge", "Advanced Performance Tech"],
      popular: true
    },
    {
      name: "Ultimate",
      price: "149",
      features: ["All Pro Features", "Nutrition Coaching", "Guest Passes (2/mo)", "Private Spa & Recovery", "Monthly Body Composition Scan"],
      popular: false
    }
  ];

  return (
    <section id="membership" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading subtitle="Join the Club">Membership Plans</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 md:p-12 rounded-3xl border ${plan.popular ? "bg-primary border-primary" : "bg-surface border-white/5"} overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-6 right-0 bg-bg text-primary text-[10px] font-black tracking-widest py-1 px-6 rotate-45 translate-x-4">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-2xl font-black uppercase italic mb-6 ${plan.popular ? "text-bg" : "text-white"}`}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-5xl font-black italic ${plan.popular ? "text-bg" : "text-primary"}`}>${plan.price}</span>
                <span className={`text-xs uppercase font-bold tracking-widest ${plan.popular ? "text-bg/60" : "text-white/40"}`}>/ month</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feat, i) => (
                  <li key={i} className={`flex items-center gap-3 text-sm font-medium ${plan.popular ? "text-bg" : "text-white/80"}`}>
                    <CheckCircle2 className={`w-5 h-5 ${plan.popular ? "text-bg/60" : "text-primary/60"}`} /> {feat}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-transform active:scale-95 ${plan.popular ? "bg-bg text-primary" : "bg-primary text-bg hover:bg-white"}`}>
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Trainers = () => {
  const trainers = [
    {
      name: "Marcus Thorne",
      spec: "Strength & Conditioning",
      img: "https://images.unsplash.com/photo-1567013127542-490d757e51f4?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Sarah Jenkins",
      spec: "Performance Nutrition",
      img: "https://images.unsplash.com/photo-1548690312-e3b507d17a12?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Kaelen Voss",
      spec: "High-Performance HIIT",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="trainers" className="py-32 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="The Elite">Expert Trainers</SectionHeading>
        <div className="grid md:grid-cols-3 gap-12">
          {trainers.map((trainer, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-square rounded-full overflow-hidden mb-8 border-4 border-white/5 group-hover:border-primary transition-colors duration-500">
                <img 
                  src={trainer.img} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-black italic uppercase italic leading-none mb-2">{trainer.name}</h4>
                <p className="text-primary text-xs font-black tracking-widest uppercase mb-4">{trainer.spec}</p>
                <div className="flex justify-center gap-4 text-white/40">
                  <Instagram className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-32 bg-bg border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-16 h-16 bg-primary/20 flex items-center justify-center rounded-full mx-auto mb-12">
          <Users className="text-primary w-8 h-8" />
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-display text-2xl md:text-4xl font-extralight italic leading-relaxed mb-10"
        >
          "Joining Gym X was a pivoting moment. The environment isn't just about weight anymore; it's about pushing past mental barriers. The community and coaching are unparalleled."
        </motion.p>
        <div className="flex items-center justify-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop" 
            alt="User" 
            className="w-12 h-12 rounded-full ring-2 ring-primary p-0.5"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <div className="font-bold uppercase tracking-widest text-sm">Jason Rivera</div>
            <div className="text-white/40 text-xs font-medium">Member since 2023</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <SectionHeading align="left" subtitle="Reach Out">Let's Talk Results</SectionHeading>
            <p className="text-lg text-white/50 mb-12 max-w-md">
              Have questions about our programs or memberships? Our team is ready to help you take that first step.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" />
                </div>
                <div>
                  <h5 className="font-bold uppercase tracking-widest mb-1">Our Location</h5>
                  <p className="text-white/40 text-sm">742 Fitness Avenue, Metallic District<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="text-primary" />
                </div>
                <div>
                  <h5 className="font-bold uppercase tracking-widest mb-1">Call Us</h5>
                  <p className="text-white/40 text-sm">+1 (555) GYM-XONE</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <h5 className="font-bold uppercase tracking-widest mb-1">Email</h5>
                  <p className="text-white/40 text-sm">support@gymx.fitness</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-10 md:p-12 rounded-[40px]">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 px-1">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-colors" placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 px-1">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-colors" placeholder="Email address" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 px-1">Interested In</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option>Select a program</option>
                  <option>Strength Training</option>
                  <option>Personal Coaching</option>
                  <option>Nutrition Analysis</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 px-1">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-colors" placeholder="How can we help?" />
              </div>
              <button className="w-full py-5 bg-primary text-bg font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-surface/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-md">
                <Dumbbell className="text-bg w-5 h-5" />
              </div>
              <span className="font-display text-2xl font-black tracking-tighter italic">GYM X</span>
            </div>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
              We aren't just a gym. We are a high-performance ecosystem designed for those who refuse to settle for average.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-primary transition-colors cursor-pointer"><Instagram size={20} /></div>
              <div className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-primary transition-colors cursor-pointer"><Facebook size={20} /></div>
              <div className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-primary transition-colors cursor-pointer"><Twitter size={20} /></div>
            </div>
          </div>
          
          <div>
            <h6 className="font-black uppercase tracking-widest text-sm mb-8 italic">Quick Links</h6>
            <ul className="space-y-4 text-white/40 text-sm font-medium">
              <li><a href="#" className="hover:text-primary">Our Story</a></li>
              <li><a href="#" className="hover:text-primary">Expert Coaching</a></li>
              <li><a href="#" className="hover:text-primary">Locations</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-black uppercase tracking-widest text-sm mb-8 italic">Support</h6>
            <ul className="space-y-4 text-white/40 text-sm font-medium">
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">© 2026 GYM X PERFORMANCE HUB. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <span>Built for Athletes</span>
            <span>Powered by Grit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-white selection:bg-primary selection:text-bg">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        
        {/* About Section */}
        <section id="about" className="py-32 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop" 
              alt="Gym Equipment" 
              className="rounded-[40px] shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-3xl z-20 hidden md:block">
              <Trophy className="text-primary w-8 h-8 mb-2" />
              <div className="font-black text-2xl uppercase italic">No. 1 GYM</div>
              <div className="text-[10px] font-black uppercase text-white/40 tracking-widest">IN THE TRI-STATE AREA</div>
            </div>
          </motion.div>
          <div>
            <SectionHeading align="left" subtitle="Our Philosophy">Built to Outperform</SectionHeading>
            <p className="text-xl text-white/60 mb-8 leading-relaxed font-light italic">
              Gym X isn't for those looking for a casual workout. It's for the individuals who crave progress, who embrace the burn, and who understand that greatness is built in the silence of early mornings.
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-1">Expert Training Methodology</h4>
                  <p className="text-white/40 text-sm">Science-backed hypertrophy and strength protocols.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-1">State-of-the-Art Recovery</h4>
                  <p className="text-white/40 text-sm">Cryotherapy and sports massage integration.</p>
                </div>
              </div>
            </div>
            <button className="px-8 py-4 border border-white/10 hover:border-primary rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:text-primary">
              Learn More About Us
            </button>
          </div>
        </section>

        <Programs />
        <Membership />
        <Trainers />
        <Testimonials />

        {/* Gallery Preview */}
        <section className="py-32 max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Inside the Lab">Gallery</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <motion.div whileHover={{ scale: 0.98 }} className="col-span-2 row-span-2 h-[600px] rounded-[40px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1574673138641-72aa209a98e8?q=80&w=1200&auto=format&fit=crop" alt="Gym 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div whileHover={{ scale: 0.98 }} className="h-[280px] rounded-[40px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=800&auto=format&fit=crop" alt="Gym 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div whileHover={{ scale: 0.98 }} className="h-[280px] rounded-[40px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?q=80&w=800&auto=format&fit=crop" alt="Gym 3" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div whileHover={{ scale: 0.98 }} className="col-span-2 h-[280px] rounded-[40px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop" alt="Gym 4" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
