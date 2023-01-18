import MonthlyOverview from "@/Components/Monthly/MonthlyOverview"
import Heading1 from "@/Components/Typography/Heading1"
import Heading3 from "@/Components/Typography/Heading3"
import WrapperLayout from "@/Layouts/WrapperLayout"
import { setAllBesLinks } from "@/helper";
import { monthNames, seriesNames } from "@/constants";
import Placeholder from "@images/Placeholder.svg";

export default function Dashboard({ bibleTimeDownloads }: any): JSX.Element {
    try {
        setAllBesLinks(bibleTimeDownloads);
    } catch (e) {
        console.warn("Global links variable tried to reset");
    }

    const today = new Date();
    const currentMonthNumber = today.getMonth();
    // New series for BES started in 2022 -> A series. The following year should be B series and so on
    // This will need to be manually fixed when and if BES makes changes on their end
    const currentSeriesNumber = (today.getFullYear() - 2022) % 3;

    return (
        <WrapperLayout>
            <Heading1>Dashboard</Heading1>
            <section className="w-full">
                <div className="h-92 bg-white grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-5 p-5 lg:px-20 lg:mx-20 lg:my-2 drop-shadow-lg">
                    <div className="flex flex-col text-center uppercase">
                        <h4 className="text-blue-800 italic text-lg">This month's Lesson</h4>
                        <Heading3>{`${seriesNames[currentSeriesNumber].code}${currentMonthNumber + 1} - ${monthNames[currentMonthNumber]}`}</Heading3>
                        <img className="h-64" src={Placeholder} alt="Placeholder image" />
                    </div>
                    <MonthlyOverview selectedMonth={currentMonthNumber} selectedSeries={currentSeriesNumber} />
                </div>
            </section>
        </WrapperLayout>
    )
}
