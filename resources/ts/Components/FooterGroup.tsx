export default function FooterGroup({ heading, children }: { heading: string, children: any }) {
    return (
        <div className="w-full">
            <h3 className="mb-2 text-xl uppercase">{heading}</h3>
            <div className="text-sm text-gray-200">{children}</div>
        </div>
    );
}