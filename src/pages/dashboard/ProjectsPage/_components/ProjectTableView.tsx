import { Star, ExternalLink, Pencil, Trash2, Globe } from 'lucide-react';
import { type Project } from '../types';

interface ProjectTableViewProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onToggleFeatured: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Full-Stack': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Frontend: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Backend: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Automation: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export function ProjectTableView({
  projects,
  onEdit,
  onDelete,
  onToggleFeatured,
}: ProjectTableViewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-4">Thumbnail</th>
              <th className="px-5 py-4">Project & Slug</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Tech Stack</th>
              <th className="px-5 py-4 text-center">Featured</th>
              <th className="px-5 py-4 text-center">Order</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {projects.map((project) => {
              const categoryStyle =
                CATEGORY_COLORS[project.category] ||
                'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';

              return (
                <tr
                  key={project.id}
                  className="group transition-colors hover:bg-slate-800/40"
                >
                  {/* Thumbnail */}
                  <td className="px-5 py-3">
                    <div className="h-12 w-16 overflow-hidden rounded-lg border border-slate-700/60 bg-slate-950">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </td>

                  {/* Project Name & Slug */}
                  <td className="px-5 py-3">
                    <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </div>
                    <div className="font-mono text-[11px] text-slate-400">
                      /{project.slug}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryStyle}`}
                    >
                      {project.category}
                    </span>
                  </td>

                  {/* Tech Stack Pills */}
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.techStack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-slate-800 border border-slate-700/50 px-1.5 py-0.5 text-[10px] font-medium text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] text-slate-400 font-medium self-center">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Featured Status Toggle */}
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => onToggleFeatured(project.id)}
                      title={project.featured ? 'Featured' : 'Not Featured'}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border transition-all cursor-pointer ${project.featured
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
                        }`}
                    >
                      <Star
                        className={`h-3.5 w-3.5 ${project.featured ? 'fill-amber-400 text-amber-400' : ''
                          }`}
                      />
                      <span>{project.featured ? 'Yes' : 'No'}</span>
                    </button>
                  </td>

                  {/* Order Index */}
                  <td className="px-5 py-3 text-center font-mono text-xs text-slate-300 font-semibold">
                    #{project.order}
                  </td>

                  {/* Actions Column */}
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Live Demo"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/60 text-slate-400 hover:bg-indigo-600/20 hover:text-indigo-400 border border-slate-700/60 transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {(project.githubClientUrl || project.githubServerUrl) && (
                        <a
                          href={project.githubClientUrl || project.githubServerUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub Repo"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/60 text-slate-400 hover:bg-violet-600/20 hover:text-violet-400 border border-slate-700/60 transition-colors"
                        >
                          <Globe className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => onEdit(project)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/60 text-slate-400 hover:bg-indigo-600 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(project)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/60 text-slate-400 hover:bg-red-500/20 hover:text-red-400 border border-slate-700/60 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
