import React from 'react';
import { useCV } from '../../hooks/useCV';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { GraduationCap, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export const EducationForm: React.FC<{ isOpen?: boolean; onToggle?: () => void }> = ({ isOpen = true, onToggle }) => {
  const { cvData, addEducation, updateEducation, deleteEducation } = useCV();
  const { educationList } = cvData;

  const handleAddEmpty = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion from toggling when clicking "Add"
    addEducation({
      school: '',
      degree: '',
      graduationYear: '',
    });
  };

  const handleFieldChange = (id: string, field: string, value: string) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <Card className="flex flex-col gap-5">
      <div 
        onClick={onToggle}
        className={`flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-1 ${onToggle ? 'cursor-pointer select-none' : ''}`}
      >
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-aura-600" />
          <h3 className="text-lg font-bold font-heading">Education</h3>
        </div>
        <div className="flex items-center gap-3">
          {isOpen && (
            <Button size="sm" onClick={handleAddEmpty} className="gap-1 z-10">
              <Plus className="w-4 h-4" /> Add
            </Button>
          )}
          {onToggle && (
            <div>
              {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-6">
        {educationList.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">No education details added yet. Click "Add" to start.</p>
        ) : (
          educationList.map((edu, idx) => (
            <div 
              key={edu.id} 
              className="relative border border-slate-150 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/30 group"
            >
              <div className="absolute top-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => deleteEducation(edu.id)} 
                  className="text-red-500 hover:text-red-650 p-1 hover:bg-red-50 dark:hover:bg-red-950/25"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-xs font-bold text-aura-500 uppercase tracking-wider">
                Education #{idx + 1}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="School / University"
                  value={edu.school}
                  onChange={(e) => handleFieldChange(edu.id, 'school', e.target.value)}
                  placeholder="e.g. Stanford University"
                />
                <Input
                  label="Degree / Certificate"
                  value={edu.degree}
                  onChange={(e) => handleFieldChange(edu.id, 'degree', e.target.value)}
                  placeholder="e.g. B.S. in Computer Science"
                />
                <Input
                  label="Graduation Year"
                  value={edu.graduationYear}
                  onChange={(e) => handleFieldChange(edu.id, 'graduationYear', e.target.value)}
                  placeholder="e.g. 2020"
                />
              </div>
            </div>
          ))
        )}
      </div>
      )}
    </Card>
  );
};
export default EducationForm;
