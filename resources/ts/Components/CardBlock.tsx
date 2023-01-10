import PrimaryButton from "@/Components/PrimaryButton";

export default function CardBlock({ Icon, title, description, buttonText }: { Icon: ({ className }: { className?: string | undefined; }) => JSX.Element, title: string, description: string, buttonText: string }) {
    return (
        <>
            <p className="w-auto flex justify-center mb-4"><Icon className="h-24 w-24 p-2 text-slate-800"></Icon></p>
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{title}</h5>
            <p className="text-gray-700 text-base mb-4">{description}</p>
            <PrimaryButton type="button" className="" processing={false} onClick={undefined}>{buttonText}</PrimaryButton>
        </>
    )
}