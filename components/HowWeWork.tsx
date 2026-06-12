import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "التكييف القانوني والدراسة",
    desc: "تحليل دقيق للوقائع وتكييفها وفق الأنظمة السعودية المعمول بها لبناء موقف قانوني صلب."
  },
  {
    num: "02",
    title: "رسم الاستراتيجية القضائية",
    desc: "وضع خطة عمل متكاملة تشمل الأسانيد النظامية والسوابق القضائية لضمان أفضل النتائج."
  },
  {
    num: "03",
    title: "التنفيذ والمتابعة الرقمية",
    desc: "مباشرة الإجراءات عبر المنصات العدلية (ناجز، معين) مع إطلاع العميل على المستجدات لحظياً."
  }
];

const HowWeWork: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">منهجية عملنا</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] leading-tight">
            خطوات واضحة نحو <br /> تحقيق أهدافك القانونية
          </h2>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-10"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative p-10 bg-white rounded-[2.5rem] shadow-lg border border-slate-100 transition-all duration-300 group cursor-default"
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 flex items-center justify-center bg-gradient-to-br from-[#B89544] to-[#D4AF37] rounded-3xl shadow-xl text-[#0F172A] text-3xl font-black group-hover:scale-110 transition-transform duration-300">
                {step.num}
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-4 mt-12">{step.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HowWeWork;