import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  Mail,
  Pause,
  Play,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
const CONTACT_EMAIL = 'samraatt.dev@gmail.com';

const processSteps = [
  {
    number: '01',
    title: 'Define',
    copy: 'Understanding goals, requirements and business objectives before development begins.',
  },
  {
    number: '02',
    title: 'Design',
    copy: 'Creating beautiful, user-friendly and conversion-focused interfaces.',
  },
  {
    number: '03',
    title: 'Build',
    copy: 'Building scalable frontend and backend systems using modern technologies.',
  },
  {
    number: '04',
    title: 'Launch',
    copy: 'Testing, deployment, optimization and long-term support.',
  },
];

const projects = [
  {
    name: 'GUDBITES AI',
    type: 'AI food discovery',
    copy: 'AI-powered food discovery platform helping users find meals, recipes and recommendations.',
  },
  {
    name: 'WINECELLAR.CO.IN',
    type: 'Premium ecommerce',
    copy: 'Premium wine and liquor ecommerce platform.',
  },
  {
    name: 'IBUILDMATRIX.COM',
    type: 'Construction technology',
    copy: 'Construction technology and project management platform.',
  },
  {
    name: 'BUILDMATRIX APP',
    type: 'Mobile workflow',
    copy: 'Mobile application for construction workflow management.',
  },
  {
    name: 'PROMATE APP',
    type: 'Collaboration system',
    copy: 'Productivity and collaboration application.',
  },
  {
    name: 'CAREER NAVIGATOR APP',
    type: 'Career guidance',
    copy: 'Career guidance and job preparation application.',
  },
];

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'React Native',
  'Firebase',
  'MongoDB',
  'PostgreSQL',
  'Tailwind CSS',
  'Framer Motion',
  'GSAP',
  'AI Integration',
  'REST APIs',
  'Full Stack Development',
];

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function useMagneticButtons() {
  useEffect(() => {
    const buttons = gsap.utils.toArray('.magnetic');

    const cleanups = buttons.map((button) => {
      const strength = 0.28;

      const move = (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * strength;
        const y = (event.clientY - rect.top - rect.height / 2) * strength;
        gsap.to(button, { x, y, duration: 0.35, ease: 'power3.out' });
      };

      const reset = () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.45)' });
      };

      button.addEventListener('mousemove', move);
      button.addEventListener('mouseleave', reset);

      return () => {
        button.removeEventListener('mousemove', move);
        button.removeEventListener('mouseleave', reset);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

function scrollToId(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const videoRef = useRef(null);
  const processRef = useRef(null);
  const pathRef = useRef(null);
  const contactRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isReelActive, setIsReelActive] = useState(false);
  const [contactStatus, setContactStatus] = useState('');

  useSmoothScroll();
  useMagneticButtons();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const revealItems = gsap.utils.toArray('.reveal-up');
      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 52, opacity: 0, filter: 'blur(12px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
            },
          },
        );
      });

      gsap.fromTo(
        '.marquee-track',
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: 'none',
          repeat: -1,
          duration: 28,
        },
      );

      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 72%',
            end: 'bottom 42%',
            scrub: 1,
          },
        });
      }

      const isCompact = window.matchMedia('(max-width: 680px)').matches;

      gsap.utils.toArray('.process-card').forEach((card, index) => {
        if (isCompact) {
          gsap.fromTo(
            card,
            { y: 28, rotate: 0, opacity: 0.32, scale: 0.98 },
            {
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
              duration: 0.72,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
              },
            },
          );
          return;
        }

        gsap.fromTo(
          card,
          {
            y: index % 2 ? 110 : -90,
            rotate: index % 2 ? 8 : -8,
            opacity: 0.18,
            scale: 0.92,
          },
          {
            y: 0,
            rotate: card.dataset.rotate,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top 80%',
              end: 'bottom 48%',
              scrub: 1,
            },
          },
        );
      });

      gsap.fromTo(
        '.contact-panel',
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 72%',
          },
        },
      );
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resetVideoToStart = () => {
      video.pause();
      video.currentTime = 0;
      setIsReelActive(false);
    };

    video.muted = true;
    video.currentTime = 0;
    video.addEventListener('ended', resetVideoToStart);
    video.play().catch(() => {
      setIsReelActive(false);
    });

    return () => {
      video.removeEventListener('ended', resetVideoToStart);
    };
  }, []);

  const toggleReelPlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isReelActive && !video.paused) {
      video.pause();
      video.currentTime = 0;
      setIsReelActive(false);
      return;
    }

    video.currentTime = 0;
    video.muted = isMuted;
    if (!isMuted) video.volume = 1;

    await video.play().then(() => {
      setIsReelActive(true);
    }).catch(() => {
      video.muted = true;
      setIsMuted(true);
      setIsReelActive(false);
    });
  };

  const toggleReelAudio = () => {
    const nextMuted = !isMuted;
    const video = videoRef.current;

    setIsMuted(nextMuted);
    if (video) {
      video.muted = nextMuted;
      if (!nextMuted) video.volume = 1;
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'website visitor'}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    );

    setContactStatus('Opening your email app with the full message ready to send.');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <OpeningLoader />
      <main>
        <Header />
        <section className="hero section" id="home">
          <video
            ref={videoRef}
            className="hero-background-video"
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
          >
            <source src="/intro-final.mov" />
          </video>
          <div className="hero-video-shade" aria-hidden="true" />
          <div className="hero-content">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 4.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero-kicker">Hi, I'm</span>
              <h1>SAMRAAT</h1>
              <span className="hero-role">Founder of GudBites AI</span>
              <p>
                I can build any app or website. That's enough abt me, DM ME FOR MORE INFO :)
              </p>
              <div className="hero-actions">
                <button className="btn btn-hero-primary magnetic" onClick={() => scrollToId('#projects')}>
                  View My Work <ArrowUpRight size={18} />
                </button>
                <button className="btn btn-hero-outline magnetic" onClick={() => scrollToId('#contact')}>
                  Contact Me <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
          <div className="hero-reel-controls">
            <button
              className="hero-play-reel magnetic"
              onClick={toggleReelPlayback}
              aria-label={isReelActive ? 'Pause reel and reset to start' : 'Play reel from start'}
              aria-pressed={isReelActive}
            >
              <span className="hero-play-circle">
                {isReelActive ? <Pause size={34} fill="currentColor" /> : <Play size={34} fill="currentColor" />}
              </span>
              <span>{isReelActive ? 'PAUSE REEL' : 'PLAY REEL'}</span>
            </button>
            <button
              className="hero-audio-toggle magnetic"
              onClick={toggleReelAudio}
              aria-label={isMuted ? 'Unmute reel audio' : 'Mute reel audio'}
              aria-pressed={!isMuted}
            >
              <span className="hero-audio-circle">
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </span>
              <span>{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
            </button>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="container about-grid">
            <div className="about-portrait reveal-up">
              <img src="/my-image.png" alt="Samraat portrait" />
            </div>
            <div className="about-content reveal-up">
              <h2>Hello!</h2>
              <p>
                Hi, I'm <strong>SAMRAAT</strong>, a passionate full-stack developer focused
                on crafting clean, functional and highly scalable web applications.
              </p>
            </div>
          </div>
        </section>

        <section className="process section" id="process" ref={processRef}>
          <div className="container process-layout">
            <div className="process-copy reveal-up">
              <span className="eyebrow">How we work</span>
              <h2>Let us show you how we drive your brand to new heights</h2>
              <p>
                We follow a structured, creative and highly technical approach to turn your
                ideas into robust full-stack applications.
              </p>
            </div>
            <div className="process-stage" aria-label="Development process">
              <svg viewBox="0 0 760 560" className="process-path" aria-hidden="true">
                <path
                  ref={pathRef}
                  d="M45 420 C150 245 220 210 325 255 S475 440 595 308 S645 115 720 88"
                />
              </svg>
              {processSteps.map((step, index) => (
                <article
                  className={`process-card process-card-${index + 1}`}
                  data-rotate={index % 2 ? '5' : '-5'}
                  key={step.title}
                >
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="section-head container reveal-up">
            <span className="eyebrow red">Selected systems</span>
            <h2>Featured Projects</h2>
          </div>
          <div className="projects-grid container">
            {projects.map((project, index) => (
              <article className="project-card reveal-up" key={project.name}>
                <div>
                  <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{project.name}</h3>
                  <p>{project.copy}</p>
                </div>
                <div className="project-bottom">
                  <span>{project.type}</span>
                  <ArrowUpRight size={20} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section" id="skills">
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              <span>SAMRAAT</span>
              <span>FULL STACK</span>
              <span>AI PRODUCTS</span>
              <span>MOBILE APPS</span>
              <span>SAMRAAT</span>
              <span>FULL STACK</span>
              <span>AI PRODUCTS</span>
              <span>MOBILE APPS</span>
            </div>
          </div>
          <div className="container skills-content">
            <div className="section-head reveal-up">
              <span className="eyebrow">Core stack</span>
              <h2>Skills built for shipping serious products</h2>
            </div>
            <div className="skill-cloud">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="skill-pill"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: index * 0.035, duration: 0.55 }}
                >
                  <Sparkles size={15} />
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contact" ref={contactRef}>
          <div className="contact-word" aria-hidden="true">
            CONTACT
          </div>
          <div className="container contact-layout">
            <div className="contact-panel">
              <div>
                <span className="eyebrow">Reach us</span>
                <h2>Let's Build Something</h2>
              </div>
              <form onSubmit={handleContactSubmit}>
                <label>
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Phone Number</span>
                  <input type="tel" name="phone" autoComplete="tel" required />
                </label>
                <label className="message-field">
                  <span>Message</span>
                  <textarea name="message" rows="5" required />
                </label>
                <button className="btn btn-light magnetic" type="submit">
                  Let's Build Something <Send size={17} />
                </button>
                {contactStatus ? <p className="contact-status">{contactStatus}</p> : null}
              </form>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer-grid">
            <div>
              <h2>SAMRAAT</h2>
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Mail size={16} /> {CONTACT_EMAIL}
              </a>
            </div>
            <nav aria-label="Footer navigation">
              {navItems.map((item) => (
                <button key={item} onClick={() => scrollToId(`#${item.toLowerCase()}`)}>
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <p className="container footer-credit">Designed and developed with ❤️ by Shreyas Saamraat</p>
        </footer>
      </main>
    </>
  );
}

function OpeningLoader() {
  return (
    <motion.div
      className="opening-loader"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.95, delay: 4.35, ease: [0.83, 0, 0.17, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="loader-word"
        initial={{ opacity: 1, y: 14, scale: 0.98 }}
        animate={{
          opacity: [1, 1, 1, 0],
          y: [14, 0, 0, -28],
          scale: [0.98, 1, 1.01, 1.04],
          filter: ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'],
        }}
        transition={{ duration: 4.25, times: [0, 0.12, 0.86, 1], ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="loader-outline">SHREYAS</span>
        <span className="loader-fill">SHREYAS</span>
      </motion.div>
    </motion.div>
  );
}

function Header() {
  return (
    <motion.header
      className="site-header"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 4.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="logo" onClick={() => scrollToId('#home')}>
        SAMRAAT
      </button>
      <nav aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item} onClick={() => scrollToId(`#${item.toLowerCase()}`)}>
            {item}
          </button>
        ))}
      </nav>
      <button className="hire-btn magnetic" onClick={() => scrollToId('#contact')}>
        Rich enough to afford me?
      </button>
    </motion.header>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
