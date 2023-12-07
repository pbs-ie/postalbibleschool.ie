import FooterGroup from "@/Components/Navigation/FooterGroup";
import FooterLink from "@/Components/Navigation/FooterLink";
import Paragraph from "@/Components/Typography/Paragraph";
import { Link } from "@inertiajs/react";

export default function Footer() {
    const currentYear = (new Date()).getFullYear();

    return (
        <footer id="footerContent" className="bottom-0 left-0 bg-gray-800 text-slate-300">
            <div className="w-full px-8 py-6 my-5 md:px-32">
                <div className="flex flex-col gap-8 md:gap-4 flex-nowrap md:flex-row justify-evenly">
                    <FooterGroup heading="About Us">
                        <Paragraph className="leading-snug text-left text-slate-300">Postal Bible School was originally called Postal Sunday School and began in County Cork in 1958. It began as the work of Bert and Wendy Gray who believed in the importance of young people learning from the Bible and wanted to cater for those in remote areas.</Paragraph>
                        <div className="mt-5">
                            <Link className='text-base underline text-slate-300 hover:text-white focus:text-white' href={route('about')}>Read more</Link>
                        </div>
                    </FooterGroup>
                    <FooterGroup heading="Links">
                        <ul className="flex flex-col">
                            <li><FooterLink href={route('courses')}>Courses - Bibletime and more</FooterLink></li>
                            <li><FooterLink href={route('request.individual')}>Request an Individual Lesson</FooterLink></li>
                            <li><FooterLink href={route('request.group')}>Request a Group Lesson</FooterLink></li>
                            <li><FooterLink href={route('assembly.index')}>Online Assembly</FooterLink></li>
                            <li><FooterLink href={route('payment.index')}>Payment</FooterLink></li>
                        </ul>
                    </FooterGroup>
                    <FooterGroup heading="Events">
                        <ul className="flex flex-col">
                            <li><FooterLink href={route('events.prizegivings')}>Prize<wbr></wbr>givings</FooterLink></li>
                            <li><FooterLink href={route('events.shed')}>The SHED</FooterLink></li>
                            <li><FooterLink href={route('events.step.index')}>STEP</FooterLink></li>
                            <li><FooterLink href={route('events.camp')}>Summer Camp</FooterLink></li>
                            <li><FooterLink href={route('events.iteam')}>iTeam</FooterLink></li>
                        </ul>
                    </FooterGroup>
                    <FooterGroup heading="Contact Us">
                        <address className="text-slate-300">
                            <p className='md:text-base'>Phone - <a className="hover:text-white" href='tel:+353495552915'>049 555 2915</a></p>
                            <p className='md:text-base'>International - <a className="hover:text-white" href='tel:00353495552915'>0035349 5552915</a></p>
                            <p className='md:text-base'>Email - <a className="hover:text-white" href='mailto:info@postalbibleschool.ie'>info@postalbibleschool.ie</a></p>
                        </address>
                        <div className="mt-5">
                            <Link className='text-base underline text-slate-300 hover:text-white focus:text-white' href={route('contactus')}>Contact Us</Link>
                        </div>
                    </FooterGroup>
                </div>
            </div>
            <div className="w-full p-2 border-t border-gray-300 md:p-4">
                <p className='text-sm leading-tight text-center'>&copy; Copyright {currentYear}. Postal Bible School. All Rights Reserved.</p>
            </div>
        </footer>
    )
}