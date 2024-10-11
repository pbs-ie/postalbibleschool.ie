import AssemblyVideoForm from "@/Components/Forms/AssemblyVideoForm";
import WrapperSidebarWithNavback from "@/Layouts/WrapperSidebarWithNavback";

export default function Create({ canEdit = false }: { canEdit?: boolean }) {
    return (
        <WrapperSidebarWithNavback title="Create New Assembly" canEdit={canEdit}>
            <AssemblyVideoForm />
        </WrapperSidebarWithNavback>
    )
}