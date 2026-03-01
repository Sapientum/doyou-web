import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DataTable } from '@/components/DataTable';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const mockHobbies = [
    {
        name: "Photography",
        actions: (
            <button className="h-[40px] px-[16px] py-[10px] rounded-full bg-[var(--background)] border border-[var(--border)] shadow-[0px_1px_1.75px_0px_#0000000d] flex items-center justify-center gap-[6px]">
                <span className="text-[14px] font-[500] font-primary text-[var(--foreground)] text-center leading-[1.428]">Edit</span>
            </button>
        )
    },
    {
        name: "Reading",
        actions: (
            <button className="h-[40px] px-[16px] py-[10px] rounded-full bg-[var(--background)] border border-[var(--border)] shadow-[0px_1px_1.75px_0px_#0000000d] flex items-center justify-center gap-[6px]">
                <span className="text-[14px] font-[500] font-primary text-[var(--foreground)] text-center leading-[1.428]">Edit</span>
            </button>
        )
    }
]

export default function ManageHobbiesPage() {
    const columns = [
        {
            header: 'Hobby Name',
            accessor: 'name',
        },
        {
            header: 'Actions',
            accessor: 'actions',
            width: 'w-[120px]'
        }
    ]

    return (
        <ProtectedRoute>
            <div className="flex w-full h-full bg-[var(--background)] overflow-hidden">
                <Sidebar activeTab="hobbies" />

                <main className="flex-1 h-full flex flex-col p-[32px] gap-[24px] overflow-auto">
                    <h1 className="text-[32px] font-[600] text-[var(--foreground)] font-primary">
                        Manage Hobbies
                    </h1>

                    <DataTable columns={columns} data={mockHobbies} />
                </main>
            </div>
        </ProtectedRoute>
    );
}
