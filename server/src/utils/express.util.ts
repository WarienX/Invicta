import { Request, NextFunction, Response } from 'express'

export const requestHandler = (
    fn: ( req: Request, res: Response, next?: NextFunction ) => Promise<any> | any
) => {
    return async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            await fn( req, res, next )
        } catch ( error ) {
            const env = process.env[ 'NODE_ENV' ] || 'development'
            if ( env === 'development' ) console.error( error )
            next( error )
        }
    }
}