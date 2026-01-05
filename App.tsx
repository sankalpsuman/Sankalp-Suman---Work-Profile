
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code2, 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  ChevronRight,
  Sparkles,
  MessageCircle,
  X,
  Send,
  Loader2,
  Calendar,
  CheckCircle2,
  Lock,
  ExternalLink,
  Moon,
  Sun,
  Menu,
  Download,
  Github,
  Trash2,
  User,
  Zap,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { RESUME_DATA } from './data';
import { GoogleGenAI } from '@google/genai';

// --- Types ---
interface Message {
  role: 'user' | 'assistant';
  text: string;
}

// --- Components ---

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2.5 rounded-2xl bg-white/10 dark:bg-slate-800/50 backdrop-blur-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:ring-2 ring-blue-500 transition-all"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Impact', href: '#experience' },
    { name: 'Stack', href: '#skills' },
    { name: 'Awards', href: '#awards' },
  ];

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500 ${scrolled ? 'top-4' : 'top-8'}`}>
      <div className={`flex items-center justify-between px-6 py-3 rounded-[2rem] border transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl border-slate-200/50 dark:border-slate-700/50' : 'bg-transparent border-transparent'}`}>
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="text-lg font-black tracking-tighter text-slate-900 dark:text-white">
            Sankalp<span className="text-blue-600">.</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full"
            >
              {link.name}
            </a>
          ))}
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <ThemeToggle />
          <a href="#contact" className="ml-4 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-black hover:scale-105 transition-transform">
            Let's Talk
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-slate-900 dark:text-white">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {links.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="text-xl font-black text-slate-900 dark:text-white">{link.name}</a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-center">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isKeySelected, setIsKeySelected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "I'm Sankalp's Career Assistant. How can I help you navigate his 7+ years of QA & Scrum leadership experience today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const checkKey = useCallback(async () => {
    try {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setIsKeySelected(hasKey);
      } else {
        setIsKeySelected(true);
      }
    } catch {
      setIsKeySelected(true);
    }
  }, []);

  useEffect(() => { if (isOpen) checkKey(); }, [isOpen, checkKey]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleOpenSelectKey = async () => {
    try {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
        setIsKeySelected(true);
      }
    } catch (e) {
      console.error("Key selection failed", e);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Role: Career Assistant for Sankalp Suman.
          Profile Data: ${JSON.stringify(RESUME_DATA)}
          Rules:
          - Be concise, professional, and data-driven.
          - Highlight QA metrics, Scrum leadership, and Adobe/Amdocs tenure.
          - If asked about contact: ${RESUME_DATA.email}.
          - Always mention his 7+ years of end-to-end testing experience.
          User: ${userMsg}
        `,
      });
      setMessages(prev => [...prev, { role: 'assistant', text: response.text || "I'm processing that. Feel free to check the 'Impact' section for details on my tenure at Amdocs!" }]);
    } catch (err: any) {
      if (err.message?.includes("entity was not found")) setIsKeySelected(false);
      else setMessages(prev => [...prev, { role: 'assistant', text: "Connection error. Please try direct contact at sankalpsmn@gmail.com." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-5 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full blur opacity-25 group-hover:opacity-50 transition"></div>
          <Sparkles className="w-6 h-6 relative" />
        </button>
      )}

      {isOpen && (
        <div className="w-[calc(100vw-3rem)] sm:w-[400px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8">
          <div className="bg-slate-900 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white"><Cpu className="w-5 h-5" /></div>
              <div>
                <h3 className="text-white text-sm font-black uppercase tracking-widest">Sankalp AI</h3>
                <p className="text-[10px] text-blue-400 font-bold uppercase">Ready to assist</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
          </div>

          <div className="h-[450px] overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950/50 relative">
            {!isKeySelected ? (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-10 text-center bg-white/95 dark:bg-slate-900/95">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Lock className="w-8 h-8" /></div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">Connect AI Core</h4>
                <p className="text-xs text-slate-500 mb-8 px-4">To power this interactive experience, please connect your Gemini API Key.</p>
                <button onClick={handleOpenSelectKey} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20">Connect Key</button>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="mt-4 text-[10px] text-blue-500 hover:underline">Setup Instructions</a>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-none shadow-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3"><div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg animate-pulse"></div><div className="bg-white dark:bg-slate-800 p-4 rounded-2xl animate-pulse w-24"></div></div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {isKeySelected && (
            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                <input 
                  type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about QA metrics..." 
                  className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl px-5 py-3 text-sm focus:ring-2 ring-blue-500 outline-none"
                />
                <button type="submit" disabled={!input.trim()} className="bg-blue-600 text-white p-3 rounded-2xl disabled:opacity-50"><Send className="w-5 h-5" /></button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon, light = false }: any) => (
  <div className="mb-16">
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${light ? 'bg-white/10 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
      {Icon && <Icon className="w-4 h-4" />}
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{subtitle}</span>
    </div>
    <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${light ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{title}</h2>
  </div>
);

export default function App() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-500">
      <Nav />
      <AIChatbot />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-white dark:from-blue-900/20 dark:via-slate-950 dark:to-slate-950"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-400/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-400/10 blur-[100px] rounded-full animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
              ENGINEERING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">QUALITY</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-xl mb-12 font-medium leading-relaxed">
              Senior QA Specialist & Scrum Master with <span className="text-slate-900 dark:text-white font-black underline decoration-blue-500 decoration-4 underline-offset-4">7+ years</span> of delivering mission-critical software at Amdocs & Adobe.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#experience" className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-lg hover:scale-105 transition-transform flex items-center gap-3">
                View Impact <ChevronRight className="w-5 h-5" />
              </a>
              <button className="px-10 py-5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-[2rem] font-black text-lg hover:bg-slate-50 transition-all flex items-center gap-3">
                <Download className="w-5 h-5" /> CV
              </button>
            </div>
            <div className="mt-20 flex items-center gap-8">
               <div className="flex -space-x-4">
                 {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-black text-xs">QA</div>)}
               </div>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Delivery Standards</p>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in zoom-in-95 duration-1000 delay-200">
            <div className="grid grid-cols-2 gap-8 relative z-10">
              {[
                { label: 'Releases Led', value: '100+', icon: Zap, color: 'text-blue-600' },
                { label: 'Global Awards', value: '03', icon: Award, color: 'text-teal-500' },
                { label: 'Defect Reduction', value: '40%', icon: ShieldCheck, color: 'text-purple-600' },
                { label: 'Experience', value: '7Y+', icon: Briefcase, color: 'text-orange-500' }
              ].map((stat, i) => (
                <div key={i} className={`p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl transition-all hover:-translate-y-2 group ${i % 2 !== 0 ? 'mt-12' : ''}`}>
                  <stat.icon className={`w-10 h-10 mb-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] border-[40px] border-slate-100 dark:border-slate-900/50 rounded-full -z-10"></div>
          </div>
        </div>
      </section>

      {/* About Case Study */}
      <section id="about" className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-square rounded-[4rem] bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-2xl group">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-teal-400/40 mix-blend-overlay"></div>
               <div className="absolute inset-0 flex items-center justify-center p-12 text-center flex-col">
                  <span className="text-8xl font-black text-white/20 mb-8 tracking-tighter">SQA</span>
                  <p className="text-2xl font-bold text-white italic">"Ensuring software doesn't just work, but excels in real-world scenarios."</p>
               </div>
               <div className="absolute bottom-10 left-10 flex items-center gap-4 text-white">
                 <div className="w-16 h-px bg-white/50"></div>
                 <span className="text-xs font-black uppercase tracking-widest">Leadership Philosophy</span>
               </div>
            </div>
            <div>
              <SectionHeader title="Manual Precision, Automated Speed." subtitle="The Specialist" icon={User} />
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                {RESUME_DATA.summary}
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                  <MapPin className="text-blue-600 w-8 h-8 mb-4" />
                  <h4 className="font-black mb-1">Location</h4>
                  <p className="text-slate-500 font-medium">{RESUME_DATA.location}</p>
                </div>
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                  <CheckCircle2 className="text-teal-500 w-8 h-8 mb-4" />
                  <h4 className="font-black mb-1">Status</h4>
                  <p className="text-slate-500 font-medium">Scrum Master Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience / Impact Grid */}
      <section id="experience" className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Professional Trajectory" subtitle="The Journey" icon={Briefcase} />
          <div className="space-y-12">
            {RESUME_DATA.experience.map((exp, i) => (
              <div key={i} className="group p-10 md:p-16 rounded-[4rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-700 hover:shadow-2xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                   <div>
                     <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-4">{exp.period}</span>
                     <h3 className="text-4xl font-black tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">{exp.role}</h3>
                     <p className="text-xl font-bold text-slate-500 flex items-center gap-2">
                       <Zap className="w-5 h-5 text-teal-400" /> {exp.company}
                     </p>
                   </div>
                   <div className="hidden lg:block">
                     <div className="w-20 h-20 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 group-hover:border-blue-500 group-hover:text-blue-500 transition-all">
                       <ChevronRight className="w-10 h-10" />
                     </div>
                   </div>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Core Contributions</h4>
                    <ul className="space-y-4">
                      {exp.description.slice(0, 4).map((desc, idx) => (
                        <li key={idx} className="flex gap-4 items-start text-slate-600 dark:text-slate-400">
                           <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                           <span className="font-medium leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col justify-center">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Environment</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Jenkins', 'Docker', 'Postman', 'SQL', 'JIRA', 'Agile'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-bold text-slate-500">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Cluster */}
      <section id="skills" className="py-32 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader title="Technical Stack" subtitle="The Toolkit" icon={Code2} light />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {RESUME_DATA.skills.map((group, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                  {i === 0 ? <ShieldCheck /> : i === 1 ? <Cpu /> : i === 2 ? <Zap /> : <User />}
                </div>
                <h3 className="text-white text-xl font-black mb-8 uppercase tracking-tighter">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                   {group.items.map(skill => (
                     <span key={skill} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-400 transition-colors">
                       {skill}
                     </span>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Edu */}
      <section id="awards" className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <SectionHeader title="Recognition" subtitle="Honors" icon={Award} />
              <div className="space-y-6">
                {RESUME_DATA.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-8 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:bg-blue-600 transition-colors">
                    <div className="text-4xl font-black text-slate-200 dark:text-slate-700 group-hover:text-white/20 transition-colors">{award.year}</div>
                    <div>
                      <h4 className="font-black text-xl group-hover:text-white transition-colors tracking-tight">{award.title}</h4>
                      <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest group-hover:text-white/70 transition-colors">{award.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeader title="Foundation" subtitle="Education" icon={GraduationCap} />
              <div className="p-10 rounded-[3rem] bg-blue-600 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                 <h4 className="text-3xl font-black mb-4 leading-tight">{RESUME_DATA.education[0].degree}</h4>
                 <p className="text-blue-200 font-bold mb-8">{RESUME_DATA.education[0].institution}</p>
                 <div className="inline-block px-5 py-2 bg-white text-blue-600 rounded-full font-black text-xs uppercase tracking-widest">{RESUME_DATA.education[0].year}</div>
              </div>
              <div className="mt-12 space-y-4">
                 <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 px-4">Certifications</h4>
                 {RESUME_DATA.certifications.map((cert, i) => (
                   <div key={i} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                     <div className="w-2 h-2 rounded-full bg-teal-500" />
                     <span className="font-bold text-sm">{cert.name}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 mb-32 items-end">
            <div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10">
                LET'S <br /> BUILD <span className="text-blue-500 italic underline">QUALITY.</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-md mb-12">
                Available for strategic QA leadership, Scrum management, and release coordination consulting.
              </p>
              <div className="flex flex-wrap gap-8">
                <a href={`mailto:${RESUME_DATA.email}`} className="text-2xl font-black hover:text-blue-500 transition-colors border-b-4 border-blue-500 pb-2">{RESUME_DATA.email}</a>
                <a href={`https://${RESUME_DATA.linkedin}`} target="_blank" className="text-2xl font-black hover:text-blue-500 transition-colors border-b-4 border-blue-500 pb-2">LinkedIn</a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
               <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Direct Phone</div>
                 <div className="text-3xl font-black text-blue-400">{RESUME_DATA.phone}</div>
               </div>
               <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Focus Area</div>
                 <div className="text-3xl font-black">AI-Driven Testing</div>
               </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/10 text-slate-500 text-xs font-bold uppercase tracking-widest gap-8">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white text-slate-900 rounded-lg flex items-center justify-center font-black">S</div>
               <span>Sankalp Suman Portfolio 2024</span>
             </div>
             <div className="flex items-center gap-8">
               <a href="#" className="hover:text-white transition-colors">Back to top</a>
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             </div>
             <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Powered by Gemini 3 Flash</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
