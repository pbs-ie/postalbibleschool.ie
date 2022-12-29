import Heading1 from "@/Components/Typography/Heading1";
import Heading2 from "@/Components/Typography/Heading2";
import MonthPill from "@/Components/MonthlyLessons/MonthPill";
import MonthlyOverview from "./MonthlyOverview";

export default function MonthlyComponent({ children }) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const series = ["A series", "B series", "C series"];
    return (
        <div className="h-92 bg-white grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-5 p-5 lg:px-20 lg:mx-20 lg:my-2 drop-shadow-lg">
            <div className="flex flex-col bg-white">
                <Heading2>This month's lessons</Heading2>
                <div className="grid grid-cols-3 grid-row-4 gap-2 p-4">
                    {
                        months.map((month, index) => (
                            <MonthPill addClass={`py-4`} key={index}>{month}</MonthPill>
                        ))
                    }
                </div>
                <div className="grid grid-cols-3 gap-2 p-4">
                    {
                        series.map((element, index) => (
                            <MonthPill addClass={`py-1`} key={index}>{element}</MonthPill>
                        ))
                    }
                </div>
            </div>
            <MonthlyOverview></MonthlyOverview>
        </div>
    );
}