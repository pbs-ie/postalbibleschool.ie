import { Link as ScrollLink } from "react-scroll";

import Heading3 from '@/Components/Typography/Heading3';
import TagGroupPill from '@/Components/TagGroupPill';

import { groupThemes } from '@/constants';
import PrimaryButton from "./PrimaryButton";
import { Link } from "@inertiajs/inertia-react";

export default function CourseCard({ heading, image, description, type = "bibletime", scrollTo }: CourseContent) {
    const levelGroup = groupThemes[type];

    return (
        <div className="flex flex-col items-center h-full p-6 rounded-md min-w-min bg-slate-100 drop-shadow-lg">
            <Heading3>{heading}</Heading3>
            <img className="h-auto w-52" src={image} alt={`${heading} image`} />
            <div className="p-4 text-sm leading-tight">{description}</div>
            <div className="flex flex-wrap items-start justify-center flex-auto gap-1">
                {
                    levelGroup.map((element, index) => (
                        <TagGroupPill key={index} addClass={element.tagClass + " text-xs"}>{element.tagName}</TagGroupPill>
                    ))
                }
            </div>
            {scrollTo ?
                <button className="w-full mt-2">
                    <ScrollLink to={scrollTo} smooth={true} className="flex justify-center py-2">
                        <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </ScrollLink>
                </button>
                :
                <div className="mt-2"><Link href={route('courses')}><PrimaryButton className="capitalize rounded-lg bg-sky-500">More details</PrimaryButton></Link></div>
            }

        </div>
    );

}