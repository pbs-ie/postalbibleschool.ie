import BasicButton from "./BasicButton";

export default function SecondaryButton({ type = 'button', className = '', processing, children, onClick }: Button) {
    return (
        <BasicButton hierarchy="secondary" type={type} processing={processing} onClick={onClick}>{children}</BasicButton>
    );
}
