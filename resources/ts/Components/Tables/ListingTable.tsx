import React from "react";

export interface ListingTableData {
    headings: string[];
    content: JSX.Element[] | string[] | undefined;
}

export default function ListingTable({ tableData }: { tableData: ListingTableData }) {

    return (
        <table className="w-full text-base text-left table-auto">
            <thead className="font-normal text-gray-500 border-b border-gray-400">
                <tr >
                    {tableData.headings.map((heading) => (
                        <th>{heading}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.content?.map((row, index) => (
                    <tr key={index}>
                        {row}
                    </tr>
                ))}

            </tbody>
        </table>
    )
}