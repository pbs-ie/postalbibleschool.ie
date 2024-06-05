import Play from "@/Elements/Icons/PlayIcon";
import Video from "@/Elements/Icons/VideoCamera";
import ResourceCard from "@/Components/Cards/ResourceCard";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import List from "@/Elements/Lists/List";
import ListItem from "@/Elements/Lists/ListItem";

export default function DashboardSidebar() {
    return (
        <div className="flex flex-col items-center p-10 bg-sky-100 w-full lg:w-72 mx-auto">
            <span className="text-center">
                <Heading2Alt>Additional Resources</Heading2Alt>
            </span>
            {/* <div className="flex flex-wrap lg:flex-col gap-2 mx-auto"> */}
            <List>
                <ListItem>
                    <ResourceCard size="small" Icon={Play} href={route('assembly.index')} title="Assembly Videos" />
                </ListItem>
                <ListItem>
                    <ResourceCard size="small" Icon={Video} href={route('assembly.bonus.index')} title="Bonus Videos" />
                </ListItem>
            </List>
        </div>
    )
}