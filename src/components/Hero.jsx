import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import b2bProductsImage from '../assets/b2b_products_isolated.png';
import './Hero.css';

export function Hero() {
  const heroRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Fast, elegant sequence finishing quickly (Starts after Navbar animation ~0.3s)
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Headline
      tl.fromTo(".gs-split-line",
        {
          opacity: 0,
          y: 20,
          clipPath: "inset(0 100% 0 0)"
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      )
        // 2. Paragraph
        .from(".hero-text", {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4")
        // 3. Buttons
        .from(".hero-cta-group .btn", {
          opacity: 0,
          y: 15,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.3")
        // Trust Line
        .from(".trust-item", {
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.2")
        // 4. Hero Visual Focus Shift (Simple fade & slide, no zoom)
        .fromTo(".hero-hub-wrapper",
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          },
          "-=0.6")
        // Labels pop in softly
        .from(".hub-label", {
          opacity: 0,
          y: 10,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out"
        }, "-=0.4");
    });
  }, { scope: heroRef });

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-split">
        <div className="hero-content">
          <div className="hero-container">
            <h1 className="hero-title">
              <div className="gs-split-line" style={{ overflow: 'hidden' }}>
                <span className="gs-split-word" style={{ display: 'inline-block' }}>ONE</span>{' '}
                <span className="gs-split-word" style={{ display: 'inline-block' }}>PARTNER.</span>
              </div>
              <div className="gs-split-line" style={{ overflow: 'hidden' }}>
                <span className="gs-split-word" style={{ display: 'inline-block' }}>ALL</span>{' '}
                <span className="gs-split-word highlight-blue" style={{ display: 'inline-block' }}>SUPPLIES.</span>
              </div>
            </h1>

            <p className="hero-text">
              <strong style={{ fontFamily: 'var(--font-heading)', color: 'var(--classic-blue)' }}>YUVA B2B SUPPLIES</strong> is a Chennai-based B2B supply and distribution company providing office, industrial, packaging, cleaning, safety and workplace supplies for businesses.
            </p>

            <div className="hero-cta-group">
              <a href="/#contact" className="btn btn-primary">Request a Quote</a>
              <a href="/#products" className="btn btn-secondary">Explore Products</a>
            </div>

            <div className="hero-trust-line">
              <span className="trust-item">✓ Reliable Products</span>
              <span className="trust-item">✓ Competitive Pricing</span>
              <span className="trust-item">✓ Responsive Service</span>
            </div>
          </div>
        </div>

        {/* Right Image / Supply Hub Visual */}
        <div className="hero-hub-wrapper" style={{ willChange: 'transform, opacity, clip-path' }}>
          <div className="hero-hub-visual">
            <div className="hub-bg-graphic"></div>

            <img src={b2bProductsImage} alt="YUVA B2B Supply Ecosystem" className="hub-main-image" />

            <div className="hub-label label-packaging">
              <span className="label-dot"></span> PACKAGING
            </div>
            <div className="hub-label label-safety">
              <span className="label-dot"></span> SAFETY & PPE
            </div>
            <div className="hub-label label-cleaning">
              <span className="label-dot"></span> CLEANING
            </div>
            <div className="hub-label label-office">
              <span className="label-dot"></span> OFFICE
            </div>
            <div className="hub-label label-workspace">
              <span className="label-dot"></span> WORKSPACE
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
