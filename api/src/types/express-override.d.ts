import * as core from "express-serve-static-core";
import { Query } from "express-serve-static-core";
declare global {
    namespace express {
        export interface Request extends core.Request {
            query: Query;
        }
        export interface Response extends core.Response {
            status: (code: number) => this;
        }
    }
}
