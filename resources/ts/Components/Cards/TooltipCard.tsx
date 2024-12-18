import { useEffect, useState } from "react";

interface TooltipProps {
    text: string | React.ReactNode;
    children: React.ReactNode;
    direction: "top" | "bottom" | "left" | "right";
    id: string;
    size?: Button["size"]
}

export default function TooltipCard({ id, text, direction, children, size }: TooltipProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    const openTooltip = () => {
        setShowTooltip(true);
    }
    const closeTooltip = () => {
        setShowTooltip(false);
    }

    const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setShowTooltip(false);
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleEscKey);

        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, []);

    const getClassListByDirection = () => {
        switch (direction) {
            case "bottom":
                return "top-[calc(100%+1px)] left-10 transform translate-x-[-60%] mt-2";
            case "right":
                return "left-[calc(100%+1px)] top-1/2 transform -translate-y-1/2 ml-2";
            case "left":
                return "right-[calc(100%+1px)] top-1/2 transform -translate-y-1/2 mr-2";
            case "top":
                return "bottom-[calc(100%+1px)] left-10 transform translate-x-[-60%] mb-2";
        }
    }
    const getClassListBySize = () => {
        switch (size) {
            case "large":
                return "min-w-80"
            case "medium":
                return "min-w-60"
            case "small":
                return "min-w-32"
            case "xsmall":
                return "w-fit"
            default:
                return "min-w-80"
        }
    }

    return (
        <div className="relative justify-center inline-block text-sm text-center"
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
            onFocus={openTooltip}
            onBlur={closeTooltip}
        >
            <div className="fixed z-20">
                {showTooltip && (
                    <div
                        className={`bg-black text-gray-200 text-center rounded p-3 absolute z-10 text-sm ${getClassListBySize()} ${getClassListByDirection()}`}
                        data-placement={direction}
                        role="tooltip"
                        id={id}
                    >
                        {text}
                    </div>

                )}
            </div>
            {children}
        </div>
    )
}