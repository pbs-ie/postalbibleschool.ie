import { Product } from "@/Pages/Payment/Index"
import PrimaryButton from "../Buttons/PrimaryButton"
import { ChangeEvent } from "react"

interface PaymentOptions {
    handleOptionSelect: (index: number) => void,
    activeOption: number | null,
    products: Product[],
    currentPrice: string,
    handleCustomPriceChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleContinue: () => void
}
export default function DefaultPaymentOptions({ handleOptionSelect, activeOption, products, currentPrice, handleCustomPriceChange, handleContinue }: PaymentOptions) {


    return (
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
                <PrimaryButton onClick={() => handleContinue()}>Continue</PrimaryButton>
            </div>

        </div>
    )
}