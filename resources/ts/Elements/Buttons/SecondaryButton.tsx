import BasicButton from "@/Elements/Buttons/BasicButton";

export default function SecondaryButton({ type = 'button', processing, children, onClick }: Button) {
    return (
        <BasicButton hierarchy="secondary" type={type} processing={processing} onClick={onClick}>{children}</BasicButton>
    );
}
