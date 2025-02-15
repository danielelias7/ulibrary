import { Router } from 'express';
import { signup, login, logout } from '../controllers/authController';

const router = Router();

router.post('/signup', async (req, res, next) => {
    try {
      await signup(req, res);
    } catch (err) {
      next(err);
    }
  });
  
  router.post('/login', async (req, res, next) => {
    try {
      await login(req, res);
    } catch (err) {
      next(err);
    }
  });

  router.post('/logout', async (req, res, next) => {
    try {
      await logout(req, res);
    } catch (err) {
      next(err);
    }
  });

export default router;