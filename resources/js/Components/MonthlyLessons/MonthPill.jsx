export default function MonthPill({ addClass, isActive, setActive = {}, children }) {
    return (
        <button onClick={() => typeof setActive === "function" ? setActive(children) : null} className={isActive ? `bg-blue-500 text-gray-50 rounded p-2 ${addClass}` : `bg-slate-200 text-gray-600 rounded p-2 ${addClass}`}>{children}</button>
    );

}