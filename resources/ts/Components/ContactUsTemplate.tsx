import ContactUsForm from "@/Components/Forms/ContactUsForm";
import Location from "@/Components/Icons/Location";
import Phone from "@/Components/Icons/Phone";
import Envelope from "@/Components/Icons/Envelope";
import Paragraph from "@/Components/Typography/Paragraph";

export default function ContactUsTemplate() {
    return (
        <div className="flex flex-col justify-around px-4 md:px-0 md:flex-row md:items-centre">
            <div className="max-w-lg text-left">
                <Paragraph className="md:text-lg">Don't hesitate to reach out and contact Postal Bible School. <br />We would be happy to assist you and answer any questions you might have.</Paragraph>
                <ContactUsForm />
            </div>
            <div className="flex flex-col max-w-md gap-6 p-6 rounded-md shadow-lg md:p-10 md:my-auto h-fit md:gap-8 md:text-lg lg:text-xl bg-sky-100">
                <div className="inline-flex items-center gap-5">
                    <Location className="h-[50px] w-[50px] text-slate-600"></Location>
                    <div className="flex flex-col items-start">
                        <p>5 Cavan Street</p>
                        <p>Cootehill, Co. Cavan</p>
                    </div>
                </div>
                <div className="inline-flex items-center gap-5">
                    <Phone className="h-[50px] w-[50px] text-slate-600"></Phone>
                    <div className="flex flex-col items-start">
                        <p>049 5552915</p>
                        <p>0035349 5552915 (International)</p>
                    </div>
                </div>
                <div className="inline-flex items-center gap-5">
                    <Envelope className="h-[50px] w-[50px] text-slate-600"></Envelope>
                    <div className="flex flex-col items-start">
                        <p>info@postalbibleschool.ie</p>
                    </div>
                </div>
            </div>
        </div>
    )
}