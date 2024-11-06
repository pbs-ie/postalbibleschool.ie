import DetailsSummary from "@/Elements/Sections/DetailsSummary";

export default function StudentListSection() {
    return (
        <DetailsSummary defaultOpen summaryElement={
            <p className="text-xl font-bold">FM Student List</p>
        }>
            <div>
                Lists
            </div>
        </DetailsSummary>
    )
}