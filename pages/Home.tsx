import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import HowWeWork from '../components/HowWeWork';
import WhyUs from '../components/WhyUs';
import WhoWeServe from '../components/WhoWeServe';
import LatestArticles from '../components/LatestArticles';
import Services from '../components/Services';
import FadeInSection from '../components/FadeInSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <SEO
        title="مكتب محاماة في مكة | مكتب مشعل بادغيش للمحاماة والاستشارات القانونية"
        description="مكتب مشعل بادغيش للمحاماة والاستشارات القانونية في مكة، فريق قانوني متكامل لخدمة الأفراد والشركات في جميع القضايا. استشارة قانونية أولية مجانية."
      />
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
          <WhoWeServe />
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