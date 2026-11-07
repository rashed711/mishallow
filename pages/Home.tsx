import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import LazySection from '../components/LazySection';
import HowWeWork from '../components/HowWeWork';
import WhyUs from '../components/WhyUs';
import WhoWeServe from '../components/WhoWeServe';
import LatestArticles from '../components/LatestArticles';
import Services from '../components/Services';
import SEO from '../components/SEO';
import TeamSection from '../components/TeamSection';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col">
            <SEO
                title="شركة مشعل بادغيش للمحاماة والاستشارات القانونية | محامون في مكة وجدة"
                description="شركة مشعل بادغيش للمحاماة والاستشارات القانونية في مكة وجدة. تمثيل قضائي في القضايا التجارية، الجنائية، العمالية، والعقارية وصياغة العقود. تواصل معنا الآن."
                image="/images/logo/logo.webp"
                type="website"
                url="https://mishal-lawfirm.com"
            />
            <Hero />
            <div className="scroll-mt-24">
                <About />
            </div>

            {/* Grouping secondary sections to reduce observers and main-thread overhead on mobile, bypassed on desktop */}
            <LazySection height="2000px">
                <div className="scroll-mt-24">
                    <HowWeWork />
                </div>
                <div className="scroll-mt-24">
                    <WhyUs />
                </div>
                <TeamSection limit={3} />
                <div className="scroll-mt-24">
                    <WhoWeServe />
                </div>
                <div className="scroll-mt-24">
                    <LatestArticles />
                </div>
                <div className="scroll-mt-24">
                    <Services />
                </div>
            </LazySection>
        </div>
    );
};

export default Home;