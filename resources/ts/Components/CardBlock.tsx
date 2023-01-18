import PrimaryButton from "@/Components/PrimaryButton";
import Heading3 from "./Typography/Heading3";

export default function CardBlock({ Icon = null, title, description, buttonText }: { Icon?: (({ className }: { className?: string | undefined; }) => JSX.Element) | null, title: string, description: string | JSX.Element, buttonText?: string | undefined }) {
    return (
        <>
            {Icon !== null &&
                <p className="flex justify-center w-auto mb-4"><Icon className="h-[90px] w-[90px] p-2 text-slate-800"></Icon></p>
            }
            <Heading3>{title}</Heading3>
            <div className="mb-4 text-base text-gray-700 whitespace-normal">{description}</div>
            {!!buttonText &&
                <PrimaryButton type="button" className="" processing={false} onClick={undefined}>{buttonText}</PrimaryButton>
            }
        </>
    )
}