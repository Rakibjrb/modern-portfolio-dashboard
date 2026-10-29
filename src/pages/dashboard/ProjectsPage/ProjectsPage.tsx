import { useState, useMemo } from 'react';
import { Plus, FolderGit2 } from 'lucide-react';
import { type Project, type ViewMode, type SortOption } from './types';
import { INITIAL_PROJECTS } from './mockData';
import { ProjectMetricsBar } from './_components/ProjectMetricsBar';
import { ProjectFilterBar } from './_components/ProjectFilterBar';
import { ProjectCard } from './_components/ProjectCard';
import { ProjectTableView } from './_components/ProjectTableView';
import { ProjectDrawer } from './_components/ProjectDrawer';
import { DeleteConfirmModal } from './_components/DeleteConfirmModal';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState<SortOption>('order');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Modal / Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Toggle inline featured status
  const handleToggleFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  // Open Drawer in Create mode
  const handleCreateNew = () => {
    setProjectToEdit(null);
    setIsDrawerOpen(true);
  };

  // Open Drawer in Edit mode
  const handleEdit = (project: Project) => {
    setProjectToEdit(project);
    setIsDrawerOpen(true);
  };

  // Save Project from Drawer (Create or Update local state UI)
  const handleSaveProject = (projectData: Partial<Project>) => {
    if (projectData.id) {
      // Update existing
      setProjects((prev) =>
        prev.map((p) => (p.id === projectData.id ? ({ ...p, ...projectData } as Project) : p))
      );
    } else {
      // Add new
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        title: projectData.title || 'Untitled Project',
        slug: projectData.slug || 'untitled-project',
        category: projectData.category || 'Full-Stack',
        shortDescription: projectData.shortDescription || '',
        fullDescription: projectData.fullDescription || '',
        thumbnail:
          projectData.thumbnail ||
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        techStack: projectData.techStack || [],
        liveUrl: projectData.liveUrl,
        githubClientUrl: projectData.githubClientUrl,
        githubServerUrl: projectData.githubServerUrl,
        featured: Boolean(projectData.featured),
        order: projectData.order || projects.length + 1,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProjects((prev) => [newProject, ...prev]);
    }
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (projectToDelete) {
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      setProjectToDelete(null);
    }
  };

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        // Search filter: title or tech stack match
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesTech = p.techStack.some((t) => t.toLowerCase().includes(query));
        const matchesSearch = matchesTitle || matchesTech;

        // Category filter
        const matchesCat =
          selectedCategory === 'All' || p.category === selectedCategory;

        return matchesSearch && matchesCat;
      })
      .sort((a, b) => {
        if (sortOption === 'order') {
          return a.order - b.order;
        }
        if (sortOption === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortOption === 'title-desc') {
          return b.title.localeCompare(a.title);
        }
        if (sortOption === 'latest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
  }, [projects, searchQuery, selectedCategory, sortOption]);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
              Project Management
            </h1>
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
              {filteredProjects.length} Projects
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Manage, filter, feature, and reorder portfolio entries and showcase items.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-violet-700 hover:shadow-indigo-500/30 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* 2. Metrics Bar */}
      <ProjectMetricsBar projects={projects} />

      {/* 3. Filter and View Control Bar */}
      <ProjectFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {/* 4. Main Content Area */}
      {filteredProjects.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={(p) => setProjectToDelete(p)}
                onToggleFeatured={handleToggleFeatured}
              />
            ))}
          </div>
        ) : (
          <ProjectTableView
            projects={filteredProjects}
            onEdit={handleEdit}
            onDelete={(p) => setProjectToDelete(p)}
            onToggleFeatured={handleToggleFeatured}
          />
        )
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 py-16 px-4 text-center backdrop-blur-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-400">
            <FolderGit2 className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white">No projects found</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            We couldn't find any projects matching your search criteria or category filter. Try clearing filters or creating a new project.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* 5. Add / Edit Slide-over UX Drawer */}
      <ProjectDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        projectToEdit={projectToEdit}
        onSave={handleSaveProject}
      />

      {/* 6. Delete Confirmation Dialog Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(projectToDelete)}
        project={projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}