
interface Pill {
    onPress: () => void;
    addClass: string;
    isActive: boolean;
    setActive: ((index: number) => void) | object;
    idx: number;
    children: React.ReactNode;
}
export default function ButtonPill({ onPress, addClass, isActive, setActive = {}, idx, children }: Pill) {
    return (
        <>
            <button role="button" onClick={() => { onPress(); return typeof setActive === "function" ? setActive(idx) : null; }} className={`${isActive ? "bg-blue-500 text-gray-50" : "bg-stone-200 hover:bg-stone-300 text-gray-600"} rounded-md p-2 ${addClass}`}>{children}</button>
        </>
    );

}