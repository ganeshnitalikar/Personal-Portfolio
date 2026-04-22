export const portfolioConfig = {
  personal: {
    firstName: "Ganesh",
    lastName: "Nitalikar",
    domain: "ganesh.dev",
    resumeUrl: "/resume.pdf",
  },
  roles: [
    "Full Stack Developer",
    "React & Node Engineer",
    "Flutter Developer",
    "Spring Boot Specialist",
    "ASP.NET Core Developer",
  ],
  socials: {
    github: "https://github.com/ganeshnitalikar",
    linkedin: "https://www.linkedin.com/in/ganeshnitalikar/",
    email: "ganeshnitalikar@gmail.com",
  },
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
  }
};
