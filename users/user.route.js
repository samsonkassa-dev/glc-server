import { Router } from 'express';
import { errorCatcher } from '../middleware/error.js';
import { httpCreateUser, httpLoginUser } from './users.controller.js';


const router = Router();

router
  .route('/register')
  .post(errorCatcher(httpCreateUser))

  router
  .route('/login')
  .post(errorCatcher(httpLoginUser))

  export default router
  