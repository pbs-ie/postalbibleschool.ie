import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { ChangeEvent, useEffect, useState } from "react";
import LogoSmall from '@images/logo-icon.png';
import PaypalCheckoutButtons, { Cart } from "@/Components/Buttons/PaypalCheckoutButtons";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import PaymentSuccessComponent from "@/Components/Payments/PaymentSuccessComponent";

interface Product {
    title: string;
    description?: string;
    price: number;
}

export default function Index() {
    const [activeOption, setActiveOption] = useState<number | null>(null);
    const [currentPrice, setCurrentPrice] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const products: Product[] = [
        {
            title: "Option 1",
            description: "",
            price: 20
        },
        {
            title: "Option 2",
            description: "",
            price: 40
        },
        {
            title: "Option 3",
            description: "",
            price: 60
        }
    ];

    const [cart, setCart] = useState<Cart[]>([]);

    useEffect(() => {
        setCart([]);
        setActiveOption(null);
        setCurrentPrice('');
        setError('');
    }, []);

    const handleOptionSelect = (option: number) => {
        if (option === activeOption) {
            return;
        }
        if (option === 4) {
            setCurrentPrice('');
            setCart([]);

        } else {
            setCurrentPrice('' + products[option].price);
            setCart([{
                id: 0,
                quantity: 1,
                value: Number(currentPrice)
            }
            ]);
        }
        setActiveOption(option);
    }

    const handleCustomPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            setCurrentPrice(event.target.value.replace(/^0+/, ''));
        }
    }

    const handleContinueButton = () => {
        if (activeOption === null || currentPrice === '') {
            setIsButtonDisabled(true);
            setError("Please select or enter an amount to send");
            return;
        }
        setCart([{
            id: 0,
            quantity: 1,
            value: Number(currentPrice)
        }]);
        setIsButtonDisabled(false);
    }

    const handlePaymentContinued = (data: any, actions: any) => {
        if (isButtonDisabled || currentPrice === '') {
            console.error("Values not set");
            setError("Please select or enter an amount to send");
            return actions.reject();
        }
        return actions.resolve();
    }


    return (

        <WrapperLayout>
            <ContentWrapper title="Default Payment">
                <div className="flex justify-center w-3/4 mx-auto">
                    <div className="flex flex-col items-center w-full gap-2 p-8 mb-5 border border-gray-300 rounded-md lg:w-2/3">
                        <div className="inline-flex justify-center w-full px-6">
                            <img src={LogoSmall} alt="Postal Bible School Logo" className="my-4 h-14"></img>
                        </div>
                        <h2 className="text-3xl">Postal Bible School</h2>
                        {!isSuccess && <>
                            <p className="px-10 text-xl">You can make general payments to<br /> Postal Bible School Trust here</p>
                            {isButtonDisabled &&
                                <div>
                                    <div className="grid grid-cols-4 gap-2 mb-4">
                                        {
                                            products.map(({ title, description, price }, index) => (
                                                <button onClick={() => handleOptionSelect(index)} key={index + "product"} className={"flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === index ? " bg-blue-800 text-white" : "")}>
                                                    {price &&
                                                        <>
                                                            <div className="text-lg font-bold before:content-['€']">{price}</div>
                                                            <div className="text-sm uppercase ">EUR</div>
                                                        </>
                                                    }
                                                </button>
                                            ))
                                        }
                                        <button onClick={() => handleOptionSelect(4)} className={"flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === 4 ? " bg-blue-800 text-white" : "")}>
                                            <p className="text-lg font-bold">Other</p>
                                        </button>
                                    </div>
                                    {activeOption === 4 &&
                                        <div className="w-full h-10 mb-4">

                                            <p className="flex items-center w-full transition ease-in-out border border-gray-400 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:shadow-md focus-within:shadow-indigo-500">
                                                <span className="ml-4 font-normal pointer-events-none">€</span>
                                                <input className="w-full border-0 rounded-md focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" name="price" id="price" value={currentPrice} onChange={handleCustomPriceChange} placeholder="Please enter an amount" />
                                            </p>
                                        </div>
                                    }

                                    <div className="flex justify-end w-full">
                                        <PrimaryButton onClick={() => handleContinueButton()}>Continue</PrimaryButton>
                                    </div>

                                </div>
                            }
                            {!isButtonDisabled &&
                                <div className={"w-full lg:max-w-2xl"}>
                                    <div>
                                        <p className="mb-2">You have selected to pay</p>
                                        <p className="mb-4 text-xl md:text-4xl">€{currentPrice === '' ? 0 : currentPrice}</p>
                                        <SecondaryButton onClick={() => { setError(''); setIsButtonDisabled(true) }}>Change Amount</SecondaryButton>
                                    </div>
                                    <hr className="w-1/2 h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                                    <div className="py-4 lg:px-8">
                                        <PaypalCheckoutButtons setSuccess={setIsSuccess} setErrorMessage={setError} onClick={handlePaymentContinued} cart={cart} />
                                    </div>
                                </div>
                            }
                            <div className="w-full lg:max-w-2xl">
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                        </>
                        }
                        {isSuccess &&
                            <PaymentSuccessComponent />
                        }
                    </div>
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}