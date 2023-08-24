import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextPillDiv from "@/Components/Typography/TextPillDiv";
import LabelSpan from "@/Components/Typography/LabelSpan";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Link } from "@inertiajs/inertia-react";
import OrderInfoCard from "@/Components/Cards/OrderInfoCard";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";

export default function Show({ isAdmin, lessonOrder }: { isAdmin?: boolean, lessonOrder: LessonOrder }) {

    return (
        <WrapperLayout>
            <ContentWrapper title="Monthly Lesson Order">
                <ParagraphContainer>
                    <Paragraph className="text-left">View and update your monthly orders of BibleTime lessons here. Please note, changes are made effective only from the following month. If you wish for the changes to take effect immediately, please contact us.</Paragraph>
                </ParagraphContainer>
                <div className="flex justify-center w-full mx-auto">
                    <div className="px-2 py-5 text-left md:px-10 w-fit">
                        <h2 className="p-0 mb-2 text-xl font-bold text-black">Current Information</h2>
                        <OrderInfoCard schoolName={lessonOrder.schoolName} email={lessonOrder.email} level0Order={lessonOrder.level0Order} level1Order={lessonOrder.level1Order} level2Order={lessonOrder.level2Order} level3Order={lessonOrder.level3Order} level4Order={lessonOrder.level4Order} tlpOrder={lessonOrder.tlpOrder}></OrderInfoCard>
                        <div className="inline-flex justify-end w-full gap-2 mt-5 md:justify-end">
                            {isAdmin &&
                                <SecondaryButton><Link href="/orders">Back</Link></SecondaryButton>
                            }
                            {
                                !isAdmin &&
                                <SecondaryButton><Link href="/">Back</Link></SecondaryButton>
                            }
                            <Link className="w-1/3" href={"/orders/" + lessonOrder.id + "/edit"}><PrimaryButton className="w-full">Edit</PrimaryButton></Link>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}