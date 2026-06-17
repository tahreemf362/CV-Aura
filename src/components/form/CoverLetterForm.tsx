import React from 'react';
import { useCV } from '../../hooks/useCV';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { FileText } from 'lucide-react';

export const CoverLetterForm: React.FC = () => {
  const { coverLetterData, updateSenderInfo, updateRecipientInfo, updateCoverLetter } = useCV();
  const { senderInfo, recipientInfo, date, subject, body } = coverLetterData;

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
        <FileText className="w-5 h-5 text-slate-805 dark:text-white" />
        <h3 className="text-lg font-bold font-heading">Cover Letter Details</h3>
      </div>

      {/* Sender Info Section */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sender Details</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Sender Name"
            value={senderInfo.name}
            onChange={(e) => updateSenderInfo({ name: e.target.value })}
            placeholder="e.g. Aura Developer"
          />
          <Input
            label="Sender Title"
            value={senderInfo.title}
            onChange={(e) => updateSenderInfo({ title: e.target.value })}
            placeholder="e.g. Senior Software Architect"
          />
          <Input
            label="Sender Email"
            value={senderInfo.email}
            onChange={(e) => updateSenderInfo({ email: e.target.value })}
            placeholder="e.g. email@example.com"
          />
          <Input
            label="Sender Phone"
            value={senderInfo.phone}
            onChange={(e) => updateSenderInfo({ phone: e.target.value })}
            placeholder="e.g. +1 (555) 000-0000"
          />
          <div className="md:col-span-2">
            <Input
              label="Sender Location"
              value={senderInfo.location}
              onChange={(e) => updateSenderInfo({ location: e.target.value })}
              placeholder="e.g. San Francisco, CA"
            />
          </div>
        </div>
      </div>

      <hr className="border-slate-100 dark:border-slate-800 my-1" />

      {/* Recipient Info Section */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recipient Details</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Recipient Name"
            value={recipientInfo.name}
            onChange={(e) => updateRecipientInfo({ name: e.target.value })}
            placeholder="e.g. Hiring Manager"
          />
          <Input
            label="Recipient Title"
            value={recipientInfo.title}
            onChange={(e) => updateRecipientInfo({ title: e.target.value })}
            placeholder="e.g. Director of Engineering"
          />
          <Input
            label="Company"
            value={recipientInfo.company}
            onChange={(e) => updateRecipientInfo({ company: e.target.value })}
            placeholder="e.g. Stripe Inc."
          />
          <Input
            label="Address"
            value={recipientInfo.address}
            onChange={(e) => updateRecipientInfo({ address: e.target.value })}
            placeholder="e.g. South San Francisco, CA"
          />
        </div>
      </div>

      <hr className="border-slate-100 dark:border-slate-800 my-1" />

      {/* Letter Content Section */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Letter Content</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Date"
            value={date}
            onChange={(e) => updateCoverLetter({ date: e.target.value })}
            placeholder="e.g. June 17, 2026"
          />
          <Input
            label="Subject Line"
            value={subject}
            onChange={(e) => updateCoverLetter({ subject: e.target.value })}
            placeholder="e.g. Application for Architect Role"
          />
        </div>
        <Input
          label="Letter Body"
          textarea
          rows={8}
          value={body}
          onChange={(e) => updateCoverLetter({ body: e.target.value })}
          placeholder="Write the content of your cover letter here..."
        />
      </div>
    </Card>
  );
};
export default CoverLetterForm;
