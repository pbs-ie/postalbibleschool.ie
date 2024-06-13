import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import AssemblyVideoForm from "@/Components/Forms/AssemblyVideoForm";

export default function Create() {
    return (
        <WrapperLayout>
            <ContentWrapper title="Create New Assembly">
                <AssemblyVideoForm />
            </ContentWrapper>
        </WrapperLayout>
    )
}