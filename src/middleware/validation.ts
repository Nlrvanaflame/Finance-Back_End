// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';

// const SECRET = "m06tenden0n06ten";

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(403).send({ message: "No token provided!" });
//     }

//     jwt.verify(token, SECRET, (err: any, user: any) => {
//         if (err) {
//             return res.status(401).send({ message: "Unauthorized!" });
//         }
//         req.user = user;  
//         next();
//     });
// };
