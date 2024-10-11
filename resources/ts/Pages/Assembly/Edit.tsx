
import AssemblyVideoForm from "@/Components/Forms/AssemblyVideoForm";
import { AssemblyVideoProps } from "./Index";
import WrapperSidebarWithNavback from "@/Layouts/WrapperSidebarWithNavback";

export default function Edit({ videoData, canEdit = false }: { videoData: AssemblyVideoProps, canEdit?: boolean }) {

    return (
        <WrapperSidebarWithNavback title="Edit Assembly" canEdit={canEdit}>
            <AssemblyVideoForm videoData={videoData} />
        </WrapperSidebarWithNavback>
    )
}