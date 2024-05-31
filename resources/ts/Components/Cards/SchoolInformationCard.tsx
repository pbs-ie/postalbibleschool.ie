import InformationCircle from "@/Elements/Icons/InformationCircle";
import TooltipCard from "@/Components/Cards/TooltipCard";

export interface InformationCardProps {
    title: string,
    value: string | JSX.Element,
    Icon: ({ className }: {
        className?: string | undefined;
    }) => JSX.Element,
    titleStyle?: string,
}
export default function SchoolInformationCard({ heading, helpText, rows }: { heading: string, helpText?: string, rows: InformationCardProps[] }) {

    return (
        <div className="flex flex-col items-center max-w-md gap-4 p-6 bg-white border border-gray-800 rounded-md drop-shadow-md">
            <span className="w-full flex gap-1">
                <h3 className="text-left font-bold text-lg lg:text-xl">{heading}</h3>
                {helpText && helpText !== "" &&
                    <TooltipCard id={"school-info-tip"} text={helpText} direction={"top"}>
                        <a href="#" className="pointer-events-none" aria-describedby="school-info-tip"><InformationCircle className="w-4 h-4 text-gray-600" /></a>
                    </TooltipCard>
                }
            </span>
            <div>
                {rows.map(({ title, value, Icon, titleStyle }) => (
                    <div key={heading + title} className="inline-flex flex-row w-full justify-between items-center pr-3 gap-5 mb-2 text-sm lg:text-base rounded-md bg-white border border-gray-800">
                        <span className={"inline-flex gap-2 font-semibold pl-2 pr-4 py-1 rounded-md " + titleStyle}><Icon className="w-6 h-6" />{title}</span>
                        <span className="text-gray-800">{value}</span>
                    </div>
                ))}

            </div>

        </div>
    );
}