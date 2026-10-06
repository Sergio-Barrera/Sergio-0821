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
    transaction_amoun: number,
    date_create: String,
    authorization_code: string | null,
    reference: string,
    payer_id: string,
    payer_email: string
}