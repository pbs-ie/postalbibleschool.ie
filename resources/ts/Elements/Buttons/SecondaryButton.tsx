import BasicButton from "@/Elements/Buttons/BasicButton";

export default function SecondaryButton({ type = 'button', children, Icon, ...props }: Omit<Button, "hierarchy">) {
    return (
        <BasicButton {...props} hierarchy="secondary" type={type}><span className="flex items-center gap-2">
            {Icon && <Icon />}{children}
        </span>
        </BasicButton>
    );
}
