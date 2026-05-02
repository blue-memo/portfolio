import moraweg from "../assets/moraweg-opt.webp";
import gafar   from "../assets/gafar-opt.webp";
import golearn  from "../assets/golearn-opt.webp";
import center   from "../assets/center-opt.webp";
import sahab    from "../assets/sahab-opt.webp";

export const PROJECTS = [
  {
    n: "01",
    title: "Moraweg Company",
    year: "2023",
    role: "Full Front-End",
    tags: ["HTML", "CSS", "JS"],
    url: "https://moraweg.com",
    img: moraweg,
    color: "#47d4ff",
    dark: true,
    desc: "Built a fully responsive corporate website from scratch across 9+ pages. Implemented custom scroll animations, branded UI components, and a cohesive visual identity — all without any framework.",
  },
  {
    n: "02",
    title: "Mr.Gafar Elsheikh",
    year: "2024",
    role: "UI + Dev",
    tags: ["HTML", "CSS", "JS"],
    url: "https://mrgafar.com",
    img: gafar,
    color: "#ff943c",
    dark: false,
    desc: "Designed and developed a complete multi-page website from concept to deployment. Delivered 9+ pixel-perfect pages with a strong focus on responsive layout and clean UI across all screen sizes.",
  },
  {
    n: "03",
    title: "GoLearn",
    year: "2023",
    role: "Improvement",
    tags: ["HTML", "CSS", "JS"],
    url: "https://golearn-eg.com/",
    img: golearn,
    color: "#a700f5",
    dark: true,
    desc: "Refactored and enhanced an existing e-learning platform — rebuilt the Navbar, redesigned the Hero section, and overhauled multiple inner pages to improve UX consistency and visual quality.",
  },
  {
    n: "04",
    title: "Eduvalu Center",
    year: "2024",
    role: "Front-End Dev",
    tags: ["HTML", "CSS", "JS", "React"],
    url: "https://book-eduvalu.com/",
    img: center,
    color: "#FF6B35",
    dark: false,
    desc: "Integrated external APIs into an existing educational platform, enabling dynamic content rendering and real-time data fetching to replace static content across key sections of the site.",
  },
  {
    n: "05",
    title: "Sahab Tech",
    year: "2025",
    role: "Front-End Dev",
    tags: ["HTML", "CSS", "JS", "React"],
    url: "https://sahab-tech.com",
    img: sahab,
    color: "#3effe5",
    dark: true,
    desc: "Engineered the full front-end of sahab-tech.com in React — 5+ responsive pages, REST API integration, dark mode system, and a bilingual Arabic/English interface with seamless language switching.",
  },
];

export const SKILLS = [
  { name: "HTML5",      level: 95, color: "#E34F26", glyph: "" },
  { name: "CSS3",       level: 92, color: "#1572B6", glyph: "" },
  { name: "JavaScript", level: 75, color: "#F0DB4F", glyph: "" },
  { name: "Bootstrap",  level: 60, color: "#7952B3", glyph: "" },
  { name: "React",      level: 75, color: "#61DAFB", glyph: "" },
];

export const WORDS = ["BUILDS", "CODES", "CRAFTS", "DESIGNS", "SHIPS", "CREATES"];

export const SECTIONS = [
  { id: "s-hero",    label: "INTRO" },
  { id: "s-work",    label: "WORK" },
  { id: "s-about",   label: "ABOUT" },
  { id: "s-skills",  label: "SKILLS" },
  { id: "s-contact", label: "CONTACT" },
];
