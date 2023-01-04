
interface Pill {
    onPress: () => void;
    addClass: string;
    isActive: boolean;
    setActive: ((index: number) => void) | object;
    idx: number;
    children: React.ReactNode;
}
export default function MonthPill({ onPress, addClass, isActive, setActive = {}, idx, children }: Pill) {
    return (
        <>
            <button onClick={() => { onPress(); return typeof setActive === "function" ? setActive(idx) : null; }} className={isActive ? `bg-blue-500 text-gray-50 rounded p-2 ${addClass}` : `bg-slate-200 text-gray-600 rounded p-2 ${addClass}`}>{children}</button>
        </>
    );

}