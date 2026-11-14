import { type Control, Controller, useWatch } from "react-hook-form";
import { Input, InputNumber } from "antd";
import { User, Briefcase, Mail, Phone, Quote, FileText, Image as ImageIcon } from "lucide-react";
import { type IAbout } from "../types";

const { TextArea } = Input;

interface BasicInfoSectionProps {
  control: Control<IAbout>;
}

export default function BasicInfoSection({ control }: BasicInfoSectionProps) {
  const imageUrl = useWatch({ control, name: "image" });

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-6">
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
          <User className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Basic & Profile Details</h2>
          <p className="text-xs text-slate-400">Your core identity, portrait, and direct contact channels</p>
        </div>
      </div>

      {/* Profile Image & Avatar preview */}
      <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-900 flex items-center justify-center shadow-lg">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";
              }}
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-slate-600" />
          )}
        </div>
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Profile Image URL *
          </label>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Profile image URL is required" }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  {...field}
                  size="large"
                  placeholder="https://example.com/avatar.jpg"
                  status={fieldState.error ? "error" : ""}
                />
                {fieldState.error && (
                  <span className="text-[11px] text-rose-400 mt-1 block">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Name & Designation */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Full Name *
          </label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  {...field}
                  size="large"
                  placeholder="e.g. John Doe"
                  status={fieldState.error ? "error" : ""}
                />
                {fieldState.error && (
                  <span className="text-[11px] text-rose-400 mt-1 block">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Professional Designation *
          </label>
          <Controller
            name="designation"
            control={control}
            rules={{ required: "Designation is required" }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  {...field}
                  size="large"
                  placeholder="e.g. Senior Full-Stack Engineer"
                  status={fieldState.error ? "error" : ""}
                />
                {fieldState.error && (
                  <span className="text-[11px] text-rose-400 mt-1 block">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Current Role & Tech Stack */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Current Role / Status
          </label>
          <Controller
            name="currentRole"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                prefix={<Briefcase className="h-4 w-4 text-slate-500 mr-1" />}
                placeholder="e.g. Tech Lead at Acme Corp"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Primary Tech Stack Overview
          </label>
          <Controller
            name="techstack"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                placeholder="e.g. React, Node.js, Next.js, TypeScript, PostgreSQL"
              />
            )}
          />
        </div>
      </div>

      {/* Experience & Completed Projects Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Years of Experience
          </label>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                size="large"
                min={0}
                className="w-full"
                placeholder="e.g. 5"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Completed Projects Count
          </label>
          <Controller
            name="completedProjects"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                size="large"
                min={0}
                className="w-full"
                placeholder="e.g. 35"
              />
            )}
          />
        </div>
      </div>

      {/* Contacts: Phone & Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Contact Email *
          </label>
          <Controller
            name="contacts.email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  {...field}
                  size="large"
                  type="email"
                  prefix={<Mail className="h-4 w-4 text-slate-500 mr-1" />}
                  placeholder="contact@johndoe.com"
                  status={fieldState.error ? "error" : ""}
                />
                {fieldState.error && (
                  <span className="text-[11px] text-rose-400 mt-1 block">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Contact Phone
          </label>
          <Controller
            name="contacts.phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                prefix={<Phone className="h-4 w-4 text-slate-500 mr-1" />}
                placeholder="+1 (555) 123-4567"
              />
            )}
          />
        </div>
      </div>

      {/* Resume / CV Link & Personal Quote */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            CV / Resume Drive or Cloud URL
          </label>
          <Controller
            name="cvlink"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                prefix={<FileText className="h-4 w-4 text-slate-500 mr-1" />}
                placeholder="https://drive.google.com/..."
              />
            )}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Personal Quote / Tagline
          </label>
          <Controller
            name="quote"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                prefix={<Quote className="h-4 w-4 text-slate-500 mr-1" />}
                placeholder="e.g. Turning complex code into elegant solutions"
              />
            )}
          />
        </div>
      </div>

      {/* Detailed Bio / Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          About Description / Bio *
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field, fieldState }) => (
            <div>
              <TextArea
                {...field}
                rows={5}
                placeholder="Write a comprehensive overview of your journey, technical philosophy, and what drives you as an engineer..."
                status={fieldState.error ? "error" : ""}
              />
              {fieldState.error && (
                <span className="text-[11px] text-rose-400 mt-1 block">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
