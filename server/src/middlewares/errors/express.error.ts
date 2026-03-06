import { isCelebrateError } from 'celebrate'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from "http-status-codes"

export class ExpressException extends Error {
    constructor(message: string, public status: StatusCodes) {
        super(message)
    }
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ExpressException) {
        return res.status(error.status).json({ message: error.message })
    }
    if (isCelebrateError(error)) {
        const messages = (error.details.get('params') ?? error.details.get('body') ?? error.details.get('query'))
            .details.map((error: any) => {
                return error.message
            })

        return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: messages })
            .end()
    }
    
    return res.status(StatusCodes.NOT_FOUND).json({ message: error.message })
}