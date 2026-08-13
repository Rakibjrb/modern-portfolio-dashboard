import React from 'react';
import { Star, CheckSquare, Square, MailCheck, Mail, Trash2 } from 'lucide-react';
import { type ContactMessage } from '../types';

interface MessageListPaneProps {
  messages: ContactMessage[];
  selectedMessageId: string | null;
  selectedIds: string[];
  onSelectMessage: (id: string) => void;
  onToggleStar: (id: string, e: React.MouseEvent) => void;
  onToggleSelectId: (id: string, e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent) => void;
  onSelectAllToggle: () => void;
  onBulkMarkRead: () => void;
  onBulkMarkUnread: () => void;
  onBulkDelete: () => void;
}

export default function MessageListPane({
  messages,
  selectedMessageId,
  selectedIds,
  onSelectMessage,
  onToggleStar,
  onToggleSelectId,
  onSelectAllToggle,
  onBulkMarkRead,
  onBulkMarkUnread,
  onBulkDelete,
}: MessageListPaneProps) {
  const isAllSelected = messages.length > 0 && selectedIds.length === messages.length;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex h-full flex-col bg-slate-900/60 border-r border-slate-800">
      {/* Bulk Operations Top Bar */}
      {selectedIds.length > 0 ? (
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <button
              onClick={onSelectAllToggle}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white font-medium"
            >
              {isAllSelected ? (
                <CheckSquare className="h-4 w-4 text-cyan-400" />
              ) : (
                <Square className="h-4 w-4 text-slate-500" />
              )}
              <span>{selectedIds.length} Selected</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onBulkMarkRead}
              className="flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-800 px-2.5 py-1.5 font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Mark Selected as Read"
            >
              <MailCheck className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Read</span>
            </button>
            <button
              onClick={onBulkMarkUnread}
              className="flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-800 px-2.5 py-1.5 font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Mark Selected as Unread"
            >
              <Mail className="h-3.5 w-3.5 text-blue-400" />
              <span className="hidden sm:inline">Unread</span>
            </button>
            <button
              onClick={onBulkDelete}
              className="flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-800 px-2.5 py-1.5 font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Delete Selected"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 text-xs font-semibold text-slate-400">
          <span>{messages.length} Messages</span>
          <button
            onClick={onSelectAllToggle}
            className="flex items-center gap-1 hover:text-slate-200 transition-colors"
          >
            <Square className="h-3.5 w-3.5 text-slate-500" />
            <span>Select All</span>
          </button>
        </div>
      )}

      {/* Message Cards Scroll Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No messages found matching criteria.
          </div>
        ) : (
          messages.map(msg => {
            const isSelected = selectedMessageId === msg.id;
            const isChecked = selectedIds.includes(msg.id);

            return (
              <div
                key={msg.id}
                onClick={() => onSelectMessage(msg.id)}
                className={`group relative flex cursor-pointer gap-3 p-4 transition-all ${isSelected
                    ? 'bg-slate-800/90 border-l-4 border-l-cyan-400 text-slate-100 shadow-md'
                    : 'hover:bg-slate-800/50 text-slate-300'
                  }`}
              >
                {/* Selection Checkbox */}
                <div
                  className="flex items-start pt-1"
                  onClick={e => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={e => onToggleSelectId(msg.id, e)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                  />
                </div>

                {/* Avatar / Initials */}
                <div className="relative shrink-0">
                  {msg.avatarUrl ? (
                    <img
                      src={msg.avatarUrl}
                      alt={msg.senderName}
                      className="h-10 w-10 rounded-full object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 font-bold text-cyan-400">
                      {getInitials(msg.senderName)}
                    </div>
                  )}

                  {/* Unread Indicator Dot */}
                  {!msg.isRead && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500 border border-slate-900"></span>
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4
                      className={`truncate text-sm ${!msg.isRead ? 'font-bold text-white' : 'font-medium text-slate-300'
                        }`}
                    >
                      {msg.senderName}
                    </h4>
                    <span className="shrink-0 text-[11px] font-medium text-slate-500">
                      {msg.relativeTime}
                    </span>
                  </div>

                  <p
                    className={`mt-0.5 truncate text-xs ${!msg.isRead ? 'font-semibold text-slate-200' : 'text-slate-400'
                      }`}
                  >
                    {msg.subject}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs text-slate-400/80 leading-snug">
                    {msg.message}
                  </p>
                </div>

                {/* Star Button */}
                <div
                  className="flex items-start pt-0.5"
                  onClick={e => onToggleStar(msg.id, e)}
                >
                  <button
                    type="button"
                    className="text-slate-600 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`h-4 w-4 ${msg.isStarred
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600 hover:text-slate-400'
                        }`}
                    />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
