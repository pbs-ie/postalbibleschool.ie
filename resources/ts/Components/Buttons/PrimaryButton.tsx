export default function PrimaryButton({ type = 'submit', className = '', processing = false, children, onClick }: Button) {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className={
                    `inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 border border-transparent rounded shadow-md font-medium leading-tight text-white uppercase tracking-widest hover:bg-blue-700 hover:shadow-lg  active:bg-blue-800 active:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${processing && 'opacity-25'
                    } ` + className
                }
                disabled={processing}
            >
                {children}
            </button>
        </>
    );
}
