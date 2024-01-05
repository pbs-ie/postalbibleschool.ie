import { ChangeEvent, useEffect, useReducer, useState } from "react";
import LogoSmall from '@images/logo-icon.png';
import PaypalCheckoutButtons, { Cart } from "@/Elements/Buttons/PaypalCheckoutButtons";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import PaymentSuccessComponent from "@/Components/Payments/PaymentSuccessComponent";

import StepWrapper from "@/Layouts/StepWrapper";
import MinusCircle from "@/Elements/Icons/MinusCircle";
import PlusCircle from "@/Elements/Icons/PlusCircle";

interface Product {
    title: string;
    quantity: number;
    price: number;
}

interface CartAction {
    type: "changeValue" | "addItem" | "removeItem" | "resetCart" | "setItem";
    id: number;
    quantity: number;
    value: number;

}

interface ProductAction {
    type: "increase" | "decrease" | "selected";
    index: number;
}

const defaultProducts: Product[] = [
    {
        title: "General",
        quantity: 0,
        price: 65
    },
    {
        title: "Student",
        quantity: 0,
        price: 50
    }
];

const productReducer = (state: Product[], action: ProductAction) => {
    let newState = [];
    switch (action.type) {
        case "increase":
            return [...state].map((product, index) => {
                if (index === action.index) {
                    return {
                        title: product.title,
                        quantity: product.quantity + 1,
                        price: product.price
                    }
                }
                return product;
            });
        case "decrease":
            return [...state].map((product, index) => {
                if (index === action.index && product.quantity > 1) {
                    return {
                        title: product.title,
                        quantity: product.quantity - 1,
                        price: product.price
                    }
                }
                return product;
            });
        case "selected":
            newState = [...state];
            newState[action.index].quantity = 1;
            return newState;
        default:
            return state;
    }
}

const defaultCart: Cart[] = [
    {
        id: 0,
        quantity: 1,
        value: 0
    }
]


const cartReducer = (state: Cart[], action: CartAction) => {
    switch (action.type) {
        case "setItem":
            return [
                {
                    id: action.id,
                    quantity: action.quantity,
                    value: action.value
                }
            ]
        case "changeValue":
            return [...state].map((cart) => {
                if (cart.id === action.id && action.quantity && action.value) {
                    return {
                        id: action.id,
                        quantity: action.quantity,
                        value: action.value

                    }
                }
                return cart;
            });
        case "addItem":
            if (action.quantity && action.value) {
                return [
                    ...state, {
                        id: state.length,
                        quantity: action.quantity,
                        value: action.value
                    }
                ];
            }
            return state;
        case "removeItem":
            if (state.length === 1) {
                return defaultCart;
            }
            return state.filter(cart => cart.id !== action.id);
        case "resetCart":
            return defaultCart;
        default:
            return state;
    }
}

export default function Step() {
    const [activeOption, setActiveOption] = useState<number | null>(null);
    const [customPrice, setCustomPrice] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const [cartState, cartDispatch] = useReducer(cartReducer, defaultCart);
    const [productState, productDispatch] = useReducer(productReducer, defaultProducts);


    const handleOptionSelect = (option: number) => {
        if (option === activeOption) {
            return;
        }
        setCustomPrice('');
        if (option === 4) {
            cartDispatch({
                type: "resetCart",
                id: 0,
                quantity: 0,
                value: 0
            });

        } else {
            productDispatch({ type: "selected", index: option });
        }
        setActiveOption(option);
    }

    const handleCustomPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            setCustomPrice(event.target.value.replace(/^0+/, ''));
        }
    }

    const handleContinueButton = () => {
        setError('');
        if (activeOption === null) {
            setIsButtonDisabled(true);
            setError("Please select or enter an amount to send");
            return;
        }
        if (customPrice !== '') {
            cartDispatch({
                type: "setItem",
                id: 0,
                quantity: 1,
                value: Number(customPrice)
            })
        } else {
            cartDispatch({
                type: "setItem",
                id: 0,
                quantity: productState[activeOption].quantity,
                value: productState[activeOption].price
            })
        }
        setIsButtonDisabled(false);
    }

    const handlePaymentContinued = (data: any, actions: any) => {
        if (isButtonDisabled) {
            console.error("Values not set");
            setError("Please select or enter an amount to send");
            return actions.reject();
        }

        return actions.resolve();
    }

    const displayAdditionalAction = () => {
        if (activeOption === 0 || activeOption === 1) {
            return (
                <div className="w-full h-10 mb-4">
                    <div className="flex items-center justify-end text-lg">
                        <p>Select quantity: </p>
                        <div className="flex items-center ml-2 rounded-full bg-slate-100">
                            <button onClick={() => productDispatch({ type: "decrease", index: activeOption })} className="rounded-full"><MinusCircle className="w-10 h-10" /></button>
                            <p className="px-2">{productState[activeOption].quantity}</p>
                            <button onClick={() => productDispatch({ type: "increase", index: activeOption })} className="rounded-full"><PlusCircle className="w-10 h-10" /></button>
                        </div>
                    </div>
                </div>
            )
        }
        if (activeOption === 4) {
            return (
                <div className="w-full h-10 mb-4">

                    <p className="flex items-center w-full transition ease-in-out border border-gray-400 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:shadow-md focus-within:shadow-indigo-500">
                        <span className="ml-4 font-normal pointer-events-none">€</span>
                        <input className="w-full border-0 rounded-md focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" name="price" id="price" value={customPrice} onChange={handleCustomPriceChange} placeholder="Please enter an amount" />
                    </p>
                </div>
            );
        }
    }

    const getTotalAmount = () => {
        return cartState.reduce((total, item) => total + (item.value * item.quantity), 0);
    }

    const handleAmountReset = () => {
        cartDispatch({
            type: "resetCart",
            id: 0,
            quantity: 0,
            value: 0
        })
        setError('');
        setActiveOption(null);
        setIsButtonDisabled(true);
    }

    useEffect(() => {
        handleAmountReset()
    }, []);

    return (

        <StepWrapper heading="STEP Payment" title="Payment">
            <div className="flex justify-center w-3/4 mx-auto">
                <div className="flex flex-col items-center w-full gap-2 p-8 mb-5 border border-gray-300 rounded-md lg:w-2/3">
                    <div className="inline-flex justify-center w-full px-6">
                        <img src={LogoSmall} alt="Postal Bible School Logo" className="my-4 h-14"></img>
                    </div>
                    <h2 className="text-3xl">Postal Bible School</h2>
                    {!isSuccess && <>
                        <p className="px-10 mb-5 text-xl">You can make payments for STEP to the<br /> Postal Bible School Trust here</p>
                        {isButtonDisabled &&
                            <div>
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    {
                                        productState.map(({ title, quantity, price }, index) => (
                                            <button onClick={() => handleOptionSelect(index)} key={index + "product"} className={"flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === index ? " bg-blue-800 text-white" : "")}>
                                                {price &&
                                                    <>
                                                        <p className="text-lg font-bold before:content-['€']">{price}</p>
                                                        <p className="capitalize">{title}</p>
                                                    </>
                                                }
                                            </button>
                                        ))
                                    }
                                    <button onClick={() => handleOptionSelect(4)} className={"flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === 4 ? " bg-blue-800 text-white" : "")}>
                                        <p className="text-lg font-bold">Custom</p>
                                    </button>
                                </div>
                                {displayAdditionalAction()}

                                <div className="flex justify-end w-full">
                                    <PrimaryButton onClick={() => handleContinueButton()}>Continue</PrimaryButton>
                                </div>

                            </div>
                        }
                        {!isButtonDisabled &&
                            <div className={"w-full lg:max-w-2xl"}>
                                <div>
                                    <p className="mb-2">You have selected to pay</p>
                                    <p className="mb-4 text-xl md:text-4xl">€{getTotalAmount()}</p>
                                    <SecondaryButton onClick={() => handleAmountReset()}>Change Amount</SecondaryButton>
                                </div>
                                <hr className="w-1/2 h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                                <div className="py-4 lg:px-8">
                                    <PaypalCheckoutButtons setSuccess={setIsSuccess} setErrorMessage={setError} onClick={handlePaymentContinued} cart={cartState} cartDescription="Payment for PBS STEP" />
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
        </StepWrapper>
    )
}