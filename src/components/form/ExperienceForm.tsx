import React, { useState } from 'react';
import { useCV } from '../../hooks/useCV';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const { cvData, addExperience, updateExperience, deleteExperience } = useCV();
  const { experienceList } = cvData;
  const [newBullet, setNewBullet] = useState<{ [key: string]: string }>({});

  const handleAddEmpty = () => {
    addExperience({
      company: '',
      position: '',
      timeline: '',
      bulletPoints: [],
    });
  };

  const handleFieldChange = (id: string, field: string, value: string) => {
    updateExperience(id, { [field]: value });
  };

  const handleAddBullet = (expId: string) => {
    const bulletText = newBullet[expId]?.trim();
    if (!bulletText) return;
    
    const exp = experienceList.find(e => e.id === expId);
    if (!exp) return;

    updateExperience(expId, {
      bulletPoints: [...exp.bulletPoints, bulletText]
    });
    setNewBullet({ ...newBullet, [expId]: '' });
  };

  const handleRemoveBullet = (expId: string, bulletIndex: number) => {
    const exp = experienceList.find(e => e.id === expId);
    if (!exp) return;

    updateExperience(expId, {
      bulletPoints: exp.bulletPoints.filter((_, idx) => idx !== bulletIndex)
    });
  };

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-aura-600" />
          <h3 className="text-lg font-bold font-heading">Professional Experience</h3>
        </div>
        <Button size="sm" onClick={handleAddEmpty} className="gap-1">
          <Plus className="w-4 h-4" /> Add
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {experienceList.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">No experiences added yet. Click "Add" to start.</p>
        ) : (
          experienceList.map((exp, idx) => (
            <div 
              key={exp.id} 
              className="relative border border-slate-150 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/30 group"
            >
              <div className="absolute top-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => deleteExperience(exp.id)} 
                  className="text-red-500 hover:text-red-650 p-1 hover:bg-red-50 dark:hover:bg-red-950/25"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-xs font-bold text-aura-500 uppercase tracking-wider">
                Position #{idx + 1}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Company"
                  value={exp.company}
                  onChange={(e) => handleFieldChange(exp.id, 'company', e.target.value)}
                  placeholder="e.g. Acme Corp"
                />
                <Input
                  label="Position"
                  value={exp.position}
                  onChange={(e) => handleFieldChange(exp.id, 'position', e.target.value)}
                  placeholder="e.g. Staff Engineer"
                />
                <Input
                  label="Timeline"
                  value={exp.timeline}
                  onChange={(e) => handleFieldChange(exp.id, 'timeline', e.target.value)}
                  placeholder="e.g. 2021 - Present"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Bullet Points
                </label>
                
                {/* List of existing bullet points */}
                <div className="flex flex-col gap-2 pl-2">
                  {exp.bulletPoints.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="flex items-start gap-2 text-sm bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-2.5 rounded-xl group/bullet">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span className="flex-1 text-slate-700 dark:text-slate-300 break-words">{bullet}</span>
                      <button 
                        onClick={() => handleRemoveBullet(exp.id, bulletIdx)}
                        className="text-slate-400 hover:text-red-500 p-0.5 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new bullet point */}
                <div className="flex gap-2 mt-1">
                  <Input
                    placeholder="Add a key achievement..."
                    value={newBullet[exp.id] || ''}
                    onChange={(e) => setNewBullet({ ...newBullet, [exp.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddBullet(exp.id);
                      }
                    }}
                    className="flex-1 !py-2"
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleAddBullet(exp.id)}
                    className="px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
export default ExperienceForm;
