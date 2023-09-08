import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

interface LandingCards {
    heading: React.ReactNode;
    content: React.ReactNode;
    image?: string;
    className?: string;
    buttonText?: string;
    buttonLink?: string;
    showNewBanner?: boolean;
    primary?: boolean;
}

export default function LandingCards({ heading, content, image, buttonText, buttonLink, className = "", showNewBanner = false, primary = false }: LandingCards) {
    return (
        <>
            {primary ?
                <div className={"gap-4 h-full p-6 md:p-10 md:flex drop-shadow-lg bg-slate-50 " + className}>
                    <div className="flex flex-col justify-between md:w-1/2">
                        <div>
                            <div className="mb-6 text-4xl font-bold uppercase break-words md:text-4xl lg:text-5xl font-subtitle">{heading}</div>
                            <div className="mb-4 text-xl lg:text-3xl md:pr-5">{content}</div>
                        </div>
                        {buttonLink && buttonText &&
                            <div className="flex justify-center w-full md:block">
                                <Link href={buttonLink} type="button"><PrimaryButton>{buttonText}</PrimaryButton></Link>
                            </div>
                        }

                    </div>
                    <img className="hidden object-contain w-1/2 md:block" src={image} alt="Banner image" />
                </div>
                :
                <div className={"gap-4 h-full drop-shadow-lg p-6 bg-slate-50 overflow-clip relative " + className}>

                    {showNewBanner &&
                        <div className="absolute top-0 right-0 flex flex-col justify-end w-20 h-20 pb-1 text-center rotate-45 translate-x-10 -translate-y-10 shadow-inner bg-pbsblue"><span className="text-sm text-white uppercase">New</span></div>
                    }
                    <div className="mb-1 text-2xl font-bold uppercase break-word font-subtitle w-inherit">{heading}</div>
                    <div className="mb-2 text-xl">{content}</div>
                    {buttonLink && buttonText &&
                        <div className="flex justify-center w-full md:block">
                            <Link href={buttonLink} type="button"><PrimaryButton processing={buttonLink === ""}>{buttonLink === "" ? "Coming soon" : buttonText}</PrimaryButton></Link>
                        </div>
                    }
                </div>
            }
        </>
    )
}