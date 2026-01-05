
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  year?: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  awards: Award[];
  learning: string;
}
