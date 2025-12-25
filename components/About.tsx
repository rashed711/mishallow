import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#B89544]/5 rounded-full blur-3xl"></div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-50"
            >
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200"
                alt="Law Library"
                className="w-full object-cover h-[550px] grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 bg-[#0F172A] p-10 rounded-[2rem] shadow-2xl border border-white/5 hidden md:block"
            >
              <span className="block text-4xl font-black text-[#B89544] mb-1">98%</span>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">نسبة رضا الموكلين</span>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2 text-right"
          >
            <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">شريكك القانوني الاستراتيجي</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-8 leading-[1.2]">
              نلتزم بصيانة حقوقكم <br /> وصناعة الأمان لأعمالكم
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
              في مكتب مشعل بادغيش، ندمج بين الخبرة العميقة في الأنظمة السعودية وبين الرؤية الحديثة للممارسة القانونية. نحن هنا لنكون المستشار الذي تثق به في كل خطوة تخطوها.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center text-[#0F172A] font-black text-lg group"
            >
              <span>تعرف على منهجيتنا</span>
              <motion.span
                whileHover={{ x: -5 }}
                className="mr-4 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#B89544] group-hover:text-[#0F172A] transition-colors shadow-sm"
              >
                ←
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;