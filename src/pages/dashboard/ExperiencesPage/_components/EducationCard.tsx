import { GraduationCap, MapPin, Calendar, Award, Edit3, Trash2 } from 'lucide-react';
import { type Education } from '../types';

interface EducationCardProps {
  education: Education;
  onEdit: (education: Education) => void;
  onDelete: (education: Education) => void;
}

export default function EducationCard({ education, onEdit, onDelete }: EducationCardProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    if (!month) return year;
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80 hover:shadow-2xl hover:shadow-purple-500/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3.5">
          {/* Graduation Cap Badge */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/80 text-purple-400 shadow-inner">
            <GraduationCap className="h-6 w-6" />
          </div>

          {/* Main Education Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                {education.degree} in {education.fieldOfStudy}
              </h3>
              {education.result && (
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-300">
                  <Award className="h-3 w-3 text-purple-400" />
                  {education.result}
                </span>
              )}
            </div>

            <p className="mt-1 text-base font-semibold text-slate-300">
              {education.institution}
            </p>

            {/* Meta Row */}
            <div className="mt-2.5 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                <span>
                  {formatDate(education.startDate)} – {education.isCurrent ? 'Present' : formatDate(education.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                <span>{education.location}</span>
              </div>
            </div>

            {/* Optional Description */}
            {education.description && (
              <p className="mt-3.5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                {education.description}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 self-end sm:self-start">
          <button
            onClick={() => onEdit(education)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-400 transition-all shadow-sm"
            title="Edit Education"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(education)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 transition-all shadow-sm"
            title="Delete Education"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
