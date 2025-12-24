import React from 'react';

const steps = [
  {
    num: "01",
    title: "الاستشارة الأولية",
    desc: "فهم دقيق لمتطلباتك وأهدافك القانونية من خلال جلسة استماع معمقة."
  },
  {
    num: "02",
    title: "التحليل ووضع الاستراتيجية",
    desc: "دراسة شاملة لكافة جوانب القضية ووضع خطة عمل قانونية محكمة وواضحة."
  },
  {
    num: "03",
    title: "التنفيذ والمتابعة المستمرة",
    desc: "تمثيل قانوني فعال أمام الجهات المختصة مع إطلاعك على كافة المستجدات أولاً بأول."
  }
];

const HowWeWork: React.FC = () => {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 reveal">
          <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">منهجية عملنا</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] leading-tight">
            خطوات واضحة نحو <br /> تحقيق أهدافك القانونية
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 reveal-stagger">
          {steps.map((step, index) => (
            <div key={index} className="relative p-10 bg-white rounded-[2.5rem] shadow-lg border border-slate-100 transition-all hover:-translate-y-2 group">
              <div className="absolute -top-6 -right-6 w-20 h-20 flex items-center justify-center bg-gradient-to-br from-[#B89544] to-[#D4AF37] rounded-3xl shadow-xl text-[#0F172A] text-3xl font-black group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-4 mt-12">{step.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowWeWork;