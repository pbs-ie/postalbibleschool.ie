import { useState, useReducer, useRef, useEffect } from "react";
import Loader from "@/Components/Loader";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import VideoNavButton from "@/Elements/Buttons/VideoNavButton";
import VideoCarousalCard from "@/Components/Cards/VideoCarousalCard";
import ChevronLeft from "@/Components/Icons/ChevronLeft";
import ChevronRight from "@/Components/Icons/ChevronRight";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";
import Heading3 from "../Typography/Heading3";

interface VideoPlayerProps {
    title: string;
    imageLink: string;
    content: VideoMeta[];
}

export default function VideoPlayerComponent({ title, imageLink, content }: VideoPlayerProps) {
    const [videoLinks, setVideoLinks] = useState(content || []);
    const frameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (content) {
            setVideoLinks(content);
        }
    }, [content]);

    const scrollListToView = (id: number) => {
        if (frameRef.current) {
            frameRef.current.scroll({
                top: 0,
                left: (id * Math.floor(frameRef.current.scrollWidth / videoLinks.length)) - 80,
                behavior: 'smooth'
            })
        }
    }

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
                const nextVideo = videoLinks[(state.id + 1) % videoLinks.length];
                return { ...state, isLoading: true, externalUrl: nextVideo?.externalUrl, duration: nextVideo?.duration, id: nextVideo?.id, title: nextVideo?.title };
            case "prevVideo":
                let prevIndex = state.id - 1;
                if (prevIndex < 0) {
                    prevIndex = state.id;
                }
                const prevVideo = videoLinks[prevIndex];
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
                externalUrl: videoLinks[0]?.externalUrl,
                title: videoLinks[0]?.title,
                duration: videoLinks[0]?.duration,
                isLoading: false,
                id: 0
            }
        })
    }, []);

    const loadNewLink = ({ externalUrl, title, duration, id }: VideoMeta) => {
        scrollListToView(id);
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

    const handleClickEvent = (type: string, id: number) => {
        scrollListToView(id)
        switch (type) {
            case "prev":
                return () => dispatchReducer({
                    type: "prevVideo"
                })
            case "next":
                return () => dispatchReducer({
                    type: "nextVideo"
                })
            default:
                return;
        }
    }

    const isCarousalActive = () => {
        return videoLinks.length > 1
    }


    return (
        videoLinks.length > 0 && (
            <section className="flex flex-col w-full">
                <div className="relative justify-center py-5 mx-2 md:mx-auto md:max-w-4xl">

                    <div className="flex flex-col items-center w-full gap-2">
                        <Heading2Nospace>{title}</Heading2Nospace>

                        <div className="self-start"><Heading3>{videoState.isLoading ? <p>&hellip;</p> : videoState.title}</Heading3></div>
                        <div className="relative self-stretch md:self-center">
                            {videoState.isLoading ?
                                <div className="absolute bottom-0 mb-5 text-2xl right-5">
                                    <Loader />
                                </div> : null}

                            <iframe title={videoState.title} onLoad={() => dispatchReducer({ type: "loadComplete" })} src={videoState.externalUrl} height="506" width="900" allowFullScreen allow="autoplay" className="aspect-video w-full h-auto md:w-[900px]" ></iframe>
                        </div>
                        {isCarousalActive() &&
                            <div className="flex gap-10">
                                <VideoNavButton
                                    className="md:float-left"
                                    disabled={videoState.id === 0}
                                    onClick={handleClickEvent("prev", videoState.id)}>
                                    <p className="flex items-center">
                                        <ChevronLeft className="w-5 h-5 md:w-10 md:h-10" />Previous
                                    </p>
                                </VideoNavButton>
                                <VideoNavButton
                                    className="md:float-right"
                                    disabled={videoState.id === videoLinks.length - 1}
                                    onClick={handleClickEvent("next", videoState.id)}>
                                    <p className="flex items-center">Next<ChevronRight className="w-5 h-5 md:w-10 md:h-10" /></p>
                                </VideoNavButton>
                            </div>
                        }
                    </div>
                </div>
                {isCarousalActive() &&
                    <div className="w-full px-2 mx-auto md:px-20 xl:px-40">
                        <div ref={frameRef} id="carousel-cards" className="flex gap-5 p-2 overflow-x-auto bg-slate-50 justify-items-center">
                            {videoLinks.map(({ title, duration, externalUrl }, idx) =>
                                <VideoCarousalCard
                                    key={idx}
                                    active={videoState.id === idx}
                                    total={videoLinks.length}
                                    title={title}
                                    duration={duration}
                                    imageLink={imageLink}
                                    idx={idx}
                                    onClick={() => loadNewLink({ externalUrl, title, duration, id: idx })} />)
                            }
                        </div>
                    </div>
                }
            </section>)
    )
}