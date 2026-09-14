import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import aboutNetworkBg from '../assets/about_supply_network.png';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const aboutRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Content Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 80%",
        }
      });

      tl.fromTo([".gs-label", ".gs-title"],
        { y: 20, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.6, stagger: 0.15, ease: "power3.out" }
      )
        .from(".about-text-group p", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.4")
        .from(".gs-highlight", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.3");

      // Image Reveal Left to Right
      gsap.fromTo(".about-image-wrapper",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".about-image-wrapper",
            start: "top 80%",
          },
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 0.7,
          ease: "power3.out"
        }
      );

      // Subtle Parallax (Image moves up, Text moves down)
      gsap.to(".about-image", {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -25,
        ease: "none"
      });

      gsap.to(".about-content", {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 10,
        ease: "none"
      });
    });
  }, { scope: aboutRef });

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="about-container">
        <div className="about-grid">
          {/* Left Content */}
          <div className="about-content">
            <div className="gs-label">
              <span className="section-label">ABOUT US</span>
            </div>

            <h2 className="section-title gs-title">
              One dependable partner for your everyday business supplies.
            </h2>

            <div className="about-text-group">
              <p>
                YUVA B2B SUPPLIES is a Chennai-based B2B supply and distribution company helping businesses source essential workplace and operational supplies through a dependable single-point procurement partner.
              </p>
              <p>
                We provide a wide range of essential business supplies, making everyday procurement simpler and more efficient for organizations across South India.
              </p>
            </div>

            <div className="about-highlight gs-highlight">
              <div className="highlight-line"></div>
              <p className="highlight-text">
                More than a supplier.<br />
                <span className="highlight-blue">A dependable procurement partner.</span>
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="about-image-wrapper" style={{ overflow: 'hidden', borderRadius: '12px' }}>
            <img
              src={aboutNetworkBg}
              alt="YUVA B2B Supplies warehouse inventory in Chennai"
              className="about-image"
              style={{ willChange: 'transform' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
