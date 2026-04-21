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
    id: 'mishal-badghish',
    name: "مشعل بادغيش",
    role: "المؤسس والمدير العام",
    bio: "محامٍ ومستشار قانوني بخبرة تمتد لأكثر من 15 عاماً في القضايا التجارية والأنظمة السعودية، متخصص في صياغة الاستراتيجيات القانونية المعقدة.",
    image: "https://mishal-lawfirm.com/assets/img/team/team-1.webp"
  },
  {
    id: 'dr-abdulaziz',
    name: "عبد العزيز العتيبي",
    role: "شريك قانوني - قسم الشركات",
    bio: "خبير في حوكمة الشركات والاندماج والاستحواذ، حاصل على الدكتوراه في القانون التجاري الدولي ومستشار للعديد من الهيئات الحكومية.",
    image: "https://l.top4top.io/p_3763d5ig41.png"
  },
  {
    id: 'mohammed-alahmadi',
    name: "محمد الأحمدي",
    role: "مستشار أول - الملكية الفكرية",
    bio: "متخصص في حماية الأصول الفكرية والعلامات التجارية، وعضو معتمد في العديد من الجمعيات القانونية الدولية، ساهمت في تسجيل مئات العلامات التجارية.",
    image: "https://f.top4top.io/p_3763eqw431.png"
  }
];
