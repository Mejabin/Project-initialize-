import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './Shared/logger';

async function bootstrap() {
  try {
    logger.info('Connecting to the database...');
    await mongoose.connect(config.database_url as string);
    logger.info('Database is connected successfully');

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect to the database', { message: (err as Error).message, stack: (err as Error).stack });
    process.exit(1); 
  }
}

bootstrap();

export default bootstrap;
