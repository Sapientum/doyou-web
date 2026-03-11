'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DataTable } from '@/components/DataTable';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { fetchWithAuth } from '@/lib/api';

interface Hobby {
    hobby_id: number;
    name: string;
}

export default function ManageHobbiesPage() {
    const [hobbies, setHobbies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [hobbyToDelete, setHobbyToDelete] = useState<Hobby | null>(null);
    const [newHobbyName, setNewHobbyName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchHobbies = async () => {
        try {
            setIsLoading(true);
            const response = await fetchWithAuth('/api/hobbies');
            if (!response.ok) {
                throw new Error('Failed to fetch hobbies');
            }
            const data = await response.json();

            const mappedHobbies = data.map((hobby: Hobby) => ({
                ...hobby,
                actions: (
                    <button
                        onClick={() => {
                            setHobbyToDelete(hobby);
                            setIsDeleteModalOpen(true);
                        }}
                        className="h-[40px] px-[16px] py-[10px] rounded-full bg-red-50 text-red-600 border border-red-200 shadow-[0px_1px_1.75px_0px_#0000000d] flex items-center justify-center gap-[6px] hover:bg-red-100 transition-colors"
                    >
                        <span className="text-[14px] font-[500] font-primary text-center leading-[1.428]">Delete</span>
                    </button>
                )
            }));

            setHobbies(mappedHobbies);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHobbies();
    }, []);

    const handleAddHobby = async () => {
        if (!newHobbyName.trim()) return;

        try {
            setIsSubmitting(true);
            const response = await fetchWithAuth('/api/hobbies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newHobbyName.trim() }),
            });

            if (!response.ok) {
                throw new Error('Failed to add hobby');
            }

            setIsAddModalOpen(false);
            setNewHobbyName('');
            await fetchHobbies();
        } catch (err) {
            console.error(err);
            // Optionally set an error state specific to adding
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteHobby = async () => {
        if (!hobbyToDelete) return;

        try {
            setIsSubmitting(true);
            const response = await fetchWithAuth(`/api/hobbies/${hobbyToDelete.hobby_id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete hobby');
            }

            setIsDeleteModalOpen(false);
            setHobbyToDelete(null);
            await fetchHobbies();
        } catch (err) {
            console.error(err);
            // Optionally set an error state specific to deleting
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    {isLoading && hobbies.length === 0 ? (
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
                                            value={newHobbyName}
                                            onChange={(e) => setNewHobbyName(e.target.value)}
                                            placeholder="e.g. Hiking, Coding, Painting"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleAddHobby();
                                                }
                                            }}
                                            className="w-full h-[48px] px-[16px] rounded-xl border border-[var(--border)] bg-transparent focus:outline-none focus:border-[var(--foreground)] transition-colors text-[16px] font-primary"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAddHobby}
                                        disabled={isSubmitting || !newHobbyName.trim()}
                                        className="w-full h-[48px] mt-[8px] rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        ) : (
                                            <span className="text-[16px] font-[600] font-primary">Submit</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isDeleteModalOpen && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                            <div className="w-[400px] bg-[var(--background)] rounded-2xl shadow-xl flex flex-col overflow-hidden border border-[var(--border)]">
                                <div className="flex flex-row items-center justify-between px-[24px] py-[20px] border-b border-[var(--border)]">
                                    <h2 className="text-[20px] font-[600] text-[var(--foreground)] font-primary">
                                        Delete hobby
                                    </h2>
                                    <button
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[var(--foreground)] hover:bg-opacity-5 transition-colors"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="currentColor" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col p-[24px] gap-[24px]">
                                    <p className="text-[16px] text-[var(--foreground)] font-primary">
                                        Are you sure you want to delete <span className="font-[600]">"{hobbyToDelete?.name}"</span>? This action cannot be undone.
                                    </p>
                                    <div className="flex flex-row gap-[12px] w-full">
                                        <button
                                            onClick={() => setIsDeleteModalOpen(false)}
                                            disabled={isSubmitting}
                                            className="flex-1 h-[48px] rounded-full bg-transparent border border-[var(--border)] text-[var(--foreground)] flex items-center justify-center hover:bg-[var(--foreground)] hover:bg-opacity-5 transition-colors disabled:opacity-50"
                                        >
                                            <span className="text-[16px] font-[600] font-primary">Cancel</span>
                                        </button>
                                        <button
                                            onClick={handleDeleteHobby}
                                            disabled={isSubmitting}
                                            className="flex-1 h-[48px] rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            ) : (
                                                <span className="text-[16px] font-[600] font-primary">Delete</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
