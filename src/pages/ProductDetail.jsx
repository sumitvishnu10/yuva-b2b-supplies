import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ShieldCheck, Star, DollarSign, Box, Building2, CheckCircle2 } from 'lucide-react';

// Import all specific category images
import officeStationeryImage from '../assets/office_stationery.png';
import sanitationImage from '../assets/sanitation_janitorial.png';
import cleaningChemicalsImage from '../assets/cleaning_chemicals.png';
import packagingImage from '../assets/packaging_materials.png';
import safetyPpeImage from '../assets/safety_ppe.png';
import pantryImage from '../assets/pantry_workspace.png';

import './ProductDetail.css';

gsap.registerPlugin(ScrollTrigger);

const categoriesData = {
  'office-stationery': {
    id: '01',
    title: 'Office Stationery',
    desc: 'Reliable office stationery and workplace essentials for everyday business operations.',
    images: [officeStationeryImage],
    subcategories: [
      { name: 'Notebooks & Registers', desc: 'Professional notebooks and registers for documentation.' },
      { name: 'Writing Instruments', desc: 'High-quality pens, markers, and highlighters.' },
      { name: 'Files & Folders', desc: 'Durable filing solutions for document organization.' },
      { name: 'Printer & Paper Supplies', desc: 'Premium A4 and legal size printing paper.' },
      { name: 'Desk Accessories', desc: 'Accessories to keep workspaces neat and efficient.' },
      { name: 'Office Essentials', desc: 'Staplers, punching machines, and daily tools.' }
    ],
    applications: [
      'Corporate offices',
      'Educational institutions',
      'Engineering companies',
      'Manufacturing offices',
      'Warehouses',
      'Administrative departments'
    ],
    related: ['sanitation-janitorial', 'packaging-materials', 'pantry-workspace']
  },
  'sanitation-janitorial': {
    id: '02',
    title: 'Sanitation & Janitorial Products',
    desc: 'Essential sanitation products and janitorial supplies for clean, well-maintained workplaces.',
    images: [sanitationImage],
    subcategories: [
      { name: 'Mops & Brooms', desc: 'Heavy-duty mops and brooms for commercial floor cleaning.' },
      { name: 'Brushes & Wipers', desc: 'Scrubbing brushes and surface wipers for deep cleaning.' },
      { name: 'Waste Bins', desc: 'Durable waste management solutions.' },
      { name: 'Tissue Products', desc: 'Paper towels and tissue rolls for washrooms.' },
      { name: 'Cleaning Tools', desc: 'Buckets and essential janitorial tools.' },
      { name: 'Janitorial Accessories', desc: 'Carts and dispensers for maintenance staff.' }
    ],
    applications: [
      'Industrial facilities',
      'Hospitals and clinics',
      'Corporate workspaces',
      'Retail environments',
      'Hotels and hospitality',
      'Educational institutions'
    ],
    related: ['cleaning-chemicals', 'safety-ppe', 'office-stationery']
  },
  'cleaning-chemicals': {
    id: '03',
    title: 'Cleaning Chemicals',
    desc: 'Professional cleaning solutions and chemicals for routine maintenance and operational requirements.',
    images: [cleaningChemicalsImage],
    subcategories: [
      { name: 'Floor Cleaners', desc: 'Industrial grade floor cleaning solutions.' },
      { name: 'Surface Cleaners', desc: 'Multi-purpose cleaners for desks and glass surfaces.' },
      { name: 'Disinfectants', desc: 'Powerful solutions for maintaining hygiene standards.' },
      { name: 'Toilet Cleaners', desc: 'Heavy-duty washroom cleaning chemicals.' },
      { name: 'Glass Cleaners', desc: 'Streak-free window and glass cleaning liquids.' },
      { name: 'Industrial Solutions', desc: 'Bulk chemicals for industrial facility care.' }
    ],
    applications: [
      'Manufacturing plants',
      'Healthcare facilities',
      'Corporate buildings',
      'Commercial kitchens',
      'Shopping malls',
      'Warehouses'
    ],
    related: ['sanitation-janitorial', 'safety-ppe', 'packaging-materials']
  },
  'packaging-materials': {
    id: '04',
    title: 'Packaging Materials',
    desc: 'Packaging essentials that support storage, handling and everyday business operations.',
    images: [packagingImage],
    subcategories: [
      { name: 'Corrugated Boxes', desc: 'Corrugated boxes and cartons in various sizes.' },
      { name: 'Packaging Tape', desc: 'Strong adhesive tapes for secure sealing.' },
      { name: 'Stretch Film', desc: 'Industrial stretch wrap for pallet stabilization.' },
      { name: 'Bubble Wrap', desc: 'Protective cushioning for fragile items.' },
      { name: 'Packaging Rolls', desc: 'Paper and foam rolls for industrial wrapping.' },
      { name: 'Packing Accessories', desc: 'Strapping, edge protectors, and void fill.' }
    ],
    applications: [
      'Logistics companies',
      'E-commerce warehouses',
      'Manufacturing units',
      'Distribution centers',
      'Retail stockrooms',
      'Export businesses'
    ],
    related: ['office-stationery', 'safety-ppe', 'cleaning-chemicals']
  },
  'safety-ppe': {
    id: '05',
    title: 'Safety Equipment & PPE',
    desc: 'Certified safety equipment and PPE to support safer workplace environments.',
    images: [safetyPpeImage],
    subcategories: [
      { name: 'Safety Helmets', desc: 'Impact-resistant hard hats for industrial sites.' },
      { name: 'Reflective Jackets', desc: 'High-visibility vests for safety in low-light areas.' },
      { name: 'Safety Gloves', desc: 'Protective handwear for chemical handling or heavy labor.' },
      { name: 'Safety Shoes', desc: 'Steel-toe boots and slip-resistant industrial footwear.' },
      { name: 'Eye & Ear Protection', desc: 'Safety goggles and noise-canceling earplugs.' },
      { name: 'Workplace Masks', desc: 'Respiratory protection for hazardous environments.' }
    ],
    applications: [
      'Construction sites',
      'Manufacturing plants',
      'Chemical industries',
      'Mining operations',
      'Warehousing',
      'Engineering facilities'
    ],
    related: ['cleaning-chemicals', 'packaging-materials', 'sanitation-janitorial']
  },
  'pantry-workspace': {
    id: '06',
    title: 'Pantry & Workspace Consumables',
    desc: 'Everyday pantry and workspace consumables for comfortable business environments.',
    images: [pantryImage],
    subcategories: [
      { name: 'Paper Cups', desc: 'Paper and disposable cups for hot and cold beverages.' },
      { name: 'Tissue Products', desc: 'Facial tissues and napkins for employee comfort.' },
      { name: 'Disposable Products', desc: 'Cutlery and plates for office cafeterias.' },
      { name: 'Pantry Supplies', desc: 'Tea, coffee, sugar, and basic breakroom essentials.' },
      { name: 'Drinking Accessories', desc: 'Stirrers and water-related consumables.' },
      { name: 'Workspace Consumables', desc: 'Trash bags and everyday disposable necessities.' }
    ],
    applications: [
      'Corporate breakrooms',
      'IT parks',
      'Co-working spaces',
      'Industrial cafeterias',
      'Educational institutes',
      'Hospitality sector'
    ],
    related: ['office-stationery', 'sanitation-janitorial', 'cleaning-chemicals']
  }
};

const benefits = [
  { icon: <ShieldCheck size={24} />, title: "RELIABLE SUPPLY", text: "Dependable sourcing for regular business requirements." },
  { icon: <Star size={24} />, title: "QUALITY PRODUCTS", text: "Products selected to meet everyday operational needs." },
  { icon: <DollarSign size={24} />, title: "COMPETITIVE PRICING", text: "Practical pricing for recurring business purchases." },
  { icon: <Box size={24} />, title: "RESPONSIVE SERVICE", text: "Quick communication and dependable support." }
];

export function ProductDetail() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const detailRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetRoute, setTargetRoute] = useState(null);

  const category = categoriesData[categoryId];

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setIsTransitioning(false);
  }, [categoryId]);

  useGSAP(() => {
    if (!category) return;

    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Product Reveal Timeline (Anchor on Image)
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(".detail-image-main",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
        .from(".breadcrumb-container", { y: 15, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.6")
        .from(".category-label", { y: 15, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.5")
        .from(".category-title", { y: 40, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .from(".category-desc", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
        .from(".hero-cta-group", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .from(".detail-gallery-thumbnails button", { y: 15, opacity: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.4");

      // Scroll triggers for sections
      const sections = [
        { trigger: ".detail-supply-section", items: [".supply-title", ".sub-product-card"] },
        { trigger: ".detail-applications-section", items: [".app-title", ".application-item"] },
        { trigger: ".detail-benefits-section", items: [".benefit-title-main", ".benefit-card"] },
        { trigger: ".detail-related-section", items: [".related-title-main", ".related-card"] }
      ];

      sections.forEach(sec => {
        gsap.from(sec.items, {
          scrollTrigger: {
            trigger: sec.trigger,
            start: "top 80%"
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      });

      // CTA section specifically
      gsap.from(".detail-cta-section > div > *", {
        scrollTrigger: {
          trigger: ".detail-cta-section",
          start: "top 85%"
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out"
      });
    });
  }, { scope: detailRef, dependencies: [categoryId] });

  if (!category) {
    return (
      <div className="product-detail not-found">
        <div className="container">
          <h2>Category Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Return Home</button>
        </div>
      </div>
    );
  }

  const handleRequestQuote = (item = category.title) => {
    navigate('/#contact', { state: { category: item } });
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRelatedClick = (route) => {
    setTargetRoute(route);

    // Connected transition timeline
    const tl = gsap.timeline({
      onComplete: () => {
        navigate(`/products/${route}`);
        setTargetRoute(null);
      }
    });

    tl.to(detailRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.5,
      ease: "power2.inOut"
    });
  };

  return (
    <main ref={detailRef} className="product-detail">
      {/* Breadcrumb & Back */}
      <div className="container breadcrumb-container">
        <button className="back-btn" onClick={() => navigate('/#products')}>
          <ArrowLeft size={16} /> Back to Products
        </button>
        <div className="breadcrumb">
          Home <span className="separator">/</span> Products <span className="separator">/</span> <span className="current">{category.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="detail-hero">
        <div className="container">
          <div className="detail-hero-grid">
            <div className="detail-hero-content">
              <span className="category-label">PRODUCT CATEGORY</span>
              <h1 className="category-title">{category.title}</h1>
              <p className="category-desc">{category.desc}</p>
              <div className="hero-cta-group">
                <button className="btn btn-primary mt-4" onClick={() => handleRequestQuote(category.title)}>Request a Quote</button>
                <button className="btn btn-secondary mt-4" onClick={() => navigate('/#products')}>Back to Products</button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="detail-hero-gallery">
              <div className="detail-image-main">
                <img src={category.images[activeImageIndex]} alt={category.title} className="detail-image" />
              </div>

              {category.images.length > 1 && (
                <div className="detail-gallery-thumbnails">
                  {category.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`thumbnail-btn ${activeImageIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What We Supply Grid */}
      <section className="detail-supply-section bg-light">
        <div className="container">
          <h2 className="section-title supply-title">WHAT WE SUPPLY</h2>
          <div className="product-showcase-grid">
            {category.subcategories.map((sub, i) => (
              <div key={i} className="sub-product-card">
                <div className="sub-product-image-placeholder">
                  <Box size={32} />
                </div>
                <div className="sub-product-content">
                  <h3 className="sub-product-title">{sub.name}</h3>
                  <p className="sub-product-desc">{sub.desc}</p>
                  <button
                    className="btn btn-secondary sub-product-btn"
                    onClick={() => handleRequestQuote(sub.name)}
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Applications */}
      <section className="detail-applications-section">
        <div className="container">
          <h2 className="section-title text-center app-title">BUILT FOR EVERYDAY BUSINESS NEEDS</h2>
          <div className="applications-grid">
            {category.applications.map((app, i) => (
              <div key={i} className="application-item">
                <Building2 size={24} className="app-icon" />
                <span>{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why YUVA */}
      <section className="detail-benefits-section bg-light">
        <div className="container">
          <h2 className="section-title text-center benefit-title-main">WHY SOURCE IT FROM YUVA?</h2>
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="detail-cta-section text-center">
        <div className="container">
          <h2 className="section-title">Looking for {category.title} supplies?</h2>
          <p className="section-subtitle mx-auto">
            Tell us what your business needs and our team can help you source it through one dependable supply partner.
          </p>
          <div className="cta-button-group">
            <button className="btn btn-primary" onClick={() => handleRequestQuote(category.title)}>Request a Quote</button>
            <button className="btn btn-secondary" onClick={() => handleRequestQuote(category.title)}>Contact Us</button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="detail-related-section bg-light">
        <div className="container">
          <h2 className="section-title text-center related-title-main">EXPLORE MORE SUPPLIES</h2>
          <div className="related-grid">
            {category.related.map((relId, i) => {
              const relCat = categoriesData[relId];
              return (
                <Link
                  key={i}
                  to={`/products/${relId}`}
                  className={`related-card ${targetRoute === relId ? 'is-transitioning' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleRelatedClick(relId); }}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <h3 className="related-title">{relCat.title}</h3>
                  <p className="related-action">Explore &rarr;</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
