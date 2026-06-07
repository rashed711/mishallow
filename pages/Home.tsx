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
                title="مكتب محاماة في مكة وجدة | مشعل بادغيش للمحاماة والاستشارات القانونية"
                description="أفضل مكتب محاماة في مكة المكرمة وجدة. متخصصون في القضايا التجارية، العمالية، العسكرية، والأحوال الشخصية. فريق من المحامين والمستشارين القانونيين لخدمتكم عبر منصة ناجز."
                image="/images/logo/logo.webp"
                type="website"
                url="https://mishallow.vercel.app"
            />
            <Hero />
            <FadeInSection>
                <div className="scroll-mt-24">
                    <About />
                </div>
            </FadeInSection>
            
            {/* Grouping secondary sections to reduce observers and main-thread overhead on mobile, bypassed on desktop */}
            <LazySection height="2000px">
                <FadeInSection>
                    <div className="scroll-mt-24">
                        <HowWeWork />
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <div className="scroll-mt-24">
                        <WhyUs />
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <TeamSection limit={3} />
                </FadeInSection>
                <FadeInSection>
                    <div className="scroll-mt-24">
                        <WhoWeServe />
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <div className="scroll-mt-24">
                        <LatestArticles />
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <div className="scroll-mt-24">
                        <Services />
                    </div>
                </FadeInSection>
            </LazySection>
        </div>
    );
};

export default Home;