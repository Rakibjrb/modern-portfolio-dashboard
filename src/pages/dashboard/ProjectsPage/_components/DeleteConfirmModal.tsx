import { AlertTriangle, X } from 'lucide-react';
import { type Project } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  project,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Delete Project</h3>
              <p className="text-xs text-slate-400">Confirm permanent deletion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-slate-300">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-white">"{project.title}"</span>?
          </p>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            This action cannot be undone. This project will be removed from your portfolio dashboard and public showcase.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-800/80 bg-slate-950/60 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all cursor-pointer"
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
}
