export default function SettingsSection({ children }: { children: React.ReactNode }) {
    return (
        <section className="px-4 py-4 space-y-8 sm:px-6 lg:px-12">
            {children}
        </section>
    )
}