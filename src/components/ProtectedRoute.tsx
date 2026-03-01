"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('adminAccessToken');
        if (!token) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <div className="w-8 h-8 border-4 border-[var(--primary)]/30 border-t-[var(--primary)] rounded-full animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}
