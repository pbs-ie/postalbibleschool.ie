export default function InputWithRemainingCharsWrapper({ usedChars, maxChars, children }: { usedChars: number, maxChars: number, children: JSX.Element }) {
    const invalid = usedChars > maxChars;

    return (
        <div className="relative flex flex-col items-start">
            {children}
            <span className={`${invalid ? "text-red-500" : "text-gray-600"} text-sm absolute -bottom-5`}>{usedChars}/{maxChars} Characters Used</span>
        </div>
    )
}