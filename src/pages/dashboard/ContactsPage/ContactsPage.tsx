import React, { useState, useMemo } from 'react';
import { Mail, Star, Search } from 'lucide-react';
import { type ContactMessage, type MessageFilter } from './types';
import { initialMessages } from './mockData';
import MessageListPane from './_components/MessageListPane';
import MessageDetailPane from './_components/MessageDetailPane';
import DeleteConfirmModal from './_components/DeleteConfirmModal';

export default function ContactsPage() {
    const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>('msg-1');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [filter, setFilter] = useState<MessageFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Modals for deletion
    const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);

    // Compute Statistics
    const totalMessagesCount = messages.length;
    const unreadCount = messages.filter(m => !m.isRead).length;
    const starredCount = messages.filter(m => m.isStarred).length;

    // Filter & Search Messages List
    const filteredMessages = useMemo(() => {
        return messages.filter(m => {
            // Filter logic
            if (filter === 'unread' && m.isRead) return false;
            if (filter === 'starred' && !m.isStarred) return false;

            // Search logic
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
                m.senderName.toLowerCase().includes(q) ||
                m.senderEmail.toLowerCase().includes(q) ||
                m.subject.toLowerCase().includes(q) ||
                m.message.toLowerCase().includes(q)
            );
        });
    }, [messages, filter, searchQuery]);

    const selectedMessage = useMemo(() => {
        return messages.find(m => m.id === selectedMessageId) || null;
    }, [messages, selectedMessageId]);

    // Handlers
    const handleSelectMessage = (id: string) => {
        setSelectedMessageId(id);

        // Automatically mark as read when selected
        setMessages(prev =>
            prev.map(msg => (msg.id === id ? { ...msg, isRead: true } : msg))
        );
    };

    const handleToggleStar = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setMessages(prev =>
            prev.map(msg => (msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg))
        );
    };

    const handleToggleReadStatus = (id: string) => {
        setMessages(prev =>
            prev.map(msg => (msg.id === id ? { ...msg, isRead: !msg.isRead } : msg))
        );
    };

    const handleToggleSelectId = (id: string, e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent) => {
        if ('stopPropagation' in e) e.stopPropagation();
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAllToggle = () => {
        if (selectedIds.length === filteredMessages.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredMessages.map(m => m.id));
        }
    };

    // Bulk Operations
    const handleBulkMarkRead = () => {
        setMessages(prev =>
            prev.map(msg => (selectedIds.includes(msg.id) ? { ...msg, isRead: true } : msg))
        );
        setSelectedIds([]);
    };

    const handleBulkMarkUnread = () => {
        setMessages(prev =>
            prev.map(msg => (selectedIds.includes(msg.id) ? { ...msg, isRead: false } : msg))
        );
        setSelectedIds([]);
    };

    const handleConfirmBulkDelete = () => {
        setMessages(prev => prev.filter(msg => !selectedIds.includes(msg.id)));
        if (selectedMessageId && selectedIds.includes(selectedMessageId)) {
            setSelectedMessageId(null);
        }
        setSelectedIds([]);
        setIsBulkDeleting(false);
    };

    const handleConfirmSingleDelete = () => {
        if (messageToDelete) {
            setMessages(prev => prev.filter(msg => msg.id !== messageToDelete.id));
            if (selectedMessageId === messageToDelete.id) {
                setSelectedMessageId(null);
            }
            setMessageToDelete(null);
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
                        Manage, review, and respond to incoming contact form submissions and recruiter outreach.
                    </p>
                </div>

                {/* 3 Columns Stat Cards */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Messages</span>
                            <p className="mt-1 text-2xl font-bold text-slate-100">{totalMessagesCount}</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800 text-slate-300">
                            <Mail className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unread Messages</span>
                                {unreadCount > 0 && (
                                    <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                                        New
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 text-2xl font-bold text-cyan-400">{unreadCount}</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                            <Mail className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Starred Messages</span>
                            <p className="mt-1 text-2xl font-bold text-amber-400">{starredCount}</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                            <Star className="h-5 w-5 fill-amber-400" />
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
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search sender, email, or content..."
                            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-slate-700 focus:outline-none"
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/90 p-1 border border-slate-800">
                        <button
                            onClick={() => setFilter('all')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filter === 'all'
                                ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            All ({totalMessagesCount})
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filter === 'unread'
                                ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/80'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Unread ({unreadCount})
                        </button>
                        <button
                            onClick={() => setFilter('starred')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filter === 'starred'
                                ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700/80'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Starred ({starredCount})
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Split-Pane Workspace */}
            <div className="flex-1 min-h-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl backdrop-blur-xl">
                <div className="grid h-full grid-cols-1 md:grid-cols-12">
                    {/* Left Pane: Message List (35% on desktop -> col-span-4 or col-span-5) */}
                    <div
                        className={`h-[550px] overflow-y-auto md:col-span-4 lg:col-span-4 ${selectedMessageId ? 'hidden md:block' : 'block'
                            }`}
                    >
                        <MessageListPane
                            messages={filteredMessages}
                            selectedMessageId={selectedMessageId}
                            selectedIds={selectedIds}
                            onSelectMessage={handleSelectMessage}
                            onToggleStar={handleToggleStar}
                            onToggleSelectId={handleToggleSelectId}
                            onSelectAllToggle={handleSelectAllToggle}
                            onBulkMarkRead={handleBulkMarkRead}
                            onBulkMarkUnread={handleBulkMarkUnread}
                            onBulkDelete={() => setIsBulkDeleting(true)}
                        />
                    </div>

                    {/* Right Pane: Selected Message Detail (65% on desktop -> col-span-8) */}
                    <div
                        className={`h-[550px] overflow-y-auto md:col-span-8 lg:col-span-8 ${!selectedMessageId ? 'hidden md:block' : 'block'
                            }`}
                    >
                        <MessageDetailPane
                            message={selectedMessage}
                            onBackMobile={() => setSelectedMessageId(null)}
                            onToggleStar={id => handleToggleStar(id)}
                            onToggleReadStatus={handleToggleReadStatus}
                            onDeleteMessage={msg => setMessageToDelete(msg)}
                        />
                    </div>
                </div>
            </div>

            {/* Deletion Confirm Dialogs */}
            <DeleteConfirmModal
                isOpen={!!messageToDelete}
                title="Delete Message"
                description={
                    messageToDelete
                        ? `Are you sure you want to delete the message from "${messageToDelete.senderName}"? This action cannot be undone.`
                        : ''
                }
                onClose={() => setMessageToDelete(null)}
                onConfirm={handleConfirmSingleDelete}
            />

            <DeleteConfirmModal
                isOpen={isBulkDeleting}
                title="Delete Selected Messages"
                description={`Are you sure you want to delete ${selectedIds.length} selected message(s)? This action cannot be undone.`}
                onClose={() => setIsBulkDeleting(false)}
                onConfirm={handleConfirmBulkDelete}
            />
        </div>
    );
}