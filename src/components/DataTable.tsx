import React from 'react';

interface Column {
    header: string;
    width?: string;
    accessor: string;
}

interface Row {
    [key: string]: React.ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: Row[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
    return (
        <div className="w-full h-fit flex flex-col bg-[var(--background)] border border-[var(--border)] rounded-none">
            <div className="w-full flex h-[44px] border-b border-[var(--border)] items-center">
                {columns.map((col, index) => (
                    <div
                        key={index}
                        className={`flex items-center p-[12px] gap-[8px] ${col.width ? col.width : 'flex-1'
                            } border-b border-[var(--border)]`}
                    >
                        <span className="text-[14px] text-[var(--muted-foreground)] font-primary leading-[1.428]">
                            {col.header}
                        </span>
                    </div>
                ))}
            </div>

            {data.map((row, rowIndex) => (
                <div key={rowIndex} className="w-full flex h-[44px] items-center border-b border-[var(--border)]">
                    {columns.map((col, colIndex) => (
                        <div
                            key={colIndex}
                            className={`flex items-center p-[12px] gap-[8px] ${col.width ? col.width : 'flex-1'
                                } border-r border-[var(--border)]`}
                        >
                            <div className="text-[14px] text-[var(--foreground)] font-secondary truncate">
                                {row[col.accessor]}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
