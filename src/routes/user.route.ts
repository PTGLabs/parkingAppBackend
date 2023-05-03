import express from 'express';
import { updateUser} from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/:id').patch(updateUser);

export default userRouter;