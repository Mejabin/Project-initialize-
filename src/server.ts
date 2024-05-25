import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './Shared/logger';
import { Server } from 'http'
import { error } from 'winston';

async function bootstrap() {
  let server : Server
  try {  
    await mongoose.connect(config.database_url as string);
    logger.info('Database is connected successfully');

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect to the database',err)
  }
  process.on('unhandledRejection',error => {
    console.log(
      'There was an unhandled rejection',
    )
  })
    if(Server){
      Server.close(() =>{
        errorLogger.error(error)
        process.exit(1)
      })

    }
  }
 


bootstrap();
process.on('uncaughtException',err =>{
  console.log('uncaught exception is detected we are closing our server')
  process.exit(1)
})

export default bootstrap;
