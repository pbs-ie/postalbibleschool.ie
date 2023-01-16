export default function InputLabel({ forInput, value, className, children }: { forInput: string, value: string, className?: string, children?: string }) {
    return (
        <label htmlFor={forInput} className={`inline-block font-medium text-sm mb-px text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}
