/**
 * Données communes du seed : éléments inclus / non inclus, paramètres du site, FAQ.
 * Toutes les valeurs de contact sont des EXEMPLES à remplacer dans l'admin (Paramètres du site).
 */

const LOCALES = ['fr', 'en', 'es', 'de', 'ar'];

/** Libellés réutilisables pour « Inclus » / « Non inclus ». */
const ITEMS = {
  privateTransport: {
    fr: 'Transport privé en véhicule climatisé avec chauffeur',
    en: 'Private air-conditioned vehicle with driver',
    es: 'Transporte privado en vehículo climatizado con conductor',
    de: 'Privates klimatisiertes Fahrzeug mit Fahrer',
    ar: 'نقل خاص بسيارة مكيفة مع سائق',
  },
  localGuide: {
    fr: 'Guide local officiel',
    en: 'Licensed local guide',
    es: 'Guía local oficial',
    de: 'Offizieller lokaler Reiseleiter',
    ar: 'مرشد محلي معتمد',
  },
  mountainGuide: {
    fr: 'Guide de montagne diplômé',
    en: 'Qualified mountain guide',
    es: 'Guía de montaña titulado',
    de: 'Diplomierter Bergführer',
    ar: 'مرشد جبلي معتمد',
  },
  entranceFees: {
    fr: "Droits d'entrée des sites mentionnés",
    en: 'Entrance fees for the listed sites',
    es: 'Entradas a los lugares mencionados',
    de: 'Eintrittsgelder für die genannten Sehenswürdigkeiten',
    ar: 'رسوم دخول المواقع المذكورة',
  },
  desertCamp: {
    fr: 'Nuit en bivouac berbère (dîner et petit-déjeuner)',
    en: 'Night in a Berber camp (dinner and breakfast)',
    es: 'Noche en campamento bereber (cena y desayuno)',
    de: 'Übernachtung im Berberzelt (Abendessen und Frühstück)',
    ar: 'ليلة في مخيم أمازيغي (عشاء وفطور)',
  },
  camelRide: {
    fr: 'Balade à dos de dromadaire au coucher du soleil',
    en: 'Camel ride at sunset',
    es: 'Paseo en dromedario al atardecer',
    de: 'Kamelritt bei Sonnenuntergang',
    ar: 'جولة على ظهر الجمل عند الغروب',
  },
  traditionalLunch: {
    fr: 'Déjeuner traditionnel',
    en: 'Traditional lunch',
    es: 'Almuerzo tradicional',
    de: 'Traditionelles Mittagessen',
    ar: 'غداء تقليدي',
  },
  cookingClass: {
    fr: 'Atelier de cuisine marocaine',
    en: 'Moroccan cooking class',
    es: 'Taller de cocina marroquí',
    de: 'Marokkanischer Kochkurs',
    ar: 'ورشة طبخ مغربي',
  },
  surfLesson: {
    fr: 'Cours de surf de 2 heures avec matériel',
    en: '2-hour surf lesson with equipment',
    es: 'Clase de surf de 2 horas con material',
    de: '2-stündiger Surfkurs inklusive Ausrüstung',
    ar: 'درس ركوب الأمواج لمدة ساعتين مع المعدات',
  },
  boatTrip: {
    fr: 'Balade en barque au pied des cascades',
    en: 'Boat ride at the foot of the waterfalls',
    es: 'Paseo en barca al pie de las cascadas',
    de: 'Bootsfahrt am Fuß der Wasserfälle',
    ar: 'جولة بالقارب أسفل الشلالات',
  },
  muleSupport: {
    fr: 'Mule pour le portage des bagages',
    en: 'Mule to carry luggage',
    es: 'Mula para el transporte del equipaje',
    de: 'Maultier für den Gepäcktransport',
    ar: 'بغل لحمل الأمتعة',
  },
  mountainLodge: {
    fr: 'Nuit en gîte de montagne (dîner et petit-déjeuner)',
    en: 'Night in a mountain lodge (dinner and breakfast)',
    es: 'Noche en refugio de montaña (cena y desayuno)',
    de: 'Übernachtung in einer Berghütte (Abendessen und Frühstück)',
    ar: 'ليلة في مأوى جبلي (عشاء وفطور)',
  },
  water: {
    fr: 'Eau minérale à bord',
    en: 'Bottled water on board',
    es: 'Agua mineral a bordo',
    de: 'Mineralwasser an Bord',
    ar: 'مياه معدنية على متن السيارة',
  },
  assistance: {
    fr: 'Assistance 24 h/24 et 7 j/7 pendant le voyage',
    en: '24/7 assistance during the trip',
    es: 'Asistencia 24/7 durante el viaje',
    de: '24/7-Betreuung während der Reise',
    ar: 'مساعدة على مدار الساعة طوال الرحلة',
  },
  flights: {
    fr: 'Vols internationaux',
    en: 'International flights',
    es: 'Vuelos internacionales',
    de: 'Internationale Flüge',
    ar: 'الرحلات الجوية الدولية',
  },
  accommodation: {
    fr: 'Hébergement (disponible en option)',
    en: 'Accommodation (available as an option)',
    es: 'Alojamiento (disponible como opción)',
    de: 'Unterkunft (optional buchbar)',
    ar: 'الإقامة (متاحة كخيار إضافي)',
  },
  otherMeals: {
    fr: 'Repas non mentionnés',
    en: 'Meals not mentioned',
    es: 'Comidas no mencionadas',
    de: 'Nicht erwähnte Mahlzeiten',
    ar: 'الوجبات غير المذكورة',
  },
  drinks: {
    fr: 'Boissons',
    en: 'Drinks',
    es: 'Bebidas',
    de: 'Getränke',
    ar: 'المشروبات',
  },
  tips: {
    fr: 'Pourboires et dépenses personnelles',
    en: 'Tips and personal expenses',
    es: 'Propinas y gastos personales',
    de: 'Trinkgelder und persönliche Ausgaben',
    ar: 'البقشيش والمصاريف الشخصية',
  },
  insurance: {
    fr: 'Assurance voyage',
    en: 'Travel insurance',
    es: 'Seguro de viaje',
    de: 'Reiseversicherung',
    ar: 'تأمين السفر',
  },
};

const SITE_SETTINGS = {
  shared: {
    agencyName: 'Atlas Horizons Voyages',
    phone: '+212 5 24 00 00 00',
    whatsappNumber: '212600000000',
    email: 'contact@example-agence.ma',
    notificationEmail: 'reservations@example-agence.ma',
    latitude: 31.6258,
    longitude: -8.0108,
    currency: 'EUR',
    licenseNumber: 'Licence agence de voyages n° EXEMPLE-0000',
    companyId: 'ICE 000000000000000 (exemple)',
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com/example-agence' },
      { platform: 'instagram', url: 'https://www.instagram.com/example-agence' },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@example-agence' },
      { platform: 'tripadvisor', url: 'https://www.tripadvisor.com/example-agence' },
    ],
    pricing: {
      transportPerPerson: 60,
      accommodationStandardPerNight: 35,
      accommodationSuperiorPerNight: 70,
      accommodationLuxuryPerNight: 140,
      childAccommodationRatio: 0.5,
      privateGuidePerDay: 90,
    },
  },
  fr: {
    tagline: 'Le Maroc authentique, guidé par ceux qui y vivent',
    description:
      "Agence de voyages locale basée à Marrakech : circuits privés, excursions dans le désert, villes impériales et séjours sur mesure dans tout le Maroc.",
    address: '12, avenue Mohammed V (adresse d’exemple), Guéliz',
    city: 'Marrakech',
    openingHours: [
      { label: 'Lundi – Vendredi', hours: '09:00 – 19:00', closed: false },
      { label: 'Samedi', hours: '09:00 – 14:00', closed: false },
      { label: 'Dimanche', hours: '', closed: true },
    ],
    defaultSeo: {
      metaTitle: 'Atlas Horizons Voyages | Circuits et excursions au Maroc',
      metaDescription:
        'Circuits privés au Maroc avec guides locaux : désert de Merzouga, Marrakech, Fès, Chefchaouen, Atlas. Prix transparents, assistance 24/7.',
    },
  },
  en: {
    tagline: 'Authentic Morocco, guided by those who live there',
    description:
      'Local travel agency based in Marrakech: private tours, desert trips, imperial cities and tailor-made holidays all over Morocco.',
    address: '12 Mohammed V Avenue (sample address), Gueliz',
    city: 'Marrakech',
    openingHours: [
      { label: 'Monday – Friday', hours: '9:00 am – 7:00 pm', closed: false },
      { label: 'Saturday', hours: '9:00 am – 2:00 pm', closed: false },
      { label: 'Sunday', hours: '', closed: true },
    ],
    defaultSeo: {
      metaTitle: 'Atlas Horizons Voyages | Tours and trips in Morocco',
      metaDescription:
        'Private Morocco tours with local guides: Merzouga desert, Marrakech, Fes, Chefchaouen, Atlas Mountains. Transparent prices, 24/7 support.',
    },
  },
  es: {
    tagline: 'El Marruecos auténtico, guiado por quienes viven allí',
    description:
      'Agencia de viajes local con sede en Marrakech: circuitos privados, excursiones al desierto, ciudades imperiales y viajes a medida por todo Marruecos.',
    address: 'Avenida Mohammed V, 12 (dirección de ejemplo), Gueliz',
    city: 'Marrakech',
    openingHours: [
      { label: 'Lunes – Viernes', hours: '09:00 – 19:00', closed: false },
      { label: 'Sábado', hours: '09:00 – 14:00', closed: false },
      { label: 'Domingo', hours: '', closed: true },
    ],
    defaultSeo: {
      metaTitle: 'Atlas Horizons Voyages | Circuitos y excursiones en Marruecos',
      metaDescription:
        'Circuitos privados por Marruecos con guías locales: desierto de Merzouga, Marrakech, Fez, Chefchaouen, Atlas. Precios claros, asistencia 24/7.',
    },
  },
  de: {
    tagline: 'Das authentische Marokko, begleitet von Menschen, die dort leben',
    description:
      'Lokale Reiseagentur mit Sitz in Marrakesch: private Rundreisen, Wüstentouren, Königsstädte und individuelle Reisen in ganz Marokko.',
    address: 'Avenue Mohammed V 12 (Beispieladresse), Gueliz',
    city: 'Marrakesch',
    openingHours: [
      { label: 'Montag – Freitag', hours: '09:00 – 19:00 Uhr', closed: false },
      { label: 'Samstag', hours: '09:00 – 14:00 Uhr', closed: false },
      { label: 'Sonntag', hours: '', closed: true },
    ],
    defaultSeo: {
      metaTitle: 'Atlas Horizons Voyages | Rundreisen und Ausflüge in Marokko',
      metaDescription:
        'Private Marokko-Rundreisen mit lokalen Guides: Wüste Merzouga, Marrakesch, Fès, Chefchaouen, Atlas. Transparente Preise, 24/7-Service.',
    },
  },
  ar: {
    tagline: 'المغرب الأصيل، برفقة من يعيشون فيه',
    description:
      'وكالة أسفار محلية مقرها مراكش: جولات خاصة، رحلات إلى الصحراء، المدن العتيقة ورحلات حسب الطلب في جميع أنحاء المغرب.',
    address: '12، شارع محمد الخامس (عنوان تجريبي)، جليز',
    city: 'مراكش',
    openingHours: [
      { label: 'من الإثنين إلى الجمعة', hours: '09:00 – 19:00', closed: false },
      { label: 'السبت', hours: '09:00 – 14:00', closed: false },
      { label: 'الأحد', hours: '', closed: true },
    ],
    defaultSeo: {
      metaTitle: 'Atlas Horizons Voyages | جولات ورحلات في المغرب',
      metaDescription:
        'جولات خاصة في المغرب مع مرشدين محليين: صحراء مرزوكة، مراكش، فاس، شفشاون، الأطلس. أسعار واضحة ومساعدة على مدار الساعة.',
    },
  },
};

const FAQS = [
  {
    category: 'booking',
    order: 1,
    fr: ['Comment réserver un circuit ?', "Choisissez votre circuit, remplissez le formulaire de réservation en indiquant vos dates et le nombre de voyageurs. Vous recevez immédiatement un email récapitulatif, puis notre équipe confirme la disponibilité sous 24 heures."],
    en: ['How do I book a tour?', 'Choose your tour and fill in the booking form with your dates and number of travellers. You will immediately receive a summary email, and our team will confirm availability within 24 hours.'],
    es: ['¿Cómo reservo un circuito?', 'Elija su circuito y rellene el formulario de reserva indicando sus fechas y el número de viajeros. Recibirá al instante un correo de resumen y nuestro equipo confirmará la disponibilidad en 24 horas.'],
    de: ['Wie buche ich eine Rundreise?', 'Wählen Sie Ihre Rundreise und füllen Sie das Buchungsformular mit Reisedaten und Anzahl der Reisenden aus. Sie erhalten sofort eine Zusammenfassung per E-Mail, und unser Team bestätigt die Verfügbarkeit innerhalb von 24 Stunden.'],
    ar: ['كيف أحجز جولة؟', 'اختر جولتك واملأ استمارة الحجز مع تحديد التواريخ وعدد المسافرين. ستتلقى فوراً رسالة ملخص عبر البريد، ثم يؤكد فريقنا التوفر خلال 24 ساعة.'],
  },
  {
    category: 'payment',
    order: 2,
    fr: ['Dois-je payer en ligne ?', "Non. La demande de réservation est gratuite et sans engagement. Une fois la réservation confirmée, nous vous indiquons les modalités de paiement (virement, carte bancaire ou paiement sur place selon le circuit)."],
    en: ['Do I have to pay online?', 'No. The booking request is free and without commitment. Once your booking is confirmed, we will explain the payment options (bank transfer, card or payment on site depending on the tour).'],
    es: ['¿Tengo que pagar en línea?', 'No. La solicitud de reserva es gratuita y sin compromiso. Una vez confirmada la reserva, le indicaremos las formas de pago (transferencia, tarjeta o pago en destino según el circuito).'],
    de: ['Muss ich online bezahlen?', 'Nein. Die Buchungsanfrage ist kostenlos und unverbindlich. Nach der Bestätigung teilen wir Ihnen die Zahlungsmöglichkeiten mit (Überweisung, Karte oder Zahlung vor Ort, je nach Reise).'],
    ar: ['هل يجب أن أدفع عبر الإنترنت؟', 'لا. طلب الحجز مجاني ودون أي التزام. بعد تأكيد الحجز نخبرك بطرق الدفع (تحويل بنكي، بطاقة أو الدفع في عين المكان حسب الجولة).'],
  },
  {
    category: 'payment',
    order: 3,
    fr: ["Quelles sont les conditions d'annulation ?", "L'annulation est gratuite jusqu'à 7 jours avant le départ. Entre 7 jours et 48 heures, 30 % du montant est retenu ; moins de 48 heures avant le départ, le circuit reste dû. Consultez nos CGV pour le détail."],
    en: ['What is the cancellation policy?', 'Cancellation is free up to 7 days before departure. Between 7 days and 48 hours, 30% of the price is retained; less than 48 hours before departure, the full price is due. See our terms and conditions for details.'],
    es: ['¿Cuáles son las condiciones de cancelación?', 'La cancelación es gratuita hasta 7 días antes de la salida. Entre 7 días y 48 horas se retiene el 30 % del importe; con menos de 48 horas se cobra el circuito completo. Consulte nuestras condiciones generales.'],
    de: ['Wie sind die Stornobedingungen?', 'Die Stornierung ist bis 7 Tage vor Abreise kostenlos. Zwischen 7 Tagen und 48 Stunden werden 30 % einbehalten; weniger als 48 Stunden vorher ist der volle Preis fällig. Details finden Sie in unseren AGB.'],
    ar: ['ما هي شروط الإلغاء؟', 'الإلغاء مجاني حتى 7 أيام قبل الانطلاق. بين 7 أيام و48 ساعة يُحتفظ بـ 30% من المبلغ، وقبل أقل من 48 ساعة يكون المبلغ كاملاً مستحقاً. راجع الشروط العامة للبيع للتفاصيل.'],
  },
  {
    category: 'travel',
    order: 4,
    fr: ['Quelle est la meilleure période pour visiter le Maroc ?', "Le printemps (mars à mai) et l'automne (septembre à novembre) offrent des températures idéales partout. L'hiver est parfait pour le désert en journée, l'été pour la côte atlantique et la montagne."],
    en: ['When is the best time to visit Morocco?', 'Spring (March to May) and autumn (September to November) offer ideal temperatures everywhere. Winter is great for the desert during the day, summer for the Atlantic coast and the mountains.'],
    es: ['¿Cuál es la mejor época para visitar Marruecos?', 'La primavera (marzo a mayo) y el otoño (septiembre a noviembre) ofrecen temperaturas ideales en todo el país. El invierno es perfecto para el desierto de día y el verano para la costa atlántica y la montaña.'],
    de: ['Wann ist die beste Reisezeit für Marokko?', 'Frühling (März bis Mai) und Herbst (September bis November) bieten überall ideale Temperaturen. Der Winter eignet sich tagsüber hervorragend für die Wüste, der Sommer für die Atlantikküste und die Berge.'],
    ar: ['ما هو أفضل وقت لزيارة المغرب؟', 'يوفر الربيع (من مارس إلى ماي) والخريف (من شتنبر إلى نونبر) درجات حرارة مثالية في كل مكان. الشتاء رائع للصحراء نهاراً، والصيف مناسب للساحل الأطلسي والجبال.'],
  },
  {
    category: 'travel',
    order: 5,
    fr: ['Ai-je besoin d’un visa ?', "Les ressortissants de l'Union européenne, de la Suisse, du Royaume-Uni, des États-Unis et du Canada n'ont pas besoin de visa pour un séjour touristique de moins de 90 jours. Un passeport valide est obligatoire. Vérifiez toujours les règles en vigueur pour votre nationalité."],
    en: ['Do I need a visa?', 'Citizens of the European Union, Switzerland, the United Kingdom, the United States and Canada do not need a visa for tourist stays of under 90 days. A valid passport is required. Always check the current rules for your nationality.'],
    es: ['¿Necesito visado?', 'Los ciudadanos de la Unión Europea, Suiza, Reino Unido, Estados Unidos y Canadá no necesitan visado para estancias turísticas de menos de 90 días. Es obligatorio un pasaporte válido. Compruebe siempre las normas vigentes para su nacionalidad.'],
    de: ['Brauche ich ein Visum?', 'Staatsangehörige der EU, der Schweiz, des Vereinigten Königreichs, der USA und Kanadas benötigen für touristische Aufenthalte unter 90 Tagen kein Visum. Ein gültiger Reisepass ist Pflicht. Prüfen Sie stets die aktuellen Regeln für Ihre Staatsangehörigkeit.'],
    ar: ['هل أحتاج إلى تأشيرة؟', 'لا يحتاج مواطنو الاتحاد الأوروبي وسويسرا والمملكة المتحدة والولايات المتحدة وكندا إلى تأشيرة للإقامات السياحية التي تقل عن 90 يوماً. جواز السفر الساري إلزامي. تحقق دائماً من القواعد المعمول بها حسب جنسيتك.'],
  },
  {
    category: 'onsite',
    order: 6,
    fr: ['Les circuits sont-ils privés ?', 'Oui, tous nos circuits sont privés : vous voyagez uniquement avec vos proches, à votre rythme, avec un chauffeur et un guide dédiés. Le programme peut être adapté à vos envies.'],
    en: ['Are the tours private?', 'Yes, all our tours are private: you travel only with your own group, at your own pace, with a dedicated driver and guide. The itinerary can be adapted to your wishes.'],
    es: ['¿Los circuitos son privados?', 'Sí, todos nuestros circuitos son privados: viaja solo con su grupo, a su ritmo, con conductor y guía exclusivos. El programa puede adaptarse a sus deseos.'],
    de: ['Sind die Rundreisen privat?', 'Ja, alle unsere Reisen sind privat: Sie reisen nur mit Ihrer eigenen Gruppe, in Ihrem Tempo, mit eigenem Fahrer und Reiseleiter. Das Programm kann nach Ihren Wünschen angepasst werden.'],
    ar: ['هل الجولات خاصة؟', 'نعم، جميع جولاتنا خاصة: تسافر مع مرافقيك فقط، بالوتيرة التي تناسبك، مع سائق ومرشد مخصصين. ويمكن تعديل البرنامج حسب رغباتك.'],
  },
  {
    category: 'onsite',
    order: 7,
    fr: ['Les circuits conviennent-ils aux enfants ?', "La plupart de nos circuits conviennent aux familles. Les enfants de moins de 12 ans bénéficient d'un tarif réduit, et nous fournissons des sièges auto sur demande. Le trek du Toubkal est déconseillé aux moins de 12 ans."],
    en: ['Are the tours suitable for children?', 'Most of our tours are family-friendly. Children under 12 benefit from a reduced rate, and child seats are available on request. The Toubkal trek is not recommended for children under 12.'],
    es: ['¿Los circuitos son aptos para niños?', 'La mayoría de nuestros circuitos son aptos para familias. Los menores de 12 años tienen tarifa reducida y ofrecemos sillas infantiles bajo petición. El trekking del Toubkal no se recomienda a menores de 12 años.'],
    de: ['Sind die Reisen für Kinder geeignet?', 'Die meisten unserer Reisen sind familienfreundlich. Kinder unter 12 Jahren erhalten einen ermäßigten Preis, Kindersitze stellen wir auf Anfrage bereit. Das Toubkal-Trekking wird für Kinder unter 12 Jahren nicht empfohlen.'],
    ar: ['هل الجولات مناسبة للأطفال؟', 'معظم جولاتنا مناسبة للعائلات. يستفيد الأطفال دون 12 سنة من سعر مخفض، ونوفر مقاعد أطفال عند الطلب. لا يُنصح برحلة توبقال للأطفال دون 12 سنة.'],
  },
  {
    category: 'booking',
    order: 8,
    fr: ['Puis-je créer un circuit sur mesure ?', "Bien sûr ! Utilisez notre formulaire « Circuits sur mesure » en indiquant vos dates, votre budget et vos envies. Un conseiller vous envoie une proposition personnalisée sous 48 heures."],
    en: ['Can I create a tailor-made tour?', 'Of course! Use our “Tailor-made tours” form to tell us your dates, budget and wishes. A travel advisor will send you a personalised proposal within 48 hours.'],
    es: ['¿Puedo crear un circuito a medida?', '¡Por supuesto! Utilice nuestro formulario «Circuitos a medida» indicando sus fechas, presupuesto y deseos. Un asesor le enviará una propuesta personalizada en 48 horas.'],
    de: ['Kann ich eine individuelle Reise zusammenstellen?', 'Natürlich! Nutzen Sie unser Formular „Individuelle Reisen“ und teilen Sie uns Reisedaten, Budget und Wünsche mit. Ein Reiseberater sendet Ihnen innerhalb von 48 Stunden ein persönliches Angebot.'],
    ar: ['هل يمكنني تصميم رحلة حسب الطلب؟', 'بالتأكيد! استخدم استمارة «رحلات حسب الطلب» مع ذكر التواريخ والميزانية ورغباتك، وسيرسل لك أحد مستشارينا عرضاً مخصصاً خلال 48 ساعة.'],
  },
];

module.exports = { LOCALES, ITEMS, SITE_SETTINGS, FAQS };
