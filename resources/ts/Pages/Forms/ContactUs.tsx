import ContactUsTemplate from "@/Components/ContactUsTemplate";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function ContactUs() {


    return (
        <WrapperLayout>
            <ContentWrapper title="Contact Us">
                <ContactUsTemplate />
            </ContentWrapper>
        </WrapperLayout>
    )
}