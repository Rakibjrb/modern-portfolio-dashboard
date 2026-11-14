import { type Control, Controller, useFieldArray } from "react-hook-form";
import { Input } from "antd";
import { Share2, Plus, Trash2, Globe, Image as ImageIcon } from "lucide-react";
import { type IAbout } from "../types";

interface SocialLinksSectionProps {
  control: Control<IAbout>;
}

export default function SocialLinksSection({ control }: SocialLinksSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialsLinks",
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
            <Share2 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Social & External Profiles</h2>
            <p className="text-xs text-slate-400">GitHub, LinkedIn, Twitter/X, and custom professional portfolio links</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => append({ name: "", url: "", iconUrl: "" })}
          className="flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/20 transition-all cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Social Link</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 py-10 text-center">
          <Share2 className="h-8 w-8 text-slate-600 mb-2" />
          <p className="text-xs text-slate-400">No social profiles configured.</p>
          <button
            type="button"
            onClick={() => append({ name: "", url: "", iconUrl: "" })}
            className="mt-3 text-xs font-semibold text-blue-400 hover:underline cursor-pointer"
          >
            + Add your first social profile
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
                  Profile #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Remove link"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Platform / Network Name *
                  </label>
                  <Controller
                    name={`socialsLinks.${idx}.name`}
                    control={control}
                    rules={{ required: "Platform name is required" }}
                    render={({ field: inputField, fieldState }) => (
                      <div>
                        <Input
                          {...inputField}
                          size="large"
                          placeholder="e.g. GitHub, LinkedIn, X/Twitter"
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
                    Destination URL *
                  </label>
                  <Controller
                    name={`socialsLinks.${idx}.url`}
                    control={control}
                    rules={{ required: "URL is required" }}
                    render={({ field: inputField, fieldState }) => (
                      <div>
                        <Input
                          {...inputField}
                          size="large"
                          prefix={<Globe className="h-4 w-4 text-slate-500 mr-1" />}
                          placeholder="https://github.com/username"
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
                    name={`socialsLinks.${idx}.iconUrl`}
                    control={control}
                    render={({ field: inputField }) => (
                      <div className="flex items-center gap-2">
                        <Input
                          {...inputField}
                          size="large"
                          placeholder="https://cdn.jsdelivr.net/... or icon link"
                        />
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center p-1.5">
                          {inputField.value ? (
                            <img
                              src={inputField.value}
                              alt="Social Icon"
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
