import jwt, { VerifyCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { Request, Response, NextFunction } from 'express';

// Interfejs rozszerzający Request z Express o pole user
interface AuthRequest extends Request {
  user?: any; // Możesz zdefiniować tutaj dokładniejszy typ dla użytkownika, jeśli jest dostępny
}

const jwksUri = 'http://localhost:8080/realms/nextRealm/protocol/openid-connect/certs';

const client = jwksClient({
  jwksUri,
});

function getKey(header: any, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, getKey, {}, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    // Przypisanie zdekodowanego tokenu do właściwości user w req
    req.user = decoded as any; // Tutaj możesz określić dokładniejszy typ, jeśli to możliwe
    next();
  });
}
