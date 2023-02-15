import ContactUsComponent from "@/Components/ContactUsComponent";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function ContactUs() {


    return (
        <WrapperLayout>
            <ContentWrapper title="Contact Us">
                <ContactUsComponent />
            </ContentWrapper>
        </WrapperLayout>
    )
}