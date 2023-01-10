import ButtonPill from "@/Components/ButtonPill";
import MonthlyOverview from "@/Components/Monthly/MonthlyOverview";
import { useState } from "react";
import { monthNames, seriesNames } from "@/constants";
import Loader from "@/Components/Loader";
import Heading3 from "@/Components/Typography/Heading3";

export default function MonthlySection() {
    const [selectedMonth, setSelectedMonth] = useState(-1);
    const [selectedSeries, setSelectedSeries] = useState(-1);

    const [processing, setProcessing] = useState(false);

    const delayMonthlyOverview = function () {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
        }, 250);

    };

    return (
        <section className="w-full bg-sky-100">
            <div className="h-92 bg-white grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-5 p-5 lg:px-20 lg:mx-20 lg:my-2 drop-shadow-lg">
                <div className="flex flex-col bg-white">
                    <Heading3>This month's lessons</Heading3>
                    <h3>Select Month</h3>
                    <div role="list" className="grid grid-cols-3 grid-rows-4 gap-2 justify-items-stretch p-4">
                        {
                            monthNames.map((month, index) => (
                                <ButtonPill key={month} onPress={delayMonthlyOverview} isActive={selectedMonth === index} setActive={setSelectedMonth} idx={index} addClass={`w-full py-4`} >{month}</ButtonPill>
                            ))
                        }
                    </div>
                    <h3>Select Series</h3>
                    <div role="list" className="grid grid-cols-3 gap-2 p-4">
                        {
                            seriesNames.map((seriesElement, index) => (
                                <ButtonPill key={seriesElement.code} onPress={delayMonthlyOverview} isActive={selectedSeries === index} setActive={setSelectedSeries} idx={index} addClass={`w-full py-1`} >{seriesElement.name}</ButtonPill>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col my-auto">
                    {
                        (selectedMonth === -1 || selectedSeries === -1) ?
                            <div className="text-gray-600 text-left my-auto text-3xl p-20"><p>Select a month and series to see the available download links here.</p></div>
                            :
                            !!processing ?
                                <div className="flex space-around justify-center items-center text-gray-600 text-left my-auto text-3xl p-20">
                                    <Loader></Loader>
                                </div>
                                :
                                <MonthlyOverview selectedMonth={selectedMonth} selectedSeries={selectedSeries}></MonthlyOverview>
                    }
                </div>
            </div >
        </section>
    );
};