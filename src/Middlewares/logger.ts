import { createLogger, format, transports } from 'winston';
import { NextFunction, Request, Response } from 'express';

const myFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ::: ${level} ::: ${message}}`;
});

const customLogger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.splat(), myFormat),
  defaultMeta: { service: 'Image-Processing-API' },
  transports: [
    new transports.File({ filename: 'logs/api-logs.log' }),
    new transports.File({ filename: 'logs/api-errors.log', level: 'error' }),
    new transports.Console()
  ]
});

const infoLoggerMW = (req: Request, res: Response, next: NextFunction) => {
  customLogger.info(`${JSON.stringify(req.query)}`);
  next();
};

export { infoLoggerMW };
