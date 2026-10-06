export interface PaymentRequest{
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