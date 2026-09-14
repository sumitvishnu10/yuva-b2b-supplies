import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Building2, GraduationCap, Factory, Car, Wrench, Truck, ShoppingCart, Stethoscope, HardHat, Hotel } from 'lucide-react';
import './Industries.css';

gsap.registerPlugin(ScrollTrigger);

export function Industries() {
  const indRef = useRef(null);

  const industries = [
    { id: "01", name: "Offices & Corporate", icon: <Building2 size={24} /> },
    { id: "02", name: "Educational Institutions", icon: <GraduationCap size={24} /> },
    { id: "03", name: "Manufacturing Industries", icon: <Factory size={24} /> },
    { id: "04", name: "Automobile & Auto Components", icon: <Car size={24} /> },
    { id: "05", name: "Engineering", icon: <Wrench size={24} /> },
    { id: "06", name: "Warehouses & Logistics", icon: <Truck size={24} /> },
    { id: "07", name: "Food & FMCG", icon: <ShoppingCart size={24} /> },
    { id: "08", name: "Hospitals & Healthcare", icon: <Stethoscope size={24} /> },
    { id: "09", name: "Construction", icon: <HardHat size={24} /> },
    { id: "10", name: "Hotels & Hospitality", icon: <Hotel size={24} /> }
  ];

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Intro Content Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".industries-intro",
          start: "top 85%"
        }
      });
      tl.from(".gs-intro-elem", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });

      // Cards reveal
      gsap.from(".industry-item", {
        scrollTrigger: {
          trigger: ".industries-list",
          start: "top 85%"
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      });

      // Subtle Horizontal Flow
      gsap.to(".industries-list", {
        scrollTrigger: {
          trigger: ".industries",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        x: -40, // Flow slightly to the left
        ease: "none"
      });
    });
  }, { scope: indRef });

  return (
    <section id="industries" className="industries bg-light" ref={indRef}>
      <div className="container">
        <div className="industries-split">
          <div className="industries-intro">
            <div className="gs-intro-elem">
              <span className="section-label">INDUSTRIES WE SERVE</span>
            </div>

            <div className="gs-intro-elem">
              <h2 className="section-title">Supporting businesses across diverse industries.</h2>
              <p style={{ marginTop: '16px', color: 'var(--text-light)', fontSize: '18px', lineHeight: '1.6' }}>
                Supplying essential business consumables for offices, manufacturing, engineering, logistics, healthcare, construction and hospitality businesses.
              </p>
            </div>

            <div className="industries-big-number-container gs-intro-elem">
              <span className="industries-big-number">10</span>
              <span className="industries-big-text">Key Sectors<br />Supported</span>
            </div>
          </div>

          <div className="industries-list">
            {industries.map((industry) => (
              <div key={industry.id} className="industry-item">
                <div className="industry-icon">{industry.icon}</div>
                <span className="industry-id">{industry.id}</span>
                <span className="industry-name">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
