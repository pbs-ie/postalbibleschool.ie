
import AssemblyVideoForm from "@/Components/Forms/AssemblyVideoForm";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { AssemblyVideoProps } from "./Index";

export default function Edit({ videoData }: { videoData: AssemblyVideoProps }) {

    return (
        <WrapperLayout>
            <ContentWrapper title="Edit Assembly">
                <AssemblyVideoForm videoData={videoData} />
            </ContentWrapper>
        </WrapperLayout>
    )
}