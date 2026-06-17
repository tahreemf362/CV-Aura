import Header from '../components/layout/Header';
import PersonalInfoForm from '../components/form/PersonalInfoForm';
import ServicesForm from '../components/form/ServicesForm';
import ExperienceForm from '../components/form/ExperienceForm';
import ProjectsForm from '../components/form/ProjectsForm';
import EducationForm from '../components/form/EducationForm';
import CoverLetterForm from '../components/form/CoverLetterForm';
import SkillsPosterForm from '../components/form/SkillsPosterForm';

import CVPreview from '../components/preview/CVPreview';
import CoverLetterPreview from '../components/preview/CoverLetterPreview';
import SkillsPosterPreview from '../components/preview/SkillsPosterPreview';

import { useCV } from '../hooks/useCV';
import { Printer, FileText, Award, FileCode } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Dashboard = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cvData, 
    setCVTemplate,
    coverLetterData,
    setCLTemplate,
    skillsPosterData,
    setPosterTemplate
  } = useCV();

  const handlePrint = () => {
    window.print();
  };

  const getTemplateInfo = () => {
    switch (activeTab) {
      case 'cv':
        return {
          current: cvData.selectedTemplate,
          setTemplate: setCVTemplate,
          options: ['Classic Editorial', 'Minimal Grid', 'Bold Architect'],
        };
      case 'cover-letter':
        return {
          current: coverLetterData.selectedTemplate,
          setTemplate: setCLTemplate,
          options: ['Executive Formal', 'Bold Modern', 'Chic Designer'],
        };
      case 'poster':
        return {
          current: skillsPosterData.selectedTemplate,
          setTemplate: setPosterTemplate,
          options: ['Grid Matrix', 'Pitch Deck', 'Studio Minimalist'],
        };
      default:
        return {
          current: 0,
          setTemplate: setCVTemplate,
          options: [],
        };
    }
  };

  const { current, setTemplate, options } = getTemplateInfo();

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 pb-12">
      {/* Shell Header - hidden on print */}
      <div className="print:hidden">
        <Header />
      </div>

      {/* Main Split Screen Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6 print:p-0">
        
        {/* Document Tab Selector Panel - hidden on print */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 print:hidden border-b border-slate-200 dark:border-neutral-900 pb-4">
          <div className="flex border border-slate-200 dark:border-neutral-800 p-1.5 rounded-2xl bg-white dark:bg-neutral-950 shadow-sm w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('cv')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'cv'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-450 dark:hover:bg-neutral-900'
              }`}
            >
              <FileCode className="w-4 h-4" />
              Resume / CV
            </button>
            <button
              onClick={() => setActiveTab('cover-letter')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'cover-letter'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-450 dark:hover:bg-neutral-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              Cover Letter
            </button>
            <button
              onClick={() => setActiveTab('poster')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'poster'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-450 dark:hover:bg-neutral-900'
              }`}
            >
              <Award className="w-4 h-4" />
              Skills Poster
            </button>
          </div>

          <Button 
            onClick={handlePrint} 
            variant="outline" 
            size="md"
            className="w-full sm:w-auto border-black/30 hover:border-black text-black dark:border-white/20 dark:hover:border-white dark:text-white gap-2 font-bold shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </Button>
        </div>

        {/* Editor & Preview Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
          
          {/* Editor Pane (Left Column) - hidden on print */}
          <div className="lg:col-span-5 flex flex-col gap-6 print:hidden max-h-[calc(100vh-190px)] overflow-y-auto pr-2">
            
            {/* Template Selector Section */}
            <div className="flex flex-col gap-2 p-4 border border-slate-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Template Style</span>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {options.map((optName, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTemplate(idx)}
                    className={`px-2 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer text-center ${
                      current === idx
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm'
                        : 'bg-transparent border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-neutral-800 dark:text-slate-400 dark:hover:bg-neutral-950'
                    }`}
                  >
                    {optName}
                  </button>
                ))}
              </div>
            </div>

            {/* Render Tab Form */}
            <div className="flex flex-col gap-6">
              {activeTab === 'cv' && (
                <>
                  <PersonalInfoForm />
                  <ServicesForm />
                  <ExperienceForm />
                  <ProjectsForm />
                  <EducationForm />
                </>
              )}
              {activeTab === 'cover-letter' && <CoverLetterForm />}
              {activeTab === 'poster' && <SkillsPosterForm />}
            </div>
            
          </div>

          {/* Preview Pane (Right Column) - full page on print */}
          <div className="lg:col-span-7 lg:sticky lg:top-[96px] lg:h-[calc(100vh-140px)] lg:overflow-y-auto print:static print:h-auto print:overflow-visible">
            <div className="print:p-0">
              {activeTab === 'cv' && <CVPreview />}
              {activeTab === 'cover-letter' && <CoverLetterPreview />}
              {activeTab === 'poster' && <SkillsPosterPreview />}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
