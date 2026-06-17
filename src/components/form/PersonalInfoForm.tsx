import React from 'react';
import { useCV } from '../../hooks/useCV';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { User } from 'lucide-react';

export const PersonalInfoForm: React.FC = () => {
  const { cvData, updatePersonalInfo } = useCV();
  const { name, title, email, phone, location } = cvData.personalInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
        <User className="w-5 h-5 text-aura-600" />
        <h3 className="text-lg font-bold font-heading">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="e.g. John Doe"
        />
        <Input
          label="Professional Title"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="e.g. Senior Full-Stack Architect"
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="e.g. email@example.com"
        />
        <Input
          label="Phone Number"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="e.g. +1 (555) 000-0000"
        />
        <div className="md:col-span-2">
          <Input
            label="Location"
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA"
          />
        </div>
      </div>
    </Card>
  );
};
export default PersonalInfoForm;
