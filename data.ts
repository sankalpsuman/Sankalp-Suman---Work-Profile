
import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  name: "Sankalp Suman",
  title: "Senior Software Test Engineer & Scrum Master",
  location: "Delhi NCR, India",
  phone: "+91 9540446448",
  email: "sankalpsmn@gmail.com",
  linkedin: "linkedin.com/in/sankalpsuman",
  summary: "Senior Software Test Engineer with 7+ years of experience in end-to-end software quality assurance across web, desktop, mobile, and API-driven applications. Strong expertise in manual testing, API testing, database validation, CI/CD pipelines, and Agile/Scrum delivery. Currently working as a SW Test Specialist and Scrum Master at Amdocs, leading QA activities, mentoring teams, and coordinating releases. Experienced in validating AI-driven features and modern DevOps workflows.",
  skills: [
    {
      category: "Manual Testing",
      items: ["Functional", "Regression", "Smoke", "Sanity", "Patch", "Ad-hoc", "Test Case Design & Execution", "Defect Lifecycle Management"]
    },
    {
      category: "Automation & Tools",
      items: ["API Testing (Postman)", "OpKey Automation Platform", "Jira", "Zephyr", "Octane", "Quality Center", "Confluence"]
    },
    {
      category: "DevOps & Infrastructure",
      items: ["CI/CD Pipelines (Jenkins)", "Docker", "Linux", "Database Testing (SQL, ETL Validation)"]
    },
    {
      category: "Methodologies",
      items: ["Agile & Scrum", "Mentoring", "Sprint Planning", "Release Coordination", "AI-based Testing Concepts"]
    }
  ],
  experience: [
    {
      role: "SW Test Specialist & Scrum Master",
      company: "Amdocs Development Center India LLP",
      period: "Dec 2021 – Present",
      description: [
        "Lead QA for ActixOne HTML Portal and Desktop applications",
        "Test planning, estimation, execution, regression, patch testing, and release sign-off",
        "API testing and database/ETL validation for data-intensive systems",
        "CI/CD deployments using Jenkins, Docker, and Linux environments",
        "Scrum Master responsibilities including sprint planning, reviews, retrospectives, and mentoring",
        "Collaboration with Development and Product teams to reduce defect turnaround time",
        "Preparation of QA metrics, dashboards, user manuals, and installation guides"
      ]
    },
    {
      role: "Senior Quality Engineer",
      company: "Hexaview Technologies (Client: Adobe Systems)",
      period: "Jun 2019 – Dec 2021",
      description: [
        "Tested Adobe Acrobat Android – Liquid Mode including AI-based document processing features",
        "Functional, UI, regression, and smoke testing on mobile applications",
        "Validation of AI output accuracy, usability, and performance",
        "Defect logging, tracking, and analysis using JIRA",
        "Participation in release planning and QA status reporting"
      ]
    },
    {
      role: "Quality Engineer",
      company: "Smart Software Testing Solutions (OpKey)",
      period: "Aug 2018 – May 2019",
      description: [
        "Testing of SaaS-based automation platform on web and mobile",
        "Cross-browser testing, root cause analysis, and deployment support"
      ]
    },
    {
      role: "Testing Trainee",
      company: "Stratosphere IT Services (Magic EdTech)",
      period: "May 2018 – Aug 2018",
      description: [
        "Content validation and functional testing for ePub-based digital learning products"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology (B.Tech) – Computer Science & Engineering",
      institution: "I.T.S Engineering College, Noida",
      year: "2018"
    }
  ],
  certifications: [
    { name: "ISTQB Certified – Foundation Level" },
    { name: "NPTEL – Design and Analysis of Algorithms" },
    { name: "Digital Marketing – Eride NGO", year: "2017" }
  ],
  awards: [
    { title: "Transform Collaboration Partner", organization: "Amdocs ActixOne", year: "2023" },
    { title: "Individual Contributor", organization: "Amdocs ActixOne North Star", year: "2022" },
    { title: "Employee of the Year", organization: "Adobe Acrobat Liquid Mode", year: "2020" }
  ],
  learning: "AI in Software Testing – AI-assisted test generation, intelligent test optimization, and smart QA strategies"
};
