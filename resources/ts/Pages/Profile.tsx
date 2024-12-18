import DashboardSidebar from "@/Components/Navigation/DashboardSidebar";
import LabelSpan from "@/Components/Typography/LabelSpan";
import ContentWrapper from "@/Layouts/ContentWrapper";
import SidebarLayout from "@/Layouts/SidebarLayout";
import WrapperLayout from "@/Layouts/WrapperLayout";

interface ProfileProps {
    canManageCurriculum: boolean,
    schoolDetails: SchoolProps

}

const ProfileBlock = ({ labelText, value }: { labelText: string, value: string }) => {
    return (
        <span className="py-2 text-left whitespace-pre-line last:pb-0 ">
            <LabelSpan>{labelText}</LabelSpan>
            <p className="text-lg text-black">{value}</p>
        </span>
    )
}

export default function Profile({ canManageCurriculum = false, schoolDetails }: ProfileProps) {

    return (
        <WrapperLayout>
            <SidebarLayout>
                <DashboardSidebar canManageCurriculum={canManageCurriculum} />
                <ContentWrapper className="w-full overflow-auto" title={"Profile"}>
                    <div className="p-4 text-left border border-gray-200 rounded-md text-slate-500 lg:p-8">
                        <p className="mb-4 text-2xl font-bold">Your account</p>
                        <div className="flex flex-col w-full gap-4 pr-4 mx-auto lg:max-w-7xl">
                            <ProfileBlock labelText="Name:" value={schoolDetails.schoolName} />
                            <ProfileBlock labelText="Email:" value={schoolDetails.email} />
                            <ProfileBlock labelText="Contact Name:" value={schoolDetails.contactName} />
                            <ProfileBlock labelText="Address:" value={schoolDetails.address.replaceAll('\\n', '\n')} />
                        </div>
                    </div>
                </ContentWrapper>
            </SidebarLayout>
        </WrapperLayout>
    )
}