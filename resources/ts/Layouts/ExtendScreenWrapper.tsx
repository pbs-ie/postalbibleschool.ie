export default function ExtendScreenWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen relative right-1/2 left-1/2 -mx-[50vw] px-5 py-3 mb-5">
            {children}
        </div>
    )
}