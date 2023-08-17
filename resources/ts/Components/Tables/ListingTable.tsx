import React from "react";

export interface TableData {
    headings: React.ReactNode | string;
    content: React.ReactNode[] | string[];
}

export default function ListingTable({ tableData }: { tableData: TableData }) {

    return (
        <table className="w-full text-base text-left table-auto">
            <thead className="font-normal text-gray-500 border-b border-gray-400">
                <tr >
                    {tableData.headings}
                </tr>
            </thead>
            <tbody>
                {tableData.content.map((row, index) => (
                    <tr key={index}>
                        {row}
                    </tr>
                ))}

            </tbody>
        </table>
    )
}