import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DataTable } from '@/components/DataTable';

const mockPosts = [
    {
        snippet: "Spam link: click here for free...",
        actions: (
            <button className="h-[40px] px-[16px] py-[10px] rounded-full bg-[var(--background)] border border-[var(--border)] shadow-[0px_1px_1.75px_0px_#0000000d] flex items-center justify-center gap-[6px]">
                <span className="text-[14px] font-[500] font-primary text-[var(--foreground)] text-center leading-[1.428]">Review</span>
            </button>
        )
    },
    {
        snippet: "Offensive language in comment section",
        actions: (
            <button className="h-[40px] px-[16px] py-[10px] rounded-full bg-[var(--background)] border border-[var(--border)] shadow-[0px_1px_1.75px_0px_#0000000d] flex items-center justify-center gap-[6px]">
                <span className="text-[14px] font-[500] font-primary text-[var(--foreground)] text-center leading-[1.428]">Review</span>
            </button>
        )
    }
]

export default function FlaggedContentPage() {
    const columns = [
        {
            header: 'Post Snippet',
            accessor: 'snippet',
        },
        {
            header: 'Actions',
            accessor: 'actions',
            width: 'w-[120px]'
        }
    ]

    return (
        <div className="flex w-full h-full bg-[var(--background)] overflow-hidden">
            <Sidebar activeTab="flagged" />

            <main className="flex-1 h-full flex flex-col p-[32px] gap-[24px] overflow-auto">
                <h1 className="text-[32px] font-[600] text-[var(--foreground)] font-primary">
                    Flagged Content
                </h1>

                <DataTable columns={columns} data={mockPosts} />
            </main>
        </div>
    );
}
