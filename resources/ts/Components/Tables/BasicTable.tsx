export interface TableData {
    heading: string;
    content: React.ReactNode | string;
}

export default function BasicTable({ tableData }: { tableData: TableData[] }) {

    return (
        <table className="text-base text-left table-fixed md:text-lg md:w-1/2">
            <tbody>
                {tableData.map((row: any) => (
                    <tr key={row.heading} className="border-gray-300 border-y-2">
                        <th className="w-1/4 p-4 text-base uppercase ">
                            {row.heading}
                        </th>
                        <td className="p-4">
                            {row.content}
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}