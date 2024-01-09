import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import OrderInfoCard from "@/Components/Cards/OrderInfoCard";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import ButtonLink from "@/Elements/Buttons/ButtonLink";

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
                                <ButtonLink hierarchy="secondary" href={route('orders.index')}>Back</ButtonLink>
                            }
                            {!isAdmin &&
                                <ButtonLink hierarchy="secondary" href="/">Back</ButtonLink>
                            }
                            <ButtonLink href={route('orders.edit', lessonOrder.id)}>Edit</ButtonLink>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}