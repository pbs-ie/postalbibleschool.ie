import WrapperLayout from '@/Layouts/WrapperLayout';
import CourseCard from '@/Components/CourseCard';
import Heading1 from '@/Components/Typography/Heading1';
import { Head } from '@inertiajs/inertia-react';

import MonthlySection from './MonthlySection';
import LessonDownloadSection from './LessonDownloadSection';

import { courseContent } from '@/constants';
import { BES_GLOBALS, setBesLinksOnce, setGleanersLinks, setGoingDeeperLinks } from '@/helper';

export default function Index({ bibleTimeDownloads, goingDeeperDownloads, gleanersDownloads }: any) {
    try {
        setBesLinksOnce(bibleTimeDownloads);
        setGoingDeeperLinks(goingDeeperDownloads);
        setGleanersLinks(gleanersDownloads);
        console.log(BES_GLOBALS);
    } catch (e) {
        console.warn("Global links variable tried to reset");
    }

    const bibleTimeTextInfo = {
        title: "Bible Time Lessons",
        description: <div><p>Bibletime is an extensive course of weekly fun-filled, activity work sheets for pre-school children right up to the age of 16. It covers the majority of the main Bible stories from Creation through to the early Church. Bibletime is designed for individual use or in a group setting and is available free of charge.</p>
            <p>The course is split into 5 levels aimed at an approximate reading age. Each level consists of a syllabus of 36 lessons split monthly over 3 years. Each lesson is subdivided into four stories or studies which can be completed weekly. The stories are taken from both the Old and New Testaments and cover basic Bible stories and major Bible characters.</p>

            <p>If you would like to receive free printed copies of the lessons each month in the post, have them marked and possibly receive prizes based on your scores, please contact us</p></div>
    }
    const goingDeeperTextInfo = {
        title: "Going Deeper",
        description: <div><p>Aimed at ages 15 to adult Going Deeper is a course designed for those who want to start digging a little deeper into the Bible. Going Deeper is designed for individual use and is free of charge. The course is split into 3 groups of 12 monthly lessons like the Bibletime lessons.</p></div>
    }
    const gleanersTextInfo = {
        title: "Gleaners",
        description: <div><p>Gleaners is an in depth 5 year study course aimed at adults, covering a wide range of subjects including creation, christian life and prophecy. It is designed for individual use and is free of charge. Please get in touch if this would be of benefit to you.</p></div>
    }

    return (
        <WrapperLayout>
            <Head title="Courses" />

            <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                <section className="text-center shadow-sm sm:rounded-lg">
                    <Heading1>Courses</Heading1>
                    <p className="font-regular text-base mb-2 mt-0 p-4">Postal Bible School offers a wide range of FREE courses for people of all ages</p>
                    <div className="flex flex-col md:flex-row">
                        {
                            courseContent.map((course, index) => (
                                <CourseCard key={index} heading={course.heading} type={course.type} description={course.description} image={course.image} scrollTo={course.scrollTo}></CourseCard>
                            ))
                        }
                    </div>
                </section>
            </div>

            <div className="max-w-screen mx-auto py-12 sm:px-10 bg-sky-100">
                <MonthlySection></MonthlySection>
            </div>
            <LessonDownloadSection heading={bibleTimeTextInfo.title} description={bibleTimeTextInfo.description} type="bibletime"></LessonDownloadSection>
            <LessonDownloadSection heading={goingDeeperTextInfo.title} description={goingDeeperTextInfo.description} type="goingdeeper"></LessonDownloadSection>
            <LessonDownloadSection heading={gleanersTextInfo.title} description={gleanersTextInfo.description} type="gleaners"></LessonDownloadSection>
        </WrapperLayout>
    );
}
