
import React from 'react';
import { CheckCircleIcon } from './icons/ServiceIcons';

const features = [
  'فهم واقعي للأنظمة السعودية',
  'تواصل واضح وسهل مع العملاء',
  'حلول قانونية عملية',
  'التزام كامل بالسرية',
  'تمثيل قانوني مهني',
];

const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              لماذا تختار مكتب مشعل بادغيش
            </h2>
            <div className="mt-4 h-1 w-20 bg-[#D4AF37] rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600">
              نحن نؤمن بأن العلاقة مع العميل هي شراكة مبنية على الثقة والوضوح. هدفنا هو تقديم خدمة قانونية تتجاوز التوقعات، وتساهم في نجاح عملائنا وحماية مصالحهم.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="mr-3 text-lg text-gray-700 font-medium">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-96">
            <img 
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1521791055366-0d553872115b?q=80&w=800" 
              alt="Professional legal team meeting" />
             <div className="absolute inset-0 bg-[#0A2A5A] opacity-60 rounded-lg"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-3xl font-bold p-8 text-center">الخبرة والثقة في خدمتك</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;