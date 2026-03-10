'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DataTable } from '@/components/DataTable';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface Hobby {
    hobby_id: number;
    name: string;
}

export default function ManageHobbiesPage() {
    const [hobbies, setHobbies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchHobbies = async () => {
            try {
                const response = await fetch('/api/hobbies');
                if (!response.ok) {
                    throw new Error('Failed to fetch hobbies');
                }
                const data = await response.json();
                setHobbies(data);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHobbies();
    }, []);

    const columns = [
        {
            header: 'Hobby Name',
            accessor: 'name',
        }
    ];

    return (
        <ProtectedRoute>
            <div className="flex w-full h-full bg-[var(--background)] overflow-hidden">
                <Sidebar activeTab="hobbies" />

                <main className="flex-1 h-full flex flex-col p-[32px] gap-[24px] overflow-auto relative">
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[32px] font-[600] text-[var(--foreground)] font-primary">
                            Manage Hobbies
                        </h1>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="h-[40px] px-[24px] py-[10px] rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                        >
                            <span className="text-[14px] font-[600] font-primary">Add new hobby</span>
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--foreground)]"></div>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                            {error}
                        </div>
                    ) : (
                        <DataTable columns={columns} data={hobbies} />
                    )}

                    {isAddModalOpen && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                            <div className="w-[400px] bg-[var(--background)] rounded-2xl shadow-xl flex flex-col overflow-hidden border border-[var(--border)]">
                                <div className="flex flex-row items-center justify-between px-[24px] py-[20px] border-b border-[var(--border)]">
                                    <h2 className="text-[20px] font-[600] text-[var(--foreground)] font-primary">
                                        Add new hobby
                                    </h2>
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[var(--foreground)] hover:bg-opacity-5 transition-colors"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="currentColor" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col p-[24px] gap-[20px]">
                                    <div className="flex flex-col gap-[8px]">
                                        <label className="text-[14px] font-[500] text-[var(--foreground)] font-primary">
                                            Hobby name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Hiking, Coding, Painting"
                                            className="w-full h-[48px] px-[16px] rounded-xl border border-[var(--border)] bg-transparent focus:outline-none focus:border-[var(--foreground)] transition-colors text-[16px] font-primary"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="w-full h-[48px] mt-[8px] rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:opacity-90 transition-opacity"
                                    >
                                        <span className="text-[16px] font-[600] font-primary">Submit</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
