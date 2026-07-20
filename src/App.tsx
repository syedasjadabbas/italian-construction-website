import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  House, 
  Buildings, 
  Bridge, 
  PaintBrush, 
  ClipboardText, 
  Wrench, 
  ArrowUpRight, 
  Envelope, 
  Phone, 
  MapPin, 
  List, 
  X, 
  ShieldCheck, 
  Users, 
  Cpu, 
  Clock, 
  ArrowRight,
  CheckCircle,
  Building
} from "@phosphor-icons/react";

// Image Imports
import heroImg from "./assets/hero_luxury_architecture.png";
import residentialImg from "./assets/project_residential.png";
import commercialImg from "./assets/project_commercial.png";
import infrastructureImg from "./assets/project_infrastructure.png";

// About section image fallback
const aboutImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

// Animated Counter Component using Framer Motion
function AnimatedCounter({ value }: { value: string }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  
  const count = useSpring(0, { stiffness: 30, damping: 15 });
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          count.set(numericValue);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [count, numericValue]);

  useEffect(() => {
    return count.on("change", (latest) => {
      setDisplayValue(Math.floor(latest).toString());
    });
  }, [count]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#C8A96B]">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [estimateStep, setEstimateStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Parallax Scroll Effect for Hero
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 800], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.05]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Handle Form Submission
  const handleSubmitEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setFormSubmitted(false);
      setEstimateStep(1);
    }, 3000);
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden selection:bg-[#C8A96B] selection:text-white bg-[#F8F8F8] text-[#1A1A1A]">
      {/* Film Grain Texture for editorial physical paper feel */}
      <div className="film-grain" />

      {/* NAVBAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "py-4 px-6 md:px-12" 
            : "py-6 px-6 md:px-12"
        }`}
      >
        <div 
          className={`max-w-7xl mx-auto flex items-center justify-between transition-luxury ${
            scrolled 
              ? "bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)]" 
              : "bg-transparent px-2"
          }`}
        >
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`font-heading text-lg md:text-xl font-extrabold tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
              scrolled ? "text-white" : "text-white drop-shadow-md"
            }`}
          >
            <Building weight="bold" className="text-[#C8A96B] w-5 h-5" />
            <span>ITALIA COSTRUZIONI</span>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "Home", id: "home" },
              { name: "Chi Siamo", id: "chi-siamo" },
              { name: "Servizi", id: "servizi" },
              { name: "Progetti", id: "progetti" },
              { name: "Contatti", id: "contatti" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors cursor-pointer relative py-1 group ${
                  scrolled ? "text-white/80 hover:text-white" : "text-white/90 hover:text-white drop-shadow-sm"
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8A96B] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setModalOpen(true)}
              className="group relative flex items-center gap-2 px-6 py-2.5 bg-[#C8A96B] hover:bg-[#b09355] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-luxury shadow-lg shadow-[#C8A96B]/10 active:scale-[0.98] cursor-pointer"
            >
              <span>Richiedi un Preventivo</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-luxury group-hover:translate-x-1">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors cursor-pointer z-50 ${
              scrolled || mobileMenuOpen ? "text-white" : "text-white"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU MODAL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#111111] z-40 flex flex-col justify-center px-8 md:px-16"
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-radial-gradient from-[#2A2A2A] to-transparent opacity-40 pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10">
              {[
                { name: "Home", id: "home" },
                { name: "Chi Siamo", id: "chi-siamo" },
                { name: "Servizi", id: "servizi" },
                { name: "Progetti", id: "progetti" },
                { name: "Contatti", id: "contatti" }
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollToSection(item.id)}
                  className="font-heading text-3xl font-bold text-white hover:text-[#C8A96B] transition-colors text-left uppercase tracking-tight py-2 border-b border-white/5 cursor-pointer"
                >
                  {item.name}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-6 py-4 bg-[#C8A96B] text-white rounded-full font-semibold uppercase tracking-wider text-sm cursor-pointer"
                >
                  <span>Richiedi un Preventivo</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white/50 text-xs border-t border-white/10 pt-6">
              <span className="font-heading font-semibold tracking-wider">ITALIA COSTRUZIONI</span>
              <span>Costruiamo il Futuro.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#111111] py-24">
        {/* Parallax Hero Image background */}
        <motion.div 
          style={{ y: heroBgY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0 bg-cover bg-center select-none"
        >
          <img src={heroImg} alt="Italia Costruzioni Luxury Project" className="w-full h-full object-cover object-center brightness-[0.35]" />
        </motion.div>

        {/* Ambient top & bottom dark fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/40 via-transparent to-[#111111] z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-20 text-white flex flex-col justify-center min-h-[calc(100dvh-12rem)]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C8A96B] border border-[#C8A96B]/30 rounded-full bg-[#C8A96B]/10">
              Contractor Generale d'Élite
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] max-w-4xl"
          >
            Costruiamo <br className="hidden md:inline" />
            il <span className="text-[#C8A96B]">Futuro</span>.
          </motion.h1>

          {/* Subheadline & description inside maximum 4 text elements cap */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/80 font-medium tracking-wide mt-6 max-w-2xl"
          >
            Soluzioni innovative per edilizia, infrastrutture e sviluppo immobiliare in tutta Italia.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-white/60 mt-4 max-w-xl font-normal leading-relaxed"
          >
            Progettiamo e realizziamo opere residenziali, commerciali e infrastrutturali con standard elevati di qualità, sicurezza e innovazione.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <button
              onClick={() => scrollToSection("progetti")}
              className="group flex items-center gap-2 px-8 py-3.5 bg-white text-[#111111] hover:bg-[#C8A96B] hover:text-white rounded-full text-xs font-bold uppercase tracking-widest transition-luxury shadow-lg cursor-pointer active:scale-[0.98]"
            >
              <span>I Nostri Progetti</span>
              <div className="w-6 h-6 rounded-full bg-[#111111]/10 flex items-center justify-center transition-luxury group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
            <button
              onClick={() => scrollToSection("contatti")}
              className="group flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:border-[#C8A96B] hover:bg-[#C8A96B]/10 rounded-full text-xs font-bold uppercase tracking-widest transition-luxury cursor-pointer active:scale-[0.98]"
            >
              <span>Contattaci</span>
              <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Floating background scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white">Scorri</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="relative z-20 bg-[#111111] py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Bento layout for statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { val: "150+", label: "Progetti Completati" },
              { val: "20+", label: "Anni di Esperienza" },
              { val: "50+", label: "Professionisti" },
              { val: "100%", label: "Qualità Garantita" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bezel-outer-dark"
              >
                <div className="bezel-inner-dark p-6 md:p-8 flex flex-col items-center text-center justify-center min-h-[140px]">
                  <AnimatedCounter value={stat.val} />
                  <p className="text-white/60 text-xs md:text-sm font-semibold tracking-wider uppercase mt-3">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servizi" className="py-24 md:py-36 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C8A96B] block mb-3">
              Eccellenza Operativa
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111] max-w-2xl mx-auto leading-none">
              I Nostri Servizi
            </h2>
            <div className="w-12 h-[2px] bg-[#C8A96B] mx-auto mt-6" />
          </div>

          {/* Grid of 6 Cards with Double Bezel visual structures */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                title: "Costruzione Residenziale", 
                desc: "Ville esclusive, complessi residenziali di lusso e appartamenti di pregio progettati per offrire il massimo comfort e prestigio.", 
                icon: House 
              },
              { 
                title: "Costruzione Commerciale", 
                desc: "Sedi aziendali di rappresentanza, boutique di lusso, e complessi commerciali all'avanguardia con finiture d'eccellenza.", 
                icon: Buildings 
              },
              { 
                title: "Infrastrutture", 
                desc: "Grandi opere, collegamenti stradali e complessi ingegneristici realizzati con massima affidabilità strutturale e tecnologica.", 
                icon: Bridge 
              },
              { 
                title: "Ristrutturazioni", 
                desc: "Restauro conservativo di edifici storici ed efficientamento energetico completo per preservare e valorizzare il patrimonio immobiliare.", 
                icon: PaintBrush 
              },
              { 
                title: "Gestione Progetti", 
                desc: "Coordinamento completo dalla progettazione iniziale alla consegna chiavi in mano, garantendo rispetto rigoroso di tempi e budget.", 
                icon: ClipboardText 
              },
              { 
                title: "Consulenza Tecnica", 
                desc: "Rilievi strutturali, perizie d'ingegneria, pianificazione di fattibilità economica e conformità alle normative europee.", 
                icon: Wrench 
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="bezel-outer group cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                >
                  <div className="bezel-inner p-8 md:p-10 flex flex-col justify-between min-h-[320px] transition-luxury bg-white group-hover:bg-[#1E1E1E]">
                    <div>
                      {/* Icon container */}
                      <div className="w-12 h-12 rounded-2xl bg-[#C8A96B]/10 flex items-center justify-center transition-luxury group-hover:bg-white/10 mb-8">
                        <IconComponent className="w-6 h-6 text-[#C8A96B] transition-colors" />
                      </div>
                      
                      <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-[#111111] transition-colors group-hover:text-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#666666] leading-relaxed transition-colors group-hover:text-white/60">
                        {service.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[#C8A96B] font-semibold text-xs uppercase tracking-wider mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Richiedi info</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="progetti" className="py-24 md:py-36 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C8A96B] block mb-3">
                Architettura e Precisione
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                Progetti di Eccellenza
              </h2>
            </div>
            <div className="w-24 h-[1px] bg-[#C8A96B] mt-6 md:mt-0 md:mb-2" />
          </div>

          {/* Staggered Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Villa Aurelia",
                location: "Amalfi, Salerno",
                desc: "Residenza privata a strapiombo sul mare. Unione tra pietra locale, cemento grezzo e vetrate panoramiche a scomparsa.",
                img: residentialImg,
                size: "lg:col-span-2"
              },
              {
                title: "Palazzo Vetra",
                location: "Porta Nuova, Milano",
                desc: "Showroom commerciale e uffici direzionali dal design parametrico in vetro strutturale e acciaio spazzolato.",
                img: commercialImg,
                size: "lg:col-span-1"
              },
              {
                title: "Viadotto del Sole",
                location: "Toscana",
                desc: "Opere infrastrutturali d'avanguardia stradale ad impatto ambientale ridotto, con campate in acciaio autoprotetto.",
                img: infrastructureImg,
                size: "lg:col-span-3"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group cursor-pointer ${project.size}`}
              >
                {/* Visual content nested in a beautiful dark bezel card */}
                <div className="bezel-outer-dark hover:scale-[1.005] transition-transform duration-300">
                  <div className="bezel-inner-dark overflow-hidden relative">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img 
                        src={project.img} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      {/* Dark overlay showing text on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent opacity-90" />
                    </div>
                    
                    <div className="p-8 flex flex-col justify-between md:flex-row md:items-end gap-6">
                      <div className="max-w-xl">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C8A96B]">
                          {project.location}
                        </span>
                        <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight text-white mt-1">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-sm mt-3 leading-relaxed">
                          {project.desc}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => setModalOpen(true)}
                        className="flex-shrink-0 group/btn flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-[#C8A96B] border border-white/10 hover:border-[#C8A96B] rounded-full text-xs font-semibold uppercase tracking-wider text-white transition-luxury cursor-pointer"
                      >
                        <span>Scopri il Progetto</span>
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center transition-luxury group-hover/btn:translate-x-1">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (Chi Siamo) */}
      <section id="chi-siamo" className="py-24 md:py-36 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Column 1: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C8A96B] block mb-3">
                La Nostra Identità
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111] mb-6 leading-none">
                Chi Siamo
              </h2>
              <div className="w-12 h-[2px] bg-[#C8A96B] mb-8" />
              <p className="text-base md:text-lg text-[#1A1A1A] font-semibold leading-relaxed mb-6">
                Da oltre vent'anni realizziamo progetti che combinano innovazione, qualità e precisione.
              </p>
              <p className="text-sm md:text-base text-[#666666] leading-relaxed mb-8">
                Il nostro obiettivo è creare infrastrutture e spazi residenziali o commerciali di altissimo livello, destinati a durare nel tempo. Ogni opera firmata da Italia Costruzioni è sinonimo di eccellenza ingegneristica, rigore esecutivo e sensibilità estetica tipica del grande design italiano.
              </p>
              
              <div className="grid grid-cols-2 gap-6 border-t border-[#111111]/10 pt-8">
                <div>
                  <span className="font-heading text-2xl font-bold text-[#111111]">MILANO</span>
                  <p className="text-xs text-[#666666] uppercase tracking-wider mt-1">Sede Amministrativa</p>
                </div>
                <div>
                  <span className="font-heading text-2xl font-bold text-[#111111]">ROMA</span>
                  <p className="text-xs text-[#666666] uppercase tracking-wider mt-1">Sede Operativa</p>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Large architectural image nested in bezel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bezel-outer"
            >
              <div className="bezel-inner overflow-hidden aspect-[4/3]">
                <img 
                  src={aboutImg} 
                  alt="Dettaglio Architettonico di Pregio" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 md:py-36 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C8A96B] block mb-3">
              Standard Di Eccellenza
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
              Perché Sceglierci
            </h2>
            <div className="w-12 h-[2px] bg-[#C8A96B] mx-auto mt-6" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Qualità Certificata",
                desc: "Materiali selezionati all'origine, test strutturali avanzati e massima aderenza alle norme ISO internazionali.",
                icon: ShieldCheck
              },
              {
                title: "Team Specializzato",
                desc: "Ingegneri, designer e maestranze altamente qualificate con anni di esperienza in cantieri complessi.",
                icon: Users
              },
              {
                title: "Tecnologie Moderne",
                desc: "Modellazione BIM (Building Information Modeling) e metodologie costruttive eco-sostenibili all'avanguardia.",
                icon: Cpu
              },
              {
                title: "Consegna Puntuale",
                desc: "Pianificazione dettagliata delle fases operative e monitoraggio digitale per il rispetto assoluto delle tempistiche.",
                icon: Clock
              }
            ].map((card, i) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bezel-outer-dark"
                >
                  <div className="bezel-inner-dark p-8 flex flex-col justify-between min-h-[260px] bg-[#1E1E1E]">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                      <IconComp className="w-5 h-5 text-[#C8A96B]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold uppercase tracking-tight text-white mb-3">
                        {card.title}
                      </h3>
                      <p className="text-xs text-white/50 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <section id="contatti" className="relative py-24 md:py-36 bg-[#111111] overflow-hidden text-center">
        {/* Subtle background abstract geometry */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.05)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C8A96B] block mb-4">
            Avvia La Tua Opera
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none mb-6">
            Parliamo del Tuo Progetto
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
            Contatta il nostro team per una consulenza personalizzata. Progetteremo insieme una soluzione su misura adatta alle tue esigenze di sviluppo.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C8A96B] hover:bg-[#b09355] text-white rounded-full text-xs font-bold uppercase tracking-widest transition-luxury cursor-pointer active:scale-[0.98]"
            >
              <span>Richiedi un Preventivo</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-luxury group-hover:translate-x-1">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </button>
            <a
              href="mailto:info@italiacostruzioni.it"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest transition-luxury cursor-pointer text-white"
            >
              <span>info@italiacostruzioni.it</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-white pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
            {/* Col 1: Brand & Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Building weight="bold" className="text-[#C8A96B] w-5 h-5" />
                <span className="font-heading text-lg font-black tracking-wider text-white">ITALIA COSTRUZIONI</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed mb-6">
                Costruiamo il Futuro. Innovazione, eccellenza tecnica e design d'alta gamma per lo sviluppo immobiliare italiano.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#C8A96B] mb-6">Navigazione</h4>
              <ul className="flex flex-col gap-3 text-xs text-white/60">
                {[
                  { name: "Home", id: "home" },
                  { name: "Chi Siamo", id: "chi-siamo" },
                  { name: "Servizi", id: "servizi" },
                  { name: "Progetti", id: "progetti" }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact Details */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#C8A96B] mb-6">Contatti</h4>
              <ul className="flex flex-col gap-3 text-xs text-white/60">
                <li className="flex items-center gap-2">
                  <MapPin className="text-[#C8A96B]" />
                  <span>Via della Moscova 12, Milano</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="text-[#C8A96B]" />
                  <span>+39 02 894567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Envelope className="text-[#C8A96B]" />
                  <span>info@italiacostruzioni.it</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Corporate details */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#C8A96B] mb-6">Società</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Italia Costruzioni S.p.A.<br />
                P.IVA IT 09485760921<br />
                Cap. Soc. € 15.000.000 i.v.<br />
                R.E.A. MI-982475
              </p>
            </div>
          </div>

          {/* Bottom Copyright details */}
          <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-[10px] uppercase tracking-widest pt-8">
            <p>© {new Date().getFullYear()} Italia Costruzioni S.p.A. Tutti i diritti riservati.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini & Condizioni</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ESTIMATE REQUEST MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Body (Double Bezel structure) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#1E1E1E] border border-white/10 rounded-[2rem] p-1.5 shadow-2xl z-10 overflow-hidden text-white"
            >
              <div className="bg-[#1E1E1E] rounded-[calc(2rem-0.375rem)] p-8 md:p-10 border border-white/5">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <CheckCircle size={64} className="text-[#C8A96B] mb-6" />
                    <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-2">
                      Richiesta Inviata
                    </h3>
                    <p className="text-sm text-white/60 max-w-sm">
                      La tua richiesta è stata presa in carico dal nostro ufficio relazioni. Ti contatteremo entro 24 ore.
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[#C8A96B] block mb-2">
                      Preventivo Personalizzato
                    </span>
                    <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white mb-6">
                      Avvia il Tuo Progetto
                    </h3>
                    
                    {/* Progress dots */}
                    <div className="flex gap-2 mb-8">
                      <div className={`h-1 flex-1 rounded-full ${estimateStep >= 1 ? "bg-[#C8A96B]" : "bg-white/10"}`} />
                      <div className={`h-1 flex-1 rounded-full ${estimateStep >= 2 ? "bg-[#C8A96B]" : "bg-white/10"}`} />
                      <div className={`h-1 flex-1 rounded-full ${estimateStep >= 3 ? "bg-[#C8A96B]" : "bg-white/10"}`} />
                    </div>

                    <form onSubmit={handleSubmitEstimate} className="flex flex-col gap-6">
                      {estimateStep === 1 && (
                        <div className="flex flex-col gap-4">
                          <label className="text-xs uppercase tracking-wider font-bold text-[#C8A96B]">
                            Tipologia di Opera
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              "Costruzione Residenziale",
                              "Costruzione Commerciale",
                              "Infrastrutture",
                              "Ristrutturazioni"
                            ].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setEstimateStep(2)}
                                className="px-5 py-4 border border-white/10 hover:border-[#C8A96B]/50 hover:bg-[#C8A96B]/5 bg-white/5 rounded-xl text-xs font-semibold text-left transition-luxury cursor-pointer"
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {estimateStep === 2 && (
                        <div className="flex flex-col gap-4">
                          <label className="text-xs uppercase tracking-wider font-bold text-[#C8A96B]">
                            Budget Previsto (€)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              "Da €500K a €2M",
                              "Da €2M a €10M",
                              "Da €10M a €50M",
                              "Oltre €50M"
                            ].map((budget) => (
                              <button
                                key={budget}
                                type="button"
                                onClick={() => setEstimateStep(3)}
                                className="px-5 py-4 border border-white/10 hover:border-[#C8A96B]/50 hover:bg-[#C8A96B]/5 bg-white/5 rounded-xl text-xs font-semibold text-left transition-luxury cursor-pointer"
                              >
                                {budget}
                              </button>
                            ))}
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setEstimateStep(1)}
                            className="text-xs text-white/50 hover:text-white transition-colors self-start mt-2"
                          >
                            ← Indietro
                          </button>
                        </div>
                      )}

                      {estimateStep === 3 && (
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="client-name" className="text-xs uppercase tracking-wider font-bold text-white">
                              Nome e Cognome / Società
                            </label>
                            <input
                              required
                              id="client-name"
                              type="text"
                              placeholder="Mario Rossi S.p.A."
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#C8A96B] transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="client-email" className="text-xs uppercase tracking-wider font-bold text-white">
                                Email di Contatto
                              </label>
                              <input
                                required
                                id="client-email"
                                type="email"
                                placeholder="mario.rossi@azienda.it"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#C8A96B] transition-colors"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="client-phone" className="text-xs uppercase tracking-wider font-bold text-white">
                                Numero di Telefono
                              </label>
                              <input
                                required
                                id="client-phone"
                                type="tel"
                                placeholder="+39 333 123456"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#C8A96B] transition-colors"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="client-notes" className="text-xs uppercase tracking-wider font-bold text-white">
                              Note Aggiuntive sul Progetto
                            </label>
                            <textarea
                              id="client-notes"
                              rows={3}
                              placeholder="Descrivi brevemente il lotto, le tempistiche desiderate e altre necessità..."
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#C8A96B] transition-colors resize-none"
                            />
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <button
                              type="button"
                              onClick={() => setEstimateStep(2)}
                              className="text-xs text-white/50 hover:text-white transition-colors"
                            >
                              ← Indietro
                            </button>

                            <button
                              type="submit"
                              className="group flex items-center gap-2 px-6 py-3 bg-[#C8A96B] hover:bg-[#b09355] text-white rounded-full text-xs font-bold uppercase tracking-widest transition-luxury cursor-pointer active:scale-[0.98]"
                            >
                              <span>Invia Richiesta</span>
                              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-luxury group-hover:translate-x-1">
                                <ArrowRight className="w-3 h-3 text-white" />
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
