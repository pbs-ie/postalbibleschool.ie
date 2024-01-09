import Heading3 from "@/Components/Typography/Heading3";
import LessonDownloadButton from "@/Elements/Buttons/LessonDownloadButton";

export default function VideoAdditionalFilesComponent({ worksheetFiles = [], slideFiles = [] }: { worksheetFiles?: FileMeta[], slideFiles?: FileMeta[] }) {
    if (worksheetFiles.length === 0 && slideFiles.length === 0) {
        return;
    }
    return (
        <div className="grid justify-start max-w-5xl grid-cols-1 gap-4 mx-auto my-5 text-left md:grid-cols-2 md:my-10">
            {worksheetFiles.length !== 0 &&
                <div className="flex flex-col gap-1 md:gap-2 md:w-3/4">
                    <Heading3>Worksheets</Heading3>
                    {worksheetFiles.map((file) => (
                        <LessonDownloadButton key={file.title} title={file.title} downloadLink={file.filePath} />
                    ))
                    }
                </div>
            }
            {slideFiles.length !== 0 &&
                <div className="flex flex-col gap-1 md:gap-2 md:w-3/4">
                    <Heading3>Slides</Heading3>
                    {slideFiles.map((file) => (
                        <LessonDownloadButton key={file.title} title={file.title} downloadLink={file.filePath} />
                    ))
                    }
                </div>
            }
        </div>
    )
}