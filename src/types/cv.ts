export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  timeline: string;
  bulletPoints: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  graduationYear: string;
}

export interface Project {
  id: string;
  name: string;
  techStack: string[];
  summary: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experienceList: Experience[];
  educationList: Education[];
  projectsList: Project[];
  services: string[];
  selectedTemplate: number;
}

export interface SenderInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
}

export interface RecipientInfo {
  name: string;
  title: string;
  company: string;
  address: string;
}

export interface CoverLetterData {
  senderInfo: SenderInfo;
  recipientInfo: RecipientInfo;
  date: string;
  subject: string;
  body: string;
  selectedTemplate: number;
}

export interface SkillItem {
  id: string;
  name: string;
  proficiency: string; // e.g., "Expert", "Advanced"
  description: string; // e.g., "5+ years building distributed React/Node web applications"
}

export interface SkillsPosterData {
  name: string;
  tagline: string;
  bio: string;
  skills: SkillItem[];
  contactLink: string;
  selectedTemplate: number;
}

export type ActiveTab = 'cv' | 'cover-letter' | 'poster';
