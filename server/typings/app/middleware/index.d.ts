// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Jsonerror from '../../../app/middleware/jsonerror';

declare module 'egg' {
  interface IMiddleware {
    jsonerror: typeof Jsonerror;
  }
}
