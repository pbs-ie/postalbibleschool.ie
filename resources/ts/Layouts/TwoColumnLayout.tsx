import React from "react";

export default function TwoColumnLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-2 w-full px-10 items-start">
            {children}
        </div>
    )
}