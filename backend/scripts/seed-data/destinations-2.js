/** Destinations 2/2 : Essaouira, Agadir & Taghazout, Casablanca, Rabat, Tanger & Asilah, Atlas. */

module.exports = [
  {
    slug: 'essaouira',
    region: 'marrakech_safi',
    tripType: 'beach',
    difficulty: 'easy',
    durationDays: 2,
    priceAdult: 180,
    priceChild: 110,
    latitude: 31.5085,
    longitude: -9.7595,
    featured: true,
    popularity: 88,
    bestMonths: [4, 5, 6, 7, 8, 9],
    image: { palette: ['#1D5C8C', '#5FA8C9', '#F4EEDF'], motif: 'beach' },
    included: ['privateTransport', 'localGuide', 'water', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Essaouira, la cité des alizés',
        summary:
          'Deux jours sur la côte atlantique : médina fortifiée classée à l’UNESCO, port de pêche aux barques bleues, coopérative d’argan et longues plages venteuses.',
        description: [
          'Ancienne Mogador, Essaouira séduit par sa médina blanche aux volets bleus, ses remparts face à l’océan et son ambiance artistique décontractée. Les alizés en font un paradis pour le kitesurf.',
          'En chemin depuis Marrakech, vous visitez une coopérative féminine d’huile d’argan et apercevez les célèbres chèvres perchées dans les arganiers.',
        ],
        highlights: [
          'La Skala et ses canons face à l’océan',
          'Le port de pêche et ses barques bleues',
          'Une coopérative féminine d’argan',
          'Les galeries d’art de la médina',
        ],
        itinerary: [
          { title: 'Marrakech – Essaouira', description: 'Route à travers les arganiers, visite d’une coopérative d’argan, puis découverte guidée de la médina, de la Skala et du port.' },
          { title: 'Plages et retour', description: 'Matinée libre sur la plage ou initiation au kitesurf (en supplément), déjeuner de poisson grillé au port, puis retour à Marrakech.' },
        ],
        bestPeriod: 'D’avril à septembre',
      },
      en: {
        title: 'Essaouira, the windy city',
        summary:
          'Two days on the Atlantic coast: a UNESCO-listed fortified medina, a fishing port full of blue boats, an argan cooperative and long windswept beaches.',
        description: [
          'Formerly Mogador, Essaouira charms visitors with its white medina and blue shutters, its ramparts facing the ocean and its relaxed artistic vibe. The trade winds make it a kitesurfing paradise.',
          'On the way from Marrakech, you will visit a women’s argan oil cooperative and spot the famous goats perched in argan trees.',
        ],
        highlights: [
          'The Skala and its cannons facing the ocean',
          'The fishing port and its blue boats',
          'A women’s argan cooperative',
          'The medina’s art galleries',
        ],
        itinerary: [
          { title: 'Marrakech – Essaouira', description: 'Drive through argan forests, visit an argan cooperative, then a guided discovery of the medina, the Skala and the port.' },
          { title: 'Beaches and return', description: 'Free morning on the beach or kitesurf initiation (extra), grilled fish lunch at the port, then return to Marrakech.' },
        ],
        bestPeriod: 'April to September',
      },
      es: {
        title: 'Esauira, la ciudad de los alisios',
        summary:
          'Dos días en la costa atlántica: medina amurallada declarada Patrimonio de la UNESCO, puerto pesquero de barcas azules, cooperativa de argán y largas playas.',
        description: [
          'La antigua Mogador seduce con su medina blanca de contraventanas azules, sus murallas frente al océano y su ambiente artístico relajado. Los alisios la convierten en un paraíso del kitesurf.',
          'De camino desde Marrakech visitará una cooperativa femenina de aceite de argán y verá las famosas cabras subidas a los arganes.',
        ],
        highlights: [
          'La Skala y sus cañones frente al océano',
          'El puerto pesquero y sus barcas azules',
          'Una cooperativa femenina de argán',
          'Las galerías de arte de la medina',
        ],
        itinerary: [
          { title: 'Marrakech – Esauira', description: 'Ruta entre arganes, visita de una cooperativa de argán y descubrimiento guiado de la medina, la Skala y el puerto.' },
          { title: 'Playas y regreso', description: 'Mañana libre en la playa o iniciación al kitesurf (suplemento), almuerzo de pescado a la parrilla en el puerto y regreso a Marrakech.' },
        ],
        bestPeriod: 'De abril a septiembre',
      },
      de: {
        title: 'Essaouira, die Stadt der Passatwinde',
        summary:
          'Zwei Tage an der Atlantikküste: befestigte UNESCO-Medina, Fischerhafen mit blauen Booten, Arganöl-Kooperative und lange, windige Strände.',
        description: [
          'Das einstige Mogador begeistert mit seiner weißen Medina mit blauen Fensterläden, den Stadtmauern am Ozean und seiner entspannten Künstleratmosphäre. Die Passatwinde machen es zum Kitesurf-Paradies.',
          'Auf dem Weg von Marrakesch besuchen Sie eine Frauenkooperative für Arganöl und sehen die berühmten Ziegen in den Arganbäumen.',
        ],
        highlights: [
          'Die Skala mit ihren Kanonen am Meer',
          'Der Fischerhafen mit seinen blauen Booten',
          'Eine Arganöl-Frauenkooperative',
          'Die Kunstgalerien der Medina',
        ],
        itinerary: [
          { title: 'Marrakesch – Essaouira', description: 'Fahrt durch Arganwälder, Besuch einer Arganöl-Kooperative und geführte Entdeckung der Medina, der Skala und des Hafens.' },
          { title: 'Strände und Rückfahrt', description: 'Freier Vormittag am Strand oder Kitesurf-Schnupperkurs (gegen Aufpreis), Mittagessen mit gegrilltem Fisch am Hafen und Rückfahrt nach Marrakesch.' },
        ],
        bestPeriod: 'April bis September',
      },
      ar: {
        title: 'الصويرة، مدينة الرياح',
        summary:
          'يومان على الساحل الأطلسي: مدينة عتيقة محصنة مصنفة لدى اليونسكو، ميناء صيد بقوارب زرقاء، تعاونية للأركان وشواطئ طويلة تهب عليها الرياح.',
        description: [
          'تسحر الصويرة، موكادور قديماً، زوارها بمدينتها البيضاء ذات النوافذ الزرقاء وأسوارها المطلة على المحيط وأجوائها الفنية الهادئة. وتجعل منها الرياح التجارية جنة لركوب الأمواج الشراعي.',
          'في الطريق من مراكش تزور تعاونية نسائية لزيت الأركان وترى الماعز الشهير فوق أشجار الأركان.',
        ],
        highlights: [
          'السقالة ومدافعها المطلة على المحيط',
          'ميناء الصيد وقواربه الزرقاء',
          'تعاونية نسائية للأركان',
          'أروقة الفن في المدينة العتيقة',
        ],
        itinerary: [
          { title: 'مراكش – الصويرة', description: 'الطريق عبر غابات الأركان، زيارة تعاونية للأركان ثم اكتشاف المدينة العتيقة والسقالة والميناء مع مرشد.' },
          { title: 'الشواطئ والعودة', description: 'صباح حر على الشاطئ أو حصة تعريفية بركوب الأمواج الشراعي (بمقابل إضافي)، غداء سمك مشوي في الميناء ثم العودة إلى مراكش.' },
        ],
        bestPeriod: 'من أبريل إلى شتنبر',
      },
    },
  },

  {
    slug: 'agadir-taghazout',
    region: 'souss_massa',
    tripType: 'beach',
    difficulty: 'easy',
    durationDays: 3,
    priceAdult: 260,
    priceChild: 170,
    latitude: 30.545,
    longitude: -9.7089,
    featured: false,
    popularity: 84,
    bestMonths: [1, 2, 3, 4, 5, 9, 10, 11, 12],
    image: { palette: ['#0F7C8C', '#4FC1C9', '#FBE8C8'], motif: 'beach' },
    included: ['privateTransport', 'localGuide', 'surfLesson', 'water', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Agadir et Taghazout',
        summary:
          'Trois jours de soleil sur la côte du Souss : kasbah d’Agadir Oufella, village de surfeurs de Taghazout, cours de surf et Paradise Valley.',
        description: [
          'Avec plus de 300 jours de soleil par an, Agadir est la station balnéaire phare du Maroc. Quelques kilomètres plus au nord, Taghazout est devenu le rendez-vous des surfeurs du monde entier.',
          'Ce séjour mêle détente et nature : cours de surf avec moniteurs diplômés, baignade dans les piscines naturelles de Paradise Valley et coucher de soleil depuis la kasbah.',
        ],
        highlights: [
          'Cours de surf à Taghazout',
          'Les piscines naturelles de Paradise Valley',
          'La kasbah d’Agadir Oufella au coucher du soleil',
          'Le souk El Had, l’un des plus grands du pays',
        ],
        itinerary: [
          { title: 'Agadir', description: 'Visite du souk El Had, de la médina d’Agadir puis montée à la kasbah d’Agadir Oufella pour le coucher du soleil sur la baie.' },
          { title: 'Taghazout', description: 'Cours de surf de 2 heures avec matériel, après-midi libre dans le village de pêcheurs et ses cafés en bord de mer.' },
          { title: 'Paradise Valley', description: 'Excursion dans la vallée des palmiers, baignade dans les vasques naturelles puis retour à Agadir.' },
        ],
        bestPeriod: 'Toute l’année (houle idéale d’octobre à mars)',
      },
      en: {
        title: 'Agadir and Taghazout',
        summary:
          'Three sunny days on the Souss coast: Agadir Oufella kasbah, the surf village of Taghazout, a surf lesson and Paradise Valley.',
        description: [
          'With more than 300 days of sunshine a year, Agadir is Morocco’s leading seaside resort. A few kilometres north, Taghazout has become a meeting point for surfers from all over the world.',
          'This stay blends relaxation and nature: a surf lesson with qualified instructors, swimming in the natural pools of Paradise Valley and sunset from the kasbah.',
        ],
        highlights: [
          'Surf lesson in Taghazout',
          'The natural pools of Paradise Valley',
          'Agadir Oufella kasbah at sunset',
          'Souk El Had, one of the largest in the country',
        ],
        itinerary: [
          { title: 'Agadir', description: 'Visit Souk El Had and Agadir’s medina, then go up to Agadir Oufella kasbah for sunset over the bay.' },
          { title: 'Taghazout', description: 'Two-hour surf lesson with equipment, free afternoon in the fishing village and its seaside cafés.' },
          { title: 'Paradise Valley', description: 'Excursion into the palm valley, swimming in natural rock pools, then return to Agadir.' },
        ],
        bestPeriod: 'All year round (best swell October to March)',
      },
      es: {
        title: 'Agadir y Taghazout',
        summary:
          'Tres días de sol en la costa del Sus: alcazaba de Agadir Oufella, pueblo surfero de Taghazout, clase de surf y Paradise Valley.',
        description: [
          'Con más de 300 días de sol al año, Agadir es la principal estación balnearia de Marruecos. Unos kilómetros al norte, Taghazout se ha convertido en punto de encuentro de surfistas de todo el mundo.',
          'Esta estancia combina descanso y naturaleza: clase de surf con monitores titulados, baño en las piscinas naturales de Paradise Valley y atardecer desde la alcazaba.',
        ],
        highlights: [
          'Clase de surf en Taghazout',
          'Las piscinas naturales de Paradise Valley',
          'La alcazaba de Agadir Oufella al atardecer',
          'El zoco El Had, uno de los mayores del país',
        ],
        itinerary: [
          { title: 'Agadir', description: 'Visita del zoco El Had y de la medina de Agadir y subida a la alcazaba de Agadir Oufella para ver la puesta de sol sobre la bahía.' },
          { title: 'Taghazout', description: 'Clase de surf de 2 horas con material y tarde libre en el pueblo de pescadores y sus cafés frente al mar.' },
          { title: 'Paradise Valley', description: 'Excursión al valle de las palmeras, baño en las pozas naturales y regreso a Agadir.' },
        ],
        bestPeriod: 'Todo el año (mejor oleaje de octubre a marzo)',
      },
      de: {
        title: 'Agadir und Taghazout',
        summary:
          'Drei sonnige Tage an der Souss-Küste: Kasbah Agadir Oufella, das Surferdorf Taghazout, ein Surfkurs und das Paradise Valley.',
        description: [
          'Mit über 300 Sonnentagen im Jahr ist Agadir Marokkos wichtigster Badeort. Wenige Kilometer nördlich ist Taghazout zum Treffpunkt von Surfern aus aller Welt geworden.',
          'Dieser Aufenthalt verbindet Erholung und Natur: Surfkurs mit diplomierten Lehrern, Baden in den Naturbecken des Paradise Valley und Sonnenuntergang an der Kasbah.',
        ],
        highlights: [
          'Surfkurs in Taghazout',
          'Die Naturbecken des Paradise Valley',
          'Die Kasbah Agadir Oufella bei Sonnenuntergang',
          'Der Souk El Had, einer der größten des Landes',
        ],
        itinerary: [
          { title: 'Agadir', description: 'Besuch des Souk El Had und der Medina von Agadir, dann Aufstieg zur Kasbah Agadir Oufella zum Sonnenuntergang über der Bucht.' },
          { title: 'Taghazout', description: 'Zweistündiger Surfkurs inklusive Ausrüstung, freier Nachmittag im Fischerdorf und seinen Strandcafés.' },
          { title: 'Paradise Valley', description: 'Ausflug ins Palmental, Baden in natürlichen Felsbecken und Rückfahrt nach Agadir.' },
        ],
        bestPeriod: 'Ganzjährig (beste Wellen Oktober bis März)',
      },
      ar: {
        title: 'أكادير وتغازوت',
        summary:
          'ثلاثة أيام مشمسة على ساحل سوس: قصبة أكادير أوفلا، قرية ركوب الأمواج تغازوت، درس في ركوب الأمواج ووادي الجنة.',
        description: [
          'بأكثر من 300 يوم مشمس في السنة، تُعد أكادير أهم منتجع شاطئي في المغرب. وعلى بعد كيلومترات قليلة شمالاً، أصبحت تغازوت ملتقى لعشاق ركوب الأمواج من كل أنحاء العالم.',
          'تجمع هذه الإقامة بين الاسترخاء والطبيعة: درس في ركوب الأمواج مع مدربين معتمدين، السباحة في الأحواض الطبيعية لوادي الجنة وغروب الشمس من القصبة.',
        ],
        highlights: [
          'درس ركوب الأمواج في تغازوت',
          'الأحواض الطبيعية في وادي الجنة',
          'قصبة أكادير أوفلا عند الغروب',
          'سوق الأحد، من أكبر أسواق البلاد',
        ],
        itinerary: [
          { title: 'أكادير', description: 'زيارة سوق الأحد ومدينة أكادير، ثم الصعود إلى قصبة أكادير أوفلا لمشاهدة الغروب على الخليج.' },
          { title: 'تغازوت', description: 'درس ركوب الأمواج لمدة ساعتين مع المعدات، وبعد الظهر حر في قرية الصيادين ومقاهيها على البحر.' },
          { title: 'وادي الجنة', description: 'رحلة إلى وادي النخيل، السباحة في الأحواض الصخرية الطبيعية ثم العودة إلى أكادير.' },
        ],
        bestPeriod: 'طوال السنة (أفضل الأمواج من أكتوبر إلى مارس)',
      },
    },
  },

  {
    slug: 'casablanca',
    region: 'casablanca_settat',
    tripType: 'culture',
    difficulty: 'easy',
    durationDays: 1,
    priceAdult: 90,
    priceChild: 60,
    latitude: 33.6084,
    longitude: -7.6325,
    featured: false,
    popularity: 75,
    bestMonths: [3, 4, 5, 6, 9, 10, 11],
    image: { palette: ['#2741A8', '#6B8BD6', '#F2F2EE'], motif: 'imperial' },
    included: ['privateTransport', 'localGuide', 'entranceFees', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Casablanca, la ville blanche',
        summary:
          'Une journée dans la capitale économique : mosquée Hassan II, architecture Art déco, quartier des Habous et corniche d’Aïn Diab.',
        description: [
          'Métropole moderne et cosmopolite, Casablanca cache un patrimoine architectural exceptionnel : immeubles Art déco des années 1930, quartier néo-mauresque des Habous et l’impressionnante mosquée Hassan II construite sur l’océan.',
          'Idéale à l’arrivée ou au départ de votre voyage, cette journée vous fait découvrir une autre facette du Maroc, dynamique et ouverte sur le monde.',
        ],
        highlights: [
          'Visite intérieure de la mosquée Hassan II',
          'Le centre-ville Art déco',
          'Le quartier des Habous et ses librairies',
          'La corniche d’Aïn Diab',
        ],
        itinerary: [
          { title: 'Casablanca en une journée', description: 'Visite guidée de la mosquée Hassan II, balade Art déco autour de la place Mohammed V, quartier des Habous et pause sur la corniche au coucher du soleil.' },
        ],
        bestPeriod: 'Toute l’année',
      },
      en: {
        title: 'Casablanca, the white city',
        summary:
          'One day in the economic capital: Hassan II Mosque, Art Deco architecture, the Habous quarter and the Ain Diab corniche.',
        description: [
          'A modern and cosmopolitan metropolis, Casablanca hides an exceptional architectural heritage: 1930s Art Deco buildings, the neo-Moorish Habous district and the impressive Hassan II Mosque built over the ocean.',
          'Ideal at the start or end of your trip, this day shows you another side of Morocco: dynamic and open to the world.',
        ],
        highlights: [
          'Guided visit inside the Hassan II Mosque',
          'The Art Deco city centre',
          'The Habous quarter and its bookshops',
          'The Ain Diab corniche',
        ],
        itinerary: [
          { title: 'Casablanca in a day', description: 'Guided tour of the Hassan II Mosque, Art Deco walk around Mohammed V Square, the Habous quarter and a break on the corniche at sunset.' },
        ],
        bestPeriod: 'All year round',
      },
      es: {
        title: 'Casablanca, la ciudad blanca',
        summary:
          'Un día en la capital económica: mezquita Hassan II, arquitectura art déco, barrio de los Habous y paseo marítimo de Aïn Diab.',
        description: [
          'Metrópolis moderna y cosmopolita, Casablanca esconde un patrimonio arquitectónico excepcional: edificios art déco de los años 30, el barrio neomorisco de los Habous y la impresionante mezquita Hassan II construida sobre el océano.',
          'Ideal al llegar o al marcharse, esta jornada le descubre otra cara de Marruecos, dinámica y abierta al mundo.',
        ],
        highlights: [
          'Visita al interior de la mezquita Hassan II',
          'El centro art déco',
          'El barrio de los Habous y sus librerías',
          'El paseo marítimo de Aïn Diab',
        ],
        itinerary: [
          { title: 'Casablanca en un día', description: 'Visita guiada de la mezquita Hassan II, paseo art déco por la plaza Mohammed V, barrio de los Habous y pausa en el paseo marítimo al atardecer.' },
        ],
        bestPeriod: 'Todo el año',
      },
      de: {
        title: 'Casablanca, die weiße Stadt',
        summary:
          'Ein Tag in der Wirtschaftsmetropole: Hassan-II.-Moschee, Art-déco-Architektur, das Habous-Viertel und die Corniche von Aïn Diab.',
        description: [
          'Die moderne, kosmopolitische Metropole Casablanca birgt ein außergewöhnliches architektonisches Erbe: Art-déco-Bauten der 1930er-Jahre, das neomaurische Habous-Viertel und die beeindruckende, über dem Ozean errichtete Hassan-II.-Moschee.',
          'Ideal zu Beginn oder am Ende Ihrer Reise zeigt Ihnen dieser Tag eine andere Seite Marokkos – dynamisch und weltoffen.',
        ],
        highlights: [
          'Innenbesichtigung der Hassan-II.-Moschee',
          'Das Art-déco-Stadtzentrum',
          'Das Habous-Viertel und seine Buchläden',
          'Die Corniche von Aïn Diab',
        ],
        itinerary: [
          { title: 'Casablanca an einem Tag', description: 'Führung durch die Hassan-II.-Moschee, Art-déco-Spaziergang rund um den Platz Mohammed V, Habous-Viertel und Pause an der Corniche bei Sonnenuntergang.' },
        ],
        bestPeriod: 'Ganzjährig',
      },
      ar: {
        title: 'الدار البيضاء، المدينة البيضاء',
        summary:
          'يوم في العاصمة الاقتصادية: مسجد الحسن الثاني، عمارة آرت ديكو، حي الحبوس وكورنيش عين الذئاب.',
        description: [
          'تخفي الدار البيضاء، المدينة العصرية المنفتحة، تراثاً معمارياً استثنائياً: عمارات آرت ديكو من ثلاثينيات القرن الماضي، حي الحبوس ذو الطابع المغربي الأندلسي، ومسجد الحسن الثاني المهيب المشيد فوق المحيط.',
          'هذا اليوم مثالي في بداية رحلتك أو نهايتها، ويكشف لك وجهاً آخر للمغرب: حيوياً ومنفتحاً على العالم.',
        ],
        highlights: [
          'زيارة داخلية لمسجد الحسن الثاني',
          'وسط المدينة بطراز آرت ديكو',
          'حي الحبوس ومكتباته',
          'كورنيش عين الذئاب',
        ],
        itinerary: [
          { title: 'الدار البيضاء في يوم واحد', description: 'زيارة مسجد الحسن الثاني مع مرشد، جولة آرت ديكو حول ساحة محمد الخامس، حي الحبوس واستراحة على الكورنيش عند الغروب.' },
        ],
        bestPeriod: 'طوال السنة',
      },
    },
  },

  {
    slug: 'rabat',
    region: 'rabat_sale_kenitra',
    tripType: 'imperial_city',
    difficulty: 'easy',
    durationDays: 1,
    priceAdult: 95,
    priceChild: 60,
    latitude: 34.0242,
    longitude: -6.8229,
    featured: false,
    popularity: 72,
    bestMonths: [3, 4, 5, 6, 9, 10],
    image: { palette: ['#3A6B4F', '#C9A227', '#F5EEDC'], motif: 'imperial' },
    included: ['privateTransport', 'localGuide', 'entranceFees', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Rabat, capitale impériale',
        summary:
          'Une journée dans la capitale du royaume : kasbah des Oudayas, tour Hassan, mausolée Mohammed V et nécropole du Chellah.',
        description: [
          'Élégante et verdoyante, Rabat est inscrite au patrimoine mondial de l’UNESCO pour son héritage à la fois historique et moderne. Ses monuments racontent douze siècles d’histoire marocaine.',
          'La kasbah des Oudayas, avec ses ruelles blanches et bleues et son jardin andalou, offre une vue imprenable sur l’embouchure du Bouregreg et l’océan.',
        ],
        highlights: [
          'La kasbah des Oudayas et son jardin andalou',
          'La tour Hassan et le mausolée Mohammed V',
          'La nécropole du Chellah et ses cigognes',
          'La médina et la rue des Consuls',
        ],
        itinerary: [
          { title: 'Rabat en une journée', description: 'Mausolée Mohammed V et tour Hassan, kasbah des Oudayas, déjeuner libre dans la médina, puis visite du site antique et médiéval du Chellah.' },
        ],
        bestPeriod: 'Printemps et automne',
      },
      en: {
        title: 'Rabat, the imperial capital',
        summary:
          'One day in the kingdom’s capital: the Kasbah of the Udayas, Hassan Tower, the Mausoleum of Mohammed V and the Chellah necropolis.',
        description: [
          'Elegant and green, Rabat is a UNESCO World Heritage Site for its historic and modern heritage. Its monuments tell twelve centuries of Moroccan history.',
          'The Kasbah of the Udayas, with its blue and white alleys and Andalusian garden, offers a breathtaking view over the mouth of the Bouregreg and the ocean.',
        ],
        highlights: [
          'The Kasbah of the Udayas and its Andalusian garden',
          'Hassan Tower and the Mausoleum of Mohammed V',
          'The Chellah necropolis and its storks',
          'The medina and Rue des Consuls',
        ],
        itinerary: [
          { title: 'Rabat in a day', description: 'Mausoleum of Mohammed V and Hassan Tower, Kasbah of the Udayas, free lunch in the medina, then visit the ancient and medieval site of Chellah.' },
        ],
        bestPeriod: 'Spring and autumn',
      },
      es: {
        title: 'Rabat, capital imperial',
        summary:
          'Un día en la capital del reino: alcazaba de los Oudayas, torre Hassan, mausoleo de Mohammed V y necrópolis de Chellah.',
        description: [
          'Elegante y verde, Rabat es Patrimonio Mundial de la UNESCO por su herencia histórica y moderna. Sus monumentos cuentan doce siglos de historia marroquí.',
          'La alcazaba de los Oudayas, con sus callejuelas blancas y azules y su jardín andalusí, ofrece una vista impresionante sobre la desembocadura del Bou Regreg y el océano.',
        ],
        highlights: [
          'La alcazaba de los Oudayas y su jardín andalusí',
          'La torre Hassan y el mausoleo de Mohammed V',
          'La necrópolis de Chellah y sus cigüeñas',
          'La medina y la calle de los Cónsules',
        ],
        itinerary: [
          { title: 'Rabat en un día', description: 'Mausoleo de Mohammed V y torre Hassan, alcazaba de los Oudayas, almuerzo libre en la medina y visita del sitio antiguo y medieval de Chellah.' },
        ],
        bestPeriod: 'Primavera y otoño',
      },
      de: {
        title: 'Rabat, die Königsstadt',
        summary:
          'Ein Tag in der Hauptstadt des Königreichs: Kasbah der Oudaya, Hassan-Turm, Mausoleum Mohammed V. und die Nekropole Chellah.',
        description: [
          'Das elegante, grüne Rabat gehört dank seines historischen und modernen Erbes zum UNESCO-Weltkulturerbe. Seine Monumente erzählen zwölf Jahrhunderte marokkanischer Geschichte.',
          'Die Kasbah der Oudaya mit ihren weiß-blauen Gassen und dem andalusischen Garten bietet einen herrlichen Blick auf die Mündung des Bou Regreg und den Ozean.',
        ],
        highlights: [
          'Die Kasbah der Oudaya und ihr andalusischer Garten',
          'Hassan-Turm und Mausoleum Mohammed V.',
          'Die Nekropole Chellah mit ihren Störchen',
          'Die Medina und die Rue des Consuls',
        ],
        itinerary: [
          { title: 'Rabat an einem Tag', description: 'Mausoleum Mohammed V. und Hassan-Turm, Kasbah der Oudaya, freies Mittagessen in der Medina und Besuch der antiken und mittelalterlichen Stätte Chellah.' },
        ],
        bestPeriod: 'Frühling und Herbst',
      },
      ar: {
        title: 'الرباط، العاصمة الإمبراطورية',
        summary:
          'يوم في عاصمة المملكة: قصبة الأوداية، صومعة حسان، ضريح محمد الخامس وموقع شالة الأثري.',
        description: [
          'الرباط مدينة أنيقة وخضراء، مصنفة تراثاً عالمياً لدى اليونسكو بفضل إرثها التاريخي والحديث. وتروي معالمها اثني عشر قرناً من تاريخ المغرب.',
          'تقدم قصبة الأوداية، بأزقتها البيضاء والزرقاء وحديقتها الأندلسية، إطلالة رائعة على مصب أبي رقراق والمحيط.',
        ],
        highlights: [
          'قصبة الأوداية وحديقتها الأندلسية',
          'صومعة حسان وضريح محمد الخامس',
          'موقع شالة ولقالقه',
          'المدينة العتيقة وشارع القناصل',
        ],
        itinerary: [
          { title: 'الرباط في يوم واحد', description: 'ضريح محمد الخامس وصومعة حسان، قصبة الأوداية، غداء حر في المدينة العتيقة ثم زيارة موقع شالة الأثري.' },
        ],
        bestPeriod: 'الربيع والخريف',
      },
    },
  },

  {
    slug: 'tanger-asilah',
    region: 'tanger_tetouan_al_hoceima',
    tripType: 'culture',
    difficulty: 'easy',
    durationDays: 2,
    priceAdult: 200,
    priceChild: 130,
    latitude: 35.7595,
    longitude: -5.834,
    featured: false,
    popularity: 78,
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    image: { palette: ['#25507A', '#E0A458', '#F7F3EA'], motif: 'beach' },
    included: ['privateTransport', 'localGuide', 'entranceFees', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Tanger et Asilah',
        summary:
          'Deux jours entre Méditerranée et Atlantique : kasbah de Tanger, grottes d’Hercule, cap Spartel et fresques de la médina d’Asilah.',
        description: [
          'Carrefour entre l’Europe et l’Afrique, Tanger a inspiré écrivains et peintres. Sa kasbah domine le détroit de Gibraltar, et par temps clair on aperçoit les côtes espagnoles.',
          'À 45 minutes au sud, Asilah est une petite médina blanche au bord de l’océan, célèbre pour ses fresques murales réalisées chaque été lors de son festival culturel.',
        ],
        highlights: [
          'La kasbah et le musée de Tanger',
          'Les grottes d’Hercule et le cap Spartel',
          'Les fresques de la médina d’Asilah',
          'Le coucher de soleil sur l’Atlantique',
        ],
        itinerary: [
          { title: 'Tanger', description: 'Médina et kasbah, café Hafa face au détroit, puis cap Spartel et grottes d’Hercule à la rencontre de l’Atlantique et de la Méditerranée.' },
          { title: 'Asilah', description: 'Route côtière vers Asilah, balade parmi les ruelles et les fresques, déjeuner de poisson libre puis coucher de soleil sur les remparts.' },
        ],
        bestPeriod: 'D’avril à octobre',
      },
      en: {
        title: 'Tangier and Asilah',
        summary:
          'Two days between the Mediterranean and the Atlantic: Tangier kasbah, the Caves of Hercules, Cape Spartel and the murals of Asilah’s medina.',
        description: [
          'A crossroads between Europe and Africa, Tangier has inspired writers and painters. Its kasbah overlooks the Strait of Gibraltar, and on a clear day you can see the Spanish coast.',
          'Forty-five minutes south, Asilah is a small white medina by the ocean, famous for the murals painted every summer during its cultural festival.',
        ],
        highlights: [
          'Tangier kasbah and museum',
          'The Caves of Hercules and Cape Spartel',
          'The murals of Asilah’s medina',
          'Sunset over the Atlantic',
        ],
        itinerary: [
          { title: 'Tangier', description: 'Medina and kasbah, Café Hafa overlooking the strait, then Cape Spartel and the Caves of Hercules, where the Atlantic meets the Mediterranean.' },
          { title: 'Asilah', description: 'Coastal road to Asilah, a stroll among the alleys and murals, free seafood lunch, then sunset on the ramparts.' },
        ],
        bestPeriod: 'April to October',
      },
      es: {
        title: 'Tánger y Arcila',
        summary:
          'Dos días entre el Mediterráneo y el Atlántico: alcazaba de Tánger, cuevas de Hércules, cabo Espartel y murales de la medina de Arcila.',
        description: [
          'Encrucijada entre Europa y África, Tánger ha inspirado a escritores y pintores. Su alcazaba domina el estrecho de Gibraltar y, en días despejados, se divisa la costa española.',
          'A 45 minutos al sur, Arcila es una pequeña medina blanca junto al océano, famosa por los murales que se pintan cada verano durante su festival cultural.',
        ],
        highlights: [
          'La alcazaba y el museo de Tánger',
          'Las cuevas de Hércules y el cabo Espartel',
          'Los murales de la medina de Arcila',
          'La puesta de sol sobre el Atlántico',
        ],
        itinerary: [
          { title: 'Tánger', description: 'Medina y alcazaba, café Hafa frente al estrecho, y después cabo Espartel y cuevas de Hércules, donde se unen el Atlántico y el Mediterráneo.' },
          { title: 'Arcila', description: 'Carretera costera hasta Arcila, paseo entre callejuelas y murales, almuerzo libre de pescado y atardecer desde las murallas.' },
        ],
        bestPeriod: 'De abril a octubre',
      },
      de: {
        title: 'Tanger und Asilah',
        summary:
          'Zwei Tage zwischen Mittelmeer und Atlantik: Kasbah von Tanger, Herkulesgrotten, Kap Spartel und die Wandbilder der Medina von Asilah.',
        description: [
          'Tanger, Schnittpunkt zwischen Europa und Afrika, hat Schriftsteller und Maler inspiriert. Die Kasbah überblickt die Straße von Gibraltar – bei klarer Sicht sieht man die spanische Küste.',
          '45 Minuten südlich liegt Asilah, eine kleine weiße Medina am Ozean, berühmt für die Wandmalereien, die jeden Sommer während des Kulturfestivals entstehen.',
        ],
        highlights: [
          'Kasbah und Museum von Tanger',
          'Herkulesgrotten und Kap Spartel',
          'Die Wandbilder der Medina von Asilah',
          'Sonnenuntergang über dem Atlantik',
        ],
        itinerary: [
          { title: 'Tanger', description: 'Medina und Kasbah, Café Hafa mit Blick auf die Meerenge, dann Kap Spartel und Herkulesgrotten, wo Atlantik und Mittelmeer sich treffen.' },
          { title: 'Asilah', description: 'Küstenstraße nach Asilah, Spaziergang durch Gassen und Wandbilder, freies Fischessen und Sonnenuntergang auf der Stadtmauer.' },
        ],
        bestPeriod: 'April bis Oktober',
      },
      ar: {
        title: 'طنجة وأصيلة',
        summary:
          'يومان بين المتوسط والأطلسي: قصبة طنجة، مغارة هرقل، رأس سبارطيل وجداريات مدينة أصيلة العتيقة.',
        description: [
          'طنجة ملتقى أوروبا وإفريقيا، وقد ألهمت الكتّاب والرسامين. تطل قصبتها على مضيق جبل طارق، وفي الأيام الصافية تُرى السواحل الإسبانية.',
          'على بعد 45 دقيقة جنوباً تقع أصيلة، مدينة عتيقة صغيرة بيضاء على المحيط، تشتهر بجدارياتها التي تُرسم كل صيف خلال مهرجانها الثقافي.',
        ],
        highlights: [
          'قصبة طنجة ومتحفها',
          'مغارة هرقل ورأس سبارطيل',
          'جداريات مدينة أصيلة العتيقة',
          'غروب الشمس على الأطلسي',
        ],
        itinerary: [
          { title: 'طنجة', description: 'المدينة العتيقة والقصبة، مقهى الحافة المطل على المضيق، ثم رأس سبارطيل ومغارة هرقل حيث يلتقي الأطلسي بالمتوسط.' },
          { title: 'أصيلة', description: 'الطريق الساحلي نحو أصيلة، جولة بين الأزقة والجداريات، غداء سمك حر ثم الغروب من أعلى الأسوار.' },
        ],
        bestPeriod: 'من أبريل إلى أكتوبر',
      },
    },
  },

  {
    slug: 'atlas-imlil-toubkal-ouzoud',
    region: 'marrakech_safi',
    tripType: 'mountain',
    difficulty: 'challenging',
    durationDays: 3,
    priceAdult: 320,
    priceChild: 210,
    latitude: 31.137,
    longitude: -7.919,
    featured: true,
    popularity: 87,
    bestMonths: [4, 5, 6, 9, 10],
    image: { palette: ['#3B5D3A', '#8BAA6B', '#E9EFE0'], motif: 'mountain' },
    included: ['privateTransport', 'mountainGuide', 'muleSupport', 'mountainLodge', 'boatTrip', 'assistance'],
    excluded: ['flights', 'accommodation', 'drinks', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Haut Atlas : Imlil, Toubkal et Ouzoud',
        summary:
          'Trois jours de nature : villages berbères d’Imlil, randonnée vers le refuge du Toubkal, plus haut sommet d’Afrique du Nord, et cascades d’Ouzoud.',
        description: [
          'À seulement 1 h 30 de Marrakech, la vallée d’Imlil est le point de départ des randonnées vers le Toubkal (4 167 m). Vergers en terrasses, villages de pisé et sentiers muletiers composent un décor grandiose.',
          'Après deux jours de marche accompagnés d’un guide de montagne et d’un muletier, vous rejoignez les cascades d’Ouzoud, hautes de 110 mètres, peuplées de singes magots.',
        ],
        highlights: [
          'Randonnée dans la vallée d’Imlil',
          'Nuit en gîte au pied du Toubkal',
          'Les cascades d’Ouzoud (110 m)',
          'Rencontre avec les singes magots',
        ],
        itinerary: [
          { title: 'Marrakech – Imlil', description: 'Route vers Asni et Imlil, randonnée de 4 heures à travers les villages berbères d’Aroumd et le col de Tizi n’Mzik.', overnight: 'Gîte à Imlil', meals: 'Dîner' },
          { title: 'Vers le refuge du Toubkal', description: 'Montée de 5 à 6 heures par le sanctuaire de Sidi Chamharouch jusqu’au refuge (3 207 m), puis redescente vers Imlil.', meals: 'Petit-déjeuner' },
          { title: 'Cascades d’Ouzoud', description: 'Route vers Ouzoud, descente au pied des cascades, balade en barque puis retour à Marrakech en fin de journée.' },
        ],
        bestPeriod: 'D’avril à juin et de septembre à octobre',
      },
      en: {
        title: 'High Atlas: Imlil, Toubkal and Ouzoud',
        summary:
          'Three days in nature: the Berber villages of Imlil, a trek towards the Toubkal refuge below North Africa’s highest peak, and the Ouzoud waterfalls.',
        description: [
          'Only 90 minutes from Marrakech, the Imlil valley is the starting point for treks to Toubkal (4,167 m). Terraced orchards, mud-brick villages and mule trails create a magnificent setting.',
          'After two days of trekking with a mountain guide and a muleteer, you reach the 110-metre Ouzoud waterfalls, home to Barbary macaques.',
        ],
        highlights: [
          'Trek in the Imlil valley',
          'Night in a lodge at the foot of Toubkal',
          'The Ouzoud waterfalls (110 m)',
          'Meeting Barbary macaques',
        ],
        itinerary: [
          { title: 'Marrakech – Imlil', description: 'Drive to Asni and Imlil, 4-hour hike through the Berber villages of Aroumd and the Tizi n’Mzik pass.', overnight: 'Lodge in Imlil', meals: 'Dinner' },
          { title: 'Towards the Toubkal refuge', description: '5 to 6-hour climb past the Sidi Chamharouch shrine to the refuge (3,207 m), then descent back to Imlil.', meals: 'Breakfast' },
          { title: 'Ouzoud waterfalls', description: 'Drive to Ouzoud, walk down to the foot of the falls, boat ride, then return to Marrakech in the evening.' },
        ],
        bestPeriod: 'April to June and September to October',
      },
      es: {
        title: 'Alto Atlas: Imlil, Toubkal y Ouzoud',
        summary:
          'Tres días de naturaleza: pueblos bereberes de Imlil, trekking hacia el refugio del Toubkal, la cima más alta del norte de África, y cascadas de Ouzoud.',
        description: [
          'A solo hora y media de Marrakech, el valle de Imlil es el punto de partida de los trekkings hacia el Toubkal (4.167 m). Huertos en terrazas, aldeas de adobe y caminos de mulas forman un escenario grandioso.',
          'Tras dos días de caminata con un guía de montaña y un arriero, llegará a las cascadas de Ouzoud, de 110 metros de altura, habitadas por monos de Berbería.',
        ],
        highlights: [
          'Caminata por el valle de Imlil',
          'Noche en refugio al pie del Toubkal',
          'Las cascadas de Ouzoud (110 m)',
          'Encuentro con los monos de Berbería',
        ],
        itinerary: [
          { title: 'Marrakech – Imlil', description: 'Ruta hacia Asni e Imlil, caminata de 4 horas por las aldeas bereberes de Aroumd y el collado de Tizi n’Mzik.', overnight: 'Refugio en Imlil', meals: 'Cena' },
          { title: 'Hacia el refugio del Toubkal', description: 'Subida de 5 a 6 horas por el santuario de Sidi Chamharouch hasta el refugio (3.207 m) y bajada a Imlil.', meals: 'Desayuno' },
          { title: 'Cascadas de Ouzoud', description: 'Ruta hacia Ouzoud, bajada al pie de las cascadas, paseo en barca y regreso a Marrakech al final del día.' },
        ],
        bestPeriod: 'De abril a junio y de septiembre a octubre',
      },
      de: {
        title: 'Hoher Atlas: Imlil, Toubkal und Ouzoud',
        summary:
          'Drei Tage Natur pur: Berberdörfer von Imlil, Trekking zur Toubkal-Hütte unterhalb des höchsten Gipfels Nordafrikas und die Wasserfälle von Ouzoud.',
        description: [
          'Nur 90 Minuten von Marrakesch entfernt ist das Imlil-Tal Ausgangspunkt der Touren zum Toubkal (4.167 m). Terrassengärten, Lehmdörfer und Maultierpfade bilden eine grandiose Kulisse.',
          'Nach zwei Wandertagen mit Bergführer und Maultiertreiber erreichen Sie die 110 Meter hohen Wasserfälle von Ouzoud, Heimat der Berberaffen.',
        ],
        highlights: [
          'Wanderung im Imlil-Tal',
          'Übernachtung in einer Berghütte am Fuß des Toubkal',
          'Die Wasserfälle von Ouzoud (110 m)',
          'Begegnung mit Berberaffen',
        ],
        itinerary: [
          { title: 'Marrakesch – Imlil', description: 'Fahrt nach Asni und Imlil, vierstündige Wanderung durch die Berberdörfer von Aroumd und über den Pass Tizi n’Mzik.', overnight: 'Berghütte in Imlil', meals: 'Abendessen' },
          { title: 'Zur Toubkal-Hütte', description: 'Fünf- bis sechsstündiger Aufstieg vorbei am Heiligtum Sidi Chamharouch bis zur Hütte (3.207 m) und Abstieg nach Imlil.', meals: 'Frühstück' },
          { title: 'Wasserfälle von Ouzoud', description: 'Fahrt nach Ouzoud, Abstieg zum Fuß der Wasserfälle, Bootsfahrt und Rückkehr nach Marrakesch am Abend.' },
        ],
        bestPeriod: 'April bis Juni und September bis Oktober',
      },
      ar: {
        title: 'الأطلس الكبير: إمليل وتوبقال وأوزود',
        summary:
          'ثلاثة أيام في أحضان الطبيعة: قرى إمليل الأمازيغية، رحلة مشي نحو ملجأ توبقال أعلى قمة في شمال إفريقيا، وشلالات أوزود.',
        description: [
          'على بعد ساعة ونصف فقط من مراكش، يُعد وادي إمليل نقطة انطلاق رحلات المشي نحو توبقال (4167 م). بساتين مدرجة وقرى من الطين ومسالك البغال ترسم مشهداً مهيباً.',
          'بعد يومين من المشي برفقة مرشد جبلي وصاحب بغال، تصل إلى شلالات أوزود التي يبلغ ارتفاعها 110 أمتار وتعيش فيها قردة المكاك.',
        ],
        highlights: [
          'المشي في وادي إمليل',
          'ليلة في مأوى عند سفح توبقال',
          'شلالات أوزود (110 م)',
          'لقاء مع قردة المكاك',
        ],
        itinerary: [
          { title: 'مراكش – إمليل', description: 'الطريق نحو أسني وإمليل، مشي لمدة 4 ساعات عبر قرى أرومد الأمازيغية وممر تيزي نمزيك.', overnight: 'مأوى في إمليل', meals: 'العشاء' },
          { title: 'نحو ملجأ توبقال', description: 'صعود لمدة 5 إلى 6 ساعات مروراً بضريح سيدي شمهروش حتى الملجأ (3207 م)، ثم النزول إلى إمليل.', meals: 'الفطور' },
          { title: 'شلالات أوزود', description: 'الطريق نحو أوزود، النزول إلى أسفل الشلالات، جولة بالقارب ثم العودة إلى مراكش مساءً.' },
        ],
        bestPeriod: 'من أبريل إلى يونيو ومن شتنبر إلى أكتوبر',
      },
    },
  },
];
