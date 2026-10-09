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
  greeting: `Happy Birthday, my love. ❤️`,
  paragraphs: [
    "From all the little moments we shared to the day we became husband and wife, every memory with you means so much to me.",
    "Life isn't always perfect, but having you beside me makes everything more special.",
    "I hope this new year of your life brings you happiness, success, good health and many adventures.",
  ],
  closing: [`Happy Birthday, ${names.him}. ❤️`, "Here's to many more birthdays together.", "I love you. ❤️"],
  signature: `— ${names.her}`,
  photo: "/photos/collage.png",
};

export const gift = {
  title: "YOUR REAL BIRTHDAY GIFT",
  emoji: "🎟️",
  reveal: "Gave you last Saturday, now will give it again with a big kiss",
};
