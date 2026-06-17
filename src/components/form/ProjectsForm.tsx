import React, { useState } from 'react';
import { useCV } from '../../hooks/useCV';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FolderGit2, Plus, Trash2, X } from 'lucide-react';

export const ProjectsForm: React.FC = () => {
  const { cvData, addProject, updateProject, deleteProject } = useCV();
  const { projectsList } = cvData;
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({});

  const handleAddEmpty = () => {
    addProject({
      name: '',
      techStack: [],
      summary: '',
    });
  };

  const handleFieldChange = (id: string, field: string, value: any) => {
    updateProject(id, { [field]: value });
  };

  const handleAddTech = (projId: string) => {
    const techText = newTech[projId]?.trim();
    if (!techText) return;
    
    const proj = projectsList.find(p => p.id === projId);
    if (!proj) return;

    if (!proj.techStack.includes(techText)) {
      updateProject(projId, {
        techStack: [...proj.techStack, techText]
      });
    }
    setNewTech({ ...newTech, [projId]: '' });
  };

  const handleRemoveTech = (projId: string, techName: string) => {
    const proj = projectsList.find(p => p.id === projId);
    if (!proj) return;

    updateProject(projId, {
      techStack: proj.techStack.filter(t => t !== techName)
    });
  };

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-aura-600" />
          <h3 className="text-lg font-bold font-heading">Projects</h3>
        </div>
        <Button size="sm" onClick={handleAddEmpty} className="gap-1">
          <Plus className="w-4 h-4" /> Add
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {projectsList.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">No projects added yet. Click "Add" to start.</p>
        ) : (
          projectsList.map((proj, idx) => (
            <div 
              key={proj.id} 
              className="relative border border-slate-150 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/30 group"
            >
              <div className="absolute top-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => deleteProject(proj.id)} 
                  className="text-red-500 hover:text-red-650 p-1 hover:bg-red-50 dark:hover:bg-red-950/25"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-xs font-bold text-aura-500 uppercase tracking-wider">
                Project #{idx + 1}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Project Name"
                  value={proj.name}
                  onChange={(e) => handleFieldChange(proj.id, 'name', e.target.value)}
                  placeholder="e.g. Aura Engine"
                />
                
                {/* Tech Stack Input & Tags */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Tech Stack Tags
                  </label>
                  <div className="flex flex-wrap gap-1.5 min-h-[42px] items-center p-1.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-1 text-xs font-medium bg-aura-50 dark:bg-aura-950/30 text-aura-600 dark:text-aura-400 px-2.5 py-1 rounded-full">
                        {tech}
                        <button 
                          type="button"
                          onClick={() => handleRemoveTech(proj.id, tech)}
                          className="hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      placeholder="Add tag..."
                      value={newTech[proj.id] || ''}
                      onChange={(e) => setNewTech({ ...newTech, [proj.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTech(proj.id);
                        }
                      }}
                      className="flex-1 bg-transparent border-none outline-none text-xs px-2 text-slate-700 dark:text-slate-300 min-w-[60px]"
                    />
                  </div>
                </div>
              </div>

              <Input
                label="Project Summary"
                textarea
                value={proj.summary}
                onChange={(e) => handleFieldChange(proj.id, 'summary', e.target.value)}
                placeholder="Brief summary of the project goals, achievements and architectural choices..."
              />
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
export default ProjectsForm;
