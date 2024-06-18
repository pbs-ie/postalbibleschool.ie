import { useMemo, useState } from 'react';
import { Document, DocumentProps, Outline, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import BasicButton from '@/Elements/Buttons/BasicButton';
import ChevronLeft from '@/Elements/Icons/ChevronLeft';
import ChevronRight from '@/Elements/Icons/ChevronRight';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewerComponent({ file, ...props }: { file: string } & DocumentProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    const cachedFile = useMemo(() => file, [file]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }
    const onItemClick = ({ pageNumber: itemPageNumber }: { pageNumber: number }) => {
        setPageNumber(itemPageNumber);
    }

    return (
        <div>
            {numPages && numPages > 1 &&
                <div className='flex items-center justify-around w-full p-2 bg-gray-800 drop-shadow-lg'>
                    <p className='text-sm text-white'>
                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                    </p>
                    <div className='flex gap-2'>
                        <BasicButton
                            size="xsmall"
                            hierarchy='tertiary'
                            processing={pageNumber <= 1}
                            onClick={previousPage}
                        >
                            <span className="flex items-center">
                                <ChevronLeft />Previous
                            </span>
                        </BasicButton>
                        <BasicButton
                            size="xsmall"
                            hierarchy='tertiary'
                            processing={numPages ? pageNumber >= numPages : true}
                            onClick={nextPage}
                        >
                            <span className='flex items-center'>
                                Next<ChevronRight />
                            </span>
                        </BasicButton>
                    </div>
                </div>
            }
            <Document
                file={cachedFile}
                onLoadSuccess={onDocumentLoadSuccess}
                {...props}
            >
                <Outline onItemClick={onItemClick} />
                <Page pageNumber={pageNumber} />
            </Document>

        </div>
    );
}