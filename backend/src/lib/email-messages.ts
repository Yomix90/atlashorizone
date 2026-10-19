import type { SupportedLocale } from './constants';

/**
 * Textes des emails transactionnels, par langue.
 * Les variables s'écrivent {name} et sont échappées avant insertion dans le HTML.
 */
export interface EmailMessages {
  dir: 'ltr' | 'rtl';
  yes: string;
  no: string;
  languages: Record<SupportedLocale, string>;
  accommodation: Record<'none' | 'standard' | 'superior' | 'luxury', string>;
  reservation: {
    subject: string;
    greeting: string;
    intro: string;
    summaryTitle: string;
    reference: string;
    destination: string;
    dates: string;
    dateRange: string;
    travellers: string;
    adults: string;
    children: string;
    transport: string;
    accommodationLabel: string;
    privateGuide: string;
    guideLanguage: string;
    yourMessage: string;
    total: string;
    estimateNote: string;
    nextSteps: string;
  };
  contact: {
    subject: string;
    customTripSubject: string;
    greeting: string;
    intro: string;
    customTripIntro: string;
    yourMessage: string;
  };
  footer: {
    questions: string;
    signature: string;
    automatic: string;
  };
  agency: {
    reservationSubject: string;
    reservationIntro: string;
    contactSubject: string;
    customTripSubject: string;
    contactIntro: string;
    customer: string;
    email: string;
    phone: string;
    country: string;
    customerLanguage: string;
    subject: string;
    details: string;
    openInAdmin: string;
  };
}

const fr: EmailMessages = {
  dir: 'ltr',
  yes: 'Oui',
  no: 'Non',
  languages: { fr: 'Français', en: 'Anglais', es: 'Espagnol', de: 'Allemand', ar: 'Arabe' },
  accommodation: { none: 'Sans hébergement', standard: 'Standard', superior: 'Supérieur', luxury: 'Luxe' },
  reservation: {
    subject: 'Votre demande de réservation {reference} — {agency}',
    greeting: 'Bonjour {name},',
    intro:
      'Merci pour votre demande de réservation ! Notre équipe vérifie les disponibilités et vous recontacte sous 24 heures pour confirmer votre voyage.',
    summaryTitle: 'Récapitulatif de votre demande',
    reference: 'Référence',
    destination: 'Circuit',
    dates: 'Dates',
    dateRange: 'du {start} au {end}',
    travellers: 'Voyageurs',
    adults: '{count} adulte(s)',
    children: '{count} enfant(s)',
    transport: 'Transport privé',
    accommodationLabel: 'Hébergement',
    privateGuide: 'Guide privé',
    guideLanguage: 'Langue du guide',
    yourMessage: 'Votre message',
    total: 'Prix total estimé',
    estimateNote:
      "Ce prix est indicatif et sera confirmé par l'agence. Aucun paiement n'est demandé à ce stade.",
    nextSteps: 'Conservez votre référence : elle vous sera demandée pour tout échange avec notre équipe.',
  },
  contact: {
    subject: 'Nous avons bien reçu votre message — {agency}',
    customTripSubject: 'Votre demande de circuit sur mesure — {agency}',
    greeting: 'Bonjour {name},',
    intro: 'Merci de nous avoir contactés. Un membre de notre équipe vous répond sous 24 heures.',
    customTripIntro:
      'Merci pour votre demande de circuit sur mesure ! Un conseiller prépare une proposition personnalisée et vous recontacte sous 48 heures.',
    yourMessage: 'Votre message',
  },
  footer: {
    questions: 'Une question ? Répondez simplement à cet email ou écrivez-nous sur WhatsApp : {whatsapp}',
    signature: "L'équipe {agency}",
    automatic: 'Cet email a été envoyé automatiquement suite à votre demande sur notre site.',
  },
  agency: {
    reservationSubject: 'Nouvelle demande de réservation {reference} — {destination}',
    reservationIntro: 'Une nouvelle demande de réservation vient d’être enregistrée sur le site.',
    contactSubject: 'Nouveau message de contact — {name}',
    customTripSubject: 'Nouvelle demande de circuit sur mesure — {name}',
    contactIntro: 'Un nouveau message a été envoyé depuis le site.',
    customer: 'Client',
    email: 'Email',
    phone: 'Téléphone',
    country: 'Pays',
    customerLanguage: 'Langue du client',
    subject: 'Sujet',
    details: 'Détails du projet',
    openInAdmin: "Ouvrir dans l'administration",
  },
};

const en: EmailMessages = {
  dir: 'ltr',
  yes: 'Yes',
  no: 'No',
  languages: { fr: 'French', en: 'English', es: 'Spanish', de: 'German', ar: 'Arabic' },
  accommodation: { none: 'No accommodation', standard: 'Standard', superior: 'Superior', luxury: 'Luxury' },
  reservation: {
    subject: 'Your booking request {reference} — {agency}',
    greeting: 'Hello {name},',
    intro:
      'Thank you for your booking request! Our team is checking availability and will get back to you within 24 hours to confirm your trip.',
    summaryTitle: 'Your request summary',
    reference: 'Reference',
    destination: 'Tour',
    dates: 'Dates',
    dateRange: 'from {start} to {end}',
    travellers: 'Travellers',
    adults: '{count} adult(s)',
    children: '{count} child(ren)',
    transport: 'Private transport',
    accommodationLabel: 'Accommodation',
    privateGuide: 'Private guide',
    guideLanguage: 'Guide language',
    yourMessage: 'Your message',
    total: 'Estimated total price',
    estimateNote: 'This price is indicative and will be confirmed by the agency. No payment is required at this stage.',
    nextSteps: 'Please keep your reference: you will be asked for it in any exchange with our team.',
  },
  contact: {
    subject: 'We have received your message — {agency}',
    customTripSubject: 'Your tailor-made tour request — {agency}',
    greeting: 'Hello {name},',
    intro: 'Thank you for contacting us. A member of our team will reply within 24 hours.',
    customTripIntro:
      'Thank you for your tailor-made tour request! A travel advisor is preparing a personalised proposal and will contact you within 48 hours.',
    yourMessage: 'Your message',
  },
  footer: {
    questions: 'Any questions? Simply reply to this email or message us on WhatsApp: {whatsapp}',
    signature: 'The {agency} team',
    automatic: 'This email was sent automatically following your request on our website.',
  },
  agency: {
    reservationSubject: 'New booking request {reference} — {destination}',
    reservationIntro: 'A new booking request has just been submitted on the website.',
    contactSubject: 'New contact message — {name}',
    customTripSubject: 'New tailor-made tour request — {name}',
    contactIntro: 'A new message has been sent from the website.',
    customer: 'Customer',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    customerLanguage: 'Customer language',
    subject: 'Subject',
    details: 'Project details',
    openInAdmin: 'Open in the admin panel',
  },
};

const es: EmailMessages = {
  dir: 'ltr',
  yes: 'Sí',
  no: 'No',
  languages: { fr: 'Francés', en: 'Inglés', es: 'Español', de: 'Alemán', ar: 'Árabe' },
  accommodation: { none: 'Sin alojamiento', standard: 'Estándar', superior: 'Superior', luxury: 'Lujo' },
  reservation: {
    subject: 'Su solicitud de reserva {reference} — {agency}',
    greeting: 'Hola {name}:',
    intro:
      '¡Gracias por su solicitud de reserva! Nuestro equipo está comprobando la disponibilidad y se pondrá en contacto con usted en un plazo de 24 horas para confirmar su viaje.',
    summaryTitle: 'Resumen de su solicitud',
    reference: 'Referencia',
    destination: 'Circuito',
    dates: 'Fechas',
    dateRange: 'del {start} al {end}',
    travellers: 'Viajeros',
    adults: '{count} adulto(s)',
    children: '{count} niño(s)',
    transport: 'Transporte privado',
    accommodationLabel: 'Alojamiento',
    privateGuide: 'Guía privado',
    guideLanguage: 'Idioma del guía',
    yourMessage: 'Su mensaje',
    total: 'Precio total estimado',
    estimateNote: 'Este precio es orientativo y será confirmado por la agencia. No se requiere ningún pago por ahora.',
    nextSteps: 'Conserve su referencia: se le pedirá en cualquier comunicación con nuestro equipo.',
  },
  contact: {
    subject: 'Hemos recibido su mensaje — {agency}',
    customTripSubject: 'Su solicitud de circuito a medida — {agency}',
    greeting: 'Hola {name}:',
    intro: 'Gracias por contactarnos. Un miembro de nuestro equipo le responderá en un plazo de 24 horas.',
    customTripIntro:
      '¡Gracias por su solicitud de circuito a medida! Un asesor está preparando una propuesta personalizada y le contactará en un plazo de 48 horas.',
    yourMessage: 'Su mensaje',
  },
  footer: {
    questions: '¿Alguna pregunta? Responda a este correo o escríbanos por WhatsApp: {whatsapp}',
    signature: 'El equipo de {agency}',
    automatic: 'Este correo se ha enviado automáticamente tras su solicitud en nuestro sitio web.',
  },
  agency: {
    reservationSubject: 'Nueva solicitud de reserva {reference} — {destination}',
    reservationIntro: 'Se acaba de registrar una nueva solicitud de reserva en el sitio.',
    contactSubject: 'Nuevo mensaje de contacto — {name}',
    customTripSubject: 'Nueva solicitud de circuito a medida — {name}',
    contactIntro: 'Se ha enviado un nuevo mensaje desde el sitio.',
    customer: 'Cliente',
    email: 'Correo',
    phone: 'Teléfono',
    country: 'País',
    customerLanguage: 'Idioma del cliente',
    subject: 'Asunto',
    details: 'Detalles del proyecto',
    openInAdmin: 'Abrir en la administración',
  },
};

const de: EmailMessages = {
  dir: 'ltr',
  yes: 'Ja',
  no: 'Nein',
  languages: { fr: 'Französisch', en: 'Englisch', es: 'Spanisch', de: 'Deutsch', ar: 'Arabisch' },
  accommodation: { none: 'Ohne Unterkunft', standard: 'Standard', superior: 'Superior', luxury: 'Luxus' },
  reservation: {
    subject: 'Ihre Buchungsanfrage {reference} — {agency}',
    greeting: 'Hallo {name},',
    intro:
      'Vielen Dank für Ihre Buchungsanfrage! Unser Team prüft die Verfügbarkeit und meldet sich innerhalb von 24 Stunden bei Ihnen, um Ihre Reise zu bestätigen.',
    summaryTitle: 'Zusammenfassung Ihrer Anfrage',
    reference: 'Referenz',
    destination: 'Rundreise',
    dates: 'Reisedaten',
    dateRange: 'vom {start} bis {end}',
    travellers: 'Reisende',
    adults: '{count} Erwachsene(r)',
    children: '{count} Kind(er)',
    transport: 'Privater Transport',
    accommodationLabel: 'Unterkunft',
    privateGuide: 'Privater Reiseleiter',
    guideLanguage: 'Sprache des Reiseleiters',
    yourMessage: 'Ihre Nachricht',
    total: 'Geschätzter Gesamtpreis',
    estimateNote:
      'Dieser Preis ist unverbindlich und wird von der Agentur bestätigt. Zum jetzigen Zeitpunkt ist keine Zahlung erforderlich.',
    nextSteps: 'Bitte bewahren Sie Ihre Referenz auf: Sie wird bei jedem Kontakt mit unserem Team benötigt.',
  },
  contact: {
    subject: 'Wir haben Ihre Nachricht erhalten — {agency}',
    customTripSubject: 'Ihre Anfrage für eine individuelle Reise — {agency}',
    greeting: 'Hallo {name},',
    intro: 'Vielen Dank für Ihre Nachricht. Ein Mitglied unseres Teams antwortet Ihnen innerhalb von 24 Stunden.',
    customTripIntro:
      'Vielen Dank für Ihre Anfrage für eine individuelle Reise! Ein Reiseberater erstellt ein persönliches Angebot und meldet sich innerhalb von 48 Stunden bei Ihnen.',
    yourMessage: 'Ihre Nachricht',
  },
  footer: {
    questions: 'Haben Sie Fragen? Antworten Sie einfach auf diese E-Mail oder schreiben Sie uns per WhatsApp: {whatsapp}',
    signature: 'Ihr {agency}-Team',
    automatic: 'Diese E-Mail wurde nach Ihrer Anfrage auf unserer Website automatisch versendet.',
  },
  agency: {
    reservationSubject: 'Neue Buchungsanfrage {reference} — {destination}',
    reservationIntro: 'Auf der Website wurde soeben eine neue Buchungsanfrage gestellt.',
    contactSubject: 'Neue Kontaktnachricht — {name}',
    customTripSubject: 'Neue Anfrage für eine individuelle Reise — {name}',
    contactIntro: 'Über die Website wurde eine neue Nachricht gesendet.',
    customer: 'Kunde',
    email: 'E-Mail',
    phone: 'Telefon',
    country: 'Land',
    customerLanguage: 'Sprache des Kunden',
    subject: 'Betreff',
    details: 'Projektdetails',
    openInAdmin: 'In der Verwaltung öffnen',
  },
};

const ar: EmailMessages = {
  dir: 'rtl',
  yes: 'نعم',
  no: 'لا',
  languages: { fr: 'الفرنسية', en: 'الإنجليزية', es: 'الإسبانية', de: 'الألمانية', ar: 'العربية' },
  accommodation: { none: 'بدون إقامة', standard: 'عادية', superior: 'ممتازة', luxury: 'فاخرة' },
  reservation: {
    subject: 'طلب الحجز الخاص بك {reference} — {agency}',
    greeting: 'مرحباً {name}،',
    intro:
      'شكراً لطلب الحجز! يقوم فريقنا بالتحقق من التوفر وسيتواصل معك خلال 24 ساعة لتأكيد رحلتك.',
    summaryTitle: 'ملخص طلبك',
    reference: 'المرجع',
    destination: 'الجولة',
    dates: 'التواريخ',
    dateRange: 'من {start} إلى {end}',
    travellers: 'المسافرون',
    adults: 'البالغون: {count}',
    children: 'الأطفال: {count}',
    transport: 'نقل خاص',
    accommodationLabel: 'الإقامة',
    privateGuide: 'مرشد خاص',
    guideLanguage: 'لغة المرشد',
    yourMessage: 'رسالتك',
    total: 'السعر الإجمالي التقديري',
    estimateNote: 'هذا السعر تقديري وستؤكده الوكالة. لا يُطلب أي دفع في هذه المرحلة.',
    nextSteps: 'يرجى الاحتفاظ بالمرجع، فسيُطلب منك عند أي تواصل مع فريقنا.',
  },
  contact: {
    subject: 'لقد استلمنا رسالتك — {agency}',
    customTripSubject: 'طلب رحلة مخصصة — {agency}',
    greeting: 'مرحباً {name}،',
    intro: 'شكراً لتواصلك معنا. سيرد عليك أحد أعضاء فريقنا خلال 24 ساعة.',
    customTripIntro:
      'شكراً لطلب الرحلة المخصصة! يعمل أحد مستشارينا على إعداد عرض يناسبك وسيتواصل معك خلال 48 ساعة.',
    yourMessage: 'رسالتك',
  },
  footer: {
    questions: 'هل لديك سؤال؟ يكفي الرد على هذا البريد أو مراسلتنا عبر واتساب: {whatsapp}',
    signature: 'فريق {agency}',
    automatic: 'أُرسل هذا البريد تلقائياً بعد طلبك على موقعنا.',
  },
  agency: {
    reservationSubject: 'طلب حجز جديد {reference} — {destination}',
    reservationIntro: 'تم تسجيل طلب حجز جديد على الموقع.',
    contactSubject: 'رسالة تواصل جديدة — {name}',
    customTripSubject: 'طلب رحلة مخصصة جديد — {name}',
    contactIntro: 'تم إرسال رسالة جديدة من الموقع.',
    customer: 'العميل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    country: 'البلد',
    customerLanguage: 'لغة العميل',
    subject: 'الموضوع',
    details: 'تفاصيل المشروع',
    openInAdmin: 'فتح في لوحة الإدارة',
  },
};

export const EMAIL_MESSAGES: Record<SupportedLocale, EmailMessages> = { fr, en, es, de, ar };
