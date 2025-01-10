import StepWrapper from "@/Layouts/StepWrapper";

export default function podcast() {
    return (
        <StepWrapper title="Podcast" heading="">
            <div className="w-full h-svh lg:h-[calc(100vh-4rem)]">
                <iframe src="https://www.buzzsprout.com/2419192" width="100%" height="100%"></iframe>

            </div>
        </StepWrapper>
    )
}