import { useEffect, useState } from "react";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    direction: "top" | "bottom" | "left" | "right";
    id: string;
}

export default function TooltipCard({ id, text, direction, children }: TooltipProps) {
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
            case "left":
                return "-left-100 top-1/2 transform -translate-y-1/2 mr-2";
            case "right":
                return "-right-100 top-1/2 transform -translate-y-1/2 ml-2";
            case "top":
                return "bottom-[calc(100%+1px)] left-10 transform translate-x-[-60%] mb-2";
        }
    }

    return (
        <div className="relative text-sm inline-block justify-center text-center"
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
            onFocus={openTooltip}
            onBlur={closeTooltip}
        >
            {showTooltip && (
                <div
                    className={`bg-black text-gray-200 text-center rounded p-3 absolute z-10 min-w-40 text-sm ${getClassListByDirection()}`}
                    data-placement={direction}
                    role="tooltip"
                    id={id}
                >
                    {text}
                </div>

            )}
            {children}
        </div>
    )
}