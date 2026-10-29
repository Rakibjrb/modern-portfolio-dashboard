import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Eye,
  Edit3,
  Star,
  Globe,
  Check,
} from 'lucide-react';
import { type Project, type ProjectCategory } from '../types';

interface ProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit: Project | null;
  onSave: (project: Partial<Project>) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'Full-Stack',
  'Frontend',
  'Backend',
  'Automation',
];

export function ProjectDrawer({
  isOpen,
  onClose,
  projectToEdit,
  onSave,
}: ProjectDrawerProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Full-Stack');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubClientUrl, setGithubClientUrl] = useState('');
  const [githubServerUrl, setGithubServerUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState<number>(1);
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');

  // Populate drawer form when editing or resetting for create
  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setSlug(projectToEdit.slug);
      setCategory(projectToEdit.category);
      setShortDescription(projectToEdit.shortDescription);
      setFullDescription(projectToEdit.fullDescription);
      setThumbnail(projectToEdit.thumbnail);
      setTechStack(projectToEdit.techStack);
      setLiveUrl(projectToEdit.liveUrl || '');
      setGithubClientUrl(projectToEdit.githubClientUrl || '');
      setGithubServerUrl(projectToEdit.githubServerUrl || '');
      setFeatured(projectToEdit.featured);
      setOrder(projectToEdit.order);
    } else {
      setTitle('');
      setSlug('');
      setCategory('Full-Stack');
      setShortDescription('');
      setFullDescription('');
      setThumbnail(
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
      );
      setTechStack(['React', 'TypeScript', 'Tailwind CSS']);
      setLiveUrl('');
      setGithubClientUrl('');
      setGithubServerUrl('');
      setFeatured(false);
      setOrder(1);
    }
  }, [projectToEdit, isOpen]);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!projectToEdit) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !techStack.includes(tagInput.trim())) {
      setTechStack([...techStack, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTechStack(techStack.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: projectToEdit?.id,
      title,
      slug,
      category,
      shortDescription,
      fullDescription,
      thumbnail,
      techStack,
      liveUrl: liveUrl || undefined,
      githubClientUrl: githubClientUrl || undefined,
      githubServerUrl: githubServerUrl || undefined,
      featured,
      order: Number(order),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-2xl border-l border-slate-800 bg-slate-900 shadow-2xl">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {projectToEdit ? 'Edit Project' : 'Create New Project'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {projectToEdit
                  ? `Updating details for "${projectToEdit.title}"`
                  : 'Fill in details to showcase a new portfolio project'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body Scrollable */}
          <form
            onSubmit={handleSubmit}
            className="flex h-[calc(100vh-130px)] flex-col overflow-y-auto p-6 space-y-6 text-sm"
          >
            {/* Title & Slug */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Nexus Cloud Dashboard"
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="nexus-cloud-dashboard"
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 font-mono text-xs text-slate-300 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Category & Order & Featured Toggle */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Display Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  min={1}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-2.5 cursor-pointer hover:border-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 hidden"
                  />
                  <Star className={`h-4 w-4 ${featured ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
                  <span className="text-xs font-semibold text-slate-200">
                    Featured Project
                  </span>
                </label>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300">
                Short Description (2-line summary) *
              </label>
              <textarea
                required
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary of what this project accomplishes..."
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Thumbnail Upload Zone & URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300">
                Thumbnail Image
              </label>
              <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-center">
                {thumbnail && (
                  <div className="relative h-20 w-32 overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                    <img
                      src={thumbnail}
                      alt="Thumbnail preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex rounded-xl border border-slate-800 bg-slate-950 p-4 border-dashed text-center flex-col items-center justify-center">
                    <Upload className="h-5 w-5 text-indigo-400" />
                    <p className="mt-1 text-xs text-slate-300">
                      Drag & drop cover image, or paste Image URL below
                    </p>
                    <input
                      type="text"
                      value={thumbnail}
                      onChange={(e) => setThumbnail(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Tags Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300">
                Tech Stack Badges
              </label>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add technology (e.g. Docker, GraphQL) and press Enter"
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-600 transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>

              {/* Added Tags Pills */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {techStack.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-300"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-indigo-400 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Project URLs
              </h4>
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                  <Globe className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Live Demo URL</span>
                </div>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://myproject.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                    <Globe className="h-3.5 w-3.5 text-violet-400" />
                    <span>GitHub (Frontend)</span>
                  </div>
                  <input
                    type="url"
                    value={githubClientUrl}
                    onChange={(e) => setGithubClientUrl(e.target.value)}
                    placeholder="https://github.com/user/client"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                    <Globe className="h-3.5 w-3.5 text-emerald-400" />
                    <span>GitHub (Backend)</span>
                  </div>
                  <input
                    type="url"
                    value={githubServerUrl}
                    onChange={(e) => setGithubServerUrl(e.target.value)}
                    placeholder="https://github.com/user/server"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Markdown Full Description Editor */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Full Project Description (Markdown)
                </label>
                <div className="flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditorTab('write')}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer ${editorTab === 'write'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    <Edit3 className="h-3 w-3" />
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab('preview')}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer ${editorTab === 'preview'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    <Eye className="h-3 w-3" />
                    Live Preview
                  </button>
                </div>
              </div>

              {editorTab === 'write' ? (
                <textarea
                  rows={6}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="### Detailed Overview&#10;&#10;Write comprehensive markdown description of features, architecture, and deployment steps..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 font-mono text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              ) : (
                <div className="min-h-[140px] rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300 leading-relaxed space-y-2">
                  {fullDescription ? (
                    fullDescription.split('\n').map((line, idx) => {
                      if (line.startsWith('### ')) {
                        return (
                          <h3 key={idx} className="text-sm font-bold text-white mt-2">
                            {line.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (line.startsWith('#### ')) {
                        return (
                          <h4 key={idx} className="text-xs font-bold text-indigo-400 mt-2">
                            {line.replace('#### ', '')}
                          </h4>
                        );
                      }
                      if (line.startsWith('- ')) {
                        return (
                          <li key={idx} className="ml-4 list-disc text-slate-300">
                            {line.replace('- ', '')}
                          </li>
                        );
                      }
                      return <p key={idx}>{line}</p>;
                    })
                  ) : (
                    <p className="text-slate-500 italic">No description written yet.</p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Drawer Form Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-800 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-violet-700 transition-all cursor-pointer"
              >
                <Check className="h-4 w-4" />
                <span>{projectToEdit ? 'Save Changes' : 'Publish Project'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
