import BasicTable from "@/Components/Tables/BasicTable"
import { Header1 } from "@/Components/Typography/DesignSystemTypography"
import Banknotes from "@/Elements/Icons/Banknotes"
import Calendar from "@/Elements/Icons/Calendar"
import ChatBubble from "@/Elements/Icons/ChatBubble"
import CheckBadge from "@/Elements/Icons/CheckBadge"
import ChevronLeft from "@/Elements/Icons/ChevronLeft"
import ChevronRight from "@/Elements/Icons/ChevronRight"
import Clock from "@/Elements/Icons/Clock"
import CloseSolid from "@/Elements/Icons/CloseSolid"
import CloseX from "@/Elements/Icons/CloseX"
import Trash from "@/Elements/Icons/Trash"
import Download from "@/Elements/Icons/Download"
import EditIcon from "@/Elements/Icons/EditIcon"
import Envelope from "@/Elements/Icons/Envelope"
import File from "@/Elements/Icons/FileIcon"
import Group from "@/Elements/Icons/Group"
import Location from "@/Elements/Icons/Location"
import MinusCircle from "@/Elements/Icons/MinusCircle"
import Newspaper from "@/Elements/Icons/Newspaper"
import Phone from "@/Elements/Icons/Phone"
import Play from "@/Elements/Icons/PlayIcon"
import PlusSolid from "@/Elements/Icons/PlusSolid"
import ExternalLink from "@/Elements/Icons/ExternalLink"
import School from "@/Elements/Icons/SchoolIcon"
import Video from "@/Elements/Icons/VideoCamera"
import Eye from "@/Elements/Icons/Eye"
import ChevronDown from "@/Elements/Icons/ChevronDown"
import CaratDown from "@/Elements/Icons/CaratDown"

export default function IconSection() {
    const getIconTableData = () => {
        return [{
            heading: <Banknotes />,
            content: "Banknotes",
        }, {
            heading: <Calendar />,
            content: "Calendar",
        }, {
            heading: <CaratDown />,
            content: "CaratDown",
        }, {
            heading: <ChatBubble />,
            content: "ChatBubble",
        }, {
            heading: <CheckBadge />,
            content: "CheckBadge",
        }, {
            heading: <ChevronDown />,
            content: "ChevronDown",
        }, {
            heading: <ChevronLeft />,
            content: "ChevronLeft",
        }, {
            heading: <ChevronRight />,
            content: "ChevronRight",
        }, {
            heading: <Clock />,
            content: "Clock",
        }, {
            heading: <CloseSolid />,
            content: "CloseSolid",
        }, {
            heading: <CloseX />,
            content: "CloseX",
        }, {
            heading: <Trash />,
            content: "Trash",
        }, {
            heading: <Download />,
            content: "Download",
        }, {
            heading: <EditIcon />,
            content: "Edit",
        }, {
            heading: <Envelope />,
            content: "Envelope",
        }, {
            heading: <ExternalLink />,
            content: "ExternalLink",
        }, {
            heading: <Eye />,
            content: "Eye",
        }, {
            heading: <File />,
            content: "File",
        }, {
            heading: <Group />,
            content: "Group",
        }, {
            heading: <Location />,
            content: "Location",
        }, {
            heading: <MinusCircle />,
            content: "MinusCircle",
        }, {
            heading: <Newspaper />,
            content: "Newspaper",
        }, {
            heading: <Phone />,
            content: "Phone",
        }, {
            heading: <Play />,
            content: "PlayIcon",
        }, {
            heading: <PlusSolid />,
            content: "PlusSolid",
        }, {
            heading: <School />,
            content: "SchoolIcon",
        }, {
            heading: <Video />,
            content: "VideoCamera",
        }
        ]
    }
    return (
        <section className="text-green-900 md:max-w-3xl">
            <details className="group">
                <summary className="relative p-4 list-none bg-gray-200 cursor-pointer">
                    <span className="text-2xl font-bold ">Icons</span>
                    <span className="absolute pt-1 right-5"><ChevronDown className="w-6 h-6 transition-transform duration-200 group-open:rotate-180" /></span>
                </summary>
                <div className="text-black">
                    <BasicTable tableData={getIconTableData()} />

                </div>
            </details>
        </section>
    )
}