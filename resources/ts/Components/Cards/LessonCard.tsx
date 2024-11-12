import TagGroupButton from '@/Elements/Buttons/TagGroupButton';
import { groupThemes } from '@/constants';

interface LessonCard {
    heading: string;
    image: string;
    description: string | JSX.Element;
    type: "bibletime" | "goingdeeper" | "gleaners";
    selectedLevel: GroupThemes;
    setSelectedLevel: (level: GroupThemes) => void;
    isWideScreen: boolean;
    tagCode: string;
}

export default function LessonCard({ heading, image, description, type = "bibletime", selectedLevel, setSelectedLevel, isWideScreen, tagCode }: LessonCard) {
    const currentLevel = groupThemes[type].filter(tag => tag.tagCode.toLowerCase() === tagCode.toLowerCase())[0];
    return (
        <button onClick={() => setSelectedLevel(currentLevel)} className={"relative flex flex-col items-center w-auto h-full p-2 py-6 rounded-md md:mb-4 md:mx-2 " + (selectedLevel.tagCode === tagCode ? "md:ring-2 md:ring-pbsblue" : "bg-stone-100")}>
            {isWideScreen &&
                <>
                    <img className="object-fill mx-10 border border-black w-44" src={image} alt={`${heading} image`} />
                    <div className="p-4 pb-8 leading-loose text-center text-gray-700 text-md">{description}</div>
                </>
            }
            <div className="absolute bottom-0 w-full text-center">
                <TagGroupButton addClass={`font-bold text-base transition-[border] ${selectedLevel.tagCode === tagCode ? "border-white/20 border-y-4 " + currentLevel.tagClass : currentLevel.tagClass}`}>
                    <div className="flex flex-row">
                        <p className="grow">{currentLevel.tagName}</p>
                        <svg className="w-6 h-6 ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg></div>

                </TagGroupButton>

            </div>
        </button>
    );

}