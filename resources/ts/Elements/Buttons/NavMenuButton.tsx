export default function NavMenuButton({ active, onClick }: { active: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined }) {
    return (
        <button
            data-test="menubutton"
            onClick={onClick}
            className="inline-flex items-center justify-center p-2 text-gray-100 transition duration-150 ease-in-out border-2 border-transparent rounded-md hover:border-gray-100 focus:border-gray-100 "
        >
            <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                    className={!active ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                    className={active ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    )
}