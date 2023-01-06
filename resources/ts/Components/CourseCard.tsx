import Heading2 from '@/Components/Typography/Heading2';
import TagGroupPill from '@/Components/TagGroupPill';

import { groupThemes } from '@/constants';

export default function CourseCard({ heading, image, description, type = "bibletime" }: CourseContent) {
    const levelGroup = groupThemes[type];

    return (
        <div className="flex flex-col items-center min-w-min h-full rounded-md bg-slate-100 mb-4 md:mx-2 p-6 drop-shadow-lg">
            <Heading2>{heading}</Heading2>
            <img className="w-52 h-auto" src={image} alt={`${heading} image`} />
            <p className="text-sm leading-tight p-4 text-gray-500">{description}</p>
            <div className="h-auto flex flex-auto flex-wrap">
                {
                    levelGroup.map((element, index) => (
                        <TagGroupPill key={index} addClass={element.tagClass}>{element.tagName}</TagGroupPill>
                    ))
                }
            </div>
        </div>
    );

}