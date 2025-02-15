import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface Payload {
  id: string;
}

const createToken = (payload: Payload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' }, (err, token) => {
      if (err) {
        console.error(err);
        reject('Could not create token');
      } else {
        resolve(token as string);
      }
    });
  });
}

export {
  createToken
};