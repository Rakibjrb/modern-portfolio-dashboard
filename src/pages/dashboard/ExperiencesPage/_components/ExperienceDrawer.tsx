import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input, Select, Checkbox, ConfigProvider, theme } from "antd";
import { X, Plus, Trash2, Briefcase, GraduationCap, Check } from "lucide-react";
import {
  type Experience,
  type Education,
  type EmploymentType,
  type ActiveTab,
} from "../types";

const { TextArea } = Input;

interface ExperienceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  editingItem: Experience | Education | null;
  onSaveExperience: (exp: Partial<Experience>) => void;
  onSaveEducation: (edu: Partial<Education>) => void;
}

interface FormValues {
  // Experience fields
  title: string;
  organization: string;
  location: string;
  type: EmploymentType;
  startDate: string;
  endDate: string;
  isCurrentExp: boolean;
  description: string;
  responsibilities: { value: string }[];
  achievements: { value: string }[];

  // Education fields
  eduTitle: string;
  degree: string;
  fieldOfStudy: string;
  eduOrganization: string;
  result: string;
  eduLocation: string;
  eduStartDate: string;
  eduEndDate: string;
  isCurrentEdu: boolean;
  eduDescription: string;
}

const defaultValues: FormValues = {
  title: "",
  organization: "",
  location: "",
  type: "Full-time",
  startDate: "",
  endDate: "",
  isCurrentExp: false,
  description: "",
  responsibilities: [{ value: "" }],
  achievements: [{ value: "" }],

  eduTitle: "",
  degree: "",
  fieldOfStudy: "",
  eduOrganization: "",
  result: "",
  eduLocation: "",
  eduStartDate: "",
  eduEndDate: "",
  isCurrentEdu: false,
  eduDescription: "",
};

export default function ExperienceDrawer({
  isOpen,
  onClose,
  activeTab,
  editingItem,
  onSaveExperience,
  onSaveEducation,
}: ExperienceDrawerProps) {
  const isEditingExperience = editingItem
    ? "responsibilities" in editingItem || "type" in editingItem
    : activeTab === "experience";

  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues,
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: "responsibilities",
  });

  const {
    fields: achievementFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control,
    name: "achievements",
  });

  const isCurrentExp = watch("isCurrentExp");
  const isCurrentEdu = watch("isCurrentEdu");

  const toInputMonth = (val: string | Date | undefined) => {
    if (!val) return "";
    const str = typeof val === "string" ? val : val.toISOString();
    return str.substring(0, 7); // "YYYY-MM"
  };

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        if ("responsibilities" in editingItem || "type" in editingItem) {
          const exp = editingItem as Experience;
          const isCurrent =
            !exp.endDate || String(exp.endDate).toLowerCase() === "present";

          reset({
            ...defaultValues,
            title: exp.title || "",
            organization: exp.organization || "",
            location: exp.location || "",
            type: (exp.type as EmploymentType) || "Full-time",
            startDate: toInputMonth(exp.startDate),
            endDate: isCurrent ? "" : toInputMonth(exp.endDate),
            isCurrentExp: isCurrent,
            description: exp.description || "",
            responsibilities: exp.responsibilities?.length
              ? exp.responsibilities.map((r) => ({ value: r }))
              : [{ value: "" }],
            achievements: exp.achievements?.length
              ? exp.achievements.map((a) => ({ value: a }))
              : [{ value: "" }],
          });
        } else {
          const edu = editingItem as Education;
          const isCurrent =
            !edu.endDate || String(edu.endDate).toLowerCase() === "present";

          reset({
            ...defaultValues,
            eduTitle: edu.title || "",
            degree: edu.degree || "",
            fieldOfStudy: edu.fieldOfStudy || "",
            eduOrganization: edu.organization || "",
            result: edu.result || "",
            eduLocation: edu.location || "",
            eduStartDate: toInputMonth(edu.startDate),
            eduEndDate: isCurrent ? "" : toInputMonth(edu.endDate),
            isCurrentEdu: isCurrent,
            eduDescription: edu.description || "",
          });
        }
      } else {
        reset(defaultValues);
      }
    }
  }, [editingItem, isOpen, activeTab, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => {
    if (isEditingExperience) {
      const expData: Partial<Experience> = {
        ...(editingItem?._id ? { _id: editingItem._id } : {}),
        title: data.title,
        organization: data.organization,
        location: data.location,
        type: data.type,
        startDate: data.startDate,
        endDate: data.isCurrentExp ? "Present" : data.endDate,
        description: data.description,
        responsibilities: data.responsibilities
          .map((r) => r.value.trim())
          .filter(Boolean),
        achievements: data.achievements
          .map((a) => a.value.trim())
          .filter(Boolean),
      };
      onSaveExperience(expData);
    } else {
      const eduData: Partial<Education> = {
        ...(editingItem?._id ? { _id: editingItem._id } : {}),
        title: data.eduTitle || data.degree,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        organization: data.eduOrganization,
        result: data.result,
        location: data.eduLocation,
        startDate: data.eduStartDate,
        endDate: data.isCurrentEdu ? "Present" : data.eduEndDate,
        description: data.eduDescription,
      };
      onSaveEducation(eduData);
    }
    onClose();
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: isEditingExperience ? "#06b6d4" : "#a855f7",
          colorBgContainer: "#020617",
          colorBorder: "#334155",
          colorText: "#f1f5f9",
          colorTextPlaceholder: "#64748b",
          borderRadius: 12,
        },
      }}
    >
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300">
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="w-screen max-w-2xl border-l border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800 text-cyan-400">
                  {isEditingExperience ? (
                    <Briefcase className="h-5 w-5" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-purple-400" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-100">
                    {editingItem ? "Edit" : "Add New"}{" "}
                    {isEditingExperience
                      ? "Professional Experience"
                      : "Academic Qualification"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Fill in details below according to the experience schema
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Body */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-[calc(100vh-80px)] flex-col justify-between"
            >
              <div className="space-y-6 overflow-y-auto p-6 text-sm custom-scrollbar">
                {isEditingExperience ? (
                  /* Experience Form */
                  <>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Job Title *
                        </label>
                        <Controller
                          name="title"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="large"
                              placeholder="e.g. Senior Software Engineer"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Organization / Company *
                        </label>
                        <Controller
                          name="organization"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="large"
                              placeholder="e.g. Google or TechCorp"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Employment Type *
                        </label>
                        <Controller
                          name="type"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              size="large"
                              className="w-full"
                              options={[
                                { label: "Full-time", value: "Full-time" },
                                { label: "Part-time", value: "Part-time" },
                                { label: "Contract", value: "Contract" },
                                { label: "Freelance", value: "Freelance" },
                                { label: "Internship", value: "Internship" },
                              ]}
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Location *
                        </label>
                        <Controller
                          name="location"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="large"
                              placeholder="e.g. San Francisco, CA (Hybrid)"
                            />
                          )}
                        />
                      </div>
                    </div>

                    {/* Summary Description */}
                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">
                        Overview / Description
                      </label>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            rows={2}
                            placeholder="Brief summary of your role and team mission..."
                          />
                        )}
                      />
                    </div>

                    {/* Dates & Current Switch */}
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-4">
                      <Controller
                        name="isCurrentExp"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="text-slate-300 font-medium"
                          >
                            I currently work here
                          </Checkbox>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            Start Month/Year *
                          </label>
                          <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="month"
                                size="large"
                              />
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            End Month/Year
                          </label>
                          <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="month"
                                size="large"
                                disabled={isCurrentExp}
                                value={isCurrentExp ? "" : field.value}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Responsibilities */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-semibold text-slate-200">
                          Key Responsibilities
                        </label>
                        <button
                          type="button"
                          onClick={() => appendResponsibility({ value: "" })}
                          className="flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Responsibility
                        </button>
                      </div>
                      <div className="space-y-2.5">
                        {responsibilityFields.map((item, idx) => (
                          <div key={item.id} className="flex items-center gap-2">
                            <Controller
                              name={`responsibilities.${idx}.value`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  size="large"
                                  placeholder={`Responsibility #${idx + 1}...`}
                                />
                              )}
                            />
                            {responsibilityFields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeResponsibility(idx)}
                                className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Achievements */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-semibold text-slate-200">
                          Key Achievements
                        </label>
                        <button
                          type="button"
                          onClick={() => appendAchievement({ value: "" })}
                          className="flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300 cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Achievement
                        </button>
                      </div>
                      <div className="space-y-2.5">
                        {achievementFields.map((item, idx) => (
                          <div key={item.id} className="flex items-center gap-2">
                            <Controller
                              name={`achievements.${idx}.value`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  size="large"
                                  placeholder={`Achievement #${idx + 1}...`}
                                />
                              )}
                            />
                            {achievementFields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeAchievement(idx)}
                                className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Education Form */
                  <>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Degree *
                        </label>
                        <Controller
                          name="degree"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="large"
                              placeholder="e.g. Bachelor of Science"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Field of Study *
                        </label>
                        <Controller
                          name="fieldOfStudy"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="large"
                              placeholder="e.g. Computer Science & Engineering"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Organization / Institution *
                        </label>
                        <Controller
                          name="eduOrganization"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="large"
                              placeholder="e.g. Stanford University"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Result / CGPA
                        </label>
                        <Controller
                          name="result"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="large"
                              placeholder="e.g. CGPA: 3.85 / 4.00"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Display Title (Optional)
                        </label>
                        <Controller
                          name="eduTitle"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="large"
                              placeholder="e.g. B.Sc in CSE (defaults to Degree)"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-slate-300 mb-1.5">
                          Location *
                        </label>
                        <Controller
                          name="eduLocation"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="large"
                              placeholder="e.g. Stanford, CA"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-4">
                      <Controller
                        name="isCurrentEdu"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="text-slate-300 font-medium"
                          >
                            Currently studying here
                          </Checkbox>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            Start Month/Year *
                          </label>
                          <Controller
                            name="eduStartDate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="month"
                                size="large"
                              />
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            End Month/Year
                          </label>
                          <Controller
                            name="eduEndDate"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="month"
                                size="large"
                                disabled={isCurrentEdu}
                                value={isCurrentEdu ? "" : field.value}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-300 mb-1.5">
                        Description / Academic Highlights
                      </label>
                      <Controller
                        name="eduDescription"
                        control={control}
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            rows={3}
                            placeholder="Specialized coursework, thesis, publications, or extracurricular honors..."
                          />
                        )}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-800 bg-slate-900/90 px-6 py-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-700/80 bg-slate-800 px-5 py-2.5 font-semibold text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex items-center gap-2 rounded-xl px-6 py-2.5 font-bold shadow-lg transition-all cursor-pointer ${
                    isEditingExperience
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/20"
                      : "bg-gradient-to-r from-purple-500 to-indigo-600 text-slate-950 hover:from-purple-400 hover:to-indigo-500 shadow-purple-500/20"
                  }`}
                >
                  <Check className="h-4 w-4" />
                  {editingItem ? "Save Changes" : "Publish Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
