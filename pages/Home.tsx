import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import HowWeWork from '../components/HowWeWork';
import WhyUs from '../components/WhyUs';
import LatestArticles from '../components/LatestArticles';
import Services from '../components/Services';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <HowWeWork />
      <WhyUs />
      <LatestArticles />
      <Services />
    </div>
  );
};

export default Home;