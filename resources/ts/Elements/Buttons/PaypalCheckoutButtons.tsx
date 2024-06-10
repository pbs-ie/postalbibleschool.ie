import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import Loader from "@/Components/Loader";
import route from "ziggy-js";

export interface Cart {
    id: number;
    quantity: number;
    value: number;
}

interface PaypalCheckoutButtonsProps {
    cart: Cart[],
    onClick: (data: any, actions: any) => void,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
    cartDescription?: string
}
export default function PaypalCheckoutButtons({ cart, onClick, setErrorMessage, setSuccess, cartDescription = "" }: PaypalCheckoutButtonsProps) {
    const [message, setMessage] = useState('');
    const resetMessage = () => {
        setMessage('');
    }
    const createOrder = async () => {
        resetMessage();
        try {
            let body = {
                cart: cart,
                description: cartDescription
            }
            const response = await fetch(route('paypal.create'), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            const orderData = await response.json();
            if (orderData.id) {
                console.log("Order ID", orderData.id);
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            console.log(error);
            setMessage(`Could not initiate PayPal Checkout... Please try again later`);
        }
    }
    const onApprove = async (data: any, actions: any) => {
        resetMessage();
        // replace this url with your server
        try {
            // const orderData = await actions.order.capture();
            const response = await fetch(route('paypal.capture', data.orderID), {
                method: 'POST'
            })

            const orderData = await response.json();
            console.log("Capture Order", orderData);
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message
            const errorDetail = orderData?.details?.[0];
            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
            } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
            } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                    orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                    orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                setMessage(`Transaction ${transaction.status}: ${transaction.id}`);
                console.log(
                    `Transaction ${transaction.status}: ${transaction.id} - See console for all available details`
                );
                setSuccess(true);
                console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2),
                );
            }
        } catch (e: any) {
            console.log(`Transaction Failed: ${e.message}`);
            setMessage(`Transaction Failed. Please try again later.`);
        }

    }

    useEffect(() => {
        if (message && message !== '')
            setErrorMessage(message);

        return () => {
            setMessage('');
        }
    }, [message])


    const ButtonWrapper = ({ showSpinner }: { showSpinner: boolean }) => {
        const [{ isPending }] = usePayPalScriptReducer();
        const [{ options }, dispatch] = usePayPalScriptReducer();

        return (
            <>
                {showSpinner && isPending && <Loader />}
                {!(showSpinner && isPending) &&
                    <PayPalButtons
                        style={{
                            layout: "vertical",
                            height: 50,
                            shape: "pill"
                        }}
                        disabled={false}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onClick={onClick}
                        onCancel={() => {
                            resetMessage();
                            dispatch({
                                type: "resetOptions",
                                value: {
                                    ...options,
                                }
                            })
                            setMessage("Order cancelled");
                        }
                        }
                    />}
            </>
        );
    }

    return (
        <div className="w-full mx-auto">


            <ButtonWrapper showSpinner={false} />

        </div>
    )
}