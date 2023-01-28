import { Router } from 'express';
import mongoose from 'mongoose';
import { errorCatcher } from './error.js';
import cors from 'cors';

const accSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phoneNumber:{
      type: String,
      required: true,
    },

    city:String,
    subCity: String,
    educationLevel: String,
    schoolName: String,
    fieldofStudy: String,
    whatWork: String,
    placeWork: String,
    whereWork: String,

  },
  {
    timestamps: true,
  }
);

const AccModel = mongoose.model('Acc', accSchema);

async function registerAcc(req, res) {
  await AccModel.create({ ...req.body });
  res.status(200).json({ message: 'success' });
}

const router = Router();

router.route('/acc').post(cors(),errorCatcher(registerAcc));

export default router;
