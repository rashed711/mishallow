import React from 'react';
import { motion } from 'framer-motion';
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
    <section id="why-us" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-0"
          >
            <h2 className="text-3xl font-black text-gray-900 sm:text-5xl mb-6">
              لماذا تختار مكتب <br /><span className="text-[#B89544]">مشعل بادغيش</span>
            </h2>
            <div className="h-1.5 w-20 bg-[#B89544] rounded-full mb-8"></div>
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-10">
              نحن نؤمن بأن العلاقة مع العميل هي شراكة مبنية على الثقة والوضوح. هدفنا هو تقديم خدمة قانونية تتجاوز التوقعات، وتساهم في نجاح عملائنا وحماية مصالحهم.
            </p>
            <ul className="space-y-5">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: -10 }}
                  className="flex items-center group cursor-default"
                >
                  <div className="flex-shrink-0 bg-[#B89544]/10 p-1.5 rounded-full group-hover:bg-[#B89544] transition-colors duration-300">
                    <CheckCircleIcon className="h-5 w-5 text-[#B89544] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="mr-4 text-lg text-gray-700 font-bold group-hover:text-[#B89544] transition-colors duration-300">{feature}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[500px]"
          >
            <div className="absolute -inset-4 bg-[#B89544]/5 rounded-[3rem] blur-2xl"></div>
            <img
              className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-2xl z-10"
              src="assets/img/hero-carousel/hero-carousel-2-mobile.webp"
              alt="Professional legal team meeting" />
            <div className="absolute inset-0 bg-[#0F172A]/40 rounded-[3rem] z-20"></div>
            <div className="absolute inset-0 flex items-center justify-center z-30 p-12 text-center">
              <p className="text-white text-3xl font-black leading-tight">الخبرة، الثقة، والنتائج <br /> في خدمة طموحاتكم</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;