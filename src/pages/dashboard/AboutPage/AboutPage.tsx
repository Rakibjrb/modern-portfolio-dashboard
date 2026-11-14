import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ConfigProvider, theme } from "antd";
import { Save, RefreshCw, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { type IAbout } from "./types";
import BasicInfoSection from "./_components/BasicInfoSection";
import SkillsSection from "./_components/SkillsSection";
import SocialLinksSection from "./_components/SocialLinksSection";
import LiveAboutPreview from "./_components/LiveAboutPreview";
import {
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "../../../redux/features/about/aboutApi";

const defaultAboutValues: IAbout = {
  name: "Rakib Hassan",
  designation: "Full-Stack Software Engineer & Cloud Architect",
  image:
    "https://res.cloudinary.com/dj9bzalrb/image/upload/v1788679742/b7ghwwhbcib4ssbncwnp.png",
  currentRole: "Lead Frontend Engineer",
  techstack:
    "React, Next.js, TypeScript, Node.js, Express, PostgreSQL, Tailwind CSS",
  experience: 4,
  completedProjects: 28,
  description:
    "I am a passionate software engineer specializing in modern React ecosystem, scalable micro-frontends, and high-performance full-stack web applications. Dedicated to clean architecture, intuitive UX, and writing clean, maintainable code.",
  quote: "Crafting performant digital experiences with precision and empathy.",
  cvlink: "https://drive.google.com",
  contacts: {
    email: "contact@rakibhassan.dev",
    phone: "+880 1700 000000",
  },
  skills: [
    {
      name: "React.js",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
  ],
  socialsLinks: [
    {
      name: "GitHub",
      url: "https://github.com",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function AboutPage() {
  const {
    data: aboutResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAboutQuery();
  const [updateAbout, { isLoading: isUpdating }] = useUpdateAboutMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<IAbout>({
    defaultValues: defaultAboutValues,
  });

  // Populate form values when data is loaded from API
  useEffect(() => {
    if (aboutResponse?.data) {
      reset({
        ...defaultAboutValues,
        ...aboutResponse.data,
        contacts: {
          ...defaultAboutValues.contacts,
          ...(aboutResponse.data.contacts || {}),
        },
        skills: aboutResponse.data.skills?.length
          ? aboutResponse.data.skills
          : defaultAboutValues.skills,
        socialsLinks: aboutResponse.data.socialsLinks?.length
          ? aboutResponse.data.socialsLinks
          : defaultAboutValues.socialsLinks,
      });
    }
  }, [aboutResponse, reset]);

  const onSubmit = async (data: IAbout) => {
    try {
      await updateAbout(data).unwrap();
      toast.success("About information updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update about details");
    }
  };

  const handleReset = () => {
    if (aboutResponse?.data) {
      reset(aboutResponse.data);
    } else {
      reset(defaultAboutValues);
    }
    toast.info("Form reset to original values");
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#06b6d4", // cyan-500
          colorBgContainer: "#020617", // slate-950
          colorBorder: "#334155", // slate-700
          colorText: "#f1f5f9", // slate-100
          colorTextPlaceholder: "#64748b", // slate-500
          borderRadius: 12,
        },
      }}
    >
      <div className="min-h-screen space-y-8 p-4 md:p-8 bg-slate-950 text-slate-100">
        {/* Header Bar */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                <Sparkles className="h-3.5 w-3.5" /> Portfolio Identity
              </span>
              {isDirty && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                  Unsaved Changes
                </span>
              )}
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              About & Profile Management
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Customize your hero presentation, technical identity, skills, and
              contact handles.
            </p>
          </div>

          {/* Form Actions Header Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isUpdating}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isUpdating}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="flex h-72 flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
            <p className="mt-3 text-xs text-slate-400">
              Loading profile data...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-between rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-300">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
              <p className="text-xs">
                Could not connect to the remote About API. You are viewing
                default editable fields.
              </p>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg border border-rose-500/30 bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-500/30 transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main Content: Form Sections + Live Realtime Preview */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Form Sections */}
            <div className="lg:col-span-7 space-y-8">
              <BasicInfoSection control={control} />
              <SkillsSection control={control} />
              <SocialLinksSection control={control} />

              {/* Bottom Sticky Action Bar */}
              <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl sticky bottom-4 shadow-2xl">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Publish Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Live Real-time Portfolio Preview */}
            <div className="lg:col-span-5">
              <LiveAboutPreview control={control} />
            </div>
          </div>
        </form>
      </div>
    </ConfigProvider>
  );
}
