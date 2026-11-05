import { useState, useMemo } from "react";
import { Briefcase, GraduationCap, Plus, Sparkles } from "lucide-react";
import { type Experience, type Education, type ActiveTab } from "./types";
import { initialExperiences, initialEducation } from "./mockData";
import ExperienceCard from "./_components/ExperienceCard";
import EducationCard from "./_components/EducationCard";
import ExperienceDrawer from "./_components/ExperienceDrawer";
import DeleteConfirmModal from "./_components/DeleteConfirmModal";

export default function ExperiencesPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("experience");
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);
  const [educationList, setEducationList] =
    useState<Education[]>(initialEducation);

  // Drawer and Modal states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | Education | null>(
    null,
  );
  const [deletingExperience, setDeletingExperience] =
    useState<Experience | null>(null);
  const [deletingEducation, setDeletingEducation] = useState<Education | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState("");

  // Filtered lists based on search query
  const filteredExperiences = useMemo(() => {
    if (!searchQuery.trim()) return experiences;
    const q = searchQuery.toLowerCase();
    return experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(q) ||
        exp.company.toLowerCase().includes(q) ||
        exp.location.toLowerCase().includes(q) ||
        exp.responsibilities.some((r) => r.toLowerCase().includes(q)),
    );
  }, [experiences, searchQuery]);

  const filteredEducation = useMemo(() => {
    if (!searchQuery.trim()) return educationList;
    const q = searchQuery.toLowerCase();
    return educationList.filter(
      (edu) =>
        edu.degree.toLowerCase().includes(q) ||
        edu.fieldOfStudy.toLowerCase().includes(q) ||
        edu.institution.toLowerCase().includes(q) ||
        edu.location.toLowerCase().includes(q),
    );
  }, [educationList, searchQuery]);

  // Handlers for Add / Edit
  const handleOpenAddDrawer = () => {
    setEditingItem(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEditExperience = (exp: Experience) => {
    setEditingItem(exp);
    setIsDrawerOpen(true);
  };

  const handleOpenEditEducation = (edu: Education) => {
    setEditingItem(edu);
    setIsDrawerOpen(true);
  };

  const handleSaveExperience = (savedExp: Experience) => {
    setExperiences((prev) => {
      const exists = prev.some((item) => item.id === savedExp.id);
      if (exists) {
        return prev.map((item) => (item.id === savedExp.id ? savedExp : item));
      }
      return [savedExp, ...prev];
    });
  };

  const handleSaveEducation = (savedEdu: Education) => {
    setEducationList((prev) => {
      const exists = prev.some((item) => item.id === savedEdu.id);
      if (exists) {
        return prev.map((item) => (item.id === savedEdu.id ? savedEdu : item));
      }
      return [savedEdu, ...prev];
    });
  };

  // Handlers for Delete
  const handleConfirmDeleteExperience = () => {
    if (deletingExperience) {
      setExperiences((prev) =>
        prev.filter((item) => item.id !== deletingExperience.id),
      );
      setDeletingExperience(null);
    }
  };

  const handleConfirmDeleteEducation = () => {
    if (deletingEducation) {
      setEducationList((prev) =>
        prev.filter((item) => item.id !== deletingEducation.id),
      );
      setDeletingEducation(null);
    }
  };

  return (
    <div className="min-h-screen space-y-8 p-4 md:p-8 bg-slate-950 text-slate-100">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" /> Career & Education
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Experience & Education Management
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your work history, qualifications, responsibilities, and
            academic achievements.
          </p>
        </div>

        {/* Dynamic Action Button */}
        <button
          onClick={handleOpenAddDrawer}
          className={`flex items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold text-slate-950 shadow-xl transition-all ${
            activeTab === "experience"
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-cyan-500/20"
              : "bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-300 hover:to-indigo-400 shadow-purple-500/20"
          }`}
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>
            {activeTab === "experience"
              ? "+ Add Professional Experience"
              : "+ Add Academic Qualification"}
          </span>
        </button>
      </div>

      {/* 2. Navigation Tabs & Search Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-4">
        {/* Tabbed Navigation Switcher */}
        <div className="inline-flex rounded-xl bg-slate-900/90 p-1.5 border border-slate-800">
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2.5 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
              activeTab === "experience"
                ? "bg-slate-800 text-cyan-400 shadow-md border border-slate-700/80"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Professional Experience</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                activeTab === "experience"
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {experiences.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2.5 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
              activeTab === "education"
                ? "bg-slate-800 text-purple-400 shadow-md border border-slate-700/80"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Academic Background</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                activeTab === "education"
                  ? "bg-purple-500/20 text-purple-300"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {educationList.length}
            </span>
          </button>
        </div>
      </div>

      {/* 3 & 4. Content Views */}
      {activeTab === "experience" ? (
        /* Professional Experience Tab */
        <div className="space-y-4">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onEdit={handleOpenEditExperience}
                onDelete={(expItem) => setDeletingExperience(expItem)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-500">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-300">
                No Experiences Found
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                {searchQuery
                  ? `No experience records match "${searchQuery}".`
                  : "Get started by adding your first professional role."}
              </p>
              <button
                onClick={handleOpenAddDrawer}
                className="mt-5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                + Add Experience
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Academic Background Tab */
        <div className="space-y-4">
          {filteredEducation.length > 0 ? (
            filteredEducation.map((edu) => (
              <EducationCard
                key={edu.id}
                education={edu}
                onEdit={handleOpenEditEducation}
                onDelete={(eduItem) => setDeletingEducation(eduItem)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-500">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-300">
                No Education Entries Found
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                {searchQuery
                  ? `No educational records match "${searchQuery}".`
                  : "Add your academic degrees, certifications, or coursework."}
              </p>
              <button
                onClick={handleOpenAddDrawer}
                className="mt-5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                + Add Qualification
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. Add / Edit Slide-over Drawer */}
      <ExperienceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        editingItem={editingItem}
        onSaveExperience={handleSaveExperience}
        onSaveEducation={handleSaveEducation}
      />

      {/* Delete Confirmation Modals */}
      <DeleteConfirmModal
        isOpen={!!deletingExperience}
        title="Delete Professional Experience"
        itemTitle={
          deletingExperience
            ? `${deletingExperience.title} at ${deletingExperience.company}`
            : ""
        }
        onClose={() => setDeletingExperience(null)}
        onConfirm={handleConfirmDeleteExperience}
      />

      <DeleteConfirmModal
        isOpen={!!deletingEducation}
        title="Delete Academic Qualification"
        itemTitle={
          deletingEducation
            ? `${deletingEducation.degree} (${deletingEducation.institution})`
            : ""
        }
        onClose={() => setDeletingEducation(null)}
        onConfirm={handleConfirmDeleteEducation}
      />
    </div>
  );
}
