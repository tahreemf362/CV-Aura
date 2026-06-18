import { useCV } from '../../hooks/useCV';
import { Download } from 'lucide-react';
import { triggerMonetizedPrint } from '../../utils/monetize';


export const CVPreview = () => {
  const { cvData } = useCV();
  const { personalInfo, experienceList, educationList, projectsList, services, selectedTemplate } = cvData;

  // Render Template 0: Classic Editorial (Serif headings, elegant borders, centered)
  const renderClassicEditorial = () => {
    return (
      <div className="font-serif text-black dark:text-white flex flex-col gap-8">
        {/* Centered Header */}
        <div className="text-center flex flex-col gap-3 pb-6 border-b-4 border-double border-slate-900 dark:border-white">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-serif text-slate-900 dark:text-white">
            {personalInfo.name || 'Your Name'}
          </h1>
          <h2 className="text-lg md:text-xl font-medium italic text-slate-700 dark:text-slate-350">
            {personalInfo.title || 'Professional Title'}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-xs font-sans font-semibold text-slate-650 dark:text-slate-400 mt-1 uppercase tracking-wider">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {/* Experience Section */}
        {experienceList.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold uppercase tracking-widest border-b border-slate-400 dark:border-slate-700 pb-1.5 font-sans">
              Professional Experience
            </h3>
            <div className="flex flex-col gap-6">
              {experienceList.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline gap-4 font-sans text-sm">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                        {exp.company}
                      </span>
                      <span className="text-slate-400 px-2">/</span>
                      <span className="font-medium italic text-slate-755 dark:text-slate-300">
                        {exp.position}
                      </span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-550">
                      {exp.timeline}
                    </span>
                  </div>
                  {exp.bulletPoints.length > 0 && (
                    <ul className="list-disc pl-5 text-sm font-sans text-slate-650 dark:text-slate-300 flex flex-col gap-1.5 leading-relaxed">
                      {exp.bulletPoints.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projectsList.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold uppercase tracking-widest border-b border-slate-400 dark:border-slate-700 pb-1.5 font-sans">
              Key Projects
            </h3>
            <div className="flex flex-col gap-5">
              {projectsList.map((proj) => (
                <div key={proj.id} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline font-sans text-sm">
                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wide">{proj.name}</span>
                    {proj.techStack.length > 0 && (
                      <span className="text-xs italic text-slate-500">
                        {proj.techStack.join(', ')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-sans text-slate-650 dark:text-slate-300 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          {educationList.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold uppercase tracking-widest border-b border-slate-400 dark:border-slate-700 pb-1.5">
                Education
              </h3>
              <div className="flex flex-col gap-4">
                {educationList.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                      <span>{edu.school}</span>
                      <span className="text-xs font-semibold text-slate-500">{edu.graduationYear}</span>
                    </div>
                    <div className="italic text-slate-650 dark:text-slate-350">{edu.degree}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {services.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold uppercase tracking-widest border-b border-slate-400 dark:border-slate-700 pb-1.5">
                Core Offerings
              </h3>
              <div className="flex flex-wrap gap-2">
                {services.map((svc, idx) => (
                  <span key={idx} className="text-xs font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-md">
                    {svc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render Template 1: Minimal Grid (Sans-serif, two-column split, sleek spacing)
  const renderMinimalGrid = () => {
    return (
      <div className="font-sans text-slate-850 dark:text-neutral-200">
        {/* Simple Side-by-Side Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black dark:border-white pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white leading-none">
              {personalInfo.name || 'Your Name'}
            </h1>
            <span className="text-sm font-bold uppercase tracking-widest text-slate-500 mt-2 block">
              {personalInfo.title || 'Professional Title'}
            </span>
          </div>
          <div className="flex flex-col text-xs font-semibold text-slate-600 dark:text-slate-400 md:text-right gap-1">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Narrow Left Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {services.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Services</h3>
                <ul className="flex flex-col gap-1.5">
                  {services.map((svc, idx) => (
                    <li key={idx} className="text-sm font-medium text-slate-800 dark:text-neutral-250 border-l border-black dark:border-white pl-2">
                      {svc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {educationList.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Education</h3>
                <div className="flex flex-col gap-3">
                  {educationList.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="font-bold text-slate-900 dark:text-white">{edu.school}</div>
                      <div className="text-slate-650 dark:text-neutral-400">{edu.degree}</div>
                      <div className="text-slate-400 font-semibold mt-0.5">{edu.graduationYear}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wide Right Column */}
          <div className="md:col-span-8 flex flex-col gap-8">
            
            {/* Experience */}
            {experienceList.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                  Experience
                </h3>
                <div className="flex flex-col gap-5">
                  {experienceList.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {exp.position} <span className="text-slate-400 font-medium">@ {exp.company}</span>
                        </span>
                        <span className="text-xs text-slate-500 font-medium shrink-0">{exp.timeline}</span>
                      </div>
                      {exp.bulletPoints.length > 0 && (
                        <ul className="list-disc pl-4 text-xs text-slate-650 dark:text-neutral-350 flex flex-col gap-1 leading-relaxed mt-1">
                          {exp.bulletPoints.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projectsList.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                  Projects
                </h3>
                <div className="flex flex-col gap-5">
                  {projectsList.map((proj) => (
                    <div key={proj.id} className="flex flex-col gap-1">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{proj.name}</span>
                        {proj.techStack.length > 0 && (
                          <div className="flex gap-1">
                            {proj.techStack.map((tech) => (
                              <span key={tech} className="text-[9px] font-bold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded uppercase">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-650 dark:text-neutral-350 leading-relaxed">
                        {proj.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    );
  };

  // Render Template 2: Bold Architect (Top black header, bold dividers, timeline vertical rule)
  const renderBoldArchitect = () => {
    return (
      <div className="font-sans text-black dark:text-neutral-100 flex flex-col gap-8">
        
        {/* Thick Black Header Box */}
        <div className="bg-black text-white dark:bg-neutral-900 dark:border dark:border-neutral-800 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
              {personalInfo.name || 'Your Name'}
            </h1>
            <h2 className="text-sm font-bold tracking-widest uppercase text-slate-300 mt-1.5">
              {personalInfo.title || 'Professional Title'}
            </h2>
          </div>
          <div className="flex flex-col text-xs gap-1 border-t md:border-t-0 md:border-l border-slate-700 pt-3 md:pt-0 md:pl-5 font-semibold text-slate-350">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {/* Experience Section with left border timeline */}
        {experienceList.length > 0 && (
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-black uppercase tracking-widest bg-slate-100 dark:bg-neutral-900 border border-slate-250 dark:border-neutral-800 px-4 py-2 rounded-xl">
              Professional Experience
            </h3>
            <div className="flex flex-col gap-6 pl-3 border-l-2 border-black dark:border-neutral-700 ml-4">
              {experienceList.map((exp) => (
                <div key={exp.id} className="relative flex flex-col gap-1.5">
                  <div className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wide">
                      {exp.position} <span className="text-slate-400 font-medium">| {exp.company}</span>
                    </h4>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-slate-200 dark:border-neutral-800 w-fit">
                      {exp.timeline}
                    </span>
                  </div>
                  {exp.bulletPoints.length > 0 && (
                    <ul className="list-disc pl-4 text-xs text-slate-650 dark:text-slate-355 flex flex-col gap-1 leading-relaxed">
                      {exp.bulletPoints.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projectsList.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest bg-slate-100 dark:bg-neutral-900 border border-slate-250 dark:border-neutral-800 px-4 py-2 rounded-xl">
              Key Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectsList.map((proj) => (
                <div key={proj.id} className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-col gap-2 bg-slate-50/20 dark:bg-neutral-900/10">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    {proj.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    {proj.summary}
                  </p>
                  {proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto pt-2">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[9px] font-bold bg-neutral-950 text-white dark:bg-white dark:text-black px-1.5 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationList.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-black uppercase tracking-widest bg-slate-100 dark:bg-neutral-900 border border-slate-250 dark:border-neutral-800 px-4 py-2 rounded-xl">
                Education
              </h3>
              <div className="flex flex-col gap-3">
                {educationList.map((edu) => (
                  <div key={edu.id} className="text-xs border-b border-slate-100 dark:border-slate-900 pb-2">
                    <div className="font-bold text-slate-900 dark:text-white uppercase">{edu.school}</div>
                    <div className="text-slate-650 dark:text-neutral-400 mt-0.5">{edu.degree}</div>
                    <div className="text-slate-400 font-semibold mt-1">{edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {services.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-black uppercase tracking-widest bg-slate-100 dark:bg-neutral-900 border border-slate-250 dark:border-neutral-800 px-4 py-2 rounded-xl">
                Offerings
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {services.map((svc, idx) => (
                  <span key={idx} className="text-[10px] font-bold border border-black dark:border-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {svc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    );
  };

  return (
    <div className="glass rounded-3xl p-5 md:p-12 shadow-2xl border border-slate-250 dark:border-slate-800 transition-all duration-300 relative group/preview print:bg-white print:border-none print:shadow-none print:rounded-none print:p-8 print:md:p-12">
      {/* Grey Floating Download Button */}
      <button 
        onClick={triggerMonetizedPrint}
        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-250 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-500 dark:text-neutral-450 transition-colors cursor-pointer print:hidden flex items-center justify-center shadow-sm z-30"
        title="Download PDF"
      >
        <Download className="w-4 h-4" />
      </button>
      {selectedTemplate === 0 && renderClassicEditorial()}
      {selectedTemplate === 1 && renderMinimalGrid()}
      {selectedTemplate === 2 && renderBoldArchitect()}
    </div>
  );
};

export default CVPreview;
