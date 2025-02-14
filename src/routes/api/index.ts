import { Router } from 'express';
import userRouter from './user.routes';
import thoughtRouter from './thoughts.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

export default router;