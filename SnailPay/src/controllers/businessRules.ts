import type {ErrorCode} from '../types/responses.ts';

export class BussinesError extends Error{
    public readonly statusCode: number;
    public readonly code: ErrorCode;
    public readonly details?: unknown;

    constructor(
        statusCode: number,
        code: ErrorCode,
        message: string,
        details?: unknown
    ){
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.name = "BusinessError";
    }
}