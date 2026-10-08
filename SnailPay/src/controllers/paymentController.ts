import { randomUUID } from "node:crypto";
import { DECLINE_CARD, VALID_CARD } from '../data/dataMock.ts'
import type { Transaction } from "../types/transaccion.ts";
import type {createPaymentInput} from "../shemas/pay.shema.ts"
import { BussinesError } from './businessRules.ts'
import { CODE_ERROR } from '../types/responses.ts'

export async function createPayment(request: createPaymentInput) : Promise<Transaction> {
    const dateNow = new Date();
    const monthNow = dateNow.getMonth()+1;
    const yearNow = dateNow.getFullYear();

    const [monthStr='', yearStr=''] = request.card.expiredCard.split('/');
    const expirationMonth =parseInt(monthStr, 10);
    const expirationYear = parseInt(`20${yearStr}`, 10);
    const expiredCard = expirationYear < yearNow ||
        (expirationYear === yearNow && expirationMonth < monthNow);
    if(expiredCard){
        throw new BussinesError(
            422,
            CODE_ERROR.EXPIRED_CARD,
            "La tarjeta esta vencida"
        );
    }

    const validCard = request.card.number === VALID_CARD.numberCard
        && request.card.expiredCard === VALID_CARD.expirationDate
        && request.card.cvv === VALID_CARD.cvv;

    if(validCard && request.amount>VALID_CARD.mount){
        throw new BussinesError(
            422,
            CODE_ERROR.INSUFFICIENT_AMOUNT,
            `El monto solicitado ($${request.amount}) excede el saldo disponible`
        )
    }

    const declineCards = DECLINE_CARD[request.card.number as keyof typeof DECLINE_CARD];

    let transaction: Transaction;

    if(validCard){
        transaction = createTransaction(request, "approved", "accredited");
    }else if (declineCards){
        transaction = createTransaction(request, "rejected", declineCards.toLowerCase());
        throw new BussinesError(
            422,
            declineCards as never,
            messageRejection(declineCards),
            transaction
        );
    } else {
        transaction = createTransaction(request, "rejected", "generic_decline");
        throw new BussinesError(
            422,
            CODE_ERROR.CARD_DECLINE,
            "Tarjeta Rechazada",
            transaction
        );
    }

    await new Promise((solve) => setTimeout(solve,300));
    return transaction;
}

function createTransaction(request: createPaymentInput, status: Transaction["status"], statusDetail: string): Transaction{

    return {
        id: `pay_${randomUUID()}`,
        status,
        status_detail: statusDetail,
        transaction_amount: request.amount,
        date_create: new Date().toISOString(),
        authorization_code: status === "approved" ? `AUTH_${Math.random().toString(36).slice(2,10).toUpperCase()}` : null,
        reference: `Cargo apuesta caracoles ${request.card.NameUserCar}`,
        payer_id: request.idUser,
        payer_email: request.email,
    };
}

function messageRejection(code:string): string{
    const message: Record<string, string> = {
        INSUFFICIENT_AMOUNT: "La tarjeta no cuenta con esa cantidad de fondos",
        EXPIRED_CARD: "La tarjeta esta vencida",
        DECLINE_CARD: "La tarjeta fue rechazada por el banco emisor."
    };

    return message[code] ?? "La transacción fue rechazada" + code;
}