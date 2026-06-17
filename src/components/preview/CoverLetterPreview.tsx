import { useCV } from '../../hooks/useCV';

export const CoverLetterPreview = () => {
  const { coverLetterData } = useCV();
  const { senderInfo, recipientInfo, date, subject, body, selectedTemplate } = coverLetterData;

  // Split body text by double newlines for paragraph rendering
  const paragraphs = body ? body.split('\n\n') : [];

  // Template 0: Executive Formal (Centred serif style, classic editorial spacing)
  const renderExecutiveFormal = () => {
    return (
      <div className="font-serif text-black dark:text-white flex flex-col gap-6">
        {/* Sender Info - Centered */}
        <div className="text-center border-b border-black dark:border-white pb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide">{senderInfo.name || 'Sender Name'}</h1>
          <h2 className="text-sm italic text-slate-600 dark:text-slate-350">{senderInfo.title || 'Sender Title'}</h2>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-sans font-semibold text-slate-500 uppercase mt-1">
            {senderInfo.email && <span>{senderInfo.email}</span>}
            {senderInfo.phone && <span>{senderInfo.phone}</span>}
            {senderInfo.location && <span>{senderInfo.location}</span>}
          </div>
        </div>

        {/* Date and Recipient Info */}
        <div className="font-sans text-sm flex flex-col gap-1.5 mt-2">
          <span className="text-slate-400 font-semibold">{date || 'Date'}</span>
          <div className="flex flex-col mt-2">
            <span className="font-bold text-slate-900 dark:text-white">{recipientInfo.name || 'Recipient Name'}</span>
            <span className="text-slate-650 dark:text-slate-300 font-medium">{recipientInfo.title}</span>
            <span className="text-slate-650 dark:text-slate-300">{recipientInfo.company}</span>
            <span className="text-slate-500 text-xs mt-0.5">{recipientInfo.address}</span>
          </div>
        </div>

        {/* Subject */}
        {subject && (
          <div className="font-sans font-black text-sm border-l-2 border-black dark:border-white pl-3 py-1 my-2">
            Subject: {subject}
          </div>
        )}

        {/* Letter Body */}
        <div className="text-sm leading-relaxed font-sans text-slate-800 dark:text-slate-200 flex flex-col gap-4 mt-2">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line">{p}</p>
          ))}
        </div>
      </div>
    );
  };

  // Template 1: Bold Modern (Clean sans-serif typography, asymmetric header)
  const renderBoldModern = () => {
    return (
      <div className="font-sans text-slate-850 dark:text-neutral-200 flex flex-col gap-6">
        {/* Left Aligned Clean Header */}
        <div className="flex flex-col gap-1.5 pb-5 border-b-2 border-black dark:border-white">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-black text-lg">
            {senderInfo.name ? senderInfo.name.charAt(0) : 'S'}
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-2">
            {senderInfo.name || 'Sender Name'}
          </h1>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {senderInfo.title || 'Sender Title'}
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 font-semibold mt-1">
            {senderInfo.email && <span>{senderInfo.email}</span>}
            {senderInfo.phone && <span>{senderInfo.phone}</span>}
            {senderInfo.location && <span>{senderInfo.location}</span>}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold py-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-400 uppercase tracking-wider">Date</span>
            <span className="text-slate-900 dark:text-white">{date || 'Date'}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-400 uppercase tracking-wider">Recipient</span>
            <span className="text-slate-900 dark:text-white">{recipientInfo.name || 'Recipient Name'}</span>
            <span className="text-slate-600 dark:text-slate-400">{recipientInfo.company}</span>
          </div>
        </div>

        {/* Subject */}
        {subject && (
          <div className="text-sm font-extrabold uppercase tracking-wide bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl">
            RE: {subject}
          </div>
        )}

        {/* Letter Body */}
        <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 flex flex-col gap-4">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line">{p}</p>
          ))}
        </div>
      </div>
    );
  };

  // Template 2: Chic Designer (Thin border box framing the text, header details grid)
  const renderChicDesigner = () => {
    return (
      <div className="border border-black dark:border-neutral-800 p-6 md:p-8 rounded-2xl flex flex-col gap-6 font-sans text-slate-800 dark:text-neutral-200">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-100 dark:border-neutral-900 pb-5">
          <div className="md:col-span-2">
            <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider">
              {senderInfo.name || 'Sender Name'}
            </h1>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mt-0.5">
              {senderInfo.title || 'Sender Title'}
            </span>
            <div className="text-xs text-slate-400 mt-2 font-medium flex flex-col gap-0.5">
              {senderInfo.email && <span>{senderInfo.email}</span>}
              {senderInfo.phone && <span>{senderInfo.phone}</span>}
            </div>
          </div>
          <div className="text-xs md:text-right flex flex-col gap-0.5 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-900 pt-4 md:pt-0 md:pl-6">
            <span className="text-slate-400 font-bold uppercase">To:</span>
            <span className="font-bold text-slate-900 dark:text-white">{recipientInfo.name}</span>
            <span>{recipientInfo.company}</span>
            <span>{recipientInfo.address}</span>
            <span className="text-slate-400 font-bold mt-2">{date}</span>
          </div>
        </div>

        {/* Subject */}
        {subject && (
          <div className="text-sm font-bold tracking-tight italic underline text-slate-900 dark:text-white">
            Regarding: {subject}
          </div>
        )}

        {/* Letter Body */}
        <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 flex flex-col gap-4 font-serif">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line">{p}</p>
          ))}
        </div>

        {/* Signature Line */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-neutral-900 w-fit pr-12">
          <span className="text-xs italic text-slate-400">Signature</span>
          <div className="font-serif font-bold text-sm text-slate-900 dark:text-white mt-1.5">
            {senderInfo.name}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-250 dark:border-slate-800 transition-all duration-300">
      {selectedTemplate === 0 && renderExecutiveFormal()}
      {selectedTemplate === 1 && renderBoldModern()}
      {selectedTemplate === 2 && renderChicDesigner()}
    </div>
  );
};

export default CoverLetterPreview;
