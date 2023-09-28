import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { router } from '@inertiajs/react'

export default function Index() {
    const [message, setMessage] = useState('');

    const resetMessage = () => {
        setMessage('');
    }

    const createOrder = async () => {
        resetMessage();
        // replace this url with your server
        try {
            let body = {
                cart: [
                    {
                        id: 1,
                        quantity: 1,
                    }
                ]
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
            console.error(error);
            setMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
        }
    }
    const onApprove = async (data: any, actions: any) => {
        resetMessage();
        // replace this url with your server
        const response = await fetch(route('paypal.capture', data.orderID), {
            method: 'POST',
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
            setMessage(
                `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
            );
            console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2),
            );
        }

    }

    return (
        <WrapperLayout>
            <ContentWrapper title="PayPal Payments">
                <div className="w-1/2 mx-auto">
                    <p>{message}</p>

                    <PayPalScriptProvider options={{
                        "clientId": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                        "currency": "EUR"
                    }}>
                        <PayPalButtons
                            style={{
                                layout: "vertical",
                                height: 50
                            }}
                            disabled={false}
                            createOrder={createOrder}
                            onApprove={onApprove}
                        />
                    </PayPalScriptProvider>

                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}