export default function FooterGroup({ heading, children }: { heading: string, children: any }) {
    return (
        <div className="mb-10 w-full px-2">
            <h3 className="uppercase font-bold mb-2 text-base">{heading}</h3>
            <div className="text-gray-200 text-sm">{children}</div>
        </div>
    );
}