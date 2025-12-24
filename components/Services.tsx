
import React from 'react';
import { BriefcaseIcon, ScaleIcon, DocumentTextIcon, UsersIcon, ShieldCheckIcon, GavelIcon, BuildingLibraryIcon, ClipboardDocumentCheckIcon } from './icons/ServiceIcons';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: Service[] = [
  { icon: ScaleIcon, title: 'الاستشارات القانونية', description: 'نقدم رأياً قانونياً واضحاً ومبنياً على فهم دقيق للأنظمة.' },
  { icon: BriefcaseIcon, title: 'القضايا التجارية والشركات', description: 'ندعم الشركات في جميع مراحلها من التأسيس إلى إدارة النزاعات.' },
  { icon: GavelIcon, title: 'التقاضي وتسوية المنازعات', description: 'نمثل عملائنا أمام الجهات القضائية بكفاءة واحترافية.' },
  { icon: DocumentTextIcon, title: 'العقود والاتفاقيات', description: 'نصيغ ونراجع العقود لضمان حماية مصالح عملائنا.' },
  { icon: UsersIcon, title: 'القضايا العمالية', description: 'نقدم حلولاً متوازنة للنزاعات العمالية بين الأطراف.' },
  { icon: BuildingLibraryIcon, title: 'القضايا الإدارية', description: 'نتعامل مع القضايا المتعلقة بالقرارات والجهات الحكومية.' },
  { icon: ShieldCheckIcon, title: 'التحكيم', description: 'نوفر حلولاً بديلة لفض النزاعات خارج إطار المحاكم.' },
  { icon: ClipboardDocumentCheckIcon, title: 'الامتثال والحوكمة', description: 'نساعد الشركات على الالتزام بالمتطلبات النظامية والحوكمة.' },
];

const ServiceCard: React.FC<Service> = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
    <div className="flex justify-center items-center h-16 w-16 rounded-full bg-blue-50 text-[#0A2A5A] mx-auto mb-4">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-center text-sm leading-relaxed">{description}</p>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            خدماتنا القانونية
          </h2>
          <div className="mt-4 h-1 w-20 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>
        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
