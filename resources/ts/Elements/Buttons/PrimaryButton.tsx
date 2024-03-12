import BasicButton from "@/Elements/Buttons/BasicButton";

export default function PrimaryButton({ type = 'submit', processing = false, children, onClick, dataTest }: Button) {
    return (
        <BasicButton dataTest={dataTest} type={type} processing={processing} onClick={onClick}>{children}</BasicButton>
    );
}
