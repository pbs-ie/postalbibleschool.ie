import MonthlyOverview from "@/Components/MonthlyOverview"
import Heading3 from "@/Components/Typography/Heading3"
import WrapperLayout from "@/Layouts/WrapperLayout"
import { getUpperCaseAlphabetFromNumber, responseLinks, setAllBesLinks } from "@/helper";
import { courseContent, currentMonthNumber, currentSeriesNumber, monthNames, seriesNames } from "@/constants";
import { Head } from "@inertiajs/inertia-react";

import HeroImage from "@images/hero.jpg";
import LessonsImage from "@images/lessons-fanned.jpg";
import PrizegivingImage from "@images/events/prizegiving.jpg";
import ShedImage from "@images/events/shed.jpg";
import StepImage from "@images/events/step.jpg";
import CampImage from "@images/events/camp.jpg";

import LandingCards from "@/Components/LandingCards";
import RequestLessonBanner from "@/Components/RequestLessonBanner";
import CourseCard from "@/Components/CourseCard";
import EventCard from "@/Components/EventCard";
import ContactUsTemplate from "@/Components/ContactUsTemplate";
import Heading2 from "@/Components/Typography/Heading2";
import { useEffect, useState } from "react";
import Heading2Alt from "@/Components/Typography/Heading2Alt";

export default function Home({ bibleTimeDownloads, videoList }: { bibleTimeDownloads: responseLinks, videoList: VideoListMeta[] }): JSX.Element {
    try {
        setAllBesLinks(bibleTimeDownloads);
    } catch (e) {
        console.warn("Global links variable tried to reset");
    }

    const [currentAssembly, setCurrentAssembly] = useState(videoList[0]);



    useEffect(() => {

        const searchedAssembly = videoList.find((vid) => vid.series === getUpperCaseAlphabetFromNumber(currentSeriesNumber) + (currentMonthNumber + 1));
        if (searchedAssembly) {
            setCurrentAssembly(searchedAssembly);
        }
    }, [videoList]);

    return (
        <WrapperLayout>
            <Head title="Home"></Head>
            <section className="relative flex w-full">
                <div className="flex py-10 justify-center align-center h-full flex-1 bg-center bg-no-repeat bg-cover bg-[url('/hero.jpg')] bg-slate-300 bg-blend-soft-light">
                    <div className="grid h-full w-4/5 grid-cols-1 gap-2 text-blue-900 my-5 md:grid-cols-[1fr_1fr_20%]">
                        <div className="bg-white bg-clip-content md:col-span-2 md:row-span-2">
                            <LandingCards
                                heading="School Study Materials"
                                content="Postal Bible School offers free Bible based study material for all age ranges at primary level"
                                buttonText="Learn More"
                                buttonLink={route('courses')}
                                image={HeroImage}
                                className="border-4"
                            />
                        </div>
                        <div className="bg-white md:col-span-1 md:row-span-1">
                            <LandingCards
                                heading="New School Assembly Videos"
                                content="is now available for February 2023"
                                buttonText="Show Me"
                                buttonLink={route('assembly.index')}
                                className="border-4"
                            />
                        </div>
                        <div className="bg-white md:col-span-1 md:row-span-1">
                            <LandingCards
                                heading="2023 Prizegivings"
                                content="starting end of January"
                                buttonText="Details"
                                buttonLink={route('events.prizegivings')}
                                className="border-4"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-sky-100 md:py-10">
                <div className="grid gap-5 py-5 bg-white rounded-lg md:py-8 md:grid-cols-2 md:pr-20 lg:mx-24 drop-shadow-lg">
                    <div className="flex flex-col text-center uppercase">
                        <h1 className="text-2xl italic text-blue-900">This month's Lesson</h1>
                        <Heading2Alt>{`${seriesNames[currentSeriesNumber].code}${currentMonthNumber + 1} - ${monthNames[currentMonthNumber]}`}</Heading2Alt>
                        <div className="h-full overflow-clip"><img className="object-cover w-4/5 h-auto mx-auto my-auto bg-left-top md:scale-150 md:-translate-x-32 md:translate-y-28" src={LessonsImage} alt="Lessons fanned" /></div>
                    </div>
                    <MonthlyOverview assemblySeries={currentAssembly.series} assemblyTitle={currentAssembly.title} assemblyLink={route('assembly.show', { 'series': currentAssembly.routename })} selectedMonth={currentMonthNumber} selectedSeriesAlphabet={getUpperCaseAlphabetFromNumber(currentSeriesNumber)} assemblyImageLink={currentAssembly.routename} />
                </div>
            </section>
            <RequestLessonBanner />
            <section className="py-12 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
                <Heading2>Courses</Heading2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:flex-row">
                    {
                        courseContent.map((course, index) => (
                            <CourseCard key={index} heading={course.heading} type={course.type} description={course.description} image={course.image} buttonText={course.buttonText}></CourseCard>
                        ))
                    }
                </div>
            </section>
            <section className="py-12 text-center bg-sky-100 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl ">
                    <Heading2>Events</Heading2>
                    <div className="flex flex-col content-center justify-center gap-4 md:flex-row">
                        <EventCard title="Prizegivings" image={PrizegivingImage} imageAlt="Prizegiving image" routeName="events.prizegivings" />
                        <EventCard title="The SHED" image={ShedImage} imageAlt="SHED image" routeName="events.shed" />
                        <EventCard title="STEP" image={StepImage} imageAlt="STEP image" routeName="events.step" />
                        <EventCard title="Summer Camp" image={CampImage} imageAlt="Summer Camp image" routeName="events.camp" />
                    </div>
                </div>
            </section>
            <section className="mx-auto mb-10 text-center max-w-7xl">
                <Heading2>Contact Us</Heading2>
                <ContactUsTemplate />
            </section>
        </WrapperLayout>
    )
}