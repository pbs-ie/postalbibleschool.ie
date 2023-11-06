export default function SvgImagePlaceholder({ className = "", width = "350", height = "350" }) {
    return (
        <svg className={className} aria-labelledby="svg-image-placeholder" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
            <title id="svg-image-placeholder">Image placeholder</title>
            <rect width={width} height={height} fill="#cccccc"></rect>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="monospace" fontSize="16px" fill="#333333">{width}x{height}</text>
        </svg>
    )
}