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

export default function Index({ bibleTimeDownloads, goingDeeperDownloads, gleanersDownloads }: any) {
    try {
        setAllBesLinks(bibleTimeDownloads, goingDeeperDownloads, gleanersDownloads);
    } catch (e) {
        console.warn("Global links variable tried to reset");
    }

    return (
        <WrapperLayout>
            <Head title="Courses" />

            <div className="py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <section className="text-center shadow-sm sm:rounded-lg">
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
            </div>

            <div className="py-12 mx-auto max-w-screen sm:px-10 bg-sky-100">
                <MonthlySection></MonthlySection>
            </div>
            <div className="max-w-screen bg-sky-500">
                <div className="w-full p-6 mx-auto space-y-2 md:max-w-2xl">
                    <p className="text-xl font-bold text-center text-white md:text-3xl">Request a lesson for your School or an Individual</p>
                    <div className="flex justify-around">
                        <Link type="button" href={route('request.school')}><SecondaryButton>School or Group</SecondaryButton></Link>
                        <Link type="button" href={route('request.home')}><SecondaryButton>Individual or Family</SecondaryButton></Link>
                    </div>
                </div>
            </div>
            {
                courseContent.map((course) => (
                    <LessonDownloadSection key={course.type} heading={course.heading} description={course.longDescription ?? course.description} type={course.type}></LessonDownloadSection>
                ))
            }
        </WrapperLayout>
    );
}
