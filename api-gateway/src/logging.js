import morgan from 'morgan';

const setupLogging = (app) => {
    app.use(morgan(':method :url :status - :response-time ms'));
};

export { setupLogging };
