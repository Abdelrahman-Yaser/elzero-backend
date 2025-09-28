import * as winston from 'winston';
import * as dotenv from 'dotenv';

dotenv.config();

const dateFormat = () => new Date(Date.now()).toLocaleString();

export class LoggerService {
  private readonly logger: winston.Logger;

  constructor(private readonly route: string) {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: dateFormat }),
        winston.format.printf((info) => {
          return `${String(info.timestamp)} [${info.level.toUpperCase()}] (${this.route}): ${String(info.message)}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${process.env.LOG_FILE_PATH}/${this.route}.log`,
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
