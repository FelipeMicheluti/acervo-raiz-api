import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js'
import { authRouter } from './routes/auth.routes.js';
import { reportRouter} from './routes/report.routes.js';
import { categoryRouter } from './routes/category.routes.js';



export const createApp = () => {
    const app = express();

    
    app.use(express.json());
    app.use(helmet());
    app.use(cors({ origin: env.corsOrigin }));
    app.use(rateLimit({ windowMs: 60_000, max: 100 }));


    app.get('/health', (_request, response) => response.json({ ok: true }));

    
    app.use('/auth', authRouter());
    app.use('/reports', reportRouter());
    app.use('/category', categoryRouter());

    app.use(errorHandler);

    return app;
};