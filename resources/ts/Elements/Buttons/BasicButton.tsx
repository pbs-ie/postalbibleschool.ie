export default function BasicButton({ type = 'button', hierarchy = "primary", size = "medium", processing = false, children, onClick }: Button) {
    let classList: string[] = "inline-flex mt-2 items-center justify-center rounded font-medium leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-300".split(' ');

    switch (hierarchy) {
        case "primary":
            classList.push(...("drop-shadow-md text-white bg-pbsblue focus:bg-blue-700 focus:drop-shadow-lg  hover:bg-blue-700 hover:-translate-y-px hover:drop-shadow-lg active:translate-y-0 active:drop-shadow-md active:bg-blue-700".split(' ')));
            break;
        case "secondary":
            classList.push(...("border border-pbsblue text-blue-900 bg-white focus:drop-shadow-lg hover:-translate-y-px hover:drop-shadow-lg active:translate-y-0 active:drop-shadow-md focus:bg-gray-50 hover:bg-gray-50 active:bg-gray-50".split(' ')));
            break;
        case "tertiary":
            classList.push(...("text-blue-900 bg-gray-200 focus:bg-gray-300 hover:bg-gray-300 active:bg-gray-300".split(' ')));
            break;
        case "transparent":
            classList.push(...("text-blue-800 bg-transparent focus:underline hover:underline active:underline".split(' ')));
    }

    switch (size) {
        case "large":
            classList.push(...("text-lg px-8 py-3 tracking-wide".split(' ')));
            break;
        case "medium":
            classList.push(...("px-6 py-2.5 tracking-normal".split(' ')));
            break;
        case "small":
            classList.push(...("text-sm px-4 py-1.5 tracking-normal".split(' ')));
            break;
        case "xsmall":
            classList.push(...("text-xs px-2 py-0.5 tracking-tight".split(' ')));
            break;
    }

    const getClassNamesAsString = () => {
        return [...new Set(classList.filter((item) => item.trim() !== ''))].join(' ');
    }

    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className={getClassNamesAsString()}
                disabled={processing}
            >
                {children}
            </button>
        </>
    );
}
