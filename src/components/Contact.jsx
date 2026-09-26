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
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    productRequirement: '',
    quantity: '',
    message: '',
    botcheck: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (location.state?.category) {
      setFormData(prev => ({
        ...prev,
        productRequirement: location.state.category,
        message: 'Please provide more information or a quote.'
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';

    if (!formData.productRequirement.trim()) newErrors.productRequirement = 'Product / Requirement is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // POST to the local PHP script on the same domain
      const response = await fetch('/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseText = await response.text();
      console.log('send-email.php status:', response.status);
      console.log('send-email.php response:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Server returned an invalid JSON response. See console for details.');
      }

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          productRequirement: '',
          quantity: '',
          message: '',
          botcheck: ''
        });
      } else {
        setSubmitError(result.message || 'Unable to send your request. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Unable to send your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Request Sent Successfully</h3>
                <p>Thank you for your enquiry. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {submitError && (
                  <div className="contact-error-message" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#ffe5e5', color: '#d32f2f', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
                    {submitError}
                  </div>
                )}

                {/* Honeypot field for basic spam protection */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input type="text" name="botcheck" id="botcheck" value={formData.botcheck} onChange={handleInputChange} tabIndex="-1" autoComplete="off" />
                </div>

                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} className={errors.fullName ? 'input-error' : ''} disabled={isSubmitting} />
                  {errors.fullName && <span className="error-text" style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input type="text" id="companyName" placeholder="Acme Corp" value={formData.companyName} onChange={handleInputChange} className={errors.companyName ? 'input-error' : ''} disabled={isSubmitting} />
                  {errors.companyName && <span className="error-text" style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{errors.companyName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} className={errors.email ? 'input-error' : ''} disabled={isSubmitting} />
                    {errors.email && <span className="error-text" style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'input-error' : ''} disabled={isSubmitting} />
                    {errors.phone && <span className="error-text" style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="productRequirement">Product / Requirement *</label>
                    <input type="text" id="productRequirement" placeholder="e.g. Office Chairs, PPE Kits" value={formData.productRequirement} onChange={handleInputChange} className={errors.productRequirement ? 'input-error' : ''} disabled={isSubmitting} />
                    {errors.productRequirement && <span className="error-text" style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{errors.productRequirement}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="quantity">Quantity / Approx. Requirement</label>
                    <input type="text" id="quantity" placeholder="e.g. 50 pieces" value={formData.quantity} onChange={handleInputChange} disabled={isSubmitting} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your supply needs in detail... (Optional)"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={errors.message ? 'input-error' : ''}
                    disabled={isSubmitting}
                  ></textarea>
                  {errors.message && <span className="error-text" style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending Request...' : 'Send Enquiry'}
                </button>
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
