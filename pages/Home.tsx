import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import HowWeWork from '../components/HowWeWork';
import WhyUs from '../components/WhyUs';
import LatestArticles from '../components/LatestArticles';
import Services from '../components/Services';
import FadeInSection from '../components/FadeInSection';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <FadeInSection delay={0.2}>
        <div className="scroll-mt-24">
          <About />
        </div>
      </FadeInSection>
      <FadeInSection delay={0.2}>
        <div className="scroll-mt-24">
          <HowWeWork />
        </div>
      </FadeInSection>
      <FadeInSection delay={0.2}>
        <div className="scroll-mt-24">
          <WhyUs />
        </div>
      </FadeInSection>
      <FadeInSection delay={0.2}>
        <div className="scroll-mt-24">
          <LatestArticles />
        </div>
      </FadeInSection>
      <FadeInSection delay={0.2}>
        <div className="scroll-mt-24">
          <Services />
        </div>
      </FadeInSection>
    </div>
  );
};

export default Home;