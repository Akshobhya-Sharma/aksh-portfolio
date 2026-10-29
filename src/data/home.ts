// Content for the whole homepage. Colours are token names (CSS custom properties), never hex.
//
// HOW TO EDIT THE PROJECTS SECTION (this file only, no component changes)
// - Add a category: add { id, title, gradient } to `categories`. gradient is 'tile-blue' or 'tile-green'
//   (-> --tile-<name>-core / --tile-<name>-edge in src/styles/tokens.css). A category with no projects is not rendered.
// - Add a project: add an entry to `projects` with a unique slug and a categoryId matching a category id.
//   Change categoryId to move a card to another category. Array order is page order.
// - Accent: set `accent` to a token name from AccentToken. To add one, define --color-accent-<name> in tokens.css
//   (>= 4.5:1 on the page bg; run `npm run contrast`) and add it to `accentTokens` below. A new category id goes in `categoryIds` too.
// - Gradient: edit the --tile-* values in tokens.css (white text must stay >= 4.5:1; `npm run contrast` checks it).
// - Images: put files in public/images/ and replace a project's `image` with
//   { src: "/images/<file>", alt: "<what the image shows>", width: <px>, height: <px> }.
//   alt: describe the content; never write "image", "photo" or "picture" (screen readers already say it).
//   Use alt: "" for a purely decorative image (the card title already names the project).
// - Icons: set a skill's `icon` to any Phosphor icon name (https://phosphoricons.com), e.g. "microscope".

import type { PhosphorIcon } from "@phosphor-icons/core";

export type IconName = PhosphorIcon["name"]; // any Phosphor icon, see phosphoricons.com
export type GradientToken = "tile-blue" | "tile-green"; // -> --tile-blue-core / --tile-blue-edge, etc.
export const accentTokens = [
  "color-accent-home",
  "color-accent-huana",
  "color-accent-figwrite",
  "color-accent-tyia",
] as const;
export type AccentToken = (typeof accentTokens)[number];
export const categoryIds = ["design-coding", "ux-ui"] as const; // also the `work` collection category enum

export interface Category {
  id: (typeof categoryIds)[number];
  title: string;
  gradient: GradientToken;
}

export interface Project {
  slug: string; // case study lives at /work/<slug> (see src/content/work)
  srName: string; // used in "Read more about {srName}"
  title: string;
  summary: string;
  categoryId: (typeof categories)[number]["id"]; // a typo fails typecheck
  accent: AccentToken;
  image: { src: string; alt: string; width: number; height: number };
}

export interface ToolkitItem {
  name: string;
  logo?: string; // path; rendered with alt=""
  href?: string; // rendered as a same-tab link only when set
}

export interface Skill {
  icon: IconName;
  title: string;
  description: string;
}

export const hero = {
  before: "Working with technology so people can ",
  accentWord: "focus",
  after: " on the important things.",
  accent: "color-accent-home" as AccentToken,
  intro:
    "I find technology based solutions for real world problems. I use tech stacks that can empower the people I work with. I work with non-profit organisations, local businesses and individuals who want quality work without feeling like George Jetson, while still retaining full ownership.",
  cta: { label: "See my work", href: "#projects" },
};

export const skillSet = {
  heading: "Skill set",
  intro:
    "I am a tech generalist with expertise in UX design and front-end development using modern web technologies. In my most recent role, I have also been working as a UX designer, accessibility consultant and automation tester.",
  skills: [
    {
      icon: "microscope",
      title: "UX Design",
      description: "I craft responsive, accessible interfaces that are intuitive and inclusive.",
    },
    {
      icon: "wheelchair",
      title: "Accessibility Audits",
      description:
        "I evaluate digital products against WCAG and Canadian web standards to ensure they're usable by everyone.",
    },
    {
      icon: "code-block",
      title: "Website development",
      description:
        "I have used low-code tools like Webflow and Framer to turn designs into live, performant websites. These days, a lot of my work is offloaded to LLMs.",
    },
    {
      icon: "robot",
      title: "LLM workflows",
      description:
        "I rely on Claude to do the brunt work while I focus on solving problems. My products are coded by AI, designed by a human.",
    },
  ] satisfies Skill[],
};

export const toolkit = {
  heading: "Custom toolkit",
  intro:
    "These are tools I can rely on and use if need be. However, if I feel like there's a better tool, I learn how to use that. I believe the project decides the tool kit and I'm willing to learn to deliver quality.",
  listLabel: "Tools",
  items: <ToolkitItem[]>[
    { name: "Figma" },
    { name: "Claude" },
    { name: "Claude Code" },
    { name: "Webflow" },
    { name: "Miro" },
    { name: "Excel" },
    { name: "HTML" },
    { name: "JavaScript" },
    { name: "CSS" },
  ],
};

export const projectsSection = {
  heading: "Projects",
  intro: "Some of the projects I've worked on.",
};

export const categories = [
  { id: "design-coding", title: "Design and coding", gradient: "tile-blue" },
] as const satisfies readonly Category[];

const placeholder = () => ({
  // TODO: replace `placeholder()` on each project with its real { src, alt, width, height }.
  src: "/images/placeholder.svg",
  alt: "", // decorative: the card title already names the project
  width: 640,
  height: 400,
});

export const projects = [
  {
    slug: "huana",
    srName: "Huana",
    title: "Helping marijuana recreational users track the products they liked",
    summary:
      "Building a tool to allow recreational cannabis users track what they like and where they got it from.",
    categoryId: "design-coding",
    accent: "color-accent-huana",
    image: {
      src: "/images/huana-cover.png",
      alt: "Mock up of Huana web app design",
      width: 640,
      height: 400,
    },
  },
  {
    slug: "figwrite",
    srName: "FigWrite",
    title: "Figma plugin as a bridge between content and design team",
    summary:
      "I partnered with a friend (a developer) to create a Figma plugin that would extract and update content via spreadsheet.",
    categoryId: "design-coding",
    accent: "color-accent-figwrite",
    image: {
      src: "/images/figwriteCommunityCover.png",
      alt: "Mock up of FigWrite Figma plugin design",
      width: 640,
      height: 400,
    },
  },
] satisfies Project[];

export const footer = {
  heading: "Connect",
  availability: {
    before: "I am currently employed, however, I am ",
    strong: "open for small projects",
    after: ".",
  },
  email: "leoaksh@live.in",
  extraLines: [
    "Designed by human. Coded by Claude Code. I use LLMs to accelerate development and focus on solving problems.",
    "I do not track anything on this website. It is simply a way for me to document my work so others can see what I do and learn from what I learn.",
  ],
};
