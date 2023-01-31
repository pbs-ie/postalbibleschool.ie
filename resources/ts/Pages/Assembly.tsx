import Heading3 from "@/Components/Typography/Heading3";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head } from "@inertiajs/inertia-react";

import PlaceholderImage from "@images/assembly-sample.jpg";
import { useEffect, useReducer, useState } from "react";
import Loader from "@/Components/Loader";
import ChevronLeft from "@/Components/Icons/ChevronLeft";
import ChevronRight from "@/Components/Icons/ChevronRight";
import CarousalCard from "@/Components/Video/CarousalCard";
import NavigationButton from "@/Components/Video/NavigationButton";
import Heading2 from "@/Components/Typography/Heading2";
import NotFound from "./NotFound";

interface VideoMeta {
    externalUrl: string,
    title: string,
    duration: string,
    id: number
}

export default function Assembly({ videoData }: { videoData: { title: string, content: VideoMeta[] } }) {
    const [assemblyLinks, setAssemblyLinks] = useState(videoData?.content || []);


    interface ReducerMeta extends VideoMeta {
        isLoading: boolean
    }
    const initialState: ReducerMeta = {
        externalUrl: "",
        title: "",
        duration: "",
        isLoading: false,
        id: -1
    }

    const reducer = (state = initialState, { type, payload }: { type: "loadComplete" | "setVideo" | "nextVideo" | "prevVideo", payload?: ReducerMeta }) => {
        switch (type) {
            case "loadComplete":
                return { ...state, isLoading: false };
            case "setVideo":
                return { ...state, ...payload };
            case "nextVideo":
                const nextVideo = assemblyLinks[(state.id + 1) % assemblyLinks.length];
                return { ...state, isLoading: true, externalUrl: nextVideo?.externalUrl, duration: nextVideo?.duration, id: nextVideo?.id, title: nextVideo?.title };
            case "prevVideo":
                let prevIndex = state.id - 1;
                if (prevIndex < 0) {
                    prevIndex = state.id;
                }
                const prevVideo = assemblyLinks[prevIndex];
                return { ...state, isLoading: true, externalUrl: prevVideo.externalUrl, duration: prevVideo.duration, id: prevVideo.id, title: prevVideo.title };
            default:
                return state;
        }
    }

    const [videoState, dispatchReducer] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatchReducer({
            type: "setVideo",
            payload: {
                externalUrl: assemblyLinks[0]?.externalUrl,
                title: assemblyLinks[0]?.title,
                duration: assemblyLinks[0]?.duration,
                isLoading: false,
                id: 0
            }
        })
    }, []);



    const loadNewLink = ({ externalUrl, title, duration, id }: VideoMeta) => {
        if (externalUrl !== videoState.externalUrl) {
            dispatchReducer({
                type: "setVideo",
                payload: {
                    externalUrl: externalUrl,
                    isLoading: true,
                    title: title,
                    duration: duration,
                    id: id
                }
            });
        }
    }


    return (
        <WrapperLayout>
            <Head title="School Assembly" />

            {assemblyLinks.length === 0 &&
                <NotFound />
            }
            {assemblyLinks.length > 0 &&
                <section className="flex flex-col w-full">
                    <div className="relative justify-center py-10">

                        <div className="flex flex-col items-center w-full gap-2">
                            <Heading3>{videoData.title ? videoData.title : "School Assembly Video"}</Heading3>

                            <div className="relative self-stretch md:self-center">
                                {videoState.isLoading ?
                                    <div className="absolute bottom-0 mb-5 text-2xl right-5">
                                        <Loader />
                                    </div> : null}

                                <iframe title={videoState.title} onLoad={() => dispatchReducer({ type: "loadComplete" })} src={videoState.externalUrl} height="506" width="900" allowFullScreen allow="autoplay" className="aspect-video w-full h-auto md:w-[900px]" ></iframe>
                            </div>
                            <div className="flex gap-10">
                                <NavigationButton
                                    className="md:float-left"
                                    disabled={videoState.id === 0}
                                    onClick={() => dispatchReducer({
                                        type: "prevVideo"
                                    })}>
                                    <p className="flex items-center">
                                        <ChevronLeft className="w-10 h-10" />Previous
                                    </p>
                                </NavigationButton>
                                <NavigationButton
                                    className="md:float-right"
                                    disabled={videoState.id === assemblyLinks.length - 1}
                                    onClick={() => dispatchReducer({
                                        type: "nextVideo"
                                    })}>
                                    <p className="flex items-center">Next<ChevronRight className="w-10 h-10" /></p>
                                </NavigationButton>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-2 mx-auto md:px-40">
                        <div id="carousel-cards" className="flex gap-5 p-2 overflow-x-auto border border-black bg-slate-50 snap-x snap-mandatory justify-items-center">
                            {
                                assemblyLinks.map(({ title, duration, externalUrl }, idx) =>
                                    <CarousalCard key={idx} active={videoState.id === idx} total={assemblyLinks.length} title={title} duration={duration} idx={idx} onClick={() => loadNewLink({ externalUrl, title, duration, id: idx })} />)
                            }
                        </div>
                    </div>
                </section>
            }
        </WrapperLayout>
    )
}