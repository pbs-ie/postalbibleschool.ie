export default function SvgImagePlaceholder({ className = "" }) {
    return (
        <svg className={className} aria-labelledby="svg-image-placeholder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350" width="350" height="350">
            <title id="svg-image-placeholder">Image placeholder</title>
            <rect width="350" height="350" fill="#cccccc"></rect>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="monospace" fontSize="26px" fill="#333333">350x350</text>
        </svg>
    )
}