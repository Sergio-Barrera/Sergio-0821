import type {TransactionResponse} from '../types/typePayment'

type PaymentReceiptProps = {
    data: TransactionResponse,
    onAccept: () => void;
}

function PaymentReceipt ({
    data,
    onAccept,
}: PaymentReceiptProps){
    const isApproved = data.status ==="approved";

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <div className="text-5xl mb-3">
                    {isApproved ? "✓" : "✕"}
                </div>
                <h2 className="text-2xl font-bold">
                    {isApproved
                        ? "TRANSACCIÓN EXITOSA"
                        : "TRANSACCIÓN RECHAZADA"}
                </h2>
                <p className="text-gray-500 mt-2">
                    {isApproved
                        ? "Tu transacción fue procesada correctamente."
                        : "No fue posible procesar tu transacción."}
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-md border p-6">
                <h3 className="text-lg font-semibold mb-5">
                    Comprobante de pago
                </h3>
                <div className="space-y-4">

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Identificador de la operación:
                        </span>
                        <span className="font-medium">
                            {data.id}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Estado general de la operación:
                        </span>
                        <span
                            className={
                                isApproved
                                ? "font-semibold text-green-600"
                                : "font-semibold text-red-600"
                            }
                        >
                            {data.status}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Detalle del resultado:
                        </span>
                        <span className="font-medium">
                            {data.status_detail}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Monto solicitado:
                        </span>
                        <span className="font-medium">
                            ${data.transaction_amount}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Fecha de creación de la operación:
                        </span>
                        <span className="font-medium">
                            {data.date_create}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Código de autorización:
                        </span>
                        <span className="font-medium">
                            {data.authorization_code}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Referencia de la operación:
                        </span>
                        <span className="font-medium">
                            {data.reference}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Identificador:
                        </span>
                        <span className="font-medium">
                            {data.payer_id}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Correo del usuario:
                        </span>
                        <span className="font-medium">
                            {data.payer_email}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <button
                    type="button"
                    onClick={onAccept}
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                    Aceptar
                </button>
            </div>
        </div>
    )
}

export default PaymentReceipt