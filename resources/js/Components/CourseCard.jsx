import Heading2 from '@/Components/Typography/Heading2';
import LevelGroupPill from '@/Components/LevelGroupPill';

export default function CourseCard({ heading, image, description, type = "bibletime" }) {
    const levelGroup = {
        "bibletime": [
            { themeClass: "bg-bibletime-pink", groupName: "level 0" }, { themeClass: "bg-bibletime-orange", groupName: "level 1" }, { themeClass: "bg-bibletime-red", groupName: "level 2" }, { themeClass: "bg-bibletime-green", groupName: "level 3" }, { themeClass: "bg-bibletime-blue", groupName: "level 4" }],
        "newlife": [{ themeClass: "bg-bibletime-blue", groupName: "group A" }, { themeClass: "bg-bibletime-green", groupName: "group B" }, { themeClass: "bg-bibletime-red", groupName: "group C" }],
        "gleaners": [{ themeClass: "bg-bibletime-pink", groupName: "group A" }, { themeClass: "bg-bibletime-orange", groupName: "group B" }, { themeClass: "bg-bibletime-red", groupName: "group C" }, { themeClass: "bg-bibletime-green", groupName: "group D" }, { themeClass: "bg-bibletime-blue", groupName: "group E" }]
    }[type];
    return (
        <div className="flex flex-col items-center min-w-min h-full rounded-md bg-slate-100 mb-4 md:mx-2 p-6 drop-shadow-lg">
            <Heading2>{heading}</Heading2>
            <img className="w-52 h-auto" src={image} alt={`${heading} image`} />
            <p className="text-sm leading-tight p-4 text-gray-500">{description}</p>
            <div className="h-auto flex flex-auto flex-wrap">
                {
                    levelGroup.map((element, index) => (
                        <LevelGroupPill key={index} addClass={element.themeClass}>{element.groupName}</LevelGroupPill>
                    ))
                }
            </div>
        </div>
    );

}