import LessonSelectorList from "@/Components/LessonSelectorList"
import WrapperLayout from "@/Layouts/WrapperLayout"
import { getUpperCaseAlphabetFromNumber, responseLinks, setAllBesLinks } from "@/helper";
import { courseContent, getCurrentMonthNumber, getCurrentSeriesNumber, monthNames, seriesNames } from "@/constants";
import { Head, usePage } from "@inertiajs/react";
import route from "ziggy-js";

import LessonsImage from "@images/lessons/lessons-fan-english.jpg";
import PrizegivingImage from "@images/events/prizegiving.jpg";
import ShedImage from "@images/events/shed.jpg";
import StepImage from "@images/events/step.jpg";
import CampImage from "@images/events/camp.jpg";
import BibletimeBanner from "@images/bibletime-banner.jpg";

import LandingCards from "@/Components/Cards/LandingCards";
import RequestLessonBanner from "@/Components/RequestLessonBanner";
import CourseCard from "@/Components/Cards/CourseCard";
import EventCard from "@/Components/Cards/EventCard";
import ContactUsComponent from "@/Components/ContactUsComponent";
import Heading2 from "@/Components/Typography/Heading2";
import { useEffect, useState } from "react";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import BannerComponent from "@/Components/BannerComponent";
import { AssemblyVideoProps } from "@/Pages/Assembly/Index";

export default function Home({ bibleTimeDownloads, videoList = [], canViewGallery = false }: { bibleTimeDownloads: responseLinks, videoList: AssemblyVideoProps[], canViewGallery: boolean }): JSX.Element {
    try {
        setAllBesLinks(bibleTimeDownloads);
    } catch (e) {
        console.warn("Global links variable tried to reset");
    }

    const { auth } = usePage<PassedProps>().props;
    const [currentAssembly, setCurrentAssembly] = useState(videoList[0]);
    const [showBanner, setShowBanner] = useState(true);



    useEffect(() => {

        const searchedAssembly = videoList.find((vid) => vid.series === getUpperCaseAlphabetFromNumber(getCurrentSeriesNumber()) + (getCurrentMonthNumber() + 1));
        if (searchedAssembly) {
            setCurrentAssembly(searchedAssembly);
        } else {
            setCurrentAssembly(videoList[videoList.length - 1]);
        }
    }, [videoList]);

    return (
        <WrapperLayout>
            {/* @ts-ignore: Type mismatch error */}
            <Head>
                <title>Home</title>
                <meta head-key="description" name="description" content="Postal Bible School Ireland offers free Bible based study material for all ages" />
            </Head>
            {auth?.user && canViewGallery && showBanner &&
                <BannerComponent setShowBanner={setShowBanner} />
            }
            <section className="relative flex w-full">
                <div className={`relative h-fit flex justify-center align-middle bg-sky-100 lg:bg-slate-50/70`}>
                    <div className="absolute">
                        <img src={BibletimeBanner} alt="" className="relative flex justify-center flex-1 invisible align-middle pointer-events-none -z-50 lg:visible lg:h-[calc(100vh+5rem)] lg:w-auto lg:aspect-auto lg:-top-20" />
                    </div>
                    <div className="grid h-full py-5 lg:py-10 w-4/5 grid-cols-1 gap-2 text-blue-900 my-5 lg:grid-cols-[1fr_1fr_20%]">
                        <div className="bg-white bg-clip-content md:col-span-2 md:row-span-2">
                            <LandingCards
                                heading="School Study Materials"
                                content="Postal Bible School offers free Bible based study material for all age ranges at primary level"
                                buttonText="Learn More"
                                buttonLink={route('courses')}
                                image={LessonsImage}
                                className="border-4"
                                primary
                            />
                        </div>
                        <div className="bg-white md:col-span-1 md:row-span-1">
                            <LandingCards
                                heading={<p>Prize<wbr></wbr>givings 2024</p>}
                                content="Find dates and locations."
                                className="border-4"
                                buttonText="Details"
                                buttonLink={route('events.prizegivings', { 'type': 'prizegivings' })}
                            />
                        </div>
                        <div className="bg-white md:col-span-1 md:row-span-1">
                            <LandingCards
                                heading="School Assembly Video"
                                content={videoList.length > 0 ? `is now available for ${currentAssembly.month}` : "will be available soon"}
                                buttonText={videoList.length > 0 ? "Show Me" : ""}
                                buttonLink={videoList.length > 0 ? route('assembly.show', currentAssembly.id) : ""}
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
                        <Heading2Alt>{`${seriesNames[getCurrentSeriesNumber()].code}${getCurrentMonthNumber() + 1} - ${monthNames[getCurrentMonthNumber()]}`}</Heading2Alt>
                        <div className="h-full overflow-clip"><img className="object-cover w-4/5 h-auto mx-auto my-auto bg-left-top md:scale-150 md:-translate-x-32 md:translate-y-28" src={LessonsImage} alt="Lessons fanned" /></div>
                    </div>
                    <LessonSelectorList selectedMonth={getCurrentMonthNumber()} selectedSeriesAlphabet={getUpperCaseAlphabetFromNumber(getCurrentSeriesNumber())} />
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
                        <EventCard title="STEP" image={StepImage} imageAlt="STEP image" routeName="events.step.index" />
                        <EventCard title="Summer Camp" image={CampImage} imageAlt="Summer Camp image" routeName="events.camp.index" />
                    </div>
                </div>
            </section>
            <section className="mx-auto mb-10 text-center max-w-7xl">
                <Heading2>Contact Us</Heading2>
                <ContactUsComponent />
            </section>
        </WrapperLayout>
    )
}
