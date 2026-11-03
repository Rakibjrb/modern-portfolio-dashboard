import { useState, useMemo } from "react";
import { Plus, FolderGit2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { type Meta, type Project } from "./types";
import { ProjectMetricsBar } from "./_components/ProjectMetricsBar";
import { ProjectFilterBar } from "./_components/ProjectFilterBar";
import { ProjectTableView } from "./_components/ProjectTableView";
import { ProjectDrawer } from "./_components/ProjectDrawer";
import { DeleteConfirmModal } from "./_components/DeleteConfirmModal";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../../redux/features/project/projectApi";

export default function ProjectsPage() {
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 10 },
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("order");

  // Modal / Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Redux API query
  const {
    data: projectResponse,
    isLoading,
    isError,
    refetch,
  } = useGetProjectsQuery({
    page: pagination.page,
    limit: pagination.limit,
    search: searchQuery,
    category: selectedCategory === "all" ? "" : selectedCategory,
  });

  const meta: Meta = projectResponse?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  // Redux API mutations
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  // Normalize API data to Project[] format
  const projects: Project[] = useMemo(() => {
    const rawList = Array.isArray(projectResponse)
      ? projectResponse
      : Array.isArray(projectResponse?.data)
        ? projectResponse.data
        : Array.isArray(projectResponse?.data?.projects)
          ? projectResponse.data.projects
          : Array.isArray(projectResponse?.projects)
            ? projectResponse.projects
            : [];

    return rawList.map((item: any) => ({
      id: item._id || item.id || "",
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "Full-Stack",
      shortDescription: item.shortDescription || item.description || "",
      fullDescription:
        item.fullDescription || item.content || item.shortDescription || "",
      thumbnail:
        item.thumbnail ||
        item.image ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      techStack: Array.isArray(item.techStack)
        ? item.techStack
        : item.technologies || item.tags || [],
      liveUrl: item.liveUrl || item.liveLink || "",
      githubClientUrl:
        item.githubClientUrl || item.clientRepo || item.githubClient || "",
      githubServerUrl:
        item.githubServerUrl || item.serverRepo || item.githubServer || "",
      featured: Boolean(item.featured ?? item.isFeatured),
      order: typeof item.order === "number" ? item.order : 1,
      createdAt: item.createdAt || new Date().toISOString(),
    }));
  }, [projectResponse]);

  // Toggle inline featured status
  const handleToggleFeatured = async (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    try {
      await updateProject({
        id,
        data: { featured: !project.featured },
      }).unwrap();
      toast.success(
        !project.featured
          ? `Marked "${project.title}" as featured`
          : `Removed "${project.title}" from featured`,
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update featured status");
    }
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

  // Save Project from Drawer (Create or Update API)
  const handleSaveProject = async (projectData: Partial<Project>) => {
    try {
      if (projectData.id) {
        // Update existing
        const { id, ...dataToUpdate } = projectData;
        await updateProject({
          id,
          data: dataToUpdate,
        }).unwrap();
        toast.success("Project updated successfully");
      } else {
        // Create new
        await createProject(projectData).unwrap();
        toast.success("Project created successfully");
      }
      setIsDrawerOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save project");
    }
  };

  // Confirm delete project via API
  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject({ id: projectToDelete.id }).unwrap();
      toast.success("Project deleted successfully");
      setProjectToDelete(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete project");
    }
  };

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
              {0} Projects
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Manage, filter, feature, and reorder portfolio entries and showcase
            items.
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
      <ProjectMetricsBar meta={meta} projects={projects} />

      {/* 3. Filter and View Control Bar */}
      <ProjectFilterBar
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {/* 4. Main Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 py-20 backdrop-blur-xl">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          <p className="mt-3 text-sm text-slate-400">Loading projects...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/5 py-16 px-4 text-center backdrop-blur-xl">
          <p className="text-sm font-medium text-rose-400">
            Failed to load projects
          </p>
          <button
            onClick={() => refetch()}
            className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : projects.length > 0 ? (
        <ProjectTableView
          meta={meta}
          pagination={pagination}
          setPagination={setPagination}
          projects={projects}
          onEdit={handleEdit}
          onDelete={(p) => setProjectToDelete(p)}
          onToggleFeatured={handleToggleFeatured}
        />
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 py-16 px-4 text-center backdrop-blur-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-400">
            <FolderGit2 className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white">
            No projects found
          </h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            We couldn't find any projects matching your search criteria or
            category filter. Try clearing filters or creating a new project.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("");
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
