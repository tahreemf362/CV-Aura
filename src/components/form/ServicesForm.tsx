import React, { useState } from 'react';
import { useCV } from '../../hooks/useCV';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Award, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export const ServicesForm: React.FC<{ isOpen?: boolean; onToggle?: () => void }> = ({ isOpen = true, onToggle }) => {
  const { cvData, addService, updateService, deleteService } = useCV();
  const { services } = cvData;
  const [newService, setNewService] = useState('');

  const handleAdd = () => {
    const text = newService.trim();
    if (!text) return;
    addService(text);
    setNewService('');
  };

  return (
    <Card className="flex flex-col gap-4">
      <div 
        onClick={onToggle}
        className={`flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-1 ${onToggle ? 'cursor-pointer select-none' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-aura-600" />
          <h3 className="text-lg font-bold font-heading">Services & Offerings</h3>
        </div>
        {onToggle && (
          <div>
            {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="flex flex-col gap-3">
          {/* List of services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {services.map((svc, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-900/30 border border-slate-150 dark:border-slate-800 rounded-xl group">
                <span className="text-xs font-semibold text-aura-500 w-5">#{idx + 1}</span>
                <input
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-300"
                  value={svc}
                  onChange={(e) => updateService(idx, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => deleteService(idx)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-0.5 rounded transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add new service */}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add a new service (e.g. Cloud Architecture)..."
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd();
                }
              }}
              className="flex-1 !py-2"
            />
            <Button onClick={handleAdd} size="sm" className="px-4">
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
export default ServicesForm;
