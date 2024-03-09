import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
} from '../controllers/room.js';

const router = express.Router();

router.post('/:hotelId', verifyAdmin, createRoom);
router.put('/availability/:id', updateRoomAvailability);
router.put('/:id', verifyAdmin, updateRoom);
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);
router.get('/:id', getRoom);
router.get('/', getAllRooms);
export default router;
