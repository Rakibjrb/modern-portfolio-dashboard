import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  GripVertical,
  Edit3,
  Trash2,
  CheckCircle2,
  Trophy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { type Experience } from "../types";

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (experience: Experience) => void;
}

export default function ExperienceCard({
  experience,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getEmploymentTypeStyle = (type?: string) => {
    switch (type) {
      case "Full-time":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Part-time":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Contract":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Freelance":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Internship":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      default:
        return "bg-slate-500/10 text-slate-300 border-slate-500/20";
    }
  };

  const formatDate = (dateVal?: string | Date) => {
    if (!dateVal) return "";
    try {
      const dateStr =
        typeof dateVal === "string" ? dateVal : dateVal.toISOString();
      if (dateStr.includes("T")) {
        const d = new Date(dateStr);
        return d.toLocaleString("default", { month: "short", year: "numeric" });
      }
      const [year, month] = dateStr.split("-");
      if (!month) return year;
      const d = new Date(parseInt(year), parseInt(month) - 1);
      return d.toLocaleString("default", { month: "short", year: "numeric" });
    } catch {
      return String(dateVal);
    }
  };

  const isCurrent =
    !experience.endDate ||
    String(experience.endDate).toLowerCase() === "present";

  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80 hover:shadow-2xl hover:shadow-cyan-500/5">
      {/* Top Bar / Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3.5">
          {/* Drag Handle */}
          <div className="mt-1 cursor-grab text-slate-600 transition-colors group-hover:text-slate-400 active:cursor-grabbing">
            <GripVertical className="h-5 w-5" />
          </div>

          {/* Icon Badge */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/80 text-cyan-400 shadow-inner">
            <Briefcase className="h-6 w-6" />
          </div>

          {/* Main Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {experience.title}
              </h3>
              {experience.type && (
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getEmploymentTypeStyle(experience.type)}`}
                >
                  {experience.type}
                </span>
              )}
              {isCurrent && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                  </span>
                  Present
                </span>
              )}
            </div>

            <p className="mt-1 text-base font-semibold text-slate-300">
              {experience.organization}
            </p>

            {/* Meta Row: Location & Dates */}
            <div className="mt-2.5 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                <span>
                  {formatDate(experience.startDate)} –{" "}
                  {isCurrent ? "Present" : formatDate(experience.endDate)}
                </span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>

            {/* Optional High-level Description */}
            {experience.description && (
              <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                {experience.description}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-start">
          <button
            onClick={() => onEdit(experience)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all shadow-sm cursor-pointer"
            title="Edit Experience"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(experience)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 transition-all shadow-sm cursor-pointer"
            title="Delete Experience"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/80 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title={isExpanded ? "Collapse Details" : "Expand Details"}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Details Section */}
      {isExpanded && (
        <div className="mt-5 space-y-4 border-t border-slate-800/80 pt-4">
          {/* Responsibilities */}
          {experience.responsibilities &&
            experience.responsibilities.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  Key Responsibilities
                </h4>
                <ul className="mt-2 space-y-1.5 pl-1">
                  {experience.responsibilities.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400/90">
                <Trophy className="h-3.5 w-3.5 text-amber-400" />
                Key Achievements
              </h4>
              <ul className="mt-2 space-y-1.5 pl-1">
                {experience.achievements.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
