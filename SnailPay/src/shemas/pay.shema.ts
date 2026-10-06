import { z } from "zod";

export const payShema = z.object({
    idUser: z.string().min(1,"El id es Obligatorio"),
    email: z.email("El correo electronico no es valido"),
    amount: z.number().positive("El monto debe ser mayor a 0"),
    card: z.object({
        number: z.string().regex(/^\d{16}$/,"Debe tener 16 digitos numeros exactos"),
        expiredCard: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "El formato de la fecha es incorrecto debe ser MM/AA"),
        cvv: z.string().regex(/^\d{3}$/, "Sólo debe de tener 3 digitos"),
        NameUserCar: z.string().min(3,"Debe de tener al menos 3 caracteres").max(100, "El nombre es muy largo. es incorrecto"),
    })
});

export type createPaymentInput = z.infer<typeof payShema>;