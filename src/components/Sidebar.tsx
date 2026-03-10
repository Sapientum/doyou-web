"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Mail, Flag, List, LayoutDashboard, ChevronDown, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SidebarProps {
    activeTab: 'support' | 'flagged' | 'hobbies';
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab }) => {
    const [user, setUser] = useState<{ name: string; username: string; email: string } | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse admin user", e);
            }
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleLogout = () => {
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
        localStorage.removeItem('adminUser');
        router.push('/login');
    };

    return (
        <div className="w-[280px] h-full bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] flex flex-col gap-[24px] shrink-0">
            <div className="flex flex-col justify-center h-[88px] px-[32px] py-[24px] border-b border-[var(--sidebar-border)] gap-[8px]">
                <div className="flex items-center gap-[8px]">
                    <LayoutDashboard className="w-[32px] h-[32px] text-[var(--primary)]" />
                    <span className="text-[18px] font-[700] text-[var(--primary)] font-primary">LUNARIS</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col px-[16px]">
                <div className="flex items-center px-[16px] py-[16px]">
                    <span className="text-[14px] text-[var(--sidebar-foreground)] font-primary leading-[1.14]">Admin Menu</span>
                </div>

                <Link href="/" className={`flex items-center w-[248px] px-[16px] py-[12px] rounded-full gap-[16px] mb-[8px] ${activeTab === 'support' ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]' : 'bg-transparent text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]/50 transition-colors'}`}>
                    <Mail className="w-[24px] h-[24px]" />
                    <span className="text-[16px] font-secondary leading-[1.5]">Support</span>
                </Link>

                <Link href="/flagged" className={`flex items-center w-[248px] px-[16px] py-[12px] rounded-full gap-[16px] mb-[8px] ${activeTab === 'flagged' ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]' : 'bg-transparent text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]/50 transition-colors'}`}>
                    <Flag className="w-[24px] h-[24px]" />
                    <span className="text-[16px] font-secondary leading-[1.5]">Flagged Content</span>
                </Link>

                <Link href="/hobbies" className={`flex items-center w-[248px] px-[16px] py-[12px] rounded-full gap-[16px] mb-[8px] ${activeTab === 'hobbies' ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]' : 'bg-transparent text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]/50 transition-colors'}`}>
                    <List className="w-[24px] h-[24px]" />
                    <span className="text-[16px] font-secondary leading-[1.5]">Manage Hobbies</span>
                </Link>
            </div>

            <div className="relative" ref={menuRef}>
                <div
                    className="flex items-center px-[32px] py-[24px] border-t border-[var(--sidebar-border)] gap-[8px] cursor-pointer hover:bg-[var(--sidebar-accent)]/50 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="flex-1 flex flex-col gap-[4px] min-w-0">
                        <span className="text-[16px] text-[var(--sidebar-accent-foreground)] font-secondary leading-[1.5] truncate">
                            {user?.name || user?.username || 'Admin User'}
                        </span>
                        <span className="text-[14px] text-[var(--sidebar-foreground)] opacity-70 font-secondary leading-[1.5] truncate">
                            {user?.email || 'admin@doyou'}
                        </span>
                    </div>
                    <ChevronDown className={`w-[24px] h-[24px] text-[var(--sidebar-foreground)] transition-transform duration-200 shrink-0 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </div>

                {isMenuOpen && (
                    <div className="absolute bottom-[calc(100%-8px)] left-[16px] right-[16px] bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-m)] p-2 shadow-lg animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-secondary font-medium text-[var(--color-error-foreground)] hover:bg-[var(--color-error)]/20 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
