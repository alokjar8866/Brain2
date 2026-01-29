export {}; //To ensure that it is treated as module, avoiding global conflict
import { Request } from 'express';

declare global {
    namespace Express {
        export interface Request{
            userId : string;    //It adds optional 'userId' property to the Request Project
        }
    }
}