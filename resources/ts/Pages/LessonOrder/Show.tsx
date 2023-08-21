import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextPillDiv from "@/Components/Typography/TextPillDiv";
import LabelSpan from "@/Components/Typography/LabelSpan";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Link } from "@inertiajs/inertia-react";

export default function Show({ isAdmin, lessonOrder }: { isAdmin?: boolean, lessonOrder: LessonOrder }) {

    return (
        <WrapperLayout>
            <ContentWrapper title="Monthly Lesson Order">
                <div className="px-2 py-5 text-left border md:px-10 w-fit">
                    <h2 className="p-0 mb-2 text-xl font-bold text-black">Basic Information</h2>
                    <div className="block mb-6 text-left">
                        <LabelSpan className="font-bold">Email</LabelSpan>
                        <span className="w-80">{lessonOrder.email}</span>
                    </div>
                    <div className="block mb-6 text-left">
                        <LabelSpan className="font-bold">School Name</LabelSpan>
                        <span className="w-80">{lessonOrder.schoolName}</span>
                    </div>

                    <h2 className="p-0 mb-2 text-xl font-bold text-black">Lesson Order Numbers</h2>

                    <div className="flex flex-wrap gap-4">
                        <div className="block mb-6 text-left">
                            <LabelSpan>Level 0</LabelSpan>
                            <TextPillDiv className="w-24">{lessonOrder.level0Order}</TextPillDiv>
                        </div>
                        <div className="block mb-6 text-left">
                            <LabelSpan>Level 1</LabelSpan>
                            <TextPillDiv className="w-24">{lessonOrder.level1Order}</TextPillDiv>
                        </div>
                        <div className="block mb-6 text-left">
                            <LabelSpan>Level 2</LabelSpan>
                            <TextPillDiv className="w-24">{lessonOrder.level2Order}</TextPillDiv>
                        </div>
                        <div className="block mb-6 text-left">
                            <LabelSpan>Level 3</LabelSpan>
                            <TextPillDiv className="w-24">{lessonOrder.level3Order}</TextPillDiv>
                        </div>
                        <div className="block mb-6 text-left">
                            <LabelSpan>Level 4</LabelSpan>
                            <TextPillDiv className="w-24">{lessonOrder.level4Order}</TextPillDiv>
                        </div>
                        <div className="block mb-6 text-left">
                            <LabelSpan>Teacher Lesson Plan</LabelSpan>
                            <TextPillDiv className="w-24">{lessonOrder.tlpOrder}</TextPillDiv>
                        </div>
                    </div>


                    <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                        {isAdmin &&
                            <SecondaryButton><Link href="/orders">Back</Link></SecondaryButton>
                        }
                        {
                            !isAdmin &&
                            <SecondaryButton><Link href="/">Back</Link></SecondaryButton>
                        }
                        <Link className="w-52" href={"/orders/" + lessonOrder.id + "/edit"}><PrimaryButton className="w-full">Edit</PrimaryButton></Link>
                    </div>

                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}