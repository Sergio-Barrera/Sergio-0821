import express from 'express'
import paymentRoutes from './routes/paymentRoutes.ts'
import { errorHandler }  from "./middleware/errorHandler.ts"
import cors from 'cors'

export function appCreate(){
    const app=express();

    app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));
    app.use(express.json());
    app.use((req, _res, next) => {
        console.log(`[${req.method}] ${req.url}`)
        next();
    })

    app.use("/api", paymentRoutes);
    
    app.use(errorHandler)
    return app;
}
