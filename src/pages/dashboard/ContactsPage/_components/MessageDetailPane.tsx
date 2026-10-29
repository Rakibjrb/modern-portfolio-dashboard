import { useState } from 'react';
import {
  Inbox,
  Mail,
  Star,
  Trash2,
  Reply,
  MailCheck,
  Send,
  ArrowLeft,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { type ContactMessage } from '../types';

interface MessageDetailPaneProps {
  message: ContactMessage | null;
  onBackMobile?: () => void;
  onToggleStar: (id: string) => void;
  onToggleReadStatus: (id: string) => void;
  onDeleteMessage: (message: ContactMessage) => void;
}

export default function MessageDetailPane({
  message,
  onBackMobile,
  onToggleStar,
  onToggleReadStatus,
  onDeleteMessage,
}: MessageDetailPaneProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplySent, setIsReplySent] = useState(false);

  if (!message) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-slate-950 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-500 shadow-xl">
          <Inbox className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-300">No Message Selected</h3>
        <p className="mt-1.5 max-w-sm text-xs text-slate-500">
          Select an inquiry from the list on the left to read full message details and send a direct reply.
        </p>
      </div>
    );
  }

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsReplySent(true);
    setTimeout(() => {
      setIsReplySent(false);
      setShowReplyBox(false);
      setReplyText('');
    }, 2000);
  };

  const formattedDate = new Date(message.timestamp).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inquiry Details</span>
            <h2 className="text-base font-bold text-slate-100 truncate max-w-md">{message.subject}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleStar(message.id)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-amber-400 transition-colors"
            title={message.isStarred ? 'Unstar Message' : 'Star Message'}
          >
            <Star className={`h-4 w-4 ${message.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
          <button
            onClick={() => onDeleteMessage(message)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
            title="Delete Message"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Message Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
        {/* Sender Info Banner */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {message.avatarUrl ? (
              <img
                src={message.avatarUrl}
                alt={message.senderName}
                className="h-12 w-12 rounded-full object-cover border border-slate-700 shadow-md"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-lg font-bold text-cyan-400">
                {message.senderName[0]}
              </div>
            )}
            <div>
              <h3 className="text-base font-bold text-slate-100">{message.senderName}</h3>
              <a
                href={`mailto:${message.senderEmail}`}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{message.senderEmail}</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Message Subject & Body */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 md:p-8 space-y-4">
          <h1 className="text-xl font-extrabold text-white tracking-tight leading-snug">
            {message.subject}
          </h1>

          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal">
            {message.message}
          </div>
        </div>

        {/* Inline Quick Reply Drawer / Composer */}
        {showReplyBox && (
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 shadow-2xl animate-in slide-in-from-bottom-3 duration-300 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Reply className="h-4 w-4" />
                <span>Replying to {message.senderName} ({message.senderEmail})</span>
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
                <span>Reply sent successfully to {message.senderEmail}!</span>
              </div>
            ) : (
              <form onSubmit={handleSendReply} className="space-y-3">
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder={`Write your response to ${message.senderName}...`}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950 p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReplyBox(false)}
                    className="rounded-xl border border-slate-700/80 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:to-blue-400"
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
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:to-blue-400 transition-all"
        >
          <Reply className="h-4 w-4" />
          <span>Reply via Email</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleReadStatus(message.id)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {message.isRead ? (
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

          <button
            onClick={() => onDeleteMessage(message)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
