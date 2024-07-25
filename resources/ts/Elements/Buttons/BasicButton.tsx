import { getButtonClassNamesAsString } from "@/helper";

export default function BasicButton({ type = 'button', hierarchy = "primary", size = "medium", processing = false, children, onClick, formMethod, form, dataTest, ...props }: Button & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {

    return (
        <>
            <button
                {...props}
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
