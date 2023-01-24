import WrapperLayout from '@/Layouts/WrapperLayout';
import CourseCard from '@/Components/CourseCard';
import Heading1 from '@/Components/Typography/Heading1';
import { Head, Link } from '@inertiajs/inertia-react';

import MonthlySection from './MonthlySection';
import LessonDownloadSection from './LessonDownloadSection';

import { courseContent } from '@/constants';
import { setAllBesLinks } from '@/helper';
import Paragraph from '@/Components/Typography/Paragraph';
import SecondaryButton from '@/Components/SecondaryButton';
import RequestLessonBanner from '@/Components/RequestLessonBanner';

export default function Index({ bibleTimeDownloads, goingDeeperDownloads, gleanersDownloads }: any) {
    try {
        setAllBesLinks(bibleTimeDownloads, goingDeeperDownloads, gleanersDownloads);
    } catch (e) {
        console.warn("Global links variable tried to reset");
    }

    return (
        <WrapperLayout>
            <Head title="Courses" />

            <section className="py-12 mx-auto text-center shadow-sm sm:rounded-lg max-w-7xl sm:px-6 lg:px-8">
                <Heading1>Courses</Heading1>
                <Paragraph className="p-4 mt-0 mb-2 text-base font-regular">Postal Bible School offers a wide range of FREE courses for people of all ages</Paragraph>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:flex-row">
                    {
                        courseContent.map((course, index) => (
                            <CourseCard key={index} heading={course.heading} type={course.type} description={course.description} image={course.image} scrollTo={course.scrollTo}></CourseCard>
                        ))
                    }
                </div>
            </section>

            <div className="py-12 mx-auto max-w-screen sm:px-10 bg-sky-100">
                <MonthlySection></MonthlySection>
            </div>
            <RequestLessonBanner />
            {
                courseContent.map((course) => (
                    <LessonDownloadSection key={course.type} heading={course.heading} description={course.longDescription ?? course.description} type={course.type}></LessonDownloadSection>
                ))
            }
        </WrapperLayout>
    );
}
