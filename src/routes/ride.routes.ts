import express from 'express';
import { RideController } from '../routes/ride.controller';

const router = express.Router();

router.get('/', RideController.getAll);
router.get('/:id', RideController.getById);
router.post('/', RideController.create);
router.put('/:id', RideController.update);
router.delete('/:id', RideController.delete);

export default router;
