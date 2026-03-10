"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DataTable } from '@/components/DataTable';
import { SupportDetail } from '@/components/SupportDetail';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export interface SupportMessage {
  message_id: number;
  user_id: number;
  subject: string;
  message: string;
  created_at: string;
  read: boolean;
  username: string;
  email: string;
  image_url?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);

  useEffect(() => {
    fetchSupportMessages();
  }, []);

  const fetchSupportMessages = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminAccessToken');
      const res = await fetch('/api/support', {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : (data.data || data.messages || []));
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMessage = async (id: number, isRead: boolean) => {
    setSelectedMessageId(id);

    if (isRead) return;

    // Optimistically mark as read locally
    setMessages(prev => prev.map(m => m.message_id === id ? { ...m, read: true } : m));

    try {
      const token = localStorage.getItem('adminAccessToken');
      await fetch(`/api/support/${id}/read`, {
        method: 'PUT',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
    } catch (error) {
      console.error("Failed to mark message as read", error);
    }
  };

  const selectedMessage = messages.find(m => m.message_id === selectedMessageId);

  // Normalize message for detail view since backend exact property names might vary
  const detailMessage = selectedMessage ? {
    id: String(selectedMessage.message_id),
    subject: selectedMessage.subject || 'No Subject',
    sender: selectedMessage.username || selectedMessage.email || 'Unknown Sender',
    content: selectedMessage.message || 'No Content',
  } : undefined;

  const columns = [
    {
      header: 'Subject',
      accessor: 'subject',
    },
    {
      header: 'Status',
      accessor: 'status',
      width: 'w-[120px]'
    },
    {
      header: 'Actions',
      accessor: 'actions',
      width: 'w-[120px]'
    }
  ];

  const tableData = messages.map(msg => ({
    subject: (
      <button
        onClick={() => handleViewMessage(msg.message_id, msg.read)}
        className="text-left w-full hover:underline focus:outline-none"
      >
        <span className={msg.read ? 'text-[var(--muted-foreground)]' : 'font-[600] text-[var(--foreground)]'}>
          {msg.subject || 'No Subject'}
        </span>
      </button>
    ),
    status: (
      <span className={`text-[12px] px-[8px] py-[2px] rounded-full ${msg.read ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]' : 'bg-[var(--primary)] text-[var(--primary-foreground)]'}`}>
        {msg.read ? 'Read' : 'Unread'}
      </span>
    ),
    actions: (
      <button
        onClick={() => handleViewMessage(msg.message_id, msg.read)}
        className="h-[40px] px-[16px] py-[10px] rounded-full bg-[var(--background)] border border-[var(--border)] shadow-[0px_1px_1.75px_0px_#0000000d] cursor-pointer flex items-center justify-center gap-[6px]"
      >
        <span className="text-[14px] font-[500] font-primary text-[var(--foreground)] text-center leading-[1.428]">View</span>
      </button>
    )
  }));

  return (
    <ProtectedRoute>
      <div className="flex w-full h-full bg-[var(--background)] overflow-hidden">
        <Sidebar activeTab="support" />

        <main className="flex-1 h-full flex flex-col p-[32px] gap-[24px] overflow-auto">
          {selectedMessageId && detailMessage ? (
            <SupportDetail
              message={detailMessage}
              onBack={() => setSelectedMessageId(null)}
            />
          ) : (
            <>
              <h1 className="text-[32px] font-[600] text-[var(--foreground)] font-primary">
                Support Messages
              </h1>

              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-[var(--primary)]/30 border-t-[var(--primary)] rounded-full animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-[var(--muted-foreground)]">
                  No support messages found.
                </div>
              ) : (
                <DataTable columns={columns} data={tableData} />
              )}
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
