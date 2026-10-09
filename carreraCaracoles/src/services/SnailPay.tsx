import type { PaySnileRequest, ResponsePayment, TransactionResponse } from '../types/typePayment'
import type { DataBase } from '../types/auth'
import {getUsers, saveUser} from './registerUser'

export class PaymentError extends Error {
    transaction?: TransactionResponse;

    constructor(message: string, transaction?: TransactionResponse){
        super(message);
        this.name="PaymentError";
        this.transaction=transaction;
    }
}

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
        throw new PaymentError(
            data.error?.message ?? "No fue posible realizar el pago.",
            response.status === 422 ? data.error.details : undefined
        );
    }

    return data;
}

export function UpdateAmount(userId: string, amount: number): DataBase{
    const users = getUsers();
    const index = users.findIndex((user) => user.id === userId);
    const newCash = users[index].cash+amount 
    users[index] = { ...users[index], cash: newCash }
    saveUser(users);
    return users[index];
}