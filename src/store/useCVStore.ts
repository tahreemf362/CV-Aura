import { create } from 'zustand';
import type { 
  CVData, 
  PersonalInfo, 
  Experience, 
  Education, 
  Project, 
  CoverLetterData, 
  SenderInfo, 
  RecipientInfo, 
  SkillsPosterData, 
  SkillItem,
  ActiveTab
} from '../types/cv';

interface CVStore {
  cvData: CVData;
  coverLetterData: CoverLetterData;
  skillsPosterData: SkillsPosterData;
  activeTab: ActiveTab;
  
  setActiveTab: (tab: ActiveTab) => void;
  
  // CV actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addService: (service: string) => void;
  updateService: (index: number, service: string) => void;
  deleteService: (index: number) => void;
  setCVTemplate: (templateIndex: number) => void;
  
  // Cover Letter actions
  updateSenderInfo: (info: Partial<SenderInfo>) => void;
  updateRecipientInfo: (info: Partial<RecipientInfo>) => void;
  updateCoverLetter: (letter: Partial<Omit<CoverLetterData, 'senderInfo' | 'recipientInfo'>>) => void;
  setCLTemplate: (templateIndex: number) => void;
  
  // Skills Poster actions
  updatePosterDetails: (details: Partial<Omit<SkillsPosterData, 'skills'>>) => void;
  addPosterSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updatePosterSkill: (id: string, skill: Partial<SkillItem>) => void;
  deletePosterSkill: (id: string) => void;
  setPosterTemplate: (templateIndex: number) => void;

  // Global reset
  resetAll: () => void;
}

const initialCVData: CVData = {
  personalInfo: {
    name: 'Aura Developer',
    title: 'Senior Full-Stack Architect',
    email: 'architect@cvaura.dev',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
  },
  experienceList: [
    {
      id: 'exp-1',
      company: 'Aether Technologies',
      position: 'Lead Architect',
      timeline: '2023 - Present',
      bulletPoints: [
        'Designed and launched a glassmorphic design system using Tailwind CSS and React, boosting user engagement by 40%.',
        'Architected high-throughput microservices in Node.js, reducing API response latency by 120ms.',
        'Mentored a team of 8 engineers on state management and frontend modular architecture patterns.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Vortex Labs',
      position: 'Senior Software Engineer',
      timeline: '2020 - 2023',
      bulletPoints: [
        'Spearheaded the migration of a legacy dashboard to Vite and TypeScript, achieving a 70% decrease in local start times.',
        'Implemented complex state synchronization patterns across multiple browser contexts using custom web hooks.',
      ],
    },
  ],
  educationList: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: 'B.S. in Computer Science',
      graduationYear: '2020',
    },
  ],
  projectsList: [
    {
      id: 'proj-1',
      name: 'Aura Engine',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand'],
      summary: 'A high-performance visual builder for portfolio websites, supporting real-time theme compilation and visual customizers.',
    },
    {
      id: 'proj-2',
      name: 'Nebula DB',
      techStack: ['Rust', 'WASM', 'IndexedDB'],
      summary: 'An in-browser database engine optimized for offline-first React applications with automatic synchronization.',
    },
  ],
  services: [
    'Full-Stack Architecture',
    'UI/UX Design Systems',
    'Performance Optimization',
    'Technical Mentorship',
  ],
  selectedTemplate: 0,
};

const initialCoverLetterData: CoverLetterData = {
  senderInfo: {
    name: 'Aura Developer',
    title: 'Senior Full-Stack Architect',
    email: 'architect@cvaura.dev',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
  },
  recipientInfo: {
    name: 'Hiring Committee',
    title: 'Engineering Leadership Recruiting',
    company: 'Stripe Inc.',
    address: '354 Oyster Point Blvd, South San Francisco, CA 94080',
  },
  date: 'June 17, 2026',
  subject: 'Application for Senior Engineering Architect Role',
  body: `Dear Hiring Committee,

I am writing to express my strong interest in the Senior Engineering Architect position at Stripe. With over eight years of experience designing modular design systems, tuning database layers, and scaling client interfaces, I have dedicated my career to crafting software architectures that are both technically rigorous and delightful for users.

At Aether Technologies, I served as Lead Architect where I led the migration of our primary web products to Vite, React, and TypeScript. This initiative not only reduced build times by 70% but also established a unified visual framework that accelerated product delivery by 35%. I believe Stripe's emphasis on clean APIs and visual excellence matches my own architectural philosophy. I would love the opportunity to contribute to Stripe's mission of expanding the internet's GDP.

Thank you for your time and consideration. I look forward to discussing how my experience in state orchestration, design system development, and technical leadership aligns with your team's current goals.

Sincerely,

Aura Developer`,
  selectedTemplate: 0,
};

const initialSkillsPosterData: SkillsPosterData = {
  name: 'Aura Developer',
  tagline: 'Architecting Modern Web Experiences',
  bio: 'I build highly performant, accessible, and modular web architectures using modern frontend frameworks, visual editors, and real-time state orchestration.',
  skills: [
    {
      id: 's-1',
      name: 'React & Next.js Ecosystem',
      proficiency: 'Expert',
      description: 'Building high-performance components, visual page builders, and custom hydration engines.',
    },
    {
      id: 's-2',
      name: 'TypeScript & Architecture Design',
      proficiency: 'Expert',
      description: 'Designing robust type systems, decoupled modules, and clean state flows.',
    },
    {
      id: 's-3',
      name: 'Tailwind CSS & Styling Systems',
      proficiency: 'Expert',
      description: 'Creating fancy B&W and glassmorphic layouts with custom v4 theme directives.',
    },
    {
      id: 's-4',
      name: 'Zustand & Client State Orchestration',
      proficiency: 'Expert',
      description: 'Structuring lightweight global stores with action-driven mutations.',
    },
  ],
  contactLink: 'architect@cvaura.dev • (555) 019-2834 • San Francisco, CA',
  selectedTemplate: 0,
};

export const useCVStore = create<CVStore>((set) => ({
  cvData: initialCVData,
  coverLetterData: initialCoverLetterData,
  skillsPosterData: initialSkillsPosterData,
  activeTab: 'cv',
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  updatePersonalInfo: (info) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        personalInfo: { ...state.cvData.personalInfo, ...info },
      },
    })),
    
  addExperience: (exp) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experienceList: [
          ...state.cvData.experienceList,
          { ...exp, id: `exp-${Date.now()}` },
        ],
      },
    })),
    
  updateExperience: (id, updatedExp) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experienceList: state.cvData.experienceList.map((exp) =>
          exp.id === id ? { ...exp, ...updatedExp } : exp
        ),
      },
    })),
    
  deleteExperience: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experienceList: state.cvData.experienceList.filter((exp) => exp.id !== id),
      },
    })),
    
  addEducation: (edu) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        educationList: [
          ...state.cvData.educationList,
          { ...edu, id: `edu-${Date.now()}` },
        ],
      },
    })),
    
  updateEducation: (id, updatedEdu) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        educationList: state.cvData.educationList.map((edu) =>
          edu.id === id ? { ...edu, ...updatedEdu } : edu
        ),
      },
    })),
    
  deleteEducation: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        educationList: state.cvData.educationList.filter((edu) => edu.id !== id),
      },
    })),
    
  addProject: (project) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projectsList: [
          ...state.cvData.projectsList,
          { ...project, id: `proj-${Date.now()}` },
        ],
      },
    })),
    
  updateProject: (id, updatedProj) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projectsList: state.cvData.projectsList.map((proj) =>
          proj.id === id ? { ...proj, ...updatedProj } : proj
        ),
      },
    })),
    
  deleteProject: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projectsList: state.cvData.projectsList.filter((proj) => proj.id !== id),
      },
    })),
    
  addService: (service) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        services: [...state.cvData.services, service],
      },
    })),
    
  updateService: (index, updatedService) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        services: state.cvData.services.map((svc, idx) =>
          idx === index ? updatedService : svc
        ),
      },
    })),
    
  deleteService: (index) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        services: state.cvData.services.filter((_, idx) => idx !== index),
      },
    })),
    
  setCVTemplate: (templateIndex) =>
    set((state) => ({
      cvData: { ...state.cvData, selectedTemplate: templateIndex },
    })),
    
  updateSenderInfo: (info) =>
    set((state) => ({
      coverLetterData: {
        ...state.coverLetterData,
        senderInfo: { ...state.coverLetterData.senderInfo, ...info },
      },
    })),
    
  updateRecipientInfo: (info) =>
    set((state) => ({
      coverLetterData: {
        ...state.coverLetterData,
        recipientInfo: { ...state.coverLetterData.recipientInfo, ...info },
      },
    })),
    
  updateCoverLetter: (letter) =>
    set((state) => ({
      coverLetterData: {
        ...state.coverLetterData,
        ...letter,
      },
    })),
    
  setCLTemplate: (templateIndex) =>
    set((state) => ({
      coverLetterData: { ...state.coverLetterData, selectedTemplate: templateIndex },
    })),
    
  updatePosterDetails: (details) =>
    set((state) => ({
      skillsPosterData: {
        ...state.skillsPosterData,
        ...details,
      },
    })),
    
  addPosterSkill: (skill) =>
    set((state) => ({
      skillsPosterData: {
        ...state.skillsPosterData,
        skills: [
          ...state.skillsPosterData.skills,
          { ...skill, id: `skill-${Date.now()}` },
        ],
      },
    })),
    
  updatePosterSkill: (id, updatedSkill) =>
    set((state) => ({
      skillsPosterData: {
        ...state.skillsPosterData,
        skills: state.skillsPosterData.skills.map((skill) =>
          skill.id === id ? { ...skill, ...updatedSkill } : skill
        ),
      },
    })),
    
  deletePosterSkill: (id) =>
    set((state) => ({
      skillsPosterData: {
        ...state.skillsPosterData,
        skills: state.skillsPosterData.skills.filter((skill) => skill.id !== id),
      },
    })),
    
  setPosterTemplate: (templateIndex) =>
    set((state) => ({
      skillsPosterData: { ...state.skillsPosterData, selectedTemplate: templateIndex },
    })),
    
  resetAll: () => set({
    cvData: initialCVData,
    coverLetterData: initialCoverLetterData,
    skillsPosterData: initialSkillsPosterData,
    activeTab: 'cv',
  }),
}));
