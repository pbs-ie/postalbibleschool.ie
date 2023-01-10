import PrimaryButton from "@/Components/PrimaryButton";

export default function CardBlock({ Icon = null, title, description, buttonText }: { Icon?: (({ className }: { className?: string | undefined; }) => JSX.Element) | null, title: string, description: string | JSX.Element, buttonText?: string | undefined }) {
    return (
        <>
            {Icon !== null &&
                <p className="w-auto flex justify-center mb-4"><Icon className="h-24 w-24 p-2 text-slate-800"></Icon></p>
            }
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{title}</h5>
            <div className="text-gray-700 text-base mb-4">{description}</div>
            {!!buttonText &&
                <PrimaryButton type="button" className="" processing={false} onClick={undefined}>{buttonText}</PrimaryButton>
            }
        </>
    )
}