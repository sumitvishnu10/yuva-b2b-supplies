import { useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef();
  const progressRef = useRef();
  const location = useLocation();

  useEffect(() => {
    // Ensure ScrollTrigger recalculates page height on route change
    setTimeout(() => ScrollTrigger.refresh(), 100);
    
    // Handle hash scrolling
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Scroll Progress
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      }
    });
  }, { scope: appRef, dependencies: [location.pathname] });

  return (
    <div ref={appRef} className="app-wrapper">
      {/* Scroll Progress Indicator */}
      <div
        ref={progressRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: '#0F4C81',
          transformOrigin: '0% 50%',
          transform: 'scaleX(0)',
          zIndex: 9999
        }}
      />



      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:categoryId" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
