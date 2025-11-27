import morgan from 'morgan';

export const setupLogging = (app) => {
    app.use(morgan(':method :url :status - :response-time ms'));
};
