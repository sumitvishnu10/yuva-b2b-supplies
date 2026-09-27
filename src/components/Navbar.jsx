import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import logoImage from '../assets/yuva-logo.png';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const [activeSection, setActiveSection] = useState('home');

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Entrance Animation
      const tl = gsap.timeline();

      tl.from(".logo-link", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      })
        .from(".nav-links li", {
          y: -12,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out"
        }, "-=0.4")
        .from(".nav-actions .btn", {
          x: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.3");

      // Smart Header Scroll Interpolation
      gsap.to(headerRef.current, {
        scrollTrigger: {
          start: "top top",
          end: "80px top",
          scrub: true,
        },
        height: "80px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(88, 161, 211, 0.15)",
        ease: "none"
      });

      gsap.to(".nav-logo", {
        scrollTrigger: {
          start: "top top",
          end: "80px top",
          scrub: true,
        },
        height: "52px",
        ease: "none"
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.to(headerRef.current, {
        scrollTrigger: {
          start: "top top",
          end: "80px top",
          scrub: true,
        },
        height: "80px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(88, 161, 211, 0.15)",
        ease: "none"
      });
    });

    // ScrollSpy Logic (Run regardless of reduced motion)
    const sections = ['home', 'about', 'industries', 'products', 'why-us', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%", // Triggers slightly before halfway
          end: "bottom 60%",
          onToggle: self => {
            if (self.isActive) setActiveSection(id);
          }
        });
      }
    });

  }, { scope: headerRef });

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header ref={headerRef} className="navbar">
      <div className="container navbar-container">
        <Link to="/#home" onClick={scrollToTop} className="logo-link">
          <div className="branding-top-row">
            <img src={logoImage} alt="YUVA B2B SUPPLIES Logo" className="nav-logo" />
            <div className="branding-text">
              <span className="brand-name">YUVA</span>
              <span className="brand-sub">
                <span className="text-blue">B2B</span> SUPPLIES
              </span>
            </div>
          </div>
          <span className="brand-tagline">Your Business, Our Supplies, Grow Together</span>
        </Link>

        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><Link to="/#home" className={activeSection === 'home' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/#about" className={activeSection === 'about' ? 'active' : ''}>About</Link></li>
            <li><Link to="/#industries" className={activeSection === 'industries' ? 'active' : ''}>Industries</Link></li>
            <li><Link to="/#products" className={activeSection === 'products' ? 'active' : ''}>Products</Link></li>
            <li><Link to="/#why-us" className={activeSection === 'why-us' ? 'active' : ''}>Why Us</Link></li>
            <li><Link to="/#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</Link></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <Link to="/#contact" className="btn btn-primary">Request a Quote</Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><Link to="/#home" onClick={toggleMenu} className={activeSection === 'home' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/#about" onClick={toggleMenu} className={activeSection === 'about' ? 'active' : ''}>About</Link></li>
          <li><Link to="/#industries" onClick={toggleMenu} className={activeSection === 'industries' ? 'active' : ''}>Industries</Link></li>
          <li><Link to="/#products" onClick={toggleMenu} className={activeSection === 'products' ? 'active' : ''}>Products</Link></li>
          <li><Link to="/#why-us" onClick={toggleMenu} className={activeSection === 'why-us' ? 'active' : ''}>Why Us</Link></li>
          <li><Link to="/#contact" onClick={toggleMenu} className={activeSection === 'contact' ? 'active' : ''}>Contact</Link></li>
        </ul>
        <div className="mobile-nav-actions">
          <Link to="/#contact" className="btn btn-primary w-full" onClick={toggleMenu}>Request a Quote</Link>
        </div>
      </div>
    </header>
  );
}
