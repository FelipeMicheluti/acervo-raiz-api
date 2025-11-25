import { Router } from 'express';
import { makeUserController } from '../modules/users/user.controller.js';
import { validate } from '../middlewares/validate.js';
import { loginShema, registerSchema } from '../modules/users/user.schemas.js';


export const authRouter = () => {
  const r = Router();
  const ctrl = makeUserController();

  r.post('/register', validate({ body: registerSchema}), ctrl.register);
  r.post('/login', validate({ body: loginShema }), ctrl.login);
  r.get('/me', ctrl.me); 

  return r;
};