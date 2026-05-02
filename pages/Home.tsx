import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
const HowWeWork = lazy(() => import('../components/HowWeWork'));
const WhyUs = lazy(() => import('../components/WhyUs'));
const WhoWeServe = lazy(() => import('../components/WhoWeServe'));
const LatestArticles = lazy(() => import('../components/LatestArticles'));
const Services = lazy(() => import('../components/Services'));
import FadeInSection from '../components/FadeInSection';
import SEO from '../components/SEO';
const TeamSection = lazy(() => import('../components/TeamSection'));

const SectionLoader = () => <div className="h-[400px] w-full bg-slate-50/50 animate-pulse rounded-3xl" />;

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
            <FadeInSection>
                <div className="scroll-mt-24">
                    <About />
                </div>
            </FadeInSection>
            <Suspense fallback={<SectionLoader />}>
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
            </Suspense>
        </div>
    );
};

export default Home;