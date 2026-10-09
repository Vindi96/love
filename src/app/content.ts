// ✏️ Everything personal lives here. Edit the text, answers and photo paths,
// then drop real photos into /public/photos (any format: .jpg, .png, .webp…).

export const names = {
  him: "Nuwan",
  her: "Vindya",
};

export type QuizQuestion = {
  question: string;
  options: string[];
  /** Index of the correct option. Omit to accept any answer (funny questions). */
  answer?: number;
  correct: string;
  wrong?: string;
};

// LEVEL 1 — "Do You Remember?"
export const memoryQuiz: QuizQuestion[] = [
  {
    question: "Where did we first meet?",
    options: ["At my home", "At university", "At Gampaha garden", "At Kirindiwela"],
    answer: 0,
    correct: "Apparently you remember me after all 😂",
    wrong: "Hmm… are you sure you were there? 🤨",
  },
  {
    question: "Who messaged first?",
    options: ["You did", "I did", "We both did at the same time", "Our friends did 😂"],
    answer: 0,
    correct: "Yes! And I'm very glad you did ❤️",
    wrong: "Nice try, but no 😏",
  },
  {
    question: "Who said “I love you” first?",
    options: ["You", "Me", "Nobody, it was implied"],
    answer: 2,
    correct: "Correct — and you meant it ❤️",
    wrong: "Rewriting history, are we? 😂",
  },
  {
    question: "What was our first trip?",
    options: ["Belihuloya", "Kandy", "Jungle Beach"],
    answer: 2,
    correct: "Best trip ever 🏝️",
    wrong: "Wrong trip, my love 🙈",
  },
  {
    question: "What is my favourite thing to do with you?",
    options: ["Watching movies", "Going on long drives", "Eating 😋", "All of the above"],
    answer: 3,
    correct: "Obviously. Everything with you ❤️",
    wrong: "Too small an answer! Think bigger ❤️",
  },
];

export const level1Reward = {
  photo: "/photos/campus.jpg",
  caption: "Memory #1 — our very first photo in my uni ❤️",
};

// LEVEL 2 — "Piece Us Together". A square photo works best.
export const puzzle = {
  photo: "/photos/engage.png",
  /** 3 = 3×3 grid (9 tiles). Use 4 to make it harder. */
  size: 3,
  message: "Some things are just meant to fit together. Like us. ❤️",
};

// LEVEL 3 — "Find My Hidden Message". x/y are percentages of the photo.
export const hiddenHeartsPhoto = "/photos/white.jpeg";
export const hiddenHearts = [
  { x: 12, y: 18, message: "You make me laugh." },
  { x: 82, y: 30, message: "You're my safe place." },
  { x: 26, y: 72, message: "I love doing life with you." },
  { x: 70, y: 84, message: "You're the best part of my day." },
  { x: 52, y: 10, message: "I'd choose you every time." },
];

// LEVEL 4 — "How Well Do You Know Me?"
export const funnyQuiz: QuizQuestion[] = [
  {
    question: "What do I usually say when I'm hungry?",
    options: [
      "🍕 “Let's order food.”",
      "🍳 “උයන්න ඕනේ..”",
      "😴 “තරහයි ”",
      "😂 අප්පම් කන්න යන් ",
    ],
    answer: 3,
    correct: "You know me too well 😂",
    wrong: "Lies. I just complain. 😂",
  },
  {
    question: "Who takes longer to get ready?",
    options: [names.her, names.him, `Obviously ${names.him} 😂`],
    answer: 2,
    correct: "Finally, some honesty 😂",
    wrong: "Interesting answer… but wrong 😏",
  },
  {
    question: "What's my reaction when you say “just 5 more minutes”?",
    options: ["😡 Blaming", "🙄 Eye roll", "⏰ I start a timer", "😤 All of the above"],
    answer: 3,
    correct: "Exactly. Every. Single. Time. 😤",
    wrong: "Sweet of you to think so 😂",
  },
  {
    question: "Who wins most of our arguments?",
    options: [names.her, names.him, `${names.her}, but ${names.him} pretends otherwise`],
    answer: 2,
    correct: "Smart man. You may proceed 😌",
    wrong: "Are you sure about that? 😂",
  },
];

export function scoreVerdict(percent: number) {
  if (percent >= 90) return "Wow. Marriage material confirmed ❤️";
  if (percent >= 60) return "Not bad… you can stay married. 😂";
  if (percent >= 30) return "We need to spend more time together 😅";
  return "Who are you and where is my husband?! 😂";
}

// LEVEL 5 + finale
export const finalGallery = [
  "/photos/bipi.jpg",
  "/photos/engage.jpg",
  "/photos/white.jpeg",
  "/photos/degree.jpg",
  "/photos/red.jpeg",
];

/** Optional: put an mp3 at /public/music/song.mp3 and it plays at the finale. */
export const songSrc = "/music/song.mp3";

export const letter = {
  greeting: "මගේ පණ වගේ ආදරණීය සැමියාට,",
  paragraphs: [
    "මම ලස්සන වචන වලින් දේවල් ලියන්න දන්නේ නෑ. ඒ නිසා මම මගේ හිතේ තියෙන අදහස් ටික නිකන්ම ලියන්නම්. ඔයා ගැන මට දැනෙන දේවල් කියන්න තරම් වචන මේ ලෝකේ නෑ කියලා මම දන්නවා. ඒත් මම උත්සාහ කරනවා, මොකද ඔයා මට කොච්චර වටිනවද කියලා ඔයා අනිවාර්යයෙන්ම දැනගන්න ඕනෙ.",
    "මට කොහේ හරි යන්න ඕනෙ උනාම ඔයා කවදාවත් \"බෑ\" කියලා නෑ. මාවත් එක්කන් යනවා. කොච්චර වැඩ තිබ්බත්, කොච්චර මහන්සි උනත්, ඔයා හැමවෙලේම මට වෙලාවක් හොයාගන්නවා. මාව ඔයාගේ ජීවිතේ හැම තැනකටම එකතු කරගන්නවා. ඒ පොඩි පොඩි දේවල් ඔයාට සාමාන්‍ය දේවල් වෙන්න පුළුවන්. ඒත් මට නම් ඒ හැම එකක්ම ලෝකයක් තරම් ලොකුයි.",
    "ඔයා මාව බලාගන්නේ හරියට පුංචි ළමයෙක් වගේ. හුරතල් කර කර, විහිළු කර කර, ආදරේ කරන ඔයාගේ ඒ විදිහට මම හරිම ලෝභයි. ඇත්තම කියනවනම්, ඔයාගේ ඒ හුරතලේ නැතුව එක දවසක්වත් ගෙවන්න මට හිතාගන්නවත් බෑ. ලෝකෙට මම කවුරු උනත්, ඔයා ළඟ ඉන්නකොට මට හිතෙන්නේ මම තාමත් පුංචි ළමයෙක් කියලා. මට ඒ විදිහටම ඉන්න ඕනෙ, ජීවිත කාලෙටම.",
    "මාව සතුටින් තියන්න ඔයා කරන මහන්සිය මම හැමදාම දකිනවා. අඩියෙන් අඩිය මගේ ජීවිතේ සාර්ථක කරන්න, මගේ හීන ඇත්ත කරන්න ඔයා දරන උත්සාහය දකිනකොට මගේ හිත පිරෙනවා. ඔයා ඔයාගේ ගැන හිතනවට වඩා මගේ ගැන හිතනවා. ඒ හැම දේටම මම ඔයාට ජීවිත කාලෙටම ණයගැතියි.",
    "ඒ ගමනේදී මම මෝඩ විදිහට කේන්ති ගත්තු වෙලාවල් කොච්චර තියෙනවද? පොඩි පොඩි දේවල් වලට තරහ වෙලා, ඔයාගේ හිත රිදෙන්න කතා කරපු වෙලාවලුත් ඇති. ඔයාටත් සමහර වෙලාවට තරහ ගියා. ඒත් ඔයා කවදාවත් මාව අත ඇරියේ නෑ. ඊළඟ තප්පරේම මාව බදාගෙන, ආදරෙන් ආයෙත් හරි පාරට එක්කන් ගියා. ඒ තුරුල්ලේදී මගේ තරහ ඔක්කොම දිය වෙලා ගියා. ඒ ගැන හිතනකොට මගේ ඇස් වලට කඳුළු එනවා. ඒ හැම වෙලාවකටම සමාවෙන්න මගේ රත්තරනේ. ඔයා එහෙම මාව අල්ලගෙන හිටියේ නැත්නම් අද මම මෙතන නෑ.",
    "ඔයා තමයි මගේ guider. පාර වැරදෙනකොට මගේ අත අල්ලගෙන හරි පාරට එක්කන් යන්නේ ඔයා. ඔයා තමයි මගේ protector. ලෝකේ කොච්චර බය හිතෙන දේවල් තිබ්බත්, ඔයා ළඟ ඉන්නකොට මට කිසිම බයක් නෑ. ඔයා තමයි මගේ safe zone. මහන්සි උනාම, දුක හිතුනම, හිත රිදුනම මට දුවගෙන එන්න හිතෙන එකම තැන ඔයාගේ තුරුල්ල. ඒ තුරුල්ලට වඩා ආරක්ෂිත තැනක් මේ මුළු ලෝකෙම නෑ.",
    "සමහර රෑවල් වලට මම ඔයා නිදාගෙන ඉන්නකොට ඔයා දිහා බලාගෙන හිතනවා, මම මොන පිනක් කරලද ඔයා වගේ කෙනෙක් මට ලැබුනේ කියලා. ඔයා මගේ ජීවිතේට ආපු දවසේ ඉඳන් මගේ හැම දවසක්ම ලස්සනයි. ඔයා නිසා මම හීන දකින්න ඉගෙනගත්තා. ඒ විතරක් නෙවෙයි, ඒ හීන වලට යන්න හරි පාර තෝරගෙන, පරිස්සමෙන් ඒ පාරේ යන්නත් මම ඉගෙනගත්තේ ඔයාගෙන්.",
    "දැන් අපිට අලුත් අභියෝගයක් ඇවිල්ලා. මට කොළඹ වැඩට යන්න වෙලා. ඇත්තම කියනවනම්, මට තියෙන එකම බය අපි දෙන්නා දෙපැත්තක වෙයි කියන එක විතරයි. අපිට වෙන වෙනම ඉන්න වෙන තීරණයක් ගන්න වෙයි කියලා හිතනකොටත් මගේ හදවත ගැස්සෙනවා. අනේ මැණික, එහෙම කරන්න එපා. මට ඔයා එක්ක හැමදාම ඉන්න ඕනෙ.",
    "ඉස්සර ගෙදර ඉඳන් office වැඩ කරනකොට, ඔයා ගෙදර හිටියොත් මම වැඩ මැද්දෙන් ඔයා ළඟට දුවගෙන ඇවිත් හුරතල් වෙලා යනවා මතකද? ඒ පුංචි මොහොතවල් තමයි මගේ දවසේ ලස්සනම කෑලි. ඉස්සරහට ඒවා මට ගොඩාක් මිස් වෙයි. ඒ ගැන හිතනකොට මට හරිම දුකයි. ඒත් කොහේ හිටියත් මගේ හිත හැමදාම ඔයා ළඟමයි.",
    "ඉතින් මගේ මැණික, අපි දෙන්නා එකතු වෙලා ආදරෙන් ජීවිතේ දිනමු. අපේ හීන ඔක්කොම එකින් එක ඇත්ත කරගමු. මතකද මම ඔයාට කිව්ව දේ? දවසක අපි වෙන රටක birthday එකක් සමරනවා කියලා. ඔන්න ඒ දවස දැන් ළඟයි! මගේ ඊළඟ birthday එක අපි සමරන්නේ ලංකාවේ නෙවෙයි. ඒ දවස එනකම් මම ගණන් කර කර ඉන්නවා. ඒ හීනෙ ඇත්ත වෙන දවසේ ඔයාගේ අත තදින් අල්ලගෙන මම ඔයාට කියනවා, \"බලන්න, අපි දිනුවා\" කියලා.",
    "මොන දේ උනත්, කොහේ හිටියත්, මොන අමාරුකම් ආවත්, මම හැමදාම ඔයාගේ පැත්තෙන්. ඔයාගේ අත කවදාවත් අතාරින්නේ නෑ. අපි වයසට ගියත්, කොණ්ඩේ සුදු උනත්, ඇස් වලට කණ්ණාඩි දාන්න උනත්, අද වගේම ඔයාගේ අත අල්ලගෙන ඇවිදින්න මට ඕනෙ. එදාත් ඔයා මාව හුරතල් කරනවා දකින්න, එදාත් ඔයා ළඟ පුංචි ළමයෙක් වෙලා ඉන්න මට ඕනෙ.",
  ],
  closing: ["ඔයාට ගොඩාක් ගොඩාක් ආදරෙයි. වචන වලින් කියන්න බැරි තරම්, මේ හදවතට දරාගන්න බැරි තරම් ආදරෙයි. 💖"],
  signature: "ඔයාගේම,\nවින්දි කුක්කු බෝලේ ❤️",
  photo: "/photos/collage.png",
};

export const gift = {
  title: "YOUR REAL BIRTHDAY GIFT",
  emoji: "🎟️",
  reveal: "Gave you last Saturday, now will give it again with a big kiss",
};
