"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAdminPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/admin/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create admin');
            }

            setSuccess('Admin user created successfully!');

            // Clear form
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            // Optionally redirect after a short delay
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--color-info)]/20 rounded-full blur-[100px] -z-10" />

            <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-m)] p-8 shadow-2xl relative z-10 backdrop-blur-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-[600] text-[var(--foreground)] font-primary mb-2">Create Admin</h1>
                    <p className="text-[var(--muted-foreground)] font-secondary">Register a new administrator account</p>
                </div>

                <form onSubmit={handleCreate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-[500] text-[var(--foreground)] font-secondary">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-[var(--input)] border border-[var(--border)] rounded-[8px] px-4 py-3 text-[var(--foreground)] font-secondary placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                            placeholder="admin@doyou.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-[500] text-[var(--foreground)] font-secondary">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full bg-[var(--input)] border border-[var(--border)] rounded-[8px] px-4 py-3 text-[var(--foreground)] font-secondary placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-[500] text-[var(--foreground)] font-secondary">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full bg-[var(--input)] border border-[var(--border)] rounded-[8px] px-4 py-3 text-[var(--foreground)] font-secondary placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="bg-[var(--color-error)] border border-[var(--color-error-foreground)]/30 text-[var(--color-error-foreground)] px-4 py-3 rounded-[8px] text-sm font-secondary flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-[var(--color-success)] border border-[var(--color-success-foreground)]/30 text-[var(--color-success-foreground)] px-4 py-3 rounded-[8px] text-sm font-secondary flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || success !== ''}
                        className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-[600] font-secondary py-3 rounded-[8px] hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-70 flex justify-center items-center h-[52px]"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-[var(--primary-foreground)]/30 border-t-[var(--primary-foreground)] rounded-full animate-spin" />
                        ) : (
                            'Create Admin'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
