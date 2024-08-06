import BasicButton from "@/Elements/Buttons/BasicButton";

export default function SecondaryButton({ type = 'button', children, ...props }: Omit<Button, "hierarchy">) {
    return (
        <BasicButton {...props} hierarchy="secondary" type={type}>{children}</BasicButton>
    );
}
