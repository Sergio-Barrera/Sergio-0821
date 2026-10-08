import type { PaySnileRequest, ResponsePayment } from '../types/typePayment'

export const createPayment = async (
    payment: PaySnileRequest
): Promise<ResponsePayment> =>{
    const response = await fetch(
        "http://localhost:3000/api/payments",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payment),
        });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error.message ?? "No fue posible realizar el pago."
        );
    }

    return data;
}