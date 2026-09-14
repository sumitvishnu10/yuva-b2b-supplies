import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <Link to="/#home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-logo-link">
              <img src={logoImage} alt="YUVA B2B SUPPLIES Logo" className="footer-logo-img" loading="lazy" />
              <div className="footer-logo-text-wrapper">
                <span className="footer-logo-text">YUVA</span>
                <span className="footer-logo-sub">B2B SUPPLIES</span>
              </div>
            </Link>
            <p className="footer-tagline">"One Partner. All Supplies."</p>
            <p className="footer-desc">
              YUVA B2B SUPPLIES is a Chennai-based B2B supply and distribution partner providing office, industrial, packaging, cleaning, safety and workplace supplies for businesses. Serving businesses in Chennai and across South India.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">COMPANY</h4>
            <ul>
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/#why-us">Why Us</Link></li>
              <li><Link to="/#vision-mission">Vision & Mission</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">PRODUCTS</h4>
            <ul>
              <li><Link to="/products/office-stationery">Office Stationery</Link></li>
              <li><Link to="/products/sanitation-janitorial">Sanitation & Janitorial</Link></li>
              <li><Link to="/products/cleaning-chemicals">Cleaning Chemicals</Link></li>
              <li><Link to="/products/packaging-materials">Packaging Materials</Link></li>
              <li><Link to="/products/safety-ppe">Safety Equipment & PPE</Link></li>
              <li><Link to="/products/pantry-workspace">Pantry & Workspace Consumables</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">INDUSTRIES</h4>
            <ul>
              <li><Link to="/#industries">Corporate</Link></li>
              <li><Link to="/#industries">Education</Link></li>
              <li><Link to="/#industries">Manufacturing</Link></li>
              <li><Link to="/#industries">Automobile</Link></li>
              <li><Link to="/#industries">Engineering</Link></li>
              <li><Link to="/#industries">Logistics</Link></li>
              <li><Link to="/#industries">Food & FMCG</Link></li>
              <li><Link to="/#industries">Healthcare</Link></li>
              <li><Link to="/#industries">Construction</Link></li>
              <li><Link to="/#industries">Hospitality</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">CONTACT</h4>
            <ul>
              <li>+91 94458 35504, +91 98404 15504</li>
              <li>admin@yuvab2bsupplies.com</li>
              <li>Plot No. B2, 4th Street, Birla Avenue,<br />Kadhirvedu, Chennai - 600066</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 YUVA B2B SUPPLIES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
