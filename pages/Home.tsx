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
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col">
      <Hero />
      <div className="reveal scroll-mt-24">
        <About />
      </div>
      <div className="reveal scroll-mt-24">
        <HowWeWork />
      </div>
      <div className="reveal scroll-mt-24">
        <WhyUs />
      </div>
      <div className="reveal scroll-mt-24">
        <LatestArticles />
      </div>
      <div className="reveal scroll-mt-24">
        <Services />
      </div>
    </div>
  );
};

export default Home;