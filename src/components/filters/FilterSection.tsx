import type { ReactNode } from "react";

interface FilterSectionProps {
    title: string;
    children: ReactNode;
}

export const FilterSection = ({ title, children }: FilterSectionProps) => {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-black">
                {title}
            </h3>
            <div className="flex flex-col gap-1">
                {children}
            </div>
        </div>
    );
};
