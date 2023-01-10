import PrimaryButton from "@/Components/PrimaryButton";
import Heading4 from "./Typography/Heading4";

export default function CardBlock({ Icon = null, title, description, buttonText }: { Icon?: (({ className }: { className?: string | undefined; }) => JSX.Element) | null, title: string, description: string | JSX.Element, buttonText?: string | undefined }) {
    return (
        <>
            {Icon !== null &&
                <p className="w-auto flex justify-center mb-4"><Icon className="h-[90px] w-[90px] p-2 text-slate-800"></Icon></p>
            }
            <Heading4>{title}</Heading4>
            <div className="text-gray-700 text-base mb-4">{description}</div>
            {!!buttonText &&
                <PrimaryButton type="button" className="" processing={false} onClick={undefined}>{buttonText}</PrimaryButton>
            }
        </>
    )
}