export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export const teamData: TeamMember[] = [
  {
    id: 'mishallow-badghish',
    name: "مشعل بادغيش",
    role: "المؤسس والمدير العام",
    bio: "محامٍ ومستشار قانوني بخبرة تمتد لأكثر من 15 عاماً في القضايا التجارية والأنظمة السعودية، متخصص في صياغة الاستراتيجيات القانونية المعقدة.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
  },
  {
    id: 'dr-abdulaziz',
    name: "د. عبد العزيز العتيبي",
    role: "شريك قانوني - قسم الشركات",
    bio: "خبير في حوكمة الشركات والاندماج والاستحواذ، حاصل على الدكتوراه في القانون التجاري الدولي ومستشار للعديد من الهيئات الحكومية.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
  },
  {
    id: 'noura-al-shehri',
    name: "أ. نورة الشهري",
    role: "مستشار أول - الملكية الفكرية",
    bio: "متخصصة في حماية الأصول الفكرية والعلامات التجارية، وعضو معتمد في العديد من الجمعيات القانونية الدولية، ساهمت في تسجيل مئات العلامات التجارية.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
  }
];
