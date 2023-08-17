import React from "react";

export default function TextPillDiv({ className, children }: { className?: string, children: React.ReactNode }) {
    return <div className={"px-3 py-2 leading-6 bg-gray-200 border border-gray-400 rounded-md shadow-sm bg-clip-padding " + className}>{children}</div>;
}