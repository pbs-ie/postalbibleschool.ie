import BasicButton from "@/Elements/Buttons/BasicButton";

export default function PrimaryButton({ type = 'submit', children, ...props }: Omit<Button, "hierarchy">) {
    return (
        <BasicButton {...props} hierarchy="primary" type={type}>{children}</BasicButton>
    );
}
