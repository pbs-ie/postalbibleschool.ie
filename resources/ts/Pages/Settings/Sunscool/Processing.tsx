import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table";
import { FmDataProps, SunscoolStudentProps } from "./Index";
import SelectInput from "@/Elements/Forms/SelectInput";
import BackToButton from "@/Components/Navigation/BackToButton";
import route from "ziggy-js";
import TextInput from "@/Elements/Forms/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InformationCircle from "@/Elements/Icons/InformationCircle";
import TooltipCard from "@/Components/Cards/TooltipCard";

interface SunscoolProcessProps extends SunscoolStudentProps {
    processedProgress: string,
    processedBibletime: string,
    bibletimeProgress: {
        bibletime: string,
        progress: string | null
    }[]
    processedBibletimeProgress: {
        bibletime: string,
        progress: string | null,
        fmMonth: string
    }[]
}

const ProgressTooltip = ({ bibletimeProgress, id }: { bibletimeProgress: SunscoolProcessProps["bibletimeProgress"], id: string }) => {
    return (
        <>
            {(bibletimeProgress.length > 0) ?
                <TooltipCard direction={"top"} size="xsmall" id={id} text={
                    <div>
                        <p className="mb-1 text-lg">Breakdown</p>
                        <table className="border border-collapse border-white table-fixed">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400">Series</th>
                                    <th className="border border-gray-400">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bibletimeProgress.map(({ bibletime, progress }) => (
                                    <tr key={id + bibletime}>
                                        <th className="border border-gray-400">{bibletime}</th>
                                        <td className="border border-gray-400">{progress}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }>
                    <a href="#" className="pointer-events-none" aria-describedby={id}><InformationCircle className="w-4 h-4 text-gray-600" /></a>
                </TooltipCard>
                : null
            }
        </>
    )
}

export default function Processing({ schoolId, classroomId, students }: { schoolId: string, classroomId: string, students: SunscoolProcessProps[] }) {
    const { errors } = usePage().props;

    const defaultFormObject = students.map((student) => ({
        pbsId: student.pbsId,
        sunscoolId: student.sunscoolId,
        bibletimeProgress: student.bibletimeProgress,
        level: student.level,
        selectedYear: student.fmData?.portalData[0].yearDescription ?? "",
        selectedMonth: "monthName1",
        finalGrade: student.processedProgress,
    }));

    const { data, setData, post, processing } = useForm(defaultFormObject);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = event.target;
        switch (name) {
            case "selectedYear":
            case "selectedMonth":
            case "finalGrade":
                let returnObj = [...data];
                returnObj[index][name] = value;
                setData(returnObj);
        }
    }

    const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
        if (event)
            event.preventDefault();
        post(route('settings.sunscool.store'));
    }

    const getFmGrade = (portalData: FmDataProps["portalData"], index: number) => {
        const selectedYear = data[index].selectedYear;
        const selectedMonth = data[index].selectedMonth as keyof FmDataProps["portalData"][0];

        // Find the portal matching the selected year or default to the first portal
        const currentPortalData = portalData.find(portal => portal.yearDescription === selectedYear) || portalData[0];
        const match = selectedMonth.match(/\d+/);
        return (
            match ? <p>
                <span className="relative">
                    <span className="absolute inline-flex w-full h-full bg-sky-300 rounded-full opacity-50 animate-[ping_1s_3_linear_normal_forwards]"></span>
                    {currentPortalData["month" + match[0] as keyof FmDataProps["portalData"][0]]}
                </span>
            </p>
                :
                null
        );
    }

    const EditableCell = ({ row }: { row: Row<SunscoolProcessProps> }) => {
        const [value, setValue] = useState(data[row.index].finalGrade);

        useEffect(() => setValue(data[row.index].finalGrade), [data[row.index].finalGrade]);
        return (
            <div>
                {row.original.fmData ?
                    <TextInput
                        type="number"
                        id={"final-grades-" + row.index}
                        name="finalGrade"
                        handleChange={(e) => setValue(e.target.value)}
                        onBlur={(e) => handleChange(e, row.index)}
                        className="w-32"
                        value={value}
                        max={100}
                        required
                    />
                    : <span>No data</span>}
            </div>
        )
    }

    const isAllFilled = () => {
        return data.filter((entry) => entry.finalGrade === "").length > 0;
    }

    const getProgressWithBonusRow = (bibletimeProgress: SunscoolProcessProps["processedBibletimeProgress"], selectedMonth: string) => {
        const filteredData = bibletimeProgress.filter((item) => item.fmMonth === selectedMonth);
        if (filteredData.length === 0)
            return [];
        const newBibletimeProgress = [...filteredData, { bibletime: "Bonus", progress: "20" }];
        return newBibletimeProgress
    }


    const tableData = useMemo(() => students, [students]);

    const columnHelper = createColumnHelper<typeof students[0]>();

    const defaultColumns = [
        columnHelper.group({
            id: 'sunscool-group',
            header: "Sunscool",
            meta: {
                className: "bg-orange-700 text-white"
            },
            columns: [

                columnHelper.accessor(row => row.name, {
                    header: "Name"
                }),
                columnHelper.accessor(row => row.processedBibletime, {
                    header: "Series"
                }),
                columnHelper.accessor(row => row.processedProgress, {
                    id: 'progress',
                    header: "Score",
                    cell: ({ row }) => (
                        <div className="flex items-start gap-2">
                            {row.getValue('progress')}
                            {(students[row.index].bibletimeProgress.length > 0) &&
                                <ProgressTooltip bibletimeProgress={students[row.index].bibletimeProgress} id={"progress-tooltip-" + row.index} />
                            }
                        </div>
                    )
                }),
            ]
        }),
        columnHelper.group({
            id: 'fm-group',
            header: "FileMaker",
            meta: {
                className: "bg-sky-800 text-white"
            },
            columns: [

                columnHelper.display({
                    id: "select-year",
                    header: "Selected Year",
                    cell: ({ row }) => (
                        <div className="flex">
                            {row.original.fmData ?
                                <>
                                    <SelectInput
                                        key={"select-year-" + row.index}
                                        id={"select-year-" + row.index}
                                        name={"selectedYear"}
                                        handleChange={(e) => handleChange(e, row.index)}
                                        value={data[row.index].selectedYear}
                                    >
                                        {row.original.fmData.portalData.map(({ yearDescription }, index) => (
                                            <option key={yearDescription + index + row.id} value={yearDescription}>{yearDescription}</option>
                                        ))}
                                    </SelectInput>
                                </>
                                :
                                <span>No data</span>
                            }
                        </div >
                    )
                }),
                columnHelper.display({
                    id: "select-month",
                    header: "Selected Month",
                    cell: ({ row }) => (
                        <div className="flex">
                            {row.original.fmData ?
                                <>
                                    <SelectInput
                                        key={"select-month-" + row.index}
                                        id={"select-month-" + row.index}
                                        name={"selectedMonth"}
                                        handleChange={(e) => handleChange(e, row.index)}
                                        value={data[row.index].selectedMonth}
                                    >
                                        {Object.entries(row.original.fmData.monthNames)
                                            .filter(([key, month]) => month !== "")
                                            .map(([key, month], index) => (
                                                <option key={month + index + row.id} value={key}>{month}</option>
                                            ))}
                                    </SelectInput>
                                </>
                                :
                                <span>No data</span>
                            }
                        </div >
                    )
                }),
                columnHelper.display({
                    id: "fm-grades",
                    header: "Existing Grades",
                    cell: ({ row }) => (
                        <>
                            {row.original.fmData ?
                                <div className="flex items-start gap-2">
                                    {getFmGrade(row.original.fmData.portalData, row.index)}
                                    {(students[row.index].processedBibletimeProgress.length > 0) ?
                                        <ProgressTooltip bibletimeProgress={getProgressWithBonusRow(students[row.index].processedBibletimeProgress, data[row.index].selectedMonth)} id={"processed-tooltip-" + row.index} />
                                        : null
                                    }
                                </div>
                                :
                                <span>No data</span>
                            }
                        </ >
                    )
                }),


            ]
        }),
        columnHelper.display({
            id: "final-grades",
            header: "Changed Grades",
            cell: EditableCell
        })

    ]
    return (
        <SettingsLayout title={"Sunscool Settings"}>
            <SettingsSection>
                <BackToButton href={route('settings.sunscool.classroom', { schoolId: schoolId, classroomId: classroomId })}>Back to Students</BackToButton>
                <AdvancedTable
                    enableGlobalFilter={false}
                    data={tableData}
                    columns={defaultColumns as ColumnDef<typeof students[0]>[]}
                />
                <PrimaryButton processing={processing && isAllFilled()} onClick={() => handleSubmit()}>Submit</PrimaryButton>
            </SettingsSection>
        </SettingsLayout>
    )
}