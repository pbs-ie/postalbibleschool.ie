import { getButtonClassNamesAsString } from "@/helper";

export default function BasicButton({ type = 'button', hierarchy = "primary", size = "medium", processing = false, children, onClick }: Button) {

    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className={getButtonClassNamesAsString(hierarchy, size)}
                disabled={processing}
            >
                {children}
            </button>
        </>
    );
}
