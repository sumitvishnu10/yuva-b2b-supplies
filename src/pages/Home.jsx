import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Products } from '../components/Products';
import { Industries } from '../components/Industries';
import { VisionMission } from '../components/VisionMission';
import { Difference } from '../components/Difference';
import { CTABanner } from '../components/CTABanner';
import { Contact } from '../components/Contact';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function Home() {
  const mainRef = useRef(null);

  useGSAP(() => {
    // Scroll tracking or minimal home animations can be placed here if needed.
    // Removed scroll snapping to prevent scroll hijacking/fighting as requested.
  }, { scope: mainRef });

  return (
    <main ref={mainRef}>
      <Hero />
      <About />
      <Products />
      <Industries />
      <VisionMission />
      <Difference />
      <CTABanner />
      <Contact />
    </main>
  );
}
