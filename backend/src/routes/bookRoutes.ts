import { Router } from 'express';
import { AddNew, getAll as getAll, getById, checkoutBook, returnBook } from '../controllers/bookController';
import { verifyToken, isLibrarian } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, isLibrarian, async (req, res, next) => {
  try {
    await AddNew(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    await getAll(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await getById(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
