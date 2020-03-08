// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCors from '../../../app/middleware/cors';
import ExportErrorHandler from '../../../app/middleware/errorHandler';
import ExportJwt from '../../../app/middleware/jwt';

declare module 'egg' {
  interface IMiddleware {
    cors: typeof ExportCors;
    errorHandler: typeof ExportErrorHandler;
    jwt: typeof ExportJwt;
  }
}
