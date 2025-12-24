import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import HowWeWork from '../components/HowWeWork';
import WhyUs from '../components/WhyUs';
import LatestArticles from '../components/LatestArticles';
import Services from '../components/Services';

const Home: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col">
      <Hero />
      <div className="reveal scroll-mt-24" id="about-summary">
        <About />
      </div>
      <div className="reveal scroll-mt-24" id="methodology">
        <HowWeWork />
      </div>
      <div className="reveal scroll-mt-24" id="why-choose-us">
        <WhyUs />
      </div>
      <div className="reveal scroll-mt-24" id="news">
        <LatestArticles />
      </div>
      <div className="reveal scroll-mt-24" id="services-summary">
        <Services />
      </div>
    </div>
  );
};

export default Home;