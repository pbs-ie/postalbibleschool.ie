import School from "@/Elements/Icons/SchoolIcon";
import Envelope from "@/Elements/Icons/Envelope";
import Newspaper from "@/Elements/Icons/Newspaper";

export default function OrderInfoCard({ schoolName, email, level0Order, level1Order, level2Order, level3Order, level4Order, tlpOrder, contactName }: Omit<SchoolProps, "id" | "fmRecordId" | "address" | "schoolType">) {
    const rowStyle = "inline-flex flex-row w-full justify-between gap-5 mb-2 py-2 px-3 rounded-md bg-white border border-gray-800";

    return (
        <div className="flex flex-col items-center max-w-md gap-4 p-6 bg-white border border-gray-800 rounded-md drop-shadow-md">
            <h3 className="w-full text-lg font-bold text-left lg:text-xl">Filemaker Data</h3>
            <div>
                <div className={rowStyle}>
                    <span className="inline-flex gap-2 font-semibold"><School className="w-6 h-6" />School</span>
                    <span className="text-gray-800">{schoolName}</span>
                </div>
                <div className={rowStyle}>
                    <span className="inline-flex gap-2 font-semibold"><Envelope className="w-6 h-6" />Contact Name</span>
                    <span className="text-gray-800">{contactName}</span>
                </div>
                <div className={rowStyle}>
                    <span className="inline-flex gap-2 font-semibold"><Envelope className="w-6 h-6" />Email</span>
                    <span className="text-gray-800">{email}</span>
                </div>
                <div className={rowStyle}>
                    <span className="inline-flex gap-2 font-semibold"><Newspaper className="w-6 h-6" />Teacher Lesson Plans</span>
                    <span className="text-gray-800">{tlpOrder}</span>
                </div>
            </div>
            <div className="flex justify-between w-full gap-4">
                <div className="flex flex-col items-center bg-white border-2 rounded-md border-bibletime-pink">
                    <span className="p-1 font-medium text-center text-white rounded bg-bibletime-pink">Level 0</span>
                    <span className="p-1">{level0Order}</span>
                </div>
                <div className="flex flex-col items-center bg-white border-2 rounded-md border-bibletime-orange">
                    <span className="p-1 font-medium text-center text-white rounded bg-bibletime-orange">Level 1</span>
                    <span className="p-2">{level1Order}</span>
                </div>
                <div className="flex flex-col items-center bg-white border-2 rounded-md border-bibletime-red">
                    <span className="p-1 font-medium text-center text-white rounded bg-bibletime-red">Level 2</span>
                    <span className="p-2">{level2Order}</span>
                </div>
                <div className="flex flex-col items-center bg-white border-2 rounded-md border-bibletime-green">
                    <span className="p-1 font-medium text-center text-white rounded bg-bibletime-green">Level 3</span>
                    <span className="p-2">{level3Order}</span>
                </div>
                <div className="flex flex-col items-center bg-white border-2 rounded-md border-bibletime-blue">
                    <span className="p-1 font-medium text-center text-white rounded bg-bibletime-blue">Level 4</span>
                    <span className="p-2">{level4Order}</span>
                </div>

            </div>
        </div>
    );
}