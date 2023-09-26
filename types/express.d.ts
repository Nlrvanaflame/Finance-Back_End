
interface UserPayload {
    id: string;
    username: string;
}


declare namespace Express {
    export interface Request {
        user?: UserPayload; 
    }
}

interface JWTPayload {
    id: string;
    username: string;
    iat?: number;  // This is the issued at claim (added by JWT itself)
    exp?: number;  // This is the expiration time (might be added depending on your JWT creation options)
}
