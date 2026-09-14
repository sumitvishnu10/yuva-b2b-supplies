import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { User, Building, Mail, Phone, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const contactRef = useRef(null);
  const location = useLocation();
  const [requirements, setRequirements] = useState('');
  const [formData, setFormData] = useState({ fullName: '', companyName: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (location.state?.category) {
      setRequirements(`I am looking to source: ${location.state.category}\n\nPlease provide more information or a quote.`);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ fullName: '', companyName: '', email: '', phone: '' });
    setRequirements('');
  };

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Header
      gsap.from(".contact-header > *", {
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 85%"
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Grid content
      gsap.from(".contact-form-container", {
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%"
        },
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.from(".contact-info-card", {
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%"
        },
        x: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.from(".contact-map-placeholder", {
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%"
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1
      });
    });
  }, { scope: contactRef });

  return (
    <section id="contact" className="contact bg-light" ref={contactRef}>
      <div className="container">
        <div className="contact-header">
          <div>
            <span className="section-label">GET IN TOUCH</span>
          </div>
          <div>
            <h2 className="section-title">Let's make your procurement simpler.</h2>
          </div>
        </div>

        <div className="contact-grid">
          {/* Left: Form */}
          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="contact-success-message" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#e6f7eb', color: '#2d6a4f', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '1rem' }}>Thank you!</h3>
                <p>Your enquiry has been sent successfully. We will get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} className={errors.fullName ? 'input-error' : ''} />
                  {errors.fullName && <span className="error-text" style={{ color: 'red', fontSize: '0.875rem' }}>{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input type="text" id="companyName" placeholder="Acme Corp" value={formData.companyName} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} className={errors.email ? 'input-error' : ''} />
                    {errors.email && <span className="error-text" style={{ color: 'red', fontSize: '0.875rem' }}>{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="requirements">Requirements / Message</label>
                  <textarea
                    id="requirements"
                    rows="5"
                    placeholder="Tell us about your supply needs..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">Send Enquiry</button>
              </form>
            )}
          </div>

          {/* Right: Info */}
          <div className="contact-info-container">
            <div className="contact-info-card">
              <div className="info-item">
                <div className="info-icon"><User size={20} /></div>
                <div>
                  <span className="info-label">PROPRIETOR</span>
                  <span className="info-value">Yuvaraj M D</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><Phone size={20} /></div>
                <div>
                  <span className="info-label">PHONE</span>
                  <span className="info-value">94458 35504, 98404 15504</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><Mail size={20} /></div>
                <div>
                  <span className="info-label">EMAIL</span>
                  <span className="info-value">admin@yuvab2bsupplies.com</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><MapPin size={20} /></div>
                <div>
                  <span className="info-label">ADDRESS</span>
                  <span className="info-value">Plot No. B2, 4th Street, Birla Avenue,<br />Kadhirvedu, Chennai - 600066</span>
                </div>
              </div>
            </div>

            {/* Optional Map visual placeholder */}
            <div className="contact-map-placeholder">
              <iframe
                src="https://maps.google.com/maps?q=13.145567,80.201851&t=&z=15&ie=UTF8&iwloc=&output=embed"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
