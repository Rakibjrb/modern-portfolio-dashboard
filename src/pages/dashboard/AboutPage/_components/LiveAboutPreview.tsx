import { useWatch, type Control } from "react-hook-form";
import {
  Sparkles,
  Mail,
  Phone,
  Briefcase,
  Code2,
  FolderCheck,
  Clock,
  ExternalLink,
  Quote as QuoteIcon,
  FileDown,
} from "lucide-react";
import { type IAbout } from "../types";

interface LiveAboutPreviewProps {
  control: Control<IAbout>;
}

export default function LiveAboutPreview({ control }: LiveAboutPreviewProps) {
  const formValues = useWatch({ control });

  const {
    name = "Your Name",
    designation = "Your Designation",
    image,
    currentRole,
    techstack,
    experience = 0,
    completedProjects = 0,
    quote,
    description,
    cvlink,
    contacts,
    skills = [],
    socialsLinks = [],
  } = formValues;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-6 sticky top-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-base font-bold text-white">Live Portfolio Preview</h2>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          Realtime
        </span>
      </div>

      {/* Hero Badge / Header Card */}
      <div className="flex flex-col items-center text-center p-5 rounded-2xl border border-slate-800/80 bg-slate-950/60">
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-cyan-500/50 p-1 shadow-xl shadow-cyan-500/10">
          {image ? (
            <img
              src={image}
              alt={name || "Profile"}
              className="h-full w-full rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-800 text-slate-500 font-bold text-xl">
              {name ? name.charAt(0) : "U"}
            </div>
          )}
        </div>

        <h3 className="text-lg font-extrabold text-white">{name || "Full Name"}</h3>
        <p className="text-xs font-semibold text-cyan-400 mt-0.5">{designation || "Title / Role"}</p>

        {currentRole && (
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] text-slate-300">
            <Briefcase className="h-3 w-3 text-cyan-400" />
            <span>{currentRole}</span>
          </div>
        )}

        {quote && (
          <div className="mt-4 flex items-start gap-1.5 rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 text-xs italic text-slate-300 max-w-sm">
            <QuoteIcon className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>"{quote}"</span>
          </div>
        )}
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Experience</span>
          </div>
          <span className="text-xl font-extrabold text-white">{experience || 0}+ yrs</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <FolderCheck className="h-3.5 w-3.5 text-purple-400" />
            <span>Projects</span>
          </div>
          <span className="text-xl font-extrabold text-white">{completedProjects || 0}+ Done</span>
        </div>
      </div>

      {/* Tech Stack Summary */}
      {techstack && (
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3.5 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Code2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>Primary Technologies</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{techstack}</p>
        </div>
      )}

      {/* Bio Overview */}
      {description && (
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3.5 space-y-1.5">
          <span className="text-xs font-semibold text-slate-300">About Story</span>
          <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      )}

      {/* Featured Skills Pills */}
      {skills && skills.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Skills ({skills.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[11px] font-semibold text-purple-300"
              >
                {s?.iconUrl && (
                  <img
                    src={s.iconUrl}
                    alt={s.name}
                    className="h-3.5 w-3.5 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                <span>{s?.name || "Skill"}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {socialsLinks && socialsLinks.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Social Profiles ({socialsLinks.length})
          </span>
          <div className="grid grid-cols-2 gap-2">
            {socialsLinks.map((social, idx) => (
              <a
                key={idx}
                href={social?.url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {social?.iconUrl && (
                    <img
                      src={social.iconUrl}
                      alt={social.name}
                      className="h-3.5 w-3.5 shrink-0 object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  <span className="truncate font-medium">{social?.name || "Link"}</span>
                </div>
                <ExternalLink className="h-3 w-3 shrink-0 text-slate-500" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Direct Contact & Resume links */}
      <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
        {contacts?.email && (
          <div className="flex items-center gap-2 truncate">
            <Mail className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{contacts.email}</span>
          </div>
        )}
        {contacts?.phone && (
          <div className="flex items-center gap-2 truncate">
            <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>{contacts.phone}</span>
          </div>
        )}
        {cvlink && (
          <a
            href={cvlink}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:to-blue-400 transition-all"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>View CV / Resume</span>
          </a>
        )}
      </div>
    </div>
  );
}
