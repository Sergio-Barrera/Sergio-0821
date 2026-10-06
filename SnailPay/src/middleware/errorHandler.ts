import type { ErrorRequestHandler } from "express";
import { BussinesError } from "../controllers/businessRules.ts";
import { error, CODE_ERROR } from "../types/responses.ts";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err.name === "RequestValidationError"){
        res.status(400).json(
            error(
                CODE_ERROR.INVALID_DATA,
                "Los datos enviados no son validos",
                err.errors,
            )
        );
        return;
    }

    if(err instanceof BussinesError){
        res.status(err.statusCode).json(
            error(
                err.code, err.message, err.details
            )
        );
        return;
    }

    if(err.type === "entity.parse.failed"){
        res.status(400).json(
            error(
                CODE_ERROR.JSON_INVALID, "El json creado es invalido"
            )
        );
        return;
    }

    res.status(500).json(
        error(CODE_ERROR.INTERNAL_ERROR,"Ocurrio un error inesperado")
    );
}