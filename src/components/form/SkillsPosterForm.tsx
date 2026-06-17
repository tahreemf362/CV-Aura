import React, { useState } from 'react';
import { useCV } from '../../hooks/useCV';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Award, Plus, Trash2 } from 'lucide-react';

export const SkillsPosterForm: React.FC = () => {
  const { 
    skillsPosterData, 
    updatePosterDetails, 
    addPosterSkill, 
    updatePosterSkill, 
    deletePosterSkill 
  } = useCV();
  const { name, tagline, bio, skills, contactLink } = skillsPosterData;

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Expert');
  const [newSkillDesc, setNewSkillDesc] = useState('');

  const handleAddSkill = () => {
    const sName = newSkillName.trim();
    if (!sName) return;

    addPosterSkill({
      name: sName,
      proficiency: newSkillProficiency,
      description: newSkillDesc.trim(),
    });

    setNewSkillName('');
    setNewSkillDesc('');
  };

  const handleSkillChange = (id: string, field: string, value: string) => {
    updatePosterSkill(id, { [field]: value });
  };

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
        <Award className="w-5 h-5 text-slate-800 dark:text-white" />
        <h3 className="text-lg font-bold font-heading">Skills Poster Details</h3>
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Presenter Name"
          value={name}
          onChange={(e) => updatePosterDetails({ name: e.target.value })}
          placeholder="e.g. Aura Developer"
        />
        <Input
          label="Poster Tagline"
          value={tagline}
          onChange={(e) => updatePosterDetails({ tagline: e.target.value })}
          placeholder="e.g. Architecting Modern Web Experiences"
        />
        <div className="md:col-span-2">
          <Input
            label="Value Proposition / Bio Statement"
            textarea
            rows={3}
            value={bio}
            onChange={(e) => updatePosterDetails({ bio: e.target.value })}
            placeholder="A short description of what you offer to clients..."
          />
        </div>
        <div className="md:col-span-2">
          <Input
            label="Contact & Link Footer"
            value={contactLink}
            onChange={(e) => updatePosterDetails({ contactLink: e.target.value })}
            placeholder="e.g. Email • Phone • Portfolio URL"
          />
        </div>
      </div>

      <hr className="border-slate-100 dark:border-slate-800 my-1" />

      {/* Skills Manager */}
      <div className="flex flex-col gap-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage Poster Skills</span>

        {/* Existing poster skills */}
        <div className="flex flex-col gap-3">
          {skills.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-2">No skills added yet.</p>
          ) : (
            skills.map((skill, idx) => (
              <div 
                key={skill.id} 
                className="relative border border-slate-150 dark:border-slate-800 rounded-xl p-3 flex flex-col gap-2.5 bg-slate-50/50 dark:bg-slate-900/30 group"
              >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => deletePosterSkill(skill.id)} 
                    className="text-red-500 hover:text-red-650 p-1 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-[10px] font-bold text-slate-400">Skill #{idx + 1}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    label="Skill Title"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                    placeholder="e.g. Next.js Ecosystem"
                  />
                  <Input
                    label="Proficiency Level"
                    value={skill.proficiency}
                    onChange={(e) => handleSkillChange(skill.id, 'proficiency', e.target.value)}
                    placeholder="e.g. Expert / Advanced"
                  />
                </div>
                <Input
                  label="Description / Deliverable"
                  value={skill.description}
                  onChange={(e) => handleSkillChange(skill.id, 'description', e.target.value)}
                  placeholder="e.g. Building client engines with high Lighthouse performance score..."
                />
              </div>
            ))
          )}
        </div>

        {/* Add new skill */}
        <div className="border border-dashed border-slate-250 dark:border-slate-805 p-4 rounded-xl flex flex-col gap-3">
          <span className="text-xs font-semibold text-slate-500">Add New Poster Skill</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Skill Name"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. GraphQL API Scaling"
            />
            <Input
              label="Proficiency"
              value={newSkillProficiency}
              onChange={(e) => setNewSkillProficiency(e.target.value)}
              placeholder="e.g. Expert / Advanced"
            />
          </div>
          <Input
            label="Deliverable / Showcase Summary"
            value={newSkillDesc}
            onChange={(e) => setNewSkillDesc(e.target.value)}
            placeholder="Describe what you deliver with this skill..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
          />
          <Button onClick={handleAddSkill} size="sm" className="mt-2 w-full md:w-auto self-end">
            <Plus className="w-4 h-4" /> Add Skill
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default SkillsPosterForm;
