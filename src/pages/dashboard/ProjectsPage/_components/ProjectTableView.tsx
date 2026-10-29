import { Table, ConfigProvider, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
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
  const columns: ColumnsType<Project> = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 90,
      render: (thumbnail: string, record: Project) => (
        <div className="h-12 w-16 overflow-hidden rounded-lg border border-slate-700/60 bg-slate-950">
          <img
            src={thumbnail}
            alt={record.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ),
    },
    {
      title: 'Project & Slug',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Project) => (
        <div>
          <div className="font-semibold text-white transition-colors hover:text-indigo-400">
            {title}
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            /{record.slug}
          </div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const categoryStyle =
          CATEGORY_COLORS[category] ||
          'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
        return (
          <span
            className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryStyle}`}
          >
            {category}
          </span>
        );
      },
    },
    {
      title: 'Tech Stack',
      dataIndex: 'techStack',
      key: 'techStack',
      render: (techStack: string[]) => (
        <div className="flex max-w-xs flex-wrap gap-1">
          {techStack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="rounded border border-slate-700/50 bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-300"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="self-center text-[10px] font-medium text-slate-400">
              +{techStack.length - 4}
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      align: 'center',
      render: (featured: boolean, record: Project) => (
        <button
          onClick={() => onToggleFeatured(record.id)}
          title={featured ? 'Featured' : 'Not Featured'}
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
            featured
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
        >
          <Star
            className={`h-3.5 w-3.5 ${
              featured ? 'fill-amber-400 text-amber-400' : ''
            }`}
          />
          <span>{featured ? 'Yes' : 'No'}</span>
        </button>
      ),
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      align: 'center',
      render: (order: number) => (
        <span className="font-mono text-xs font-semibold text-slate-300">
          #{order}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_: unknown, record: Project) => (
        <div className="flex items-center justify-end gap-2">
          {record.liveUrl && (
            <a
              href={record.liveUrl}
              target="_blank"
              rel="noreferrer"
              title="Live Demo"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/60 text-slate-400 transition-colors hover:bg-indigo-600/20 hover:text-indigo-400"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {(record.githubClientUrl || record.githubServerUrl) && (
            <a
              href={record.githubClientUrl || record.githubServerUrl}
              target="_blank"
              rel="noreferrer"
              title="GitHub Repo"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/60 text-slate-400 transition-colors hover:bg-violet-600/20 hover:text-violet-400"
            >
              <Globe className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            onClick={() => onEdit(record)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/60 text-slate-400 transition-colors hover:bg-indigo-600 hover:text-white cursor-pointer"
            title="Edit Project"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(record)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/60 text-slate-400 transition-colors hover:bg-red-500/20 hover:text-red-400 cursor-pointer"
            title="Delete Project"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Table: {
            colorBgContainer: 'rgba(15, 23, 42, 0.8)',
            headerBg: 'rgba(2, 6, 23, 0.6)',
            colorBorderSecondary: 'rgba(51, 65, 85, 0.6)',
            headerColor: '#94a3b8',
            colorText: '#cbd5e1',
          },
        },
      }}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl backdrop-blur-xl">
        <Table<Project>
          rowKey="id"
          columns={columns}
          dataSource={projects}
          pagination={false}
          scroll={{ x: true }}
        />
      </div>
    </ConfigProvider>
  );
}

