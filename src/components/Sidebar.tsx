import React from 'react';
import { Mail, Flag, List, LayoutDashboard, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
    activeTab: 'support' | 'flagged' | 'hobbies';
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab }) => {
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

                <Link href="/" className={`flex items-center w-[248px] px-[16px] py-[12px] rounded-full gap-[16px] mb-[8px] ${activeTab === 'support' ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]' : 'bg-transparent text-[var(--sidebar-foreground)]'}`}>
                    <Mail className="w-[24px] h-[24px]" />
                    <span className="text-[16px] font-secondary leading-[1.5]">Support</span>
                </Link>

                <Link href="/flagged" className={`flex items-center w-[248px] px-[16px] py-[12px] rounded-full gap-[16px] mb-[8px] ${activeTab === 'flagged' ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]' : 'bg-transparent text-[var(--sidebar-foreground)]'}`}>
                    <Flag className="w-[24px] h-[24px]" />
                    <span className="text-[16px] font-secondary leading-[1.5]">Flagged Content</span>
                </Link>

                <Link href="/hobbies" className={`flex items-center w-[248px] px-[16px] py-[12px] rounded-full gap-[16px] mb-[8px] ${activeTab === 'hobbies' ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]' : 'bg-transparent text-[var(--sidebar-foreground)]'}`}>
                    <List className="w-[24px] h-[24px]" />
                    <span className="text-[16px] font-secondary leading-[1.5]">Manage Hobbies</span>
                </Link>
            </div>

            <div className="flex items-center px-[32px] py-[24px] border-t border-[var(--sidebar-border)] gap-[8px]">
                <div className="flex-1 flex flex-col gap-[4px]">
                    <span className="text-[16px] text-[var(--sidebar-accent-foreground)] font-secondary leading-[1.5]">Joe Doe</span>
                    <span className="text-[16px] text-[var(--sidebar-foreground)] font-secondary leading-[1.5]">joe@acmecorp.com</span>
                </div>
                <ChevronDown className="w-[24px] h-[24px] text-[var(--sidebar-foreground)]" />
            </div>
        </div>
    );
};
