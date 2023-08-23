import React from "react";

export default function LabelSpan({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <span className={"block py-1 mb-px text-base font-medium capitalize md:text-base text-slate-700 " + className} >
            {children}
        </span>
    );
}