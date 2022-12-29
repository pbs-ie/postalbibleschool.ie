import WrapperLayout from '@/Layouts/WrapperLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Index() {
    return (
        <WrapperLayout>
            <Head title="Testing Index" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Test page!</div>
                    </div>
                </div>
            </div>
        </WrapperLayout>
    );
}
