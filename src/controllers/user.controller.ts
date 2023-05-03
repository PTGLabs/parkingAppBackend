import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { updateUserById } from '../services/user.service';
import catchAsync from '../utils/catchAsync';

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await updateUserById(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(result);
});

