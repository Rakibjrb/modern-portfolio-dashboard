import React from "react";
import { MailCheck, Mail } from "lucide-react";
import { type ContactMessage } from "../types";

interface MessageListPaneProps {
  pagination: { page: number; limit: number };
  setPagination: ({ page, limit }: { page: number; limit: number }) => void;
  messages: ContactMessage[];
  selectedMessageId: string | null;
  onSelectMessage: (id: string) => void;
  onMarkAsRead: (id: string, e?: React.MouseEvent) => void;
}

export default function MessageListPane({
  pagination,
  setPagination,
  messages,
  selectedMessageId,
  onSelectMessage,
  onMarkAsRead,
}: MessageListPaneProps) {
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMinutes < 1) return "Just now";
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="flex h-full flex-col bg-slate-900/60 border-r border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 text-xs font-semibold text-slate-400">
        <span>{messages.length} Messages</span>
      </div>

      {/* Message Cards Scroll Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No messages found matching criteria.
          </div>
        ) : (
          messages.map((msg) => {
            const isSelected = selectedMessageId === msg._id;
            const isRead = Boolean(msg.markAsRead);

            return (
              <div
                key={msg._id}
                onClick={() => onSelectMessage(msg._id)}
                className={`group relative flex cursor-pointer gap-3 p-4 transition-all ${
                  isSelected
                    ? "bg-slate-800/90 border-l-4 border-l-cyan-400 text-slate-100 shadow-md"
                    : "hover:bg-slate-800/50 text-slate-300"
                }`}
              >
                {/* Avatar / Initials */}
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 font-bold text-cyan-400">
                    {getInitials(msg.name)}
                  </div>

                  {/* Unread Indicator Dot */}
                  {!isRead && (
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
                      className={`truncate text-sm ${
                        !isRead
                          ? "font-bold text-white"
                          : "font-medium text-slate-300"
                      }`}
                    >
                      {msg.name}
                    </h4>
                    <span className="shrink-0 text-[11px] font-medium text-slate-500">
                      {formatRelativeTime(msg.createdAt)}
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {msg.email}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs text-slate-400/80 leading-snug">
                    {msg.message}
                  </p>
                </div>

                {/* Mark as read / unread button */}
                <div
                  className="flex items-start pt-0.5"
                  onClick={(e) => onMarkAsRead(msg._id, e)}
                >
                  <button
                    type="button"
                    title={isRead ? "Mark as unread" : "Mark as read"}
                    className={`rounded p-1 transition-colors ${
                      isRead
                        ? "text-slate-600 hover:text-slate-400"
                        : "text-cyan-400 hover:text-cyan-300"
                    }`}
                  >
                    {isRead ? (
                      <Mail className="h-4 w-4" />
                    ) : (
                      <MailCheck className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}

        <div className="flex justify-center py-4">
          {messages.length === 0 ? (
            <button
              onClick={() => {
                setPagination({
                  page: 1,
                  limit: 10,
                });
              }}
              className="w-full cursor-pointer"
            >
              Reload
            </button>
          ) : (
            <button
              onClick={() => {
                setPagination({
                  page: pagination.page + 1,
                  limit: 10,
                });
              }}
              className="w-full cursor-pointer"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
