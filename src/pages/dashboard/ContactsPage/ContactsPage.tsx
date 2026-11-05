import { useState, useMemo } from "react";
import { Mail, Search, Loader2, RotateCw } from "lucide-react";
import { type ContactMessage, type MessageFilter } from "./types";
import MessageListPane from "./_components/MessageListPane";
import MessageDetailPane from "./_components/MessageDetailPane";
import {
  useGetContactsQuery,
  useMarkAsReadMutation,
} from "../../../redux/features/contact/contactApi";
import { toast } from "sonner";

export default function ContactsPage() {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null,
  );
  const [filter, setFilter] = useState<MessageFilter>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Redux API Query for Contacts List
  const markAsReadParam =
    filter === "unread" ? "false" : filter === "read" ? "true" : "";

  const {
    data: contactsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetContactsQuery({
    page: pagination.page,
    limit: pagination.limit,
    search: searchQuery,
    markAsRead: markAsReadParam,
  });

  // Normalize API data to ContactMessage[]
  const messages: ContactMessage[] = useMemo(() => {
    const rawList = Array.isArray(contactsResponse)
      ? contactsResponse
      : Array.isArray(contactsResponse?.data)
        ? contactsResponse.data
        : Array.isArray(contactsResponse?.data?.contacts)
          ? contactsResponse.data.contacts
          : Array.isArray(contactsResponse?.contacts)
            ? contactsResponse.contacts
            : [];

    return rawList.map((item: any) => ({
      _id: item._id || item.id || "",
      name: item.name || "",
      email: item.email || "",
      message: item.message || "",
      markAsRead: Boolean(item.markAsRead),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
    }));
  }, [contactsResponse]);

  const [markAsReadMutation] = useMarkAsReadMutation();

  const handleMarkAsRead = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await markAsReadMutation({ id }).unwrap();
      toast.success("Marked as read");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update message status");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-950 text-slate-100 p-4 md:p-6 space-y-5 overflow-y-auto">
      {/* 1. Top Header & Metrics Bar */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Message Center / Inquiries
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Manage, review, and respond to incoming contact form submissions and
            outreach.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Messages
              </span>
              <p className="mt-1 text-2xl font-bold text-slate-100">{0}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800 text-slate-300">
              <Mail className="h-5 w-5" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Unread Messages
                </span>
                {1 > 0 && (
                  <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                    New
                  </span>
                )}
              </div>
              <p className="mt-1 text-2xl font-bold text-cyan-400">{0}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
              <Mail className="h-5 w-5" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Read Messages
              </span>
              <p className="mt-1 text-2xl font-bold text-emerald-400">{0}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Mail className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Action & Filter Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sender, email, or content..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Reload & Filter Pills */}
          <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/90 p-1 border border-slate-800">
            <button
              onClick={() => refetch()}
              className="rounded-lg px-3 py-1.5 font-semibold transition-all cursor-pointer"
            >
              <RotateCw className="w-5 h-5 hover:text-cyan-500" />
            </button>
            <button
              onClick={() => setFilter("")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                filter === ""
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700/80"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                filter === "unread"
                  ? "bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/80"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                filter === "read"
                  ? "bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Read
            </button>
          </div>
        </div>
      </div>

      {/* 2. Split-Pane Workspace */}
      <div className="flex-1 min-h-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl backdrop-blur-xl">
        {isLoading ? (
          <div className="flex h-96 flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
            <p className="mt-3 text-xs text-slate-400">Loading messages...</p>
          </div>
        ) : isError ? (
          <div className="flex h-96 flex-col items-center justify-center p-4 text-center">
            <p className="text-sm font-semibold text-rose-400">
              Failed to load messages
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid h-full grid-cols-1 md:grid-cols-12">
            {/* Left Pane: Message List */}
            <div
              className={`h-[550px] overflow-y-auto md:col-span-4 lg:col-span-4 ${
                selectedMessageId ? "hidden md:block" : "block"
              }`}
            >
              <MessageListPane
                pagination={pagination}
                setPagination={setPagination}
                messages={messages}
                selectedMessageId={selectedMessageId}
                onSelectMessage={setSelectedMessageId}
                onMarkAsRead={handleMarkAsRead}
              />
            </div>

            {/* Right Pane: Selected Message Detail */}
            <div
              className={` h-[550px] overflow-y-auto md:col-span-8 lg:col-span-8 ${
                !selectedMessageId ? "hidden md:block" : "block"
              }`}
            >
              <MessageDetailPane
                selectedMessageId={selectedMessageId}
                onBackMobile={() => setSelectedMessageId(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
