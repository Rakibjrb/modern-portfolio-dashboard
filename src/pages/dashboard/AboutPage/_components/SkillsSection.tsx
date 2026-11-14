import { type Control, Controller, useFieldArray } from "react-hook-form";
import { Input } from "antd";
import { Cpu, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { type IAbout } from "../types";

interface SkillsSectionProps {
  control: Control<IAbout>;
}

export default function SkillsSection({ control }: SkillsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Featured Skills & Tech Icons</h2>
            <p className="text-xs text-slate-400">Highlight your core capabilities with custom icon references</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => append({ name: "", iconUrl: "" })}
          className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Skill</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 py-10 text-center">
          <Cpu className="h-8 w-8 text-slate-600 mb-2" />
          <p className="text-xs text-slate-400">No skills added yet.</p>
          <button
            type="button"
            onClick={() => append({ name: "", iconUrl: "" })}
            className="mt-3 text-xs font-semibold text-purple-400 hover:underline cursor-pointer"
          >
            + Add your first skill
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="group relative rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-slate-400">
                  Skill #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Remove skill"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Skill Name *
                  </label>
                  <Controller
                    name={`skills.${idx}.name`}
                    control={control}
                    rules={{ required: "Skill name is required" }}
                    render={({ field: inputField, fieldState }) => (
                      <div>
                        <Input
                          {...inputField}
                          size="large"
                          placeholder="e.g. React.js, Docker, Tailwind"
                          status={fieldState.error ? "error" : ""}
                        />
                        {fieldState.error && (
                          <span className="text-[10px] text-rose-400 mt-0.5 block">
                            {fieldState.error.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Icon URL (SVG / PNG)
                  </label>
                  <Controller
                    name={`skills.${idx}.iconUrl`}
                    control={control}
                    render={({ field: inputField }) => (
                      <div className="flex items-center gap-2">
                        <Input
                          {...inputField}
                          size="large"
                          placeholder="https://cdn.jsdelivr.net/gh/devicons/..."
                        />
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center p-1.5">
                          {inputField.value ? (
                            <img
                              src={inputField.value}
                              alt="Icon"
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <ImageIcon className="h-4 w-4 text-slate-600" />
                          )}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
