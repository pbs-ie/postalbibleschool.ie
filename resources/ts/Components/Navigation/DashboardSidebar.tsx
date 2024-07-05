import Play from "@/Elements/Icons/PlayIcon";
import VideoCamera from "@/Elements/Icons/VideoCamera";
import ResourceCard from "@/Components/Cards/ResourceCard";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import List from "@/Elements/Lists/List";
import ListItem from "@/Elements/Lists/ListItem";
import route from "ziggy-js";

export default function DashboardSidebar() {
    return (
        <div className="flex flex-col items-center w-full p-10 mx-auto bg-sky-100 lg:w-72">
            <span className="text-center">
                <Heading2Alt>Additional Resources</Heading2Alt>
            </span>
            {/* <div className="flex flex-wrap gap-2 mx-auto lg:flex-col"> */}
            <List>
                <ListItem>
                    <ResourceCard size="small" Icon={Play} href={route('assembly.index')} title="Assembly Videos" />
                </ListItem>
                <ListItem>
                    <ResourceCard size="small" Icon={VideoCamera} href={route('assembly.bonus.index')} title="Bonus Videos" />
                </ListItem>
            </List>
        </div>
    )
}