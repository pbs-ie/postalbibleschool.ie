export default function Paragraph({ className = '', children }: { className?: string, children: React.ReactNode }) {
    return (
        <p className={`text-base text-left mb-5 text-gray-600 ${className}`}>
            {children}
        </p>
    )
}