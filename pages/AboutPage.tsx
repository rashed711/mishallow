
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Dark Luxury Hero */}
      <div className="relative pt-40 pb-24 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="about-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#B89544" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#about-pattern)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[#B89544] font-black tracking-[0.2em] uppercase text-xs mb-4 block">إرث من الثقة</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">من نحن</h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-[#B89544] to-transparent mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Intro Section with Premium Image Styling */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 text-right">
              <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-8 leading-tight">عراقة الممارسة <br/><span className="text-[#B89544]">وحداثة الحلول</span></h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                <p>
                  تأسس مكتب مشعل بادغيش للمحاماة والاستشارات القانونية ليكون صرحاً مهنياً يقدم خدمات قانونية نوعية تتماشى مع رؤية المملكة 2030، حيث نؤمن بأن القانون هو الركيزة الأساسية لاستقرار الأعمال ونمو المجتمع.
                </p>
                <p>
                  نحن نعتز بفريقنا الذي يضم كفاءات قانونية متميزة، تسعى دائماً لتحقيق العدالة وحماية مصالح موكلينا من خلال فهم دقيق للواقع القضائي والنظامي في المملكة.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-[#B89544]/10 rounded-[3rem] blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800" 
                alt="Justice Scales" 
                className="relative z-10 rounded-[2.5rem] shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Dark Grid */}
      <section className="py-28 bg-[#0F172A] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white">منهجيتنا الاستراتيجية</h2>
            <div className="mt-6 h-1 w-20 bg-[#B89544] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "رؤيتنا", desc: "أن نكون المرجع القانوني الأول والأكثر موثوقية في المملكة، من خلال تقديم حلول ابتكارية تعزز البيئة العدلية.", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
              { title: "رسالتنا", desc: "تقديم خدمات قانونية واستشارية بمهنية فائقة ومعايير أخلاقية صارمة تضمن حماية حقوق الموكلين.", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" },
              { title: "أهدافنا", desc: "تحقيق أعلى معدلات النجاح، وبناء شراكات استراتيجية، وتطوير الكوادر الوطنية الشابة.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/10 hover:border-[#B89544]/50 transition-all group">
                <div className="bg-[#B89544] w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#B89544]/20 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values - White section */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block">ثوابت مهنية</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-12">قيمنا الجوهرية</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { t: "الدقة", d: "عناية فائقة بكل تفاصيل القضية أو العقد." },
                  { t: "النزاهة", d: "الالتزام بأعلى المعايير الأخلاقية والمهنية." },
                  { t: "الابتكار", d: "إيجاد مخارج وحلول قانونية غير تقليدية." },
                  { t: "السرية", d: "حماية خصوصية بيانات عملائنا كأولوية قصوى." }
                ].map((v, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <h3 className="text-[#B89544] font-black text-xl mb-3">{v.t}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{v.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-slate-200/50 rounded-[3rem] blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800" 
                className="relative z-10 rounded-[3rem] shadow-2xl w-full h-[550px] object-cover" 
                alt="Lawyer working"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
