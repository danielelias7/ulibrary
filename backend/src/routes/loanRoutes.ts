import { Router } from 'express';
import { checkoutBook, getUserLoans, returnUserBook } from '../controllers/loanController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/checkout', verifyToken, async (req, res, next) => {
  try {
    await checkoutBook(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/myloans', verifyToken, async (req, res, next) => {
  try {
    await getUserLoans(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/return', verifyToken, async (req, res, next) => {
  try {
    await returnUserBook(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;