import BasicButton from "@/Elements/Buttons/BasicButton";

export default function PrimaryButton({ type = 'submit', children, Icon, ...props }: Omit<Button, "hierarchy">) {
    return (
        <BasicButton {...props} hierarchy="primary" type={type}>
            <span className="flex items-center gap-2">
                {Icon && <Icon />}{children}
            </span>
        </BasicButton>
    );
}
