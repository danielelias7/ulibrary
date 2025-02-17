import { Router } from 'express';
import { createUserController } from '../controllers/userController';
import { isLibrarian, verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create', verifyToken, isLibrarian, async (req, res, next) => {
  try {
    await createUserController(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;