import { JourneyStep } from "./types";

export const dictionaryData = [
  { id: "ihram", term: "الإحرام", description: "ملابس بيضاء بسيطة نلبسها قبل بدء الحج، لنتذكر أننا جميعاً سواسية.", iconName: "Shirt", color: "text-sky-500" },
  { id: "tawaf", term: "الطواف", description: "الدوران حول الكعبة المشرفة سبعة أشواط، مع الذكر والدعاء.", iconName: "RotateCw", color: "text-amber-500" },
  { id: "sai", term: "السعي", description: "المشي والجري بين جبلي الصفا والمروة سبع مرات، كما فعلت السيدة هاجر.", iconName: "Footprints", color: "text-emerald-500" },
  { id: "arafat", term: "الوقوف بعرفة", description: "أهم ركن في الحج، نقف فيه لندعو الله ونطلب منه المغفرة.", iconName: "Users", color: "text-purple-500" },
  { id: "jamarat", term: "رمي الجمرات", description: "رمي الحصيات في منى، لنتعلم مقاومة الشيطان والأعمال السيئة.", iconName: "Target", color: "text-rose-500" },
  { id: "talbiyah", term: "التلبية", description: "دعاء نقول فيه 'لبيك اللهم لبيك' للرد على نداء الله بحب وطاعة.", iconName: "Mic2", color: "text-blue-500" },
  { id: "miqat", term: "الميقات", description: "المكان المحدد الذي يبدأ منه الحجاج إحرامهم ونيتهم للحج.", iconName: "MapPin", color: "text-indigo-500" },
  { id: "hady", term: "الهدي", description: "ما يذبح من الأنعام في الحج تقرباً إلى الله وشكراً له.", iconName: "Gift", color: "text-red-500" }
];

export const journeyData: JourneyStep[] = [
  {
    id: "ihram",
    title: "1. الإحرام (الميقات)",
    description: "في الميقات، نتوضأ أو نغتسل، ونلبس ملابس الإحرام البيضاء البسيطة، وننوي الحج.",
    valueLearned: "نقف جميعاً سواسية أمام الله.",
    iconName: "Shirt",
    type: "quiz",
    question: "ما هي القيمة التي نتعلمها عندما يلبس كل الحجاج نفس الملابس البيضاء البسيطة؟",
    options: [
      { id: "o1", text: "الفوارق تختفي والغني والفقير سواسية", isCorrect: true },
      { id: "o2", text: "أن الملابس البيضاء أسهل في التنظيف", isCorrect: false },
    ],
    successMessage: "أحسنت! الإحرام يعلمنا المساواة بين جميع الناس وأننا بحاجة إلى الله."
  },
  {
    id: "tawaf",
    title: "2. الطواف بالبيت العتيق",
    description: "نطوف حول الكعبة المشرفة سبعة أشواط، ونحن ندعو الله ونذكره كما أمرنا.",
    valueLearned: "الله هو مركز حياتنا.",
    iconName: "RotateCw",
    type: "quiz",
    question: "ماذا نفعل عندما نصل إلى الكعبة المشرفة؟",
    options: [
      { id: "o1", text: "نجلس لنرتاح طوال اليوم", isCorrect: false },
      { id: "o2", text: "نطوف حولها 7 أشواط حباً وطاعة لله", isCorrect: true },
    ],
    successMessage: "رائع! الطواف حول الكعبة يملأ قلوبنا بالسكينة والإيمان ويعلمنا أن نجعل طاعة الله أولاً."
  },
  {
    id: "safa-marwa",
    title: "3. السعي بين الصفا والمروة",
    description: "نسعى بين جبلي الصفا والمروة 7 مرات، تخليداً لذكرى السيدة هاجر حينما بحثت عن الماء لابنها إسماعيل.",
    valueLearned: "السعي والتوكل على الله.",
    iconName: "Footprints",
    type: "quiz",
    question: "ما الذي نتعلمه من ركض السيدة هاجر وبحثها عن الماء رغم الجفاف؟",
    options: [
      { id: "o1", text: "أن العمل والمحاولة ضروريان مع اليقين بأن الله لن يضيعنا", isCorrect: true },
      { id: "o2", text: "أن لا نبذل أي جهد وننتظر النتيجة", isCorrect: false },
    ],
    successMessage: "ممتاز! السعي يعلمنا الصبر الدائم، وأن نعمل بجد ثم نتوكل على الله."
  },
  {
    id: "memory",
    title: "4. الترفيه: الذاكرة القوية",
    description: "لعبة الذاكرة! ابحث عن كل أيقونتين متشابهتين لتعزيز تركيزك.",
    valueLearned: "التركيز وتذكر شعائر الله.",
    iconName: "Puzzle",
    type: "memory",
    successMessage: "بطل التركيز! لقد طابقت كل الكروت بنجاح."
  },
  {
    id: "arafat",
    title: "5. الوقوف بعرفة",
    description: "في اليوم التاسع من ذي الحجة، يقف كل الحجاج في جبل عرفات، يدعون الله ويستغفرونه، وهو ركن الحج الأعظم.",
    valueLearned: "وحدة الأمة الإسلامية وطلب المغفرة.",
    iconName: "Users",
    type: "quiz",
    question: "يجتمع الملايين في مكان واحد وزمان واحد ويهتفون بنداء واحد. على ماذا يدل هذا المشهد؟",
    options: [
      { id: "o1", text: "أنهم يحبون الأماكن المزدحمة فقط", isCorrect: false },
      { id: "o2", text: "قوة شوكة المسلمين ووحدتهم وتلاحمهم في دعوة واحدة", isCorrect: true },
    ],
    successMessage: "صحيح! مشهد عرفات يذكرنا بيوم القيامة ويوحد قلوب جميع المسلمين من كل العالم."
  },
  {
    id: "jamarat",
    title: "6. رمي الجمرات",
    description: "نرمي الحصيات في منى، اقتداءً بسيدنا إبراهيم عليه السلام عندما قاوم وساوس الشيطان.",
    valueLearned: "مقاومة وساوس الشيطان وكل عادة سيئة.",
    iconName: "Target",
    type: "quiz",
    question: "إذا كان رمي الجمرات يرمز لمقاومة الشيطان، فما هي القيمة التربوية التي نتعلمها؟",
    options: [
      { id: "o1", text: "مواجهة أهواء النفس السيئة والتخلص منها لنكون أقوى", isCorrect: true },
      { id: "o2", text: "أن نتعلم كيفية رمي الحجارة لمسافات بعيدة", isCorrect: false },
    ],
    successMessage: "أنت بطل! رمي الجمرات يعلمنا دائماً أن نطرد الأفكار السيئة وننتصر على الشيطان في حياتنا اليومية."
  },
  {
    id: "maze",
    title: "7. الترفيه: متاهة الكعبة",
    description: "ساعد الحاج الصغير للوصول إلى الكعبة المشرفة في وسط المتاهة.",
    valueLearned: "الصبر والمثابرة للوصول إلى الهدف.",
    iconName: "Map",
    type: "maze",
    successMessage: "عمل رائع! لقد أرشدت الحاج إلى الكعبة بسلام ومثابرة."
  },
  {
    id: "talbiyah",
    title: "8. دعاء التلبية",
    description: "نردد دائماً في الحج: [لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لا شَرِيكَ لَكَ لَبَّيْكَ..].",
    valueLearned: "الاستجابة لنداء الله تعالى.",
    iconName: "Mic2",
    type: "quiz",
    question: "ماذا يقصد الحاج عندما يقول «لبيك اللهم لبيك»؟",
    options: [
      { id: "o1", text: "أنا هنا يا رب.. أستجيب لندائك طاعةً وحباً!", isCorrect: true },
      { id: "o2", text: "أنا متأخر عن الموعد وسأحضر غداً", isCorrect: false },
    ],
    successMessage: "رائع جداً! بهذا الدعاء الدائم نحن نعبر عن حبنا وطاعتنا الكاملة لله وحده لا شريك له."
  },
  {
    id: "ordering",
    title: "9. الترفيه: ترتيب المناسك",
    description: "رتب مناسك الحج بالترتيب الصحيح لتتأكد من أنك تعلمتها جيداً واضغط عليها.",
    valueLearned: "النظام والترتيب في العبادة.",
    iconName: "ListOrdered",
    type: "ordering",
    successMessage: "أنت بطل حقيقي! لقد رتبت المناسك بشكل صحيح تماماً."
  }
];
