import { FolderGit2, Star, Layers } from 'lucide-react';
import { type Project } from '../types';

interface ProjectMetricsBarProps {
  projects: Project[];
}

export function ProjectMetricsBar({ projects }: ProjectMetricsBarProps) {
  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const uniqueCategories = new Set(projects.map((p) => p.category)).size;

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      subtitle: 'All portfolio entries',
      icon: FolderGit2,
      color: 'from-indigo-500 to-violet-600',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      title: 'Featured Projects',
      value: featuredProjects,
      subtitle: 'Highlighted on homepage',
      icon: Star,
      color: 'from-amber-500 to-orange-600',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      title: 'Total Categories',
      value: uniqueCategories,
      subtitle: 'Active stack domains',
      icon: Layers,
      color: 'from-cyan-500 to-blue-600',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-slate-700 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {stat.title}
                </p>
                <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${stat.color} shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-300`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs">
              <span className="text-slate-400 font-medium">{stat.subtitle}</span>
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 font-semibold text-[11px] ${stat.badgeColor}`}
              >
                Active
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
