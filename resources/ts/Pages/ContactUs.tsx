import ContactUsForm from "@/Components/Forms/ContactUsForm";

import Heading1 from "@/Components/Typography/Heading1";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function ContactUs() {


    return (
        <WrapperLayout>
            <Heading1>Contact Us</Heading1>
            <div className="mx-auto max-w-lg">
                <ContactUsForm />
            </div>
        </WrapperLayout>
    )
}