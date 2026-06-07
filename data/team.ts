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
    bio: "محامٍ مرخص ومستشار قانوني متخصص في نظام الشركات الجديد ونظام المعاملات المدنية، بخبرة واسعة في الترافع أمام المحاكم التجارية والتمثيل القضائي عبر منصة ناجز.",
    image: "/images/team/team-1.webp"
  },
  {
    id: 'dr-abdulaziz',
    name: "عبد العزيز العتيبي",
    role: "شريك قانوني - قسم الشركات والحوكمة",
    bio: "خبير في حوكمة الشركات والامتثال النظامي، متخصص في صياغة اتفاقيات المساهمين والاندماج والاستحواذ، ومستشار معتمد في قضايا الإفلاس والمنازعات التجارية الكبرى.",
    image: "/images/team/team-2.webp"
  },
  {
    id: 'mohammed-alahmadi',
    name: "محمد الأحمدي",
    role: "مستشار أول - القضاء الإداري والعمالي",
    bio: "متخصص في التظلمات الإدارية أمام ديوان المظالم والمنازعات العمالية، خبير في صياغة اللوائح الاعتراضية وتمثيل العملاء في قضايا الحقوق الوظيفية والتعويضات.",
    image: "/images/team/team-3.webp"
  }
];
