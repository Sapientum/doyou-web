"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DataTable } from '@/components/DataTable';
import { SupportDetail } from '@/components/SupportDetail';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const mockMessages = [
  {
    id: '1',
    subject: "Cannot login to my account",
    sender: "user123@example.com",
    content: "Hello,\nI've been trying to login for the past hour and keep getting an 'Invalid Credentials' error even though I just reset my password. Please help."
  },
  {
    id: '2',
    subject: "App crashes when attempting to post",
    sender: "jane.doe@example.com",
    content: "Hi support team,\nWhenever I try to post a new image, the app immediately crashes to the home screen. I'm on the latest iOS version."
  }
];

export default function Home() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const selectedMessage = mockMessages.find(m => m.id === selectedMessageId);

  const columns = [
    {
      header: 'Subject',
      accessor: 'subject',
    },
    {
      header: 'Actions',
      accessor: 'actions',
      width: 'w-[120px]'
    }
  ];

  const tableData = mockMessages.map(msg => ({
    subject: msg.subject,
    actions: (
      <button
        onClick={() => setSelectedMessageId(msg.id)}
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
          {selectedMessageId && selectedMessage ? (
            <SupportDetail
              message={selectedMessage}
              onBack={() => setSelectedMessageId(null)}
            />
          ) : (
            <>
              <h1 className="text-[32px] font-[600] text-[var(--foreground)] font-primary">
                Support Messages
              </h1>

              <DataTable columns={columns} data={tableData} />
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
