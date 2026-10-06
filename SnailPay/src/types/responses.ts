export const CODE_ERROR = {
    INVALID_DATA: "INVALID_DATA",
    JSON_INVALID: "JSON_INVALID",

    INVALID_CARD: "INVALID_CARD",
    CARD_DECLINE: "CARD_DECLINE",
    INSUFFICIENT_AMOUNT: "INSUFFICIENT_AMOUNT",
    EXPIRED_CARD: "EXPIRED_CARD",

    INCORRECT_DATA: "INCORRECT_DATA",
    
    INTERNAL_ERROR: "INTERNAL_ERROR"
} as const;

export type ErrorCode = typeof CODE_ERROR[keyof typeof CODE_ERROR];

export interface ResponseSucces<T=unknown>{
    succes: true,
    data: T,
    message: string,
}

export interface ResponseError{
    succes: false,
    error: {
        code: ErrorCode,
        message: string,
        datails?: unknown,
    }
}

export type ResponseApi<T = unknown> = ResponseSucces<T> | ResponseError;

export function succes<T>(data: T, message="OK"): ResponseSucces<T>{
    return {succes:true, data, message};
}

export function error(
    code: ErrorCode,
    message: string,
    datails?: unknown,
): ResponseError{
    return {
        succes: false,
        error:{
            code,
            message,
            ...(datails != undefined && {datails}),
        }
    }
}