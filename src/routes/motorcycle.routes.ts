import express from 'express';
import { MotorcycleController } from '../routes/motorcycle.controller';

const router = express.Router();

router.get('/', MotorcycleController.getAll);
router.get('/:id', MotorcycleController.getById);
router.post('/', MotorcycleController.create);
router.put('/:id', MotorcycleController.update);
router.delete('/:id', MotorcycleController.delete);

export default router;
