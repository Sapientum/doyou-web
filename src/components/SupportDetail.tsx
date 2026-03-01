import React from 'react';

interface SupportDetailProps {
    message: {
        id: string;
        subject: string;
        sender: string;
        content: string;
    };
    onBack: () => void;
}

export const SupportDetail: React.FC<SupportDetailProps> = ({ message, onBack }) => {
    return (
        <div className="w-full flex-1 flex flex-col items-start gap-[24px]">
            <h1 className="text-[32px] font-[600] text-[var(--foreground)] font-primary">
                Message Details
            </h1>

            <div className="w-full rounded-none border border-[var(--border)] shadow-[0px_1px_1.75px_0px_#0000000d] bg-[var(--card)] flex flex-col">
                {/* Card Header */}
                <div className="w-full p-[32px] flex flex-col gap-[8px] justify-center border-b border-[var(--border)]">
                    <div className="text-[20px] font-[600] text-[var(--foreground)] font-primary">
                        Subject: {message.subject}
                    </div>
                    <div className="text-[14px] font-normal text-[var(--muted-foreground)] font-primary">
                        From: {message.sender}
                    </div>
                </div>

                {/* Card Content */}
                <div className="w-full p-[32px] flex flex-col justify-center border-b border-[var(--border)]">
                    <p className="text-[16px] font-normal text-[var(--foreground)] font-primary leading-[1.5] whitespace-pre-wrap">
                        {message.content}
                    </p>
                </div>

                {/* Card Footer */}
                <div className="w-full p-[32px] flex items-center justify-start gap-[8px]">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center h-[40px] px-[16px] py-[10px] rounded-full border border-[var(--border)] bg-[var(--background)] cursor-pointer"
                    >
                        <span className="text-[14px] font-[500] text-[var(--foreground)] font-primary leading-[1.428]">
                            Back to List
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
