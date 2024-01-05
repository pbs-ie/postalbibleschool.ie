import { Link as ScrollLink } from "react-scroll";

import Heading3 from '@/Components/Typography/Heading3';
import TagGroupPill from '@/Components/TagGroupPill';
import ChevronRight from "@/Elements/Icons/ChevronRight";

import { groupThemes } from '@/constants';
import ButtonLink from "@/Elements/Buttons/ButtonLink";

export default function CourseCard({ heading, image, description, type = "bibletime", scrollTo, buttonText }: CourseContent) {
    const levelGroup = groupThemes[type];

    return (
        <div className="grid content-between h-full grid-cols-1 p-6 rounded-md min-w-min bg-slate-100 drop-shadow-lg">
            <Heading3>{heading}</Heading3>
            <img className="h-auto mx-auto w-52" src={image} alt={`${heading} image`} />
            <div className="p-4 pb-0 text-sm leading-tight">{description}</div>

            {scrollTo ?
                <><div className="flex items-start content-start justify-center flex-auto gap-px mb-2">
                    {
                        levelGroup.map((element, index) => (
                            <TagGroupPill key={index} addClass={element.tagClass}>{element.tagName}</TagGroupPill>
                        ))
                    }
                </div>
                    <button className="w-full mt-2">
                        <ScrollLink to={scrollTo} smooth={true} className="flex justify-center py-2">
                            <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </ScrollLink>
                    </button>
                </>
                :
                <div className="mt-2"><ButtonLink Icon={ChevronRight} href={route('courses', { type })}>{buttonText ? buttonText : "More details"}</ButtonLink></div>
            }

        </div>
    );

}