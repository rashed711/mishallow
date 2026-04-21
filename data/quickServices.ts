export interface QuickService {
  id: string;
  title: string;
}

export interface QuickServiceCategory {
  id: string;
  name: string;
  services: QuickService[];
}

export const quickServicesData: QuickServiceCategory[] = [
  {
    id: 'consultations',
    name: 'استشارات قانونية',
    services: [
      { id: 'c1', title: 'استشارة قانونية تجارية' },
      { id: 'c2', title: 'استشارة في نظام العمل' },
      { id: 'c3', title: 'استشارة أحوال شخصية' },
      { id: 'c4', title: 'استشارة جنائية' },
      { id: 'c5', title: 'استشارة عقارية' }
    ]
  },
  {
    id: 'regulations',
    name: 'اللوائح',
    services: [
      { id: 'r1', title: 'صياغة لائحة تنظيم عمل' },
      { id: 'r2', title: 'لائحة تنظيمية داخلية للشركات' },
      { id: 'r3', title: 'لائحة المكافآت والمخالفات' },
      { id: 'r4', title: 'تحديث اللوائح القائمة' }
    ]
  },
  {
    id: 'litigation',
    name: 'الدعاوي',
    services: [
      { id: 'l1', title: 'رفع دعوى تجارية' },
      { id: 'l2', title: 'رفع دعوى عمالية' },
      { id: 'l3', title: 'إعداد لائحة اعتراضية' },
      { id: 'l4', title: 'دعوى فسخ نكاح' },
      { id: 'l5', title: 'مطالبة مالية وديون' }
    ]
  },
  {
    id: 'drafting',
    name: 'الصياغة القانونية',
    services: [
      { id: 'd1', title: 'صياغة عقد تأسيس شركة' },
      { id: 'd2', title: 'صياغة اتفاقية شراكة' },
      { id: 'd3', title: 'صياغة اتفاقية عدم إفصاح' },
      { id: 'd4', title: 'مراجعة عقود المقاولات' },
      { id: 'd5', title: 'صياغة عقد عمل' }
    ]
  },
  {
    id: 'power-of-attorney',
    name: 'التوكيلات',
    services: [
      { id: 'p1', title: 'توكيل عام للمحامي' },
      { id: 'p2', title: 'توكيل خاص لقضية محددة' },
      { id: 'p3', title: 'توكيل تأسيس الشركات' },
      { id: 'p4', title: 'إلغاء وكالة قائمة' }
    ]
  }
];
