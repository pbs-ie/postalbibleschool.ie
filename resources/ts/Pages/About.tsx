import Timeline from "@/Components/About/Timeline";
import PrimaryButton from "@/Components/PrimaryButton";
import Heading2 from "@/Components/Typography/Heading2";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Link } from "@inertiajs/inertia-react";

export default function About() {
    return (
        <WrapperLayout>
            <ContentWrapper title="About Us">
                <Heading2>Who We Are</Heading2>
                <ParagraphContainer>
                    <Paragraph>Postal Bible School is a registered charity in Ireland and is closely linked with the work of BES (Bible Educational Services) which grew out of the same seed work and now connects it to other PBS centres across the world.</Paragraph>
                    <Paragraph>As a charity our aims are the distribution and teaching of God’s word the bible through distribution of educational resources and the hosting of events.</Paragraph>
                </ParagraphContainer>

                <Timeline />

                <Heading2>Volunteers</Heading2>
                <ParagraphContainer>
                    <Paragraph>Postal Bible School has depended on the help of those who freely gave of their spare time from its inception. One of the most important of these roles is praying. Others include correcting lessons and communicating with kids via post, being a leader at camp and speaking to young people about the Bible. People find opportunity to use all sorts of abilities to assist us as they seek to serve God. These opportunities have included many things including carrying boxes, fixing vehicles, computer work, paper work & building work as well as more public opportunities to share the Christian faith. We praise God for the assistance of all those who have supported the work in one way or another and trust God to continue to provide people to do His work in the future.</Paragraph>
                    <Paragraph>If you would like to contact us with a view to helping us in prayer or some other way please contact Gareth or Margaret</Paragraph>
                    <Link href={route('contactus')} preserveScroll={true} type="button"><PrimaryButton className="mt-2" type="button">Contact Us</PrimaryButton></Link>
                </ParagraphContainer>

                <Heading2>How is PBS Funded</Heading2>
                <ParagraphContainer>
                    <Paragraph>Postal Bible School is a charity, it does not trade to make money. We provide our Bible study courses, and the prizes for participation free of charge to approximately 5000 students. All the funding required for the running of Postal Bible School comes from those who wish to give freely of their own income. We do not fundraise, we simply rely on God to provide what is needed and He does this through a whole variety of people, some of whom we have never even met. We believe it is a testimony of God's goodness, that for over 50 years now, the work of Postal Bible School has been funded in this manner. Many others besides ourselves have found God faithful to provide in this manner right back to Bible times. On one such occasion God provided for His people when He made water come out of the rock for thirsty people. Exodus 17:6-7</Paragraph>
                </ParagraphContainer>
                <Heading2>PBS and BES</Heading2>
                <ParagraphContainer>
                    <Paragraph>Bible Education Services is the trust which organises the publication of material used by Postal Bible School. PBS and BES begas as the same organisation. PBS continues to use the material in Ireland while BES produce the material and encourage the translation and give support to those who make use of this material around the world.</Paragraph>
                    <Paragraph>For more information you can check out their website</Paragraph>
                    <a target="_blank" href="https://www.besweb.com/"><PrimaryButton className="mt-2" type="button">BESWEB.ORG</PrimaryButton></a>
                </ParagraphContainer>
            </ContentWrapper>
        </WrapperLayout>
    )
}