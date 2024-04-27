export default function ErrorBanner({ message }: { message: string }) {
    return (
        <div className="bg-red-600 p-2 pl-5 text-sm w-full flex text-white rounded shadow">
            {message}
        </div>
    )
}