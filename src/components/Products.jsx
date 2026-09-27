import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Paperclip, Droplet, FlaskConical, PackageOpen, HardHat, Coffee } from 'lucide-react';
import './Products.css';

gsap.registerPlugin(ScrollTrigger);

export function Products() {
  const location = useLocation();
  const productsRef = useRef(null);

  const categories = [
    {
      id: "01",
      slug: "office-stationery",
      title: "OFFICE STATIONERY",
      desc: "Everyday office stationery and workplace essentials. We provide reliable business stationery and office supplies for productive environments.",
      icon: <Paperclip size={24} />
    },
    {
      id: "02",
      slug: "sanitation-janitorial",
      title: "SANITATION & JANITORIAL",
      desc: "Essential sanitation products and janitorial supplies. Keep your facility maintained with quality workplace hygiene products and cleaning supplies.",
      icon: <Droplet size={24} />
    },
    {
      id: "03",
      slug: "cleaning-chemicals",
      title: "CLEANING CHEMICALS",
      desc: "Professional cleaning chemicals and commercial cleaning products designed for routine maintenance and industrial cleaning supplies requirements.",
      icon: <FlaskConical size={24} />
    },
    {
      id: "04",
      slug: "packaging-materials",
      title: "PACKAGING MATERIALS",
      desc: "Reliable packaging materials and packaging products to support your storage, handling, and daily business packaging supplies needs.",
      icon: <PackageOpen size={24} />
    },
    {
      id: "05",
      slug: "safety-ppe",
      title: "SAFETY EQUIPMENT & PPE",
      desc: "Certified safety equipment and personal protective equipment (PPE) to ensure compliance with essential workplace safety supplies.",
      icon: <HardHat size={24} />
    },
    {
      id: "06",
      slug: "pantry-workspace",
      title: "PANTRY & WORKSPACE",
      desc: "Everyday pantry supplies and workspace consumables. Stock your breakrooms with essential office consumables and workplace essentials.",
      icon: <Coffee size={24} />
    }
  ];

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Header text reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".products-header",
          start: "top 85%"
        }
      });
      tl.from(".gs-header-item", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Grid Activation (Supply Flow)
      gsap.fromTo(".product-card",
        { scale: 0.96, opacity: 0.4 },
        {
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
          },
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }
      );

      // Border flash effect on activation
      gsap.to(".product-card", {
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 80%",
        },
        borderColor: "#0F4C81",
        duration: 0.4,
        stagger: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });

      // Clean Hover animations (No magnetic effects)
      const cards = gsap.utils.toArray(".product-card");
      cards.forEach(card => {
        const icon = card.querySelector(".card-icon");
        const hoverTl = gsap.timeline({ paused: true, defaults: { ease: "power2.out", duration: 0.3 } });
        hoverTl.to(icon, { scale: 1.02, y: -2 }, 0);

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    });
  }, { scope: productsRef, dependencies: [location.pathname] });



  return (
    <section id="products" className="products" ref={productsRef}>
      <div className="container">
        <div className="products-header">
          <div className="gs-header-item">
            <span className="section-label">WHAT WE SUPPLY</span>
          </div>
          <div className="gs-header-item">
            <h2 className="section-title">Everything your business needs,<br />from one supply partner.</h2>
          </div>
          <div className="gs-header-item">
            <p className="section-subtitle">
              From workplace essentials to operational and safety requirements, we help businesses source everyday products through one dependable supply partner.
            </p>
          </div>
        </div>

        <div className="products-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="product-card"
              style={{ display: 'flex' }}
            >
              <div className="card-content-wrapper">
                <div className="card-header">
                  <div className="card-icon">{cat.icon}</div>
                </div>
                <h3 className="card-title">{cat.title}</h3>
                <p className="card-desc">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
