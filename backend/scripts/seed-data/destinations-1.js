/** Destinations 1/2 : Marrakech, Fès, Chefchaouen, Merzouga, Ouarzazate & Aït Ben Haddou, Todra & Dadès. */

module.exports = [
  {
    slug: 'marrakech',
    region: 'marrakech_safi',
    tripType: 'imperial_city',
    difficulty: 'easy',
    durationDays: 3,
    priceAdult: 290,
    priceChild: 190,
    latitude: 31.6295,
    longitude: -7.9811,
    featured: true,
    popularity: 98,
    bestMonths: [3, 4, 5, 10, 11],
    image: { palette: ['#C2552D', '#E8A35B', '#F6D7A7'], motif: 'imperial' },
    included: ['privateTransport', 'localGuide', 'entranceFees', 'cookingClass', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Marrakech, la ville ocre',
        summary:
          'Trois jours pour vivre Marrakech intensément : souks, palais, jardin Majorelle, place Jemaa el-Fna et atelier de cuisine chez l’habitant.',
        description: [
          'Marrakech envoûte dès le premier regard : remparts couleur ocre, ruelles parfumées d’épices et effervescence de la place Jemaa el-Fna à la tombée de la nuit. Notre guide, né dans la médina, vous ouvre les portes de ses adresses préférées.',
          'Entre palais somptueux, jardins secrets et artisans passionnés, ce circuit privé allie incontournables et moments authentiques, avec un atelier de cuisine pour repartir avec les secrets du tajine.',
        ],
        highlights: [
          'Le jardin Majorelle et son bleu iconique',
          'Le palais de la Bahia et les tombeaux saadiens',
          'Les souks des teinturiers et des dinandiers',
          'Atelier de cuisine marocaine dans un riad',
        ],
        itinerary: [
          { title: 'Médina et palais', description: 'Visite de la mosquée Koutoubia, du palais de la Bahia et des tombeaux saadiens, puis découverte des souks avant le spectacle de Jemaa el-Fna au coucher du soleil.' },
          { title: 'Jardins et Guéliz', description: 'Matinée au jardin Majorelle et au musée Yves Saint Laurent, déjeuner libre dans le quartier de Guéliz puis après-midi dans la palmeraie.', meals: 'Petit-déjeuner' },
          { title: 'Atelier de cuisine', description: 'Marché aux épices avec un chef, préparation d’un tajine et d’une pastilla dans un riad, puis dégustation sur la terrasse.', meals: 'Déjeuner' },
        ],
        bestPeriod: 'De mars à mai et d’octobre à novembre',
      },
      en: {
        title: 'Marrakech, the Red City',
        summary:
          'Three days to experience Marrakech to the full: souks, palaces, the Majorelle Garden, Jemaa el-Fna square and a cooking class with locals.',
        description: [
          'Marrakech casts its spell at first sight: ochre ramparts, spice-scented alleys and the buzz of Jemaa el-Fna square at nightfall. Our guide, born in the medina, opens the doors to his favourite places.',
          'Between sumptuous palaces, secret gardens and passionate craftsmen, this private tour combines must-sees with authentic moments, including a cooking class to learn the secrets of tagine.',
        ],
        highlights: [
          'The Majorelle Garden and its iconic blue',
          'Bahia Palace and the Saadian Tombs',
          'The dyers’ and coppersmiths’ souks',
          'Moroccan cooking class in a riad',
        ],
        itinerary: [
          { title: 'Medina and palaces', description: 'Visit the Koutoubia Mosque, Bahia Palace and the Saadian Tombs, then explore the souks before the Jemaa el-Fna show at sunset.' },
          { title: 'Gardens and Gueliz', description: 'Morning at the Majorelle Garden and Yves Saint Laurent Museum, free lunch in Gueliz, then an afternoon in the palm grove.', meals: 'Breakfast' },
          { title: 'Cooking class', description: 'Spice market tour with a chef, preparation of a tagine and a pastilla in a riad, followed by a tasting on the rooftop terrace.', meals: 'Lunch' },
        ],
        bestPeriod: 'March to May and October to November',
      },
      es: {
        title: 'Marrakech, la ciudad ocre',
        summary:
          'Tres días para vivir Marrakech intensamente: zocos, palacios, jardín Majorelle, plaza Jemaa el-Fna y taller de cocina con una familia local.',
        description: [
          'Marrakech hechiza desde la primera mirada: murallas ocres, callejuelas perfumadas de especias y el bullicio de la plaza Jemaa el-Fna al caer la noche. Nuestro guía, nacido en la medina, le abre las puertas de sus rincones favoritos.',
          'Entre palacios suntuosos, jardines secretos y artesanos apasionados, este circuito privado combina lugares imprescindibles y momentos auténticos, con un taller de cocina para descubrir los secretos del tajín.',
        ],
        highlights: [
          'El jardín Majorelle y su azul icónico',
          'El palacio de la Bahía y las tumbas saadíes',
          'Los zocos de tintoreros y caldereros',
          'Taller de cocina marroquí en un riad',
        ],
        itinerary: [
          { title: 'Medina y palacios', description: 'Visita de la mezquita Kutubía, el palacio de la Bahía y las tumbas saadíes; después, los zocos y el espectáculo de Jemaa el-Fna al atardecer.' },
          { title: 'Jardines y Gueliz', description: 'Mañana en el jardín Majorelle y el museo Yves Saint Laurent, almuerzo libre en Gueliz y tarde en el palmeral.', meals: 'Desayuno' },
          { title: 'Taller de cocina', description: 'Mercado de especias con un chef, preparación de un tajín y una pastela en un riad y degustación en la terraza.', meals: 'Almuerzo' },
        ],
        bestPeriod: 'De marzo a mayo y de octubre a noviembre',
      },
      de: {
        title: 'Marrakesch, die rote Stadt',
        summary:
          'Drei Tage Marrakesch intensiv erleben: Souks, Paläste, Jardin Majorelle, der Platz Djemaa el-Fna und ein Kochkurs bei Einheimischen.',
        description: [
          'Marrakesch verzaubert auf den ersten Blick: ockerfarbene Stadtmauern, nach Gewürzen duftende Gassen und das Treiben auf dem Platz Djemaa el-Fna bei Einbruch der Nacht. Unser in der Medina geborener Guide zeigt Ihnen seine Lieblingsorte.',
          'Zwischen prächtigen Palästen, verborgenen Gärten und leidenschaftlichen Handwerkern verbindet diese Privatreise Höhepunkte mit authentischen Momenten – inklusive Kochkurs, um die Geheimnisse der Tajine zu lernen.',
        ],
        highlights: [
          'Der Jardin Majorelle mit seinem berühmten Blau',
          'Bahia-Palast und Saadier-Gräber',
          'Die Souks der Färber und Kupferschmiede',
          'Marokkanischer Kochkurs in einem Riad',
        ],
        itinerary: [
          { title: 'Medina und Paläste', description: 'Besuch der Koutoubia-Moschee, des Bahia-Palasts und der Saadier-Gräber, danach Bummel durch die Souks bis zum Spektakel auf dem Djemaa el-Fna bei Sonnenuntergang.' },
          { title: 'Gärten und Gueliz', description: 'Vormittag im Jardin Majorelle und im Yves-Saint-Laurent-Museum, freies Mittagessen in Gueliz und Nachmittag im Palmenhain.', meals: 'Frühstück' },
          { title: 'Kochkurs', description: 'Gewürzmarkt mit einem Koch, Zubereitung einer Tajine und einer Pastilla in einem Riad, anschließend Verkostung auf der Dachterrasse.', meals: 'Mittagessen' },
        ],
        bestPeriod: 'März bis Mai und Oktober bis November',
      },
      ar: {
        title: 'مراكش، المدينة الحمراء',
        summary:
          'ثلاثة أيام لعيش مراكش بكل تفاصيلها: الأسواق، القصور، حديقة ماجوريل، ساحة جامع الفنا وورشة طبخ مع عائلة محلية.',
        description: [
          'تأسرك مراكش من النظرة الأولى: أسوار بلون المغرة، أزقة تفوح منها رائحة التوابل، وحيوية ساحة جامع الفنا عند حلول المساء. يفتح لك مرشدنا، ابن المدينة العتيقة، أبواب أماكنه المفضلة.',
          'بين القصور الفخمة والحدائق الخفية والحرفيين الشغوفين، تجمع هذه الجولة الخاصة بين المعالم الأساسية واللحظات الأصيلة، مع ورشة طبخ لاكتشاف أسرار الطاجين.',
        ],
        highlights: [
          'حديقة ماجوريل بلونها الأزرق الشهير',
          'قصر الباهية وقبور السعديين',
          'أسواق الصباغين والنحاسين',
          'ورشة طبخ مغربي في رياض',
        ],
        itinerary: [
          { title: 'المدينة العتيقة والقصور', description: 'زيارة مسجد الكتبية وقصر الباهية وقبور السعديين، ثم التجول في الأسواق قبل عروض ساحة جامع الفنا عند الغروب.' },
          { title: 'الحدائق وحي جليز', description: 'صباح في حديقة ماجوريل ومتحف إيف سان لوران، غداء حر في جليز، ثم بعد الظهر في واحة النخيل.', meals: 'الفطور' },
          { title: 'ورشة الطبخ', description: 'جولة في سوق التوابل مع طاهٍ، إعداد طاجين وبسطيلة في رياض، ثم تذوقها على السطح.', meals: 'الغداء' },
        ],
        bestPeriod: 'من مارس إلى ماي ومن أكتوبر إلى نونبر',
      },
    },
  },

  {
    slug: 'fes',
    region: 'fes_meknes',
    tripType: 'imperial_city',
    difficulty: 'easy',
    durationDays: 2,
    priceAdult: 210,
    priceChild: 140,
    latitude: 34.0631,
    longitude: -4.9736,
    featured: true,
    popularity: 90,
    bestMonths: [3, 4, 5, 9, 10, 11],
    image: { palette: ['#1F6E5A', '#C9A227', '#F3E3BF'], motif: 'imperial' },
    included: ['privateTransport', 'localGuide', 'entranceFees', 'traditionalLunch', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Fès, capitale spirituelle',
        summary:
          'Deux jours dans la plus grande médina piétonne du monde : medersas, tanneries Chouara, artisans et vue panoramique depuis les tombeaux mérinides.',
        description: [
          'Fondée au IXe siècle, Fès el-Bali est un labyrinthe vivant de plus de 9 000 ruelles classé au patrimoine mondial de l’UNESCO. Ici, les ânes portent encore les marchandises et les artisans travaillent comme il y a des siècles.',
          'Avec notre guide officiel, vous découvrez les trésors cachés de la médina sans jamais vous perdre : medersas sculptées, fontaines en zellige, tanneries millénaires et ateliers de céramique.',
        ],
        highlights: [
          'La medersa Bou Inania et la médersa Attarine',
          'Les tanneries Chouara vues des terrasses',
          'La porte Bab Boujloud et ses zelliges bleus',
          'Le panorama depuis les tombeaux mérinides',
        ],
        itinerary: [
          { title: 'Médina de Fès el-Bali', description: 'Entrée par Bab Boujloud, visite des medersas, de la fontaine Nejjarine et de l’université Al Quaraouiyine (extérieur), déjeuner traditionnel puis tanneries Chouara.', meals: 'Déjeuner' },
          { title: 'Fès el-Jdid et artisans', description: 'Palais royal et son portail doré, quartier juif du Mellah, atelier de céramique et coucher de soleil sur la ville depuis les tombeaux mérinides.' },
        ],
        bestPeriod: 'Printemps et automne',
      },
      en: {
        title: 'Fes, the spiritual capital',
        summary:
          'Two days in the world’s largest car-free medina: madrasas, Chouara tanneries, craftsmen and a panoramic view from the Merinid Tombs.',
        description: [
          'Founded in the 9th century, Fes el-Bali is a living maze of more than 9,000 alleys, listed as a UNESCO World Heritage Site. Donkeys still carry goods here, and craftsmen work just as they did centuries ago.',
          'With our licensed guide you will discover the medina’s hidden treasures without ever getting lost: carved madrasas, zellige fountains, ancient tanneries and pottery workshops.',
        ],
        highlights: [
          'Bou Inania and Attarine madrasas',
          'Chouara tanneries seen from the terraces',
          'Bab Boujloud gate and its blue tiles',
          'Panorama from the Merinid Tombs',
        ],
        itinerary: [
          { title: 'Fes el-Bali medina', description: 'Enter through Bab Boujloud, visit the madrasas, Nejjarine fountain and Al Quaraouiyine university (exterior), traditional lunch, then the Chouara tanneries.', meals: 'Lunch' },
          { title: 'Fes el-Jdid and craftsmen', description: 'Royal Palace and its golden gates, the Jewish quarter of the Mellah, a pottery workshop and sunset over the city from the Merinid Tombs.' },
        ],
        bestPeriod: 'Spring and autumn',
      },
      es: {
        title: 'Fez, capital espiritual',
        summary:
          'Dos días en la medina peatonal más grande del mundo: madrazas, curtidurías Chouara, artesanos y vista panorámica desde las tumbas meriníes.',
        description: [
          'Fundada en el siglo IX, Fez el-Bali es un laberinto vivo de más de 9.000 callejuelas, declarado Patrimonio Mundial por la UNESCO. Aquí los burros todavía transportan las mercancías y los artesanos trabajan como hace siglos.',
          'Con nuestro guía oficial descubrirá los tesoros ocultos de la medina sin perderse: madrazas talladas, fuentes de zellige, curtidurías milenarias y talleres de cerámica.',
        ],
        highlights: [
          'Las madrazas Bou Inania y Attarine',
          'Las curtidurías Chouara desde las terrazas',
          'La puerta Bab Boujloud y sus azulejos azules',
          'El panorama desde las tumbas meriníes',
        ],
        itinerary: [
          { title: 'Medina de Fez el-Bali', description: 'Entrada por Bab Boujloud, visita de las madrazas, la fuente Nejjarine y la universidad Al Qarawiyyin (exterior), almuerzo tradicional y curtidurías Chouara.', meals: 'Almuerzo' },
          { title: 'Fez el-Jdid y artesanos', description: 'Palacio real y sus puertas doradas, barrio judío del Mellah, taller de cerámica y puesta de sol desde las tumbas meriníes.' },
        ],
        bestPeriod: 'Primavera y otoño',
      },
      de: {
        title: 'Fès, die spirituelle Hauptstadt',
        summary:
          'Zwei Tage in der größten autofreien Medina der Welt: Medersen, Gerbereien Chouara, Handwerker und Panoramablick von den Meriniden-Gräbern.',
        description: [
          'Fès el-Bali wurde im 9. Jahrhundert gegründet und ist ein lebendiges Labyrinth aus über 9.000 Gassen – UNESCO-Weltkulturerbe. Hier tragen noch Esel die Waren, und Handwerker arbeiten wie vor Jahrhunderten.',
          'Mit unserem offiziellen Guide entdecken Sie die verborgenen Schätze der Medina, ohne sich zu verlaufen: verzierte Medersen, Zellige-Brunnen, uralte Gerbereien und Töpferwerkstätten.',
        ],
        highlights: [
          'Die Medersen Bou Inania und Attarine',
          'Die Gerbereien Chouara von den Terrassen aus',
          'Das Tor Bab Boujloud mit seinen blauen Fliesen',
          'Panoramablick von den Meriniden-Gräbern',
        ],
        itinerary: [
          { title: 'Medina Fès el-Bali', description: 'Eintritt durch Bab Boujloud, Besuch der Medersen, des Nejjarine-Brunnens und der Universität Al Quaraouiyine (außen), traditionelles Mittagessen und Gerbereien Chouara.', meals: 'Mittagessen' },
          { title: 'Fès el-Jdid und Handwerk', description: 'Königspalast mit goldenen Toren, jüdisches Viertel Mellah, Töpferwerkstatt und Sonnenuntergang über der Stadt von den Meriniden-Gräbern.' },
        ],
        bestPeriod: 'Frühling und Herbst',
      },
      ar: {
        title: 'فاس، العاصمة الروحية',
        summary:
          'يومان في أكبر مدينة عتيقة خالية من السيارات في العالم: المدارس العتيقة، دباغة شوارة، الحرفيون وإطلالة بانورامية من قبور المرينيين.',
        description: [
          'تأسست فاس البالي في القرن التاسع، وهي متاهة حية تضم أكثر من 9000 زقاق ومصنفة تراثاً عالمياً لدى اليونسكو. ما زالت الحمير تنقل البضائع هنا، وما زال الحرفيون يعملون كما قبل قرون.',
          'برفقة مرشدنا المعتمد تكتشف كنوز المدينة الخفية دون أن تضيع: مدارس منقوشة، نافورات من الزليج، دباغات عريقة وورشات للخزف.',
        ],
        highlights: [
          'المدرسة البوعنانية ومدرسة العطارين',
          'دباغة شوارة من أعلى السطوح',
          'باب بوجلود وزليجه الأزرق',
          'الإطلالة من قبور المرينيين',
        ],
        itinerary: [
          { title: 'مدينة فاس البالي', description: 'الدخول من باب بوجلود، زيارة المدارس ونافورة النجارين وجامعة القرويين (من الخارج)، غداء تقليدي ثم دباغة شوارة.', meals: 'الغداء' },
          { title: 'فاس الجديد والحرفيون', description: 'القصر الملكي وأبوابه الذهبية، حي الملاح، ورشة خزف وغروب الشمس على المدينة من قبور المرينيين.' },
        ],
        bestPeriod: 'الربيع والخريف',
      },
    },
  },

  {
    slug: 'chefchaouen',
    region: 'tanger_tetouan_al_hoceima',
    tripType: 'culture',
    difficulty: 'easy',
    durationDays: 2,
    priceAdult: 190,
    priceChild: 120,
    latitude: 35.1688,
    longitude: -5.2636,
    featured: true,
    popularity: 92,
    bestMonths: [4, 5, 6, 9, 10],
    image: { palette: ['#2E6FD8', '#7FB3F0', '#E6F0FB'], motif: 'culture' },
    included: ['privateTransport', 'localGuide', 'water', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Chefchaouen, la perle bleue',
        summary:
          'Deux jours dans le village bleu du Rif : ruelles azur, place Outa el-Hammam, cascades d’Akchour et coucher de soleil depuis la mosquée espagnole.',
        description: [
          'Nichée au pied des montagnes du Rif, Chefchaouen est un enchantement de murs bleus et de portes fleuries. Le rythme y est paisible, l’air pur et l’accueil chaleureux.',
          'Ce circuit vous laisse le temps de flâner, de photographier chaque recoin et de partir en randonnée facile vers le pont de Dieu, dans le parc national de Talassemtane.',
        ],
        highlights: [
          'La médina entièrement peinte en bleu',
          'La kasbah et la place Outa el-Hammam',
          'Le coucher de soleil depuis la mosquée espagnole',
          'Randonnée vers les cascades d’Akchour',
        ],
        itinerary: [
          { title: 'La médina bleue', description: 'Promenade guidée dans les ruelles, visite de la kasbah et de son jardin andalou, puis montée à la mosquée espagnole pour le coucher du soleil.' },
          { title: 'Cascades d’Akchour', description: 'Randonnée facile de 3 heures le long de la rivière jusqu’aux cascades et au pont de Dieu, pique-nique libre au bord de l’eau.' },
        ],
        bestPeriod: 'D’avril à juin et en septembre-octobre',
      },
      en: {
        title: 'Chefchaouen, the blue pearl',
        summary:
          'Two days in the blue village of the Rif: azure alleys, Outa el-Hammam square, Akchour waterfalls and sunset from the Spanish Mosque.',
        description: [
          'Nestled at the foot of the Rif Mountains, Chefchaouen is an enchanting world of blue walls and flower-filled doorways. Life moves gently, the air is pure and the welcome is warm.',
          'This tour gives you time to wander, photograph every corner and enjoy an easy hike to God’s Bridge in Talassemtane National Park.',
        ],
        highlights: [
          'The medina painted entirely in blue',
          'The kasbah and Outa el-Hammam square',
          'Sunset from the Spanish Mosque',
          'Hike to the Akchour waterfalls',
        ],
        itinerary: [
          { title: 'The blue medina', description: 'Guided walk through the alleys, visit of the kasbah and its Andalusian garden, then climb to the Spanish Mosque for sunset.' },
          { title: 'Akchour waterfalls', description: 'Easy 3-hour hike along the river to the waterfalls and God’s Bridge, with a free picnic by the water.' },
        ],
        bestPeriod: 'April to June and September–October',
      },
      es: {
        title: 'Chefchaouen, la perla azul',
        summary:
          'Dos días en el pueblo azul del Rif: callejuelas celestes, plaza Outa el-Hammam, cascadas de Akchour y puesta de sol desde la mezquita española.',
        description: [
          'Situada a los pies de las montañas del Rif, Chefchaouen es un encanto de muros azules y puertas floridas. El ritmo es tranquilo, el aire puro y la acogida cálida.',
          'Este circuito le deja tiempo para pasear, fotografiar cada rincón y hacer una caminata sencilla hasta el puente de Dios, en el parque nacional de Talassemtane.',
        ],
        highlights: [
          'La medina pintada completamente de azul',
          'La alcazaba y la plaza Outa el-Hammam',
          'La puesta de sol desde la mezquita española',
          'Caminata hasta las cascadas de Akchour',
        ],
        itinerary: [
          { title: 'La medina azul', description: 'Paseo guiado por las callejuelas, visita de la alcazaba y su jardín andalusí y subida a la mezquita española para el atardecer.' },
          { title: 'Cascadas de Akchour', description: 'Caminata fácil de 3 horas junto al río hasta las cascadas y el puente de Dios, con picnic libre junto al agua.' },
        ],
        bestPeriod: 'De abril a junio y en septiembre-octubre',
      },
      de: {
        title: 'Chefchaouen, die blaue Perle',
        summary:
          'Zwei Tage im blauen Dorf des Rif: himmelblaue Gassen, Platz Outa el-Hammam, Wasserfälle von Akchour und Sonnenuntergang an der Spanischen Moschee.',
        description: [
          'Am Fuße des Rifgebirges gelegen, verzaubert Chefchaouen mit blauen Mauern und blumengeschmückten Türen. Das Leben ist ruhig, die Luft klar und die Gastfreundschaft herzlich.',
          'Diese Reise lässt Ihnen Zeit zum Schlendern, Fotografieren und für eine leichte Wanderung zur Gottesbrücke im Nationalpark Talassemtane.',
        ],
        highlights: [
          'Die komplett blau gestrichene Medina',
          'Die Kasbah und der Platz Outa el-Hammam',
          'Sonnenuntergang an der Spanischen Moschee',
          'Wanderung zu den Wasserfällen von Akchour',
        ],
        itinerary: [
          { title: 'Die blaue Medina', description: 'Geführter Spaziergang durch die Gassen, Besuch der Kasbah mit ihrem andalusischen Garten und Aufstieg zur Spanischen Moschee zum Sonnenuntergang.' },
          { title: 'Wasserfälle von Akchour', description: 'Leichte dreistündige Wanderung am Fluss entlang zu den Wasserfällen und zur Gottesbrücke, freies Picknick am Wasser.' },
        ],
        bestPeriod: 'April bis Juni sowie September–Oktober',
      },
      ar: {
        title: 'شفشاون، اللؤلؤة الزرقاء',
        summary:
          'يومان في القرية الزرقاء بجبال الريف: أزقة بلون السماء، ساحة وطاء الحمام، شلالات أقشور وغروب الشمس من المسجد الإسباني.',
        description: [
          'تقع شفشاون عند سفح جبال الريف، وتسحرك بجدرانها الزرقاء وأبوابها المزينة بالورود. الحياة فيها هادئة والهواء نقي والضيافة دافئة.',
          'تمنحك هذه الجولة الوقت للتجول وتصوير كل زاوية، والقيام بنزهة سهلة نحو قنطرة ربي في المنتزه الوطني تلسمطان.',
        ],
        highlights: [
          'المدينة العتيقة المطلية كلها بالأزرق',
          'القصبة وساحة وطاء الحمام',
          'غروب الشمس من المسجد الإسباني',
          'نزهة إلى شلالات أقشور',
        ],
        itinerary: [
          { title: 'المدينة الزرقاء', description: 'جولة مع مرشد في الأزقة، زيارة القصبة وحديقتها الأندلسية، ثم الصعود إلى المسجد الإسباني لمشاهدة الغروب.' },
          { title: 'شلالات أقشور', description: 'نزهة سهلة لمدة 3 ساعات على ضفاف الوادي حتى الشلالات وقنطرة ربي، مع نزهة غداء حرة بجانب الماء.' },
        ],
        bestPeriod: 'من أبريل إلى يونيو وفي شتنبر وأكتوبر',
      },
    },
  },

  {
    slug: 'merzouga',
    region: 'draa_tafilalet',
    tripType: 'desert',
    difficulty: 'moderate',
    durationDays: 3,
    priceAdult: 380,
    priceChild: 250,
    latitude: 31.0994,
    longitude: -4.0129,
    featured: true,
    popularity: 99,
    bestMonths: [1, 2, 3, 4, 10, 11, 12],
    image: { palette: ['#D9783A', '#F2B263', '#FBE3B8'], motif: 'desert' },
    included: ['privateTransport', 'desertCamp', 'camelRide', 'water', 'assistance'],
    excluded: ['flights', 'accommodation', 'drinks', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Merzouga et les dunes de l’Erg Chebbi',
        summary:
          'L’aventure saharienne par excellence : traversée de l’Atlas, dromadaires au coucher du soleil, nuit sous les étoiles en bivouac berbère et lever de soleil sur les dunes.',
        description: [
          'Les dunes de l’Erg Chebbi s’élèvent jusqu’à 150 mètres et changent de couleur à chaque heure du jour, de l’or au rouge flamboyant. Au départ de Marrakech, la route traverse le Haut Atlas, les kasbahs et les palmeraies du sud.',
          'Le soir, une caravane de dromadaires vous conduit à notre bivouac au cœur des dunes : dîner berbère, musique gnaoua autour du feu et un ciel étoilé inoubliable.',
        ],
        highlights: [
          'Balade à dos de dromadaire au coucher du soleil',
          'Nuit en bivouac berbère au cœur des dunes',
          'Lever de soleil sur l’Erg Chebbi',
          'Les gorges du Todra et la vallée du Ziz',
        ],
        itinerary: [
          { title: 'Marrakech – Vallée du Dadès', description: 'Traversée du col du Tizi n’Tichka (2 260 m), arrêt à Aït Ben Haddou puis route des mille kasbahs jusqu’à la vallée du Dadès.' },
          { title: 'Gorges du Todra – Merzouga', description: 'Promenade dans les gorges du Todra, traversée de la vallée du Ziz puis balade à dos de dromadaire jusqu’au bivouac pour le coucher du soleil.', overnight: 'Bivouac dans l’Erg Chebbi', meals: 'Dîner' },
          { title: 'Merzouga – Marrakech', description: 'Lever de soleil sur les dunes, petit-déjeuner au camp puis retour vers Marrakech par Alnif et Ouarzazate.', meals: 'Petit-déjeuner' },
        ],
        bestPeriod: 'D’octobre à avril',
      },
      en: {
        title: 'Merzouga and the Erg Chebbi dunes',
        summary:
          'The ultimate Sahara adventure: crossing the Atlas, camels at sunset, a night under the stars in a Berber camp and sunrise over the dunes.',
        description: [
          'The Erg Chebbi dunes rise up to 150 metres and change colour with every hour of the day, from gold to blazing red. Leaving Marrakech, the road crosses the High Atlas, kasbahs and the palm groves of the south.',
          'In the evening, a camel caravan takes you to our camp in the heart of the dunes: Berber dinner, Gnawa music around the fire and an unforgettable starry sky.',
        ],
        highlights: [
          'Camel ride at sunset',
          'Night in a Berber camp in the dunes',
          'Sunrise over Erg Chebbi',
          'Todra Gorge and the Ziz Valley',
        ],
        itinerary: [
          { title: 'Marrakech – Dades Valley', description: 'Cross the Tizi n’Tichka pass (2,260 m), stop at Ait Ben Haddou, then follow the road of a thousand kasbahs to the Dades Valley.' },
          { title: 'Todra Gorge – Merzouga', description: 'Walk through the Todra Gorge, drive across the Ziz Valley, then ride a camel to the camp in time for sunset.', overnight: 'Camp in Erg Chebbi', meals: 'Dinner' },
          { title: 'Merzouga – Marrakech', description: 'Sunrise over the dunes, breakfast at the camp, then return to Marrakech via Alnif and Ouarzazate.', meals: 'Breakfast' },
        ],
        bestPeriod: 'October to April',
      },
      es: {
        title: 'Merzouga y las dunas del Erg Chebbi',
        summary:
          'La aventura sahariana por excelencia: travesía del Atlas, dromedarios al atardecer, noche bajo las estrellas en campamento bereber y amanecer sobre las dunas.',
        description: [
          'Las dunas del Erg Chebbi alcanzan los 150 metros y cambian de color a cada hora del día, del dorado al rojo intenso. Desde Marrakech, la ruta cruza el Alto Atlas, las kasbahs y los palmerales del sur.',
          'Al atardecer, una caravana de dromedarios le lleva a nuestro campamento en el corazón de las dunas: cena bereber, música gnawa alrededor del fuego y un cielo estrellado inolvidable.',
        ],
        highlights: [
          'Paseo en dromedario al atardecer',
          'Noche en campamento bereber entre las dunas',
          'Amanecer sobre el Erg Chebbi',
          'Gargantas del Todra y valle del Ziz',
        ],
        itinerary: [
          { title: 'Marrakech – Valle del Dadès', description: 'Travesía del puerto de Tizi n’Tichka (2.260 m), parada en Aït Ben Haddou y ruta de las mil kasbahs hasta el valle del Dadès.' },
          { title: 'Gargantas del Todra – Merzouga', description: 'Paseo por las gargantas del Todra, travesía del valle del Ziz y paseo en dromedario hasta el campamento para ver la puesta de sol.', overnight: 'Campamento en el Erg Chebbi', meals: 'Cena' },
          { title: 'Merzouga – Marrakech', description: 'Amanecer sobre las dunas, desayuno en el campamento y regreso a Marrakech por Alnif y Ouarzazate.', meals: 'Desayuno' },
        ],
        bestPeriod: 'De octubre a abril',
      },
      de: {
        title: 'Merzouga und die Dünen des Erg Chebbi',
        summary:
          'Das Sahara-Abenteuer schlechthin: Fahrt über den Atlas, Kamelritt bei Sonnenuntergang, Nacht unter Sternen im Berberzelt und Sonnenaufgang über den Dünen.',
        description: [
          'Die Dünen des Erg Chebbi ragen bis zu 150 Meter empor und wechseln stündlich ihre Farbe – von Gold bis Glutrot. Von Marrakesch aus führt die Route über den Hohen Atlas, vorbei an Kasbahs und Palmenoasen des Südens.',
          'Am Abend bringt Sie eine Kamelkarawane zu unserem Camp mitten in den Dünen: Berber-Abendessen, Gnawa-Musik am Lagerfeuer und ein unvergesslicher Sternenhimmel.',
        ],
        highlights: [
          'Kamelritt bei Sonnenuntergang',
          'Übernachtung im Berbercamp in den Dünen',
          'Sonnenaufgang über dem Erg Chebbi',
          'Todra-Schlucht und Ziz-Tal',
        ],
        itinerary: [
          { title: 'Marrakesch – Dadès-Tal', description: 'Über den Tizi-n’Tichka-Pass (2.260 m), Halt in Aït Ben Haddou und weiter auf der Straße der tausend Kasbahs bis ins Dadès-Tal.' },
          { title: 'Todra-Schlucht – Merzouga', description: 'Spaziergang durch die Todra-Schlucht, Fahrt durch das Ziz-Tal und Kamelritt zum Camp pünktlich zum Sonnenuntergang.', overnight: 'Camp im Erg Chebbi', meals: 'Abendessen' },
          { title: 'Merzouga – Marrakesch', description: 'Sonnenaufgang über den Dünen, Frühstück im Camp und Rückfahrt nach Marrakesch über Alnif und Ouarzazate.', meals: 'Frühstück' },
        ],
        bestPeriod: 'Oktober bis April',
      },
      ar: {
        title: 'مرزوكة وكثبان عرق الشبي',
        summary:
          'المغامرة الصحراوية بامتياز: عبور الأطلس، ركوب الجمال عند الغروب، ليلة تحت النجوم في مخيم أمازيغي وشروق الشمس على الكثبان.',
        description: [
          'يصل ارتفاع كثبان عرق الشبي إلى 150 متراً، ويتغير لونها مع كل ساعة من النهار من الذهبي إلى الأحمر المتوهج. انطلاقاً من مراكش، يعبر الطريق الأطلس الكبير والقصبات وواحات الجنوب.',
          'في المساء، تقودك قافلة من الجمال إلى مخيمنا في قلب الكثبان: عشاء أمازيغي، موسيقى كناوة حول النار وسماء مرصعة بالنجوم لا تُنسى.',
        ],
        highlights: [
          'جولة على ظهر الجمل عند الغروب',
          'ليلة في مخيم أمازيغي وسط الكثبان',
          'شروق الشمس على عرق الشبي',
          'مضايق تودغى ووادي زيز',
        ],
        itinerary: [
          { title: 'مراكش – وادي دادس', description: 'عبور ممر تيزي نتيشكا (2260 م)، توقف في آيت بن حدو ثم طريق ألف قصبة حتى وادي دادس.' },
          { title: 'مضايق تودغى – مرزوكة', description: 'جولة في مضايق تودغى، عبور وادي زيز ثم ركوب الجمال حتى المخيم في وقت الغروب.', overnight: 'مخيم في عرق الشبي', meals: 'العشاء' },
          { title: 'مرزوكة – مراكش', description: 'شروق الشمس على الكثبان، الفطور في المخيم ثم العودة إلى مراكش عبر ألنيف وورزازات.', meals: 'الفطور' },
        ],
        bestPeriod: 'من أكتوبر إلى أبريل',
      },
    },
  },

  {
    slug: 'ouarzazate-ait-ben-haddou',
    region: 'draa_tafilalet',
    tripType: 'culture',
    difficulty: 'easy',
    durationDays: 2,
    priceAdult: 240,
    priceChild: 160,
    latitude: 31.047,
    longitude: -7.1319,
    featured: false,
    popularity: 85,
    bestMonths: [3, 4, 5, 9, 10, 11],
    image: { palette: ['#B5532F', '#D98E5B', '#F1D2A9'], motif: 'culture' },
    included: ['privateTransport', 'localGuide', 'entranceFees', 'water', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Ouarzazate et Aït Ben Haddou',
        summary:
          'Deux jours sur la route des kasbahs : ksar d’Aït Ben Haddou classé à l’UNESCO, studios de cinéma d’Ouarzazate et kasbah de Taourirt.',
        description: [
          'Surnommée la « porte du désert », Ouarzazate est aussi le Hollywood marocain : de nombreux films et séries y ont été tournés. Le ksar d’Aït Ben Haddou, village fortifié en terre crue, est l’un des plus beaux du pays.',
          'Ce circuit traverse le Haut Atlas par le spectaculaire col du Tizi n’Tichka et vous fait découvrir l’architecture de terre du sud marocain, entre oasis et montagnes.',
        ],
        highlights: [
          'Le ksar d’Aït Ben Haddou (UNESCO)',
          'Le col du Tizi n’Tichka à 2 260 m',
          'La kasbah de Taourirt',
          'Les studios de cinéma Atlas',
        ],
        itinerary: [
          { title: 'Marrakech – Aït Ben Haddou', description: 'Route du Tizi n’Tichka, visite de la kasbah de Telouet puis découverte du ksar d’Aït Ben Haddou au coucher du soleil.' },
          { title: 'Ouarzazate – Marrakech', description: 'Visite de la kasbah de Taourirt et des studios Atlas, déjeuner libre puis retour à Marrakech en fin de journée.' },
        ],
        bestPeriod: 'Printemps et automne',
      },
      en: {
        title: 'Ouarzazate and Ait Ben Haddou',
        summary:
          'Two days on the road of the kasbahs: the UNESCO-listed ksar of Ait Ben Haddou, Ouarzazate’s film studios and the Taourirt kasbah.',
        description: [
          'Known as the “gateway to the desert”, Ouarzazate is also Morocco’s Hollywood, where many films and series have been shot. The ksar of Ait Ben Haddou, a fortified mud-brick village, is one of the most beautiful in the country.',
          'This tour crosses the High Atlas via the spectacular Tizi n’Tichka pass and introduces you to the earthen architecture of southern Morocco, between oases and mountains.',
        ],
        highlights: [
          'The ksar of Ait Ben Haddou (UNESCO)',
          'The Tizi n’Tichka pass at 2,260 m',
          'Taourirt kasbah',
          'Atlas film studios',
        ],
        itinerary: [
          { title: 'Marrakech – Ait Ben Haddou', description: 'Drive over the Tizi n’Tichka pass, visit the Telouet kasbah, then discover the ksar of Ait Ben Haddou at sunset.' },
          { title: 'Ouarzazate – Marrakech', description: 'Visit the Taourirt kasbah and Atlas studios, free lunch, then return to Marrakech in the late afternoon.' },
        ],
        bestPeriod: 'Spring and autumn',
      },
      es: {
        title: 'Ouarzazate y Aït Ben Haddou',
        summary:
          'Dos días por la ruta de las kasbahs: el ksar de Aït Ben Haddou, Patrimonio de la UNESCO, los estudios de cine de Ouarzazate y la kasbah de Taourirt.',
        description: [
          'Conocida como la «puerta del desierto», Ouarzazate es también el Hollywood marroquí, escenario de numerosas películas y series. El ksar de Aït Ben Haddou, pueblo fortificado de adobe, es uno de los más bellos del país.',
          'Este circuito cruza el Alto Atlas por el espectacular puerto de Tizi n’Tichka y le descubre la arquitectura de tierra del sur marroquí, entre oasis y montañas.',
        ],
        highlights: [
          'El ksar de Aït Ben Haddou (UNESCO)',
          'El puerto de Tizi n’Tichka a 2.260 m',
          'La kasbah de Taourirt',
          'Los estudios de cine Atlas',
        ],
        itinerary: [
          { title: 'Marrakech – Aït Ben Haddou', description: 'Ruta del Tizi n’Tichka, visita de la kasbah de Telouet y descubrimiento del ksar de Aït Ben Haddou al atardecer.' },
          { title: 'Ouarzazate – Marrakech', description: 'Visita de la kasbah de Taourirt y de los estudios Atlas, almuerzo libre y regreso a Marrakech al final del día.' },
        ],
        bestPeriod: 'Primavera y otoño',
      },
      de: {
        title: 'Ouarzazate und Aït Ben Haddou',
        summary:
          'Zwei Tage auf der Straße der Kasbahs: der UNESCO-Ksar Aït Ben Haddou, die Filmstudios von Ouarzazate und die Kasbah Taourirt.',
        description: [
          'Ouarzazate, das „Tor zur Wüste“, ist auch Marokkos Hollywood – zahlreiche Filme und Serien wurden hier gedreht. Der Ksar Aït Ben Haddou, ein befestigtes Lehmdorf, gehört zu den schönsten des Landes.',
          'Die Reise führt über den spektakulären Tizi-n’Tichka-Pass durch den Hohen Atlas und zeigt Ihnen die Lehmarchitektur des marokkanischen Südens zwischen Oasen und Bergen.',
        ],
        highlights: [
          'Der Ksar Aït Ben Haddou (UNESCO)',
          'Der Tizi-n’Tichka-Pass auf 2.260 m',
          'Die Kasbah Taourirt',
          'Die Atlas-Filmstudios',
        ],
        itinerary: [
          { title: 'Marrakesch – Aït Ben Haddou', description: 'Fahrt über den Tizi n’Tichka, Besuch der Kasbah Telouet und Entdeckung des Ksar Aït Ben Haddou bei Sonnenuntergang.' },
          { title: 'Ouarzazate – Marrakesch', description: 'Besuch der Kasbah Taourirt und der Atlas-Studios, freies Mittagessen und Rückkehr nach Marrakesch am späten Nachmittag.' },
        ],
        bestPeriod: 'Frühling und Herbst',
      },
      ar: {
        title: 'ورزازات وآيت بن حدو',
        summary:
          'يومان على طريق القصبات: قصر آيت بن حدو المصنف لدى اليونسكو، استوديوهات السينما في ورزازات وقصبة تاوريرت.',
        description: [
          'تُلقب ورزازات بـ«بوابة الصحراء»، وهي أيضاً هوليوود المغرب حيث صُورت أفلام ومسلسلات عديدة. ويُعد قصر آيت بن حدو، القرية المحصنة المبنية بالطين، من أجمل القصور في البلاد.',
          'تعبر هذه الجولة الأطلس الكبير عبر ممر تيزي نتيشكا المذهل، وتعرفك على العمارة الطينية في الجنوب المغربي بين الواحات والجبال.',
        ],
        highlights: [
          'قصر آيت بن حدو (اليونسكو)',
          'ممر تيزي نتيشكا على ارتفاع 2260 م',
          'قصبة تاوريرت',
          'استوديوهات أطلس السينمائية',
        ],
        itinerary: [
          { title: 'مراكش – آيت بن حدو', description: 'طريق تيزي نتيشكا، زيارة قصبة تلوات ثم اكتشاف قصر آيت بن حدو عند الغروب.' },
          { title: 'ورزازات – مراكش', description: 'زيارة قصبة تاوريرت واستوديوهات أطلس، غداء حر ثم العودة إلى مراكش في آخر النهار.' },
        ],
        bestPeriod: 'الربيع والخريف',
      },
    },
  },

  {
    slug: 'todra-dades',
    region: 'draa_tafilalet',
    tripType: 'mountain',
    difficulty: 'moderate',
    durationDays: 2,
    priceAdult: 220,
    priceChild: 150,
    latitude: 31.5876,
    longitude: -5.5917,
    featured: false,
    popularity: 80,
    bestMonths: [3, 4, 5, 9, 10, 11],
    image: { palette: ['#8E3B2A', '#C9744A', '#EBC39A'], motif: 'mountain' },
    included: ['privateTransport', 'localGuide', 'traditionalLunch', 'water', 'assistance'],
    excluded: ['flights', 'accommodation', 'otherMeals', 'tips', 'insurance'],
    i18n: {
      fr: {
        title: 'Gorges du Todra et vallée du Dadès',
        summary:
          'Deux jours entre canyons vertigineux et vallée des roses : falaises de 300 mètres, lacets du Dadès, villages berbères et randonnée dans les gorges.',
        description: [
          'Les gorges du Todra offrent l’un des paysages les plus spectaculaires du Maroc : un étroit canyon aux parois de 300 mètres où coule une rivière limpide. Toute proche, la vallée du Dadès déroule ses kasbahs et ses formations rocheuses étonnantes.',
          'Avec un guide berbère de la région, vous randonnez à travers les palmeraies, rencontrez des familles nomades et déjeunez dans une maison d’hôtes traditionnelle.',
        ],
        highlights: [
          'Le canyon du Todra et ses parois de 300 m',
          'La route en lacets du Dadès',
          'Les « doigts de singe », formations rocheuses',
          'Rencontre avec des familles nomades',
        ],
        itinerary: [
          { title: 'Vallée du Dadès', description: 'Route de Kelaat M’Gouna, la vallée des roses, puis montée vers les célèbres lacets du Dadès et balade parmi les formations rocheuses.', meals: 'Déjeuner' },
          { title: 'Gorges du Todra', description: 'Randonnée de 2 heures dans les gorges et la palmeraie de Tinghir, rencontre avec une famille nomade puis retour.' },
        ],
        bestPeriod: 'Printemps et automne (roses en mai)',
      },
      en: {
        title: 'Todra Gorge and Dades Valley',
        summary:
          'Two days between dizzying canyons and the valley of roses: 300-metre cliffs, the Dades hairpin road, Berber villages and a hike through the gorge.',
        description: [
          'The Todra Gorge offers one of Morocco’s most spectacular landscapes: a narrow canyon with 300-metre walls and a crystal-clear river. Nearby, the Dades Valley unfolds its kasbahs and astonishing rock formations.',
          'With a Berber guide from the region, you will hike through palm groves, meet nomad families and have lunch in a traditional guesthouse.',
        ],
        highlights: [
          'Todra canyon and its 300 m walls',
          'The winding Dades road',
          'The “monkey fingers” rock formations',
          'Meeting nomad families',
        ],
        itinerary: [
          { title: 'Dades Valley', description: 'Drive via Kelaat M’Gouna, the valley of roses, then up to the famous Dades hairpins and a walk among the rock formations.', meals: 'Lunch' },
          { title: 'Todra Gorge', description: 'Two-hour hike through the gorge and the Tinghir palm grove, a visit to a nomad family, then return.' },
        ],
        bestPeriod: 'Spring and autumn (roses in May)',
      },
      es: {
        title: 'Gargantas del Todra y valle del Dadès',
        summary:
          'Dos días entre cañones vertiginosos y el valle de las rosas: acantilados de 300 metros, curvas del Dadès, pueblos bereberes y caminata por las gargantas.',
        description: [
          'Las gargantas del Todra ofrecen uno de los paisajes más espectaculares de Marruecos: un estrecho cañón de paredes de 300 metros por donde corre un río cristalino. Muy cerca, el valle del Dadès despliega sus kasbahs y sorprendentes formaciones rocosas.',
          'Con un guía bereber de la zona caminará entre palmerales, conocerá a familias nómadas y almorzará en una casa de huéspedes tradicional.',
        ],
        highlights: [
          'El cañón del Todra y sus paredes de 300 m',
          'La carretera de curvas del Dadès',
          'Los «dedos de mono», formaciones rocosas',
          'Encuentro con familias nómadas',
        ],
        itinerary: [
          { title: 'Valle del Dadès', description: 'Ruta por Kelaat M’Gouna, el valle de las rosas, y subida a las famosas curvas del Dadès con paseo entre las formaciones rocosas.', meals: 'Almuerzo' },
          { title: 'Gargantas del Todra', description: 'Caminata de 2 horas por las gargantas y el palmeral de Tinghir, encuentro con una familia nómada y regreso.' },
        ],
        bestPeriod: 'Primavera y otoño (rosas en mayo)',
      },
      de: {
        title: 'Todra-Schlucht und Dadès-Tal',
        summary:
          'Zwei Tage zwischen schwindelerregenden Schluchten und dem Tal der Rosen: 300 Meter hohe Felswände, Serpentinen des Dadès, Berberdörfer und Wanderung.',
        description: [
          'Die Todra-Schlucht zählt zu den spektakulärsten Landschaften Marokkos: ein enger Canyon mit 300 Meter hohen Wänden und einem kristallklaren Fluss. Ganz in der Nähe entfaltet das Dadès-Tal seine Kasbahs und erstaunlichen Felsformationen.',
          'Mit einem Berber-Guide aus der Region wandern Sie durch Palmenhaine, begegnen Nomadenfamilien und essen in einem traditionellen Gästehaus zu Mittag.',
        ],
        highlights: [
          'Der Todra-Canyon mit 300 m hohen Wänden',
          'Die Serpentinenstraße im Dadès',
          'Die „Affenfinger“-Felsformationen',
          'Begegnung mit Nomadenfamilien',
        ],
        itinerary: [
          { title: 'Dadès-Tal', description: 'Fahrt über Kelaat M’Gouna, das Tal der Rosen, hinauf zu den berühmten Dadès-Serpentinen und Spaziergang zwischen den Felsformationen.', meals: 'Mittagessen' },
          { title: 'Todra-Schlucht', description: 'Zweistündige Wanderung durch die Schlucht und den Palmenhain von Tinghir, Besuch bei einer Nomadenfamilie und Rückfahrt.' },
        ],
        bestPeriod: 'Frühling und Herbst (Rosenblüte im Mai)',
      },
      ar: {
        title: 'مضايق تودغى ووادي دادس',
        summary:
          'يومان بين أخاديد شاهقة ووادي الورود: جروف بارتفاع 300 متر، منعرجات دادس، قرى أمازيغية ونزهة داخل المضايق.',
        description: [
          'تقدم مضايق تودغى واحداً من أروع المناظر في المغرب: أخدود ضيق بجدران يبلغ ارتفاعها 300 متر يجري فيه نهر صافٍ. وعلى مقربة منها يمتد وادي دادس بقصباته وتشكيلاته الصخرية المدهشة.',
          'برفقة مرشد أمازيغي من المنطقة، تتجول بين الواحات وتلتقي بعائلات رحل وتتناول الغداء في دار ضيافة تقليدية.',
        ],
        highlights: [
          'أخدود تودغى بجدرانه البالغة 300 م',
          'طريق منعرجات دادس',
          'تشكيلات «أصابع القرد» الصخرية',
          'لقاء مع عائلات رحل',
        ],
        itinerary: [
          { title: 'وادي دادس', description: 'الطريق عبر قلعة مكونة، وادي الورود، ثم الصعود إلى منعرجات دادس الشهيرة والتجول بين التشكيلات الصخرية.', meals: 'الغداء' },
          { title: 'مضايق تودغى', description: 'نزهة لمدة ساعتين في المضايق وواحة تنغير، لقاء مع عائلة رحل ثم العودة.' },
        ],
        bestPeriod: 'الربيع والخريف (الورود في ماي)',
      },
    },
  },
];
