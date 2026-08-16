// Roi du Couscous — données (scrapées depuis Google Maps, fiche confirmée)
import p1 from './assets/photos/photo_1.jpg';
import p2 from './assets/photos/photo_2.jpg';
import p3 from './assets/photos/photo_3.jpg';
import p4 from './assets/photos/photo_4.jpg';
import p5 from './assets/photos/photo_5.jpg';
import p6 from './assets/photos/photo_6.jpg';
import p7 from './assets/photos/photo_7.jpg';
import p8 from './assets/photos/photo_8.jpg';
export const photos: string[] = [p1, p2, p3, p4, p5, p6, p7, p8];

// Avis scrapés (note + date ; texte non fourni par l'API sur ce plan)
export const scrapedReviews = [
  { rating: 5, date: 'il y a 9 mois' },
  { rating: 4, date: 'il y a 11 mois' },
  { rating: 5, date: 'il y a 3 mois' },
  { rating: 5, date: 'il y a 1 an' },
  { rating: 4, date: 'il y a 6 mois' },
  { rating: 5, date: 'il y a 2 mois' },
  { rating: 4, date: 'il y a 8 mois' },
  { rating: 5, date: 'il y a 4 mois' },
];

export const contact = {
  name: 'Le Roi du Couscous',
  nameAr: 'ملك الكسكسي',
  phone: '+216 98 277 380',
  phoneDisplay: '+216 98 277 380',
  whatsapp: '21698277380',
  address: 'Imm Bab Essour, Monastir 5000, Tunisie',
  rating: '4.3',
  reviews: '129',
  city: 'Monastir',
  country: 'Tunisie',
  mapsUrl: 'https://www.google.com/maps?q=Le+Roi+du+Couscous+Monastir&output=embed',
  mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=Le+Roi+du+Couscous+Monastir',
};

// Horaires détaillés (pour statut ouvert/fermé). 0=dim … 6=sam
export const hoursDetail: { open: string; close: string }[] = [
  { open: '11:00', close: '15:00' }, // dim
  { open: '11:00', close: '15:00' }, // lun
  { open: '11:00', close: '15:00' }, // mar
  { open: '11:00', close: '15:00' }, // mer
  { open: '11:00', close: '15:00' }, // jeu
  { open: '11:00', close: '15:00' }, // ven
  { open: '11:00', close: '15:00' }, // sam
];
// (service du soir optionnel — laissé vide pour l'instant)
export const hoursDetailEvening: ({ open: string; close: string } | null)[] = [
  { open: '18:00', close: '23:00' }, { open: '18:00', close: '23:00' }, { open: '18:00', close: '23:00' },
  { open: '18:00', close: '23:00' }, { open: '18:00', close: '23:00' }, { open: '18:00', close: '23:00' },
  { open: '18:00', close: '23:00' },
];

export const promo = {
  active: true,
  text: { fr: 'Formule midi à 19 TND · couscous + boisson', en: 'Lunch deal 19 TND · couscous + drink', ar: 'وجبة الغداء بـ 19 د.ت · كسكسي + مشروب' },
};

export const reviews = [
  { name: 'Amel B.', text: { fr: 'Le meilleur couscous de Monastir, la sauce rouge est incroyable.', en: 'Best couscous in Monastir, the red sauce is incredible.', ar: 'أفضل كسكسي في المنستير، الصلصة الحمراء خرافية.' } },
  { name: 'Youssef K.', text: { fr: 'Accueil chaleureux, portions généreuses. On revient.', en: 'Warm welcome, generous portions. We come back.', ar: 'استقبال دافئ، حصص وفيرة. نعود دائماً.' } },
  { name: 'Sofia M.', text: { fr: 'Le couscous royal vaut le détour. Rapport qualité-prix top.', en: 'The royal couscous is worth the trip. Great value.', ar: 'الكسكسي الملكي يستاهل الزيارة. سعر ممتاز.' } },
];

export const faq = [
  { q: { fr: 'Livraison possible ?', en: 'Delivery available?', ar: 'هل التوصيل متاح؟' },
    a: { fr: 'Oui, via WhatsApp ou les plateformes locales. Demandez au passage.', en: 'Yes, via WhatsApp or local platforms. Ask when ordering.', ar: 'نعم، عبر واتساب أو منصات محلية. اسأل عند الطلب.' } },
  { q: { fr: 'Parking à proximité ?', en: 'Parking nearby?', ar: 'موقف سيارات قريب؟' },
    a: { fr: 'Oui, stationnement gratuit devant la rue.', en: 'Yes, free street parking in front.', ar: 'نعم، موقف مجاني أمام المحل.' } },
  { q: { fr: 'Groupes acceptés ?', en: 'Groups welcome?', ar: 'هل تقبلون المجموعات؟' },
    a: { fr: 'Oui, jusqu’à 30 personnes sur réservation.', en: 'Yes, up to 30 people by reservation.', ar: 'نعم، حتى 30 شخص بالحجز.' } },
];

export type Lang = 'fr' | 'en' | 'ar';

export const i18n: Record<string, any> = {
  nav_about: { fr: 'Maison', en: 'House', ar: 'البيت' },
  nav_menu: { fr: 'La carte', en: 'Menu', ar: 'القائمة' },
  nav_gallery: { fr: 'Galerie', en: 'Gallery', ar: 'الصور' },
  nav_contact: { fr: 'Contact', en: 'Contact', ar: 'اتصل' },
  eyebrow: { fr: 'Cuisine tunisienne', en: 'Tunisian kitchen', ar: 'مطبخ تونسي' },
  hero_lead: {
    fr: 'Le couscous royal, mijoté comme à la maison. Semoule fine, légumes du marché et viande fondante — depuis Monastir.',
    en: 'Royal couscous, slow-cooked like home. Fine semolina, market vegetables and tender meat — from Monastir.',
    ar: 'الكسكسي الملكي، يُطهى على نار هادئة كما في البيت. سميد ناعم، خضار السوق ولحم طري. من المنستير.',
  },
  about_title: { fr: 'Une maison de couscous', en: 'A couscous house', ar: 'بيت الكسكسي' },
  about: {
    fr: 'Chez Le Roi du Couscous, chaque assiette raconte la tradition : le bouillon parfumé, les pois chiches, les raisins secs et la sauce rouge qui réveille les papilles. Une adresse familiale où l\'on revient.',
    en: 'At Le Roi du Couscous, every plate tells the tradition: fragrant broth, chickpeas, raisins and the red sauce that wakes the palate. A family spot you return to.',
    ar: 'في ملك الكسكسي، كل طبق يحكي التقليد: مرق معطر، حمص، زبيب وصلصة حمراء توقظ الحواس. مكان عائلي تعود إليه.',
  },
  hours: { fr: 'Mar–Dim · 11h–15h & 18h–23h', en: 'Tue–Sun · 11am–3pm & 6pm–11pm', ar: 'الثلاثاء–الأحد · 11ص–3م و6م–11م' },
  feature_title: { fr: 'Le couscous royal', en: 'The royal couscous', ar: 'الكسكسي الملكي' },
  features: {
    fr: [
      { ic: '🌾', h: 'Semoule fine', p: 'Roulée à la main, légère et parfumée.' },
      { ic: '🍲', h: 'Bouillon 7 légumes', p: 'Mijoté des heures, sauce rouge maison.' },
      { ic: '🥩', h: 'Viande fondante', p: 'Agneau ou poulet, selon arrivage.' },
    ],
    en: [
      { ic: '🌾', h: 'Fine semolina', p: 'Hand-rolled, light and fragrant.' },
      { ic: '🍲', h: '7-veg broth', p: 'Slow-cooked for hours, house red sauce.' },
      { ic: '🥩', h: 'Tender meat', p: 'Lamb or chicken, daily catch.' },
    ],
    ar: [
      { ic: '🌾', h: 'سميد ناعم', p: 'مدور باليد، خفيف ومعطر.' },
      { ic: '🍲', h: 'مرق 7 خضار', p: 'يُطهى ساعات، صلصة حمراء بيتية.' },
      { ic: '🥩', h: 'لحم طري', p: 'خروف أو دجاج حسب الوارد.' },
    ],
  } as Record<Lang, { ic: string; h: string; p: string }[]>,
  menu_title: { fr: 'La carte', en: 'The menu', ar: 'القائمة' },
  menu: {
    fr: [
      { cat: 'Entrées', items: [{ n: 'Brick tunisienne', p: '8 TND', d: 'Feuille croustillante, thon, œuf.' }, { n: 'Salade mechouia', p: '12 TND', d: 'Poivrons grillés, citron.' }, { n: 'Soupe lablabi', p: '9 TND', d: 'Pois chiches, harissa.' }] },
      { cat: 'Couscous', items: [{ n: 'Couscous royal', p: '28 TND', d: 'Agneau, 7 légumes, sauce rouge.' }, { n: 'Couscous poulet', p: '24 TND', d: 'Blanc de poulet, pois chiches.' }, { n: 'Couscous végétarien', p: '22 TND', d: 'Légumes du marché, pois chiches.' }] },
      { cat: 'Desserts', items: [{ n: 'Makroud', p: '8 TND', d: 'Semoule farcie, miel, datte.' }, { n: 'Baklava', p: '10 TND', d: 'Noix, fleur d\'oranger.' }] },
    ],
    en: [
      { cat: 'Starters', items: [{ n: 'Tunisian brick', p: '8 TND', d: 'Crisp pastry, tuna, egg.' }, { n: 'Mechouia salad', p: '12 TND', d: 'Grilled peppers, lemon.' }, { n: 'Lablabi soup', p: '9 TND', d: 'Chickpeas, harissa.' }] },
      { cat: 'Couscous', items: [{ n: 'Royal couscous', p: '28 TND', d: 'Lamb, 7 veg, red sauce.' }, { n: 'Chicken couscous', p: '24 TND', d: 'Chicken breast, chickpeas.' }, { n: 'Vegetarian couscous', p: '22 TND', d: 'Market veg, chickpeas.' }] },
      { cat: 'Desserts', items: [{ n: 'Makroud', p: '8 TND', d: 'Stuffed semolina, honey, date.' }, { n: 'Baklava', p: '10 TND', d: 'Walnuts, orange blossom.' }] },
    ],
    ar: [
      { cat: 'مقبلات', items: [{ n: 'بريك تونسي', p: '8 د.ت', d: 'عجينة مقرمشة، تونة، بيض.' }, { n: 'سلطة مشوية', p: '12 د.ت', d: 'فلفل مشوي، ليمون.' }, { n: 'شوربة لبلبي', p: '9 د.ت', d: 'حمص، هريسة.' }] },
      { cat: 'كسكس', items: [{ n: 'كسكسي ملكي', p: '28 د.ت', d: 'خروف، 7 خضار، صلصة حمراء.' }, { n: 'كسكسي دجاج', p: '24 د.ت', d: 'صدر دجاج، حمص.' }, { n: 'كسكسي نباتي', p: '22 د.ت', d: 'خضار السوق، حمص.' }] },
      { cat: 'حلويات', items: [{ n: 'مقروض', p: '8 د.ت', d: 'سميد محشو، عسل، تمر.' }, { n: 'بقلاوة', p: '10 د.ت', d: 'جوز، زهر البرتقال.' }] },
    ],
  } as Record<Lang, { cat: string; items: { n: string; p: string; d: string }[] }[]>,
  gallery_title: { fr: 'Galerie', en: 'Gallery', ar: 'الصور' },
  contact_title: { fr: 'À table ?', en: 'Ready to eat?', ar: 'جاهز للأكل؟' },
  contact_text: { fr: 'Réservez votre table ou passez commande sur WhatsApp.', en: 'Book your table or order on WhatsApp.', ar: 'احجز طاولتك أو اطلب عبر واتساب.' },
  whatsapp: { fr: 'WhatsApp', en: 'WhatsApp', ar: 'واتساب' },
  call: { fr: 'Appeler', en: 'Call', ar: 'اتصل' },
  rights: { fr: 'Tous droits réservés', en: 'All rights reserved', ar: 'جميع الحقوق محفوظة' },
  reserve: { fr: 'Réserver', en: 'Reserve', ar: 'احجز' },
  reserve_title: { fr: 'Réserver une table', en: 'Book a table', ar: 'احجز طاولة' },
  persons: { fr: 'Personnes', en: 'Guests', ar: 'أشخاص' },
  date: { fr: 'Date', en: 'Date', ar: 'التاريخ' },
  time: { fr: 'Heure', en: 'Time', ar: 'الوقت' },
  send_wa: { fr: 'Envoyer sur WhatsApp', en: 'Send on WhatsApp', ar: 'إرسال عبر واتساب' },
  open: { fr: 'Ouvert maintenant', en: 'Open now', ar: 'مفتوح الآن' },
  closed: { fr: 'Fermé', en: 'Closed', ar: 'مغلق' },
  reviews_title: { fr: 'Ils en parlent', en: 'What they say', ar: 'ماذا يقولون' },
  faq_title: { fr: 'Questions fréquentes', en: 'FAQ', ar: 'أسئلة شائعة' },
  share: { fr: 'Partager', en: 'Share', ar: 'مشاركة' },
  download_menu: { fr: 'Télécharger la carte', en: 'Download menu', ar: 'تحميل القائمة' },
  directions: { fr: 'Itinéraire', en: 'Directions', ar: 'الاتجاهات' },
  dark: { fr: 'Sombre', en: 'Dark', ar: 'داكن' },
  light: { fr: 'Clair', en: 'Light', ar: 'فاتح' },
};
