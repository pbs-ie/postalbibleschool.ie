export default function LevelGroupPill({ addClass, children }) {
    return (
        <p className={`capitalize text-xs whitespace-nowrap text-white ${addClass} rounded-md p-2 mx-0.5`}>{children}</p>
    );
}