export default function Loader() {
    return (
        <div className="flex pointer-events-none">
            <p className="w-[25px] h-[25px] rounded-full border-4 border-slate-300 border-r-sky-500 animate-spin"></p>
            <p className="ml-5 text-gray-400">Loading...</p>
        </div>
    );
}