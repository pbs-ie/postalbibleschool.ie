import React from "react";

export default function LabelSpan({ children }: { children: React.ReactNode }) {
    return (
        <span className="block py-1 mb-px text-base font-medium capitalize rounded md:text-base text-slate-700">
            {children}
        </span>
    );
}