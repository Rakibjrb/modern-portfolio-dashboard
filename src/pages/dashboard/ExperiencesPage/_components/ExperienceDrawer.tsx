import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Briefcase, GraduationCap, Check } from 'lucide-react';
import { type Experience, type Education, type EmploymentType, type ActiveTab } from '../types';

interface ExperienceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  editingItem: Experience | Education | null;
  onSaveExperience: (exp: Experience) => void;
  onSaveEducation: (edu: Education) => void;
}

export default function ExperienceDrawer({
  isOpen,
  onClose,
  activeTab,
  editingItem,
  onSaveExperience,
  onSaveEducation,
}: ExperienceDrawerProps) {
  // Experience State
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [expLocation, setExpLocation] = useState('');
  const [empType, setEmpType] = useState<EmploymentType>('Full-time');
  const [expStartDate, setExpStartDate] = useState('');
  const [expEndDate, setExpEndDate] = useState('');
  const [isCurrentExp, setIsCurrentExp] = useState(false);
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [achievements, setAchievements] = useState<string[]>(['']);

  // Education State
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [institution, setInstitution] = useState('');
  const [result, setResult] = useState('');
  const [eduLocation, setEduLocation] = useState('');
  const [eduStartDate, setEduStartDate] = useState('');
  const [eduEndDate, setEduEndDate] = useState('');
  const [isCurrentEdu, setIsCurrentEdu] = useState(false);
  const [eduDescription, setEduDescription] = useState('');

  useEffect(() => {
    if (editingItem) {
      if ('company' in editingItem) {
        // Experience
        setTitle(editingItem.title || '');
        setCompany(editingItem.company || '');
        setExpLocation(editingItem.location || '');
        setEmpType(editingItem.type || 'Full-time');
        setExpStartDate(editingItem.startDate || '');
        setExpEndDate(editingItem.endDate || '');
        setIsCurrentExp(editingItem.isCurrent || false);
        setResponsibilities(editingItem.responsibilities?.length ? [...editingItem.responsibilities] : ['']);
        setAchievements(editingItem.achievements?.length ? [...editingItem.achievements] : ['']);
      } else {
        // Education
        setDegree(editingItem.degree || '');
        setFieldOfStudy(editingItem.fieldOfStudy || '');
        setInstitution(editingItem.institution || '');
        setResult(editingItem.result || '');
        setEduLocation(editingItem.location || '');
        setEduStartDate(editingItem.startDate || '');
        setEduEndDate(editingItem.endDate || '');
        setIsCurrentEdu(editingItem.isCurrent || false);
        setEduDescription(editingItem.description || '');
      }
    } else {
      // Reset form
      setTitle('');
      setCompany('');
      setExpLocation('');
      setEmpType('Full-time');
      setExpStartDate('');
      setExpEndDate('');
      setIsCurrentExp(false);
      setResponsibilities(['']);
      setAchievements(['']);

      setDegree('');
      setFieldOfStudy('');
      setInstitution('');
      setResult('');
      setEduLocation('');
      setEduStartDate('');
      setEduEndDate('');
      setIsCurrentEdu(false);
      setEduDescription('');
    }
  }, [editingItem, isOpen, activeTab]);

  if (!isOpen) return null;

  const isEditingExperience = editingItem ? 'company' in editingItem : activeTab === 'experience';

  // Dynamic Array Handlers for Responsibilities & Achievements
  const handleAddDynamicRow = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const handleRemoveDynamicRow = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleDynamicChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditingExperience) {
      const expData: Experience = {
        id: editingItem ? editingItem.id : `exp-${Date.now()}`,
        title,
        company,
        location: expLocation,
        type: empType,
        startDate: expStartDate,
        endDate: isCurrentExp ? undefined : expEndDate,
        isCurrent: isCurrentExp,
        responsibilities: responsibilities.filter(r => r.trim().length > 0),
        achievements: achievements.filter(a => a.trim().length > 0),
        order: editingItem ? editingItem.order : 1,
      };
      onSaveExperience(expData);
    } else {
      const eduData: Education = {
        id: editingItem ? editingItem.id : `edu-${Date.now()}`,
        degree,
        fieldOfStudy,
        institution,
        result,
        location: eduLocation,
        startDate: eduStartDate,
        endDate: isCurrentEdu ? undefined : eduEndDate,
        isCurrent: isCurrentEdu,
        description: eduDescription,
        order: editingItem ? editingItem.order : 1,
      };
      onSaveEducation(eduData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-2xl border-l border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800 text-cyan-400">
                {isEditingExperience ? <Briefcase className="h-5 w-5" /> : <GraduationCap className="h-5 w-5 text-purple-400" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100">
                  {editingItem ? 'Edit' : 'Add New'} {isEditingExperience ? 'Professional Experience' : 'Academic Qualification'}
                </h2>
                <p className="text-xs text-slate-400">Fill in details below to publish to your public portfolio</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex h-[calc(100vh-80px)] flex-col justify-between">
            <div className="space-y-6 overflow-y-auto p-6 text-sm">
              {isEditingExperience ? (
                /* Experience Form */
                <>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">Job Title *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">Company / Organization *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={e => setCompany(e.target.value)}
                          placeholder="e.g. Google or TechCorp"
                          className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">Employment Type</label>
                      <select
                        value={empType}
                        onChange={e => setEmpType(e.target.value as EmploymentType)}
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">Location</label>
                      <input
                        type="text"
                        value={expLocation}
                        onChange={e => setExpLocation(e.target.value)}
                        placeholder="e.g. San Francisco, CA (Hybrid)"
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Dates & Current Switch */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-4">
                    <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 font-medium">
                      <input
                        type="checkbox"
                        checked={isCurrentExp}
                        onChange={e => setIsCurrentExp(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span>I currently work here</span>
                    </label>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Start Month/Year</label>
                        <input
                          type="month"
                          required
                          value={expStartDate}
                          onChange={e => setExpStartDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">End Month/Year</label>
                        <input
                          type="month"
                          disabled={isCurrentExp}
                          value={isCurrentExp ? '' : expEndDate}
                          onChange={e => setExpEndDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-2 text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Responsibilities Input List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold text-slate-200">Key Responsibilities</label>
                      <button
                        type="button"
                        onClick={() => handleAddDynamicRow(setResponsibilities)}
                        className="flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Responsibility
                      </button>
                    </div>
                    <div className="space-y-2.5">
                      {responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={resp}
                            onChange={e => handleDynamicChange(idx, e.target.value, setResponsibilities)}
                            placeholder={`Responsibility #${idx + 1}...`}
                            className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                          />
                          {responsibilities.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveDynamicRow(idx, setResponsibilities)}
                              className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Achievements Input List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold text-slate-200">Key Achievements</label>
                      <button
                        type="button"
                        onClick={() => handleAddDynamicRow(setAchievements)}
                        className="flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Achievement
                      </button>
                    </div>
                    <div className="space-y-2.5">
                      {achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={ach}
                            onChange={e => handleDynamicChange(idx, e.target.value, setAchievements)}
                            placeholder={`Achievement #${idx + 1}...`}
                            className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                          />
                          {achievements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveDynamicRow(idx, setAchievements)}
                              className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Education Form */
                <>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">Degree *</label>
                      <input
                        type="text"
                        required
                        value={degree}
                        onChange={e => setDegree(e.target.value)}
                        placeholder="e.g. Bachelor of Science"
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">Field of Study *</label>
                      <input
                        type="text"
                        required
                        value={fieldOfStudy}
                        onChange={e => setFieldOfStudy(e.target.value)}
                        placeholder="e.g. Computer Science"
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">Institution *</label>
                      <input
                        type="text"
                        required
                        value={institution}
                        onChange={e => setInstitution(e.target.value)}
                        placeholder="e.g. Stanford University"
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">Result / CGPA</label>
                      <input
                        type="text"
                        value={result}
                        onChange={e => setResult(e.target.value)}
                        placeholder="e.g. GPA: 3.92 / 4.00"
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1.5">Location</label>
                    <input
                      type="text"
                      value={eduLocation}
                      onChange={e => setEduLocation(e.target.value)}
                      placeholder="e.g. Stanford, CA"
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-4">
                    <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 font-medium">
                      <input
                        type="checkbox"
                        checked={isCurrentEdu}
                        onChange={e => setIsCurrentEdu(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500"
                      />
                      <span>Currently studying here</span>
                    </label>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Start Month/Year</label>
                        <input
                          type="month"
                          required
                          value={eduStartDate}
                          onChange={e => setEduStartDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-2 text-slate-100 focus:border-purple-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">End Month/Year</label>
                        <input
                          type="month"
                          disabled={isCurrentEdu}
                          value={isCurrentEdu ? '' : eduEndDate}
                          onChange={e => setEduEndDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-2 text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1.5">Description / Key Highlights</label>
                    <textarea
                      rows={3}
                      value={eduDescription}
                      onChange={e => setEduDescription(e.target.value)}
                      placeholder="Specialized coursework, thesis topic, honors..."
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-800 bg-slate-900/90 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-700/80 bg-slate-800 px-5 py-2.5 font-semibold text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex items-center gap-2 rounded-xl px-6 py-2.5 font-bold shadow-lg transition-all ${isEditingExperience
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/20'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-slate-950 hover:from-purple-400 hover:to-indigo-500 shadow-purple-500/20'
                  }`}
              >
                <Check className="h-4 w-4" />
                {editingItem ? 'Save Changes' : 'Publish Entry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
