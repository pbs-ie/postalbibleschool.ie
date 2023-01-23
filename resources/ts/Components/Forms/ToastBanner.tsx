export default function ToastBanner({ message }: { message: string }) {
    return (
        <div className="w-full px-8 py-4 mb-2 text-left bg-red-500 rounded text-slate-50">
            <p>{message}</p>
        </div>
    )
}