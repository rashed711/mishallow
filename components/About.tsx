
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            من نحن
          </h2>
          <div className="mt-4 h-1 w-20 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>
        <div className="mt-12 max-w-4xl mx-auto text-center space-y-6">
          <p className="text-lg text-gray-600 leading-relaxed">
            مكتب مشعل بادغيش للمحاماة والاستشارات القانونية مكتب سعودي يقدم خدمات قانونية واستشارية تعتمد على الفهم العملي للأنظمة، والالتزام المهني، والتعامل الواضح مع العملاء.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            نعمل مع عملائنا كشركاء قانونيين، نساعدهم على اتخاذ قرارات صحيحة، وتجنب المخاطر القانونية، والتعامل بثقة مع التحديات النظامية.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
