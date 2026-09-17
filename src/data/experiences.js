// Single source of truth for the experience wheel AND the details panel.
// Add an object here and it appears in both -- nothing else to touch.
//
// techStack lists the most specific true thing and drops what it implies:
// React over JavaScript, FastAPI over "web framework". Python stays alongside
// FastAPI because it did separate work (the Playwright automation). Auth and
// other implementation details belong in the bullets, not here.
// Fundr, BCA and Robotics named no technologies, so they're empty (the UI hides the row).
//
// `year` is the span shown on the wheel and on the card badge, so it stays in
// step with `date` -- a single month like BCA's is just the year, not a range.
export const experiences = [
  {
    id: "fundr",
    name: "Fundr.net.au",
    year: "2026 - Present",
    logo: "./images/fundr_logo_web.webp",
    image: "./images/fundr_home_web.webp",
    role: "Co-Founder & Software Developer",
    org: "Fundr.net.au",
    date: "Apr 2026 - Present",
    location: "Australia (Remote)",
    description: [
      "Co-founded and developed a platform connecting Australian university student societies with corporate sponsors, enabling societies to manage events, connect with sponsors, and track sponsorship opportunities.",
      "Worked across product and engineering to translate evolving business requirements into practical platform features, shaping the system's core workflows and technical infrastructure.",
    ],
    techStack: [],
    logoRounded: false,
  },
  {
    id: "xsigma",
    name: "X-Sigma Partners",
    year: "2025 - 2026",
    logo: "./images/xsigma_logo.jpg",
    image: "./images/xsigma_team_web.jpg",
    role: "Software Developer Intern",
    org: "X-Sigma Partners (Shanghai)",
    date: "Nov 2025 - Apr 2026",
    location: "Shanghai, China (On-site)",
    description: [
      "Replaced manual Excel workflows by designing and implementing a full-stack ERP system for production and inventory management, integrating automated calculations to improve efficiency and data accuracy.",
      "Worked directly with company leadership to align system design with business operations and strategic decisions.",
      "Integrated API-level caching and pagination, and implemented JWT role-based authentication (RBAC), ensuring scalable, cost-efficient, and secure performance.",
      "Containerized the system using Docker and deployed it on Aliyun with RDS for production use.",
      "Automated repetitive tasks using Python and Playwright to improve workflow efficiency.",
    ],
    techStack: ["React", "FastAPI", "Python", "MySQL", "Docker", "Aliyun", "Playwright"],
    logoRounded: false,
  },
  {
    id: "robotics",
    name: "NYU Shanghai Robotics",
    year: "2024 - Present",
    logo: "./images/robotics.jpeg",
    image: "./images/robots_team_web.jpg",
    role: "Board Member",
    org: "Robotics Club at NYU Shanghai",
    date: "Sep 2024 - Present",
    location: "Shanghai, China (On-site)",
    description: [
      "Together with the core team: Developed the NYU Shanghai Robotics website.",
      "Designed, built, and competed in the Asia Open VEX-U Robotics Competition.",
      "Learned how to integrate code with robotic hardware.",
    ],
    techStack: [],
    logoRounded: true,
  },
  {
    id: "bca",
    name: "Bank Central Asia",
    year: "2022",
    logo: "./images/bca.jpg",
    image: "./images/bcaintern.jpg",
    role: "IT Business Analyst",
    org: "Internship - Bank Central Asia (BCA)",
    date: "Dec 2022",
    location: "Jakarta, Indonesia (On-site)",
    description: [
      "Researched security & Customer service.",
      "Joined meetings to discuss technological improvements.",
    ],
    techStack: [],
    logoRounded: false,
  },
];
