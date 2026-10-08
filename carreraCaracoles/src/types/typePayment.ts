export interface PaymentFormData {
  cardNumber: string;
  nameUser: string
  cardExpiry: string;
  cardCvv: string;
  amount: string;
}

export interface PaySnileRequest{
    idUser: string,
    email: string,
    amount: number,
    card: {
        number: string,
        expiredCard: string,
        cvv: string,
        NameUserCar: string,
    }
}

export interface TransactionResponse {
    id: string,
    status: string,
    status_detail: string,
    transaction_amount: number,
    date_create: string,
    authorization_code: string | null,
    reference: string,
    payer_id: string,
    payer_email: string
}

export type ResponsePayment = {
    true: boolean,
    message: string,
    data: TransactionResponse
};