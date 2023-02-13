export default function FooterGroup({ heading, children }: { heading: string, children: React.ReactNode }) {
    return (
        <div className="w-full">
            <h3 className="mb-2 text-lg uppercase">{heading}</h3>
            <div className="text-sm text-gray-200">{children}</div>
        </div>
    );
}