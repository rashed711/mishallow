import React, { lazy } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import LazySection from '../components/LazySection';
const HowWeWork = lazy(() => import('../components/HowWeWork'));
const WhyUs = lazy(() => import('../components/WhyUs'));
const WhoWeServe = lazy(() => import('../components/WhoWeServe'));
const LatestArticles = lazy(() => import('../components/LatestArticles'));
const Services = lazy(() => import('../components/Services'));
import FadeInSection from '../components/FadeInSection';
import SEO from '../components/SEO';
const TeamSection = lazy(() => import('../components/TeamSection'));

const Home: React.FC = () => {
    return (
        <div className="flex flex-col">
            <SEO
                title="المحامي مشعل بادغيش | مكتب محاماة معتمد في مكة وجدة"
                description="مكتب المحامي مشعل بادغيش للمحاماة والاستشارات في مكة وجدة. تمثيل قضائي في القضايا التجارية، الجنائية، العمالية، والعقارية. تواصل معنا الآن."
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