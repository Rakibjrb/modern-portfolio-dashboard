import { Star, ExternalLink, Pencil, Trash2, Globe } from "lucide-react";
import { type Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onToggleFeatured: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Full-Stack": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Frontend: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Backend: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Automation: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  onToggleFeatured,
}: ProjectCardProps) {
  const categoryStyle =
    CATEGORY_COLORS[project.category] ||
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl">
      {/* Top Media Image Container */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

        {/* Category Badge */}
        <span
          className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${categoryStyle}`}
        >
          {project.category}
        </span>

        {/* Featured Toggle Star Button */}
        <button
          onClick={() => onToggleFeatured(project.id)}
          title={project.featured ? "Remove from featured" : "Mark as featured"}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/60 backdrop-blur-md transition-all cursor-pointer ${
            project.featured
              ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
              : "bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"
          }`}
        >
          <Star
            className={`h-4 w-4 ${
              project.featured ? "fill-amber-400 text-amber-400" : ""
            }`}
          />
        </button>

        {/* Order Tag */}
        <div className="absolute bottom-2 right-3 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 border border-slate-800">
          #{project.order}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech Stack Pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="rounded-md bg-slate-800/80 border border-slate-700/50 px-2 py-0.5 text-[11px] font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
          {/* External Links */}
          <div className="flex items-center gap-2">
            {project.url.live && (
              <a
                href={project.url.live}
                target="_blank"
                rel="noreferrer"
                title="View Live Demo"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 hover:bg-indigo-600/20 hover:text-indigo-400 border border-slate-700/50 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {(project.url.githubClient || project.url.githubServer) && (
              <a
                href={project.url.githubClient || project.url.githubServer}
                target="_blank"
                rel="noreferrer"
                title="View GitHub Repository"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 hover:bg-violet-600/20 hover:text-violet-400 border border-slate-700/50 transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {/* Admin Management Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(project)}
              className="flex items-center gap-1 rounded-lg bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-indigo-600 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(project)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 hover:bg-red-500/20 hover:text-red-400 border border-slate-700/50 transition-colors cursor-pointer"
              title="Delete project"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
