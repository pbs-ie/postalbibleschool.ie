export default function MonthPill({ addClass, children }) {
    return (
        <button className={`bg-slate-200 text-gray-600 rounded p-2 ${addClass}`}>{children}</button>
    );

}