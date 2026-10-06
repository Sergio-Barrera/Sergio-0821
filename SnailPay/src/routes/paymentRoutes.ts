import { Router } from "express"
import { validate } from "zod-express-validator";
import { payShema, type createPaymentInput } from '../shemas/pay.shema.ts'
import { createPayment } from '../controllers/paymentController.ts'
import { succes } from '../types/responses.ts'

const route = Router();

route.post(
    "/payments",
    validate({body: payShema}),
    async (req, res) => {
        const transaction = await createPayment(req.body as createPaymentInput);
        res.status(200).json(
            succes(transaction, "La recarga del saldo fue realizada exitosamente.")
        );
    }
);

export default route;