import WrapperLayout from "@/Layouts/WrapperLayout";
import LogoIcon from "@images/logo-icon.png";

export default function NotFound() {
    return (

        <section className="py-6 bg-white sm:py-8 lg:py-12">
            <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
                <div className="flex flex-col items-center">
                    <a href="/" className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5 mb-8" aria-label="logo">
                        <img src={LogoIcon} alt="PBS Icon" className="w-10 h-10" />

                        Postal Bible School
                    </a>

                    <h1 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">Page not found</h1>

                    <p className="max-w-screen-md mb-12 text-center text-gray-500 md:text-lg">The page you’re looking for doesn’t exist.</p>

                    <a href="/" className="inline-block px-8 py-3 text-sm font-semibold text-center text-gray-500 transition duration-100 bg-gray-200 rounded-lg outline-none hover:bg-gray-300 focus-visible:ring ring-indigo-300 active:text-gray-700 md:text-base">Go home</a>
                </div>
            </div>

        </section>
    )
}