import React from 'react';
import SEO from '../components/SEO';

const teamMembers = [
  {
    name: "مشعل بادغيش",
    role: "المؤسس والمدير العام",
    bio: "محامٍ ومستشار قانوني بخبرة تمتد لأكثر من 15 عاماً في القضايا التجارية والأنظمة السعودية، متخصص في صياغة الاستراتيجيات القانونية المعقدة.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
  },
  {
    name: "د. عبد العزيز العتيبي",
    role: "شريك قانوني - قسم الشركات",
    bio: "خبير في حوكمة الشركات والاندماج والاستحواذ، حاصل على الدكتوراه في القانون التجاري الدولي.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
  },
  {
    name: "أ. نورة الشهري",
    role: "مستشار أول - الملكية الفكرية",
    bio: "متخصصة في حماية الأصول الفكرية والعلامات التجارية، وعضو معتمد في العديد من الجمعيات القانونية الدولية.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO
        title="من نحن | مكتب مشعل بادغيش للمحاماة"
        description="تعرف على فريقنا ورؤيتنا في مكتب مشعل بادغيش للمحاماة. نقدم خدمات قانونية بمعايير عالمية تحمي مصالحك."
        url="https://mishal-lawfirm.com/about"
      />
      {/* Dark Luxury Hero */}
      <div className="relative pt-32 pb-16 md:pt-48 md:pb-28 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="about-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#B89544" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#about-pattern)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <span className="text-[#B89544] font-black tracking-[0.2em] uppercase text-[10px] md:text-xs mb-4 block">إرث من الثقة</span>
          <h1 className="text-3xl md:text-6xl font-black text-white mb-6">من نحن</h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-[#B89544] to-transparent mx-auto rounded-full"></div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-right">
              <h2 className="text-2xl md:text-4xl font-black text-[#0F172A] mb-8 leading-tight">عراقة الممارسة <br /><span className="text-[#B89544]">وحداثة الحلول</span></h2>
              <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed font-bold">
                <p>تأسس مكتب مشعل بادغيش للمحاماة والاستشارات القانونية ليكون صرحاً مهنياً يقدم خدمات قانونية نوعية تتماشى مع رؤية المملكة 2030.</p>
                <p>نحن نعتز بفريقنا الذي يضم كفاءات قانونية متميزة، تسعى دائماً لتحقيق العدالة وحماية مصالح موكلينا من خلال فهم دقيق للواقع القضائي والنظامي.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-[#B89544]/10 rounded-[2.5rem] md:rounded-[3rem] blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800"
                alt="Justice"
                className="relative z-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "رؤيتنا", desc: "أن نكون المرجع القانوني الأول والأكثر موثوقية في المملكة، من خلال تقديم حلول ابتكارية تعزز البيئة العدلية." },
              { title: "رسالتنا", desc: "تقديم خدمات قانونية واستشارية بمهنية فائقة ومعايير أخلاقية صارمة تضمن حماية حقوق الموكلين." },
              { title: "أهدافنا", desc: "تحقيق أعلى معدلات النجاح، وبناء شراكات استراتيجية، وتطوير الكوادر الوطنية الشابة." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 p-10 rounded-[2rem] border border-white/10 hover:border-[#B89544]/40 transition-all text-center group">
                <h3 className="text-2xl font-black text-[#B89544] mb-4">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;