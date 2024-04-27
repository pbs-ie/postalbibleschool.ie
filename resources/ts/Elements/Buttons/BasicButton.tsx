import { getButtonClassNamesAsString } from "@/helper";

export default function BasicButton({ type = 'button', hierarchy = "primary", size = "medium", processing = false, children, onClick, formMethod, form, dataTest }: Button) {

    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className={getButtonClassNamesAsString(hierarchy, size)}
                disabled={processing}
                formMethod={formMethod}
                form={form}
                data-test={dataTest}
            >
                {children}
            </button>
        </>
    );
}
