import express from 'express';
import cors from "cors";
import { StatusCodes } from 'http-status-codes';

const serverConfig = process.env;

export const startServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded( { limit: '300mb', extended: true } ))

    app.use(
        cors({
          origin: '*'
        })
    );

    app.get('/', ( _, res ) => {
        res.status(StatusCodes.OK).send('ok');
    })

    const PORT = serverConfig.PORT;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}