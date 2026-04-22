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
import TeamSection from '../components/TeamSection';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col">
            <SEO
                title="مكتب محاماة في مكة | مشعل بادغيش للمحاماة والاستشارات القانونية"
                description="أفضل مكتب محاماة في مكة المكرمة. متخصصون في القضايا التجارية، العمالية، العقارية، والأحوال الشخصية. فريق من المحامين والمستشارين القانونيين لخدمتكم بأعلى معايير المهنية."
                image="https://mishallow.vercel.app/logo.webp"
                type="website"
                url="https://mishallow.vercel.app"
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
                <TeamSection limit={3} />
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