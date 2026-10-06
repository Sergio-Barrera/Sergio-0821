export type TransactionState = "approved" | "reject" |"in_process";

export interface Transaction {
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