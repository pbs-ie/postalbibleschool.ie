import Wrapper from '@/Layouts/WrapperLayout';
import CourseCard from '@/Components/CourseCard';
import Heading1 from '@/Components/Typography/Heading1';
import { Head } from '@inertiajs/inertia-react';

import Level0Image from '@images/Level0_A1.jpg';
import Level1Image from '@images/Level1_A1.jpg';
import Level2Image from '@images/Level2_A1.jpg';
import MonthlyComponent from '@/Components/MonthlyLessons/MonthlyComponent';

export default function Index() {
    let courseContent = [
        {
            heading: "Bible Time Lessons",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: Level0Image,
            type: "bibletime"
        },
        {
            heading: "New Life",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: Level1Image,
            type: "newlife"
        },
        {
            heading: "Gleaners",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: Level2Image,
            type: "gleaners"
        }
    ];
    return (
        <Wrapper>
            <Head title="Courses" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center shadow-sm sm:rounded-lg">
                        <Heading1>Courses</Heading1>
                        <p className="font-regular text-base mb-2 mt-0 p-4">Postal Bible School offers a wide range of FREE courses for people of all ages</p>
                        <div className="flex flex-col md:flex-row">
                            {
                                courseContent.map((course, index) => (
                                    <CourseCard key={index} heading={course.heading} type={course.type} description={course.description} image={course.image}> </CourseCard>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-sky-100">
                <MonthlyComponent></MonthlyComponent>
            </div>
    );
}
