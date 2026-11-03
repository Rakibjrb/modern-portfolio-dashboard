import { useState } from "react";
import {
  Inbox,
  Mail,
  Reply,
  MailCheck,
  Send,
  ArrowLeft,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { useGetContactByIdQuery } from "../../../../redux/features/contact/contactApi";

interface MessageDetailPaneProps {
  selectedMessageId: string | null;
  onBackMobile?: () => void;
}

export default function MessageDetailPane({
  selectedMessageId,
  onBackMobile,
}: MessageDetailPaneProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isReplySent, setIsReplySent] = useState(false);

  // Selected message detail query (if needed) or fallback to list item
  const { data: singleContactResponse, isLoading } = useGetContactByIdQuery({
    id: selectedMessageId as string,
  });

  const message = singleContactResponse?.data || {};

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    window.open(
      `mailto:${message.email}?subject=${encodeURIComponent(
        `Re: Contact Inquiry from ${message.name}`,
      )}&body=${encodeURIComponent(replyText)}`,
      "_blank",
    );

    setIsReplySent(true);
    setTimeout(() => {
      setIsReplySent(false);
      setShowReplyBox(false);
      setReplyText("");
    }, 2000);
  };

  const formattedDate = message.createdAt
    ? new Date(message.createdAt).toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-slate-950 p-8 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
        <p className="mt-3 text-xs text-slate-400">
          Loading message details...
        </p>
      </div>
    );
  }

  if (!selectedMessageId) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-slate-950 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-500 shadow-xl">
          <Inbox className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-300">
          No Message Selected
        </h3>
        <p className="mt-1.5 max-w-sm text-xs text-slate-500">
          Select an inquiry from the list on the left to read full message
          details and send a direct reply.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-slate-950">
      {/* Top Header / Action Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/40 px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Mobile Back Button */}
          {onBackMobile && (
            <button
              onClick={onBackMobile}
              className="mr-1 rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white md:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Inquiry Details
            </span>
            <h2 className="text-base font-bold text-slate-100 truncate max-w-md">
              From: {message.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            title={message.markAsRead ? "Mark as unread" : "Mark as read"}
          >
            {message.markAsRead ? (
              <>
                <Mail className="h-4 w-4 text-blue-400" />
                <span>Mark Unread</span>
              </>
            ) : (
              <>
                <MailCheck className="h-4 w-4 text-cyan-400" />
                <span>Mark Read</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Message Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
        {/* Sender Info Banner */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-lg font-bold text-cyan-400">
              {message.name ? message.name[0].toUpperCase() : "?"}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {message.name}
              </h3>
              <a
                href={`mailto:${message.email}`}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{message.email}</span>
              </a>
            </div>
          </div>

          {formattedDate && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>

        {/* Message Body */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 md:p-8 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Message
          </div>
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal">
            {message.message}
          </div>
        </div>

        {/* Inline Quick Reply Composer */}
        {showReplyBox && (
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 shadow-2xl animate-in slide-in-from-bottom-3 duration-300 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Reply className="h-4 w-4" />
                <span>
                  Replying to {message.name} ({message.email})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowReplyBox(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            {isReplySent ? (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span>Opening email client for {message.email}...</span>
              </div>
            ) : (
              <form onSubmit={handleSendReply} className="space-y-3">
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Write your response to ${message.name}...`}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950 p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReplyBox(false)}
                    className="rounded-xl border border-slate-700/80 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:to-blue-400 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Reply</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-900/60 px-6 py-4">
        <button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer"
        >
          <Reply className="h-4 w-4" />
          <span>Reply via Email</span>
        </button>

        <a
          href={`mailto:${message.email}?subject=${encodeURIComponent(
            `Re: Contact Inquiry from ${message.name}`,
          )}`}
          className="flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <Mail className="h-4 w-4 text-cyan-400" />
          <span>Open in Mail App</span>
        </a>
      </div>
    </div>
  );
}
