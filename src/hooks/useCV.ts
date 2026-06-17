import { useCVStore } from '../store/useCVStore';

export const useCV = () => {
  // States
  const cvData = useCVStore((state) => state.cvData);
  const coverLetterData = useCVStore((state) => state.coverLetterData);
  const skillsPosterData = useCVStore((state) => state.skillsPosterData);
  const activeTab = useCVStore((state) => state.activeTab);
  
  // Tab Action
  const setActiveTab = useCVStore((state) => state.setActiveTab);
  
  // CV Actions
  const updatePersonalInfo = useCVStore((state) => state.updatePersonalInfo);
  const addExperience = useCVStore((state) => state.addExperience);
  const updateExperience = useCVStore((state) => state.updateExperience);
  const deleteExperience = useCVStore((state) => state.deleteExperience);
  const addEducation = useCVStore((state) => state.addEducation);
  const updateEducation = useCVStore((state) => state.updateEducation);
  const deleteEducation = useCVStore((state) => state.deleteEducation);
  const addProject = useCVStore((state) => state.addProject);
  const updateProject = useCVStore((state) => state.updateProject);
  const deleteProject = useCVStore((state) => state.deleteProject);
  const addService = useCVStore((state) => state.addService);
  const updateService = useCVStore((state) => state.updateService);
  const deleteService = useCVStore((state) => state.deleteService);
  const setCVTemplate = useCVStore((state) => state.setCVTemplate);
  
  // Cover Letter Actions
  const updateSenderInfo = useCVStore((state) => state.updateSenderInfo);
  const updateRecipientInfo = useCVStore((state) => state.updateRecipientInfo);
  const updateCoverLetter = useCVStore((state) => state.updateCoverLetter);
  const setCLTemplate = useCVStore((state) => state.setCLTemplate);
  
  // Skills Poster Actions
  const updatePosterDetails = useCVStore((state) => state.updatePosterDetails);
  const addPosterSkill = useCVStore((state) => state.addPosterSkill);
  const updatePosterSkill = useCVStore((state) => state.updatePosterSkill);
  const deletePosterSkill = useCVStore((state) => state.deletePosterSkill);
  const setPosterTemplate = useCVStore((state) => state.setPosterTemplate);
  
  // Reset
  const resetAll = useCVStore((state) => state.resetAll);

  return {
    cvData,
    coverLetterData,
    skillsPosterData,
    activeTab,
    setActiveTab,
    
    // CV Actions
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    setCVTemplate,
    
    // Cover Letter Actions
    updateSenderInfo,
    updateRecipientInfo,
    updateCoverLetter,
    setCLTemplate,
    
    // Skills Poster Actions
    updatePosterDetails,
    addPosterSkill,
    updatePosterSkill,
    deletePosterSkill,
    setPosterTemplate,
    
    // Global
    resetAll,
  };
};

export default useCV;
