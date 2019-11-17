

import { RoomMasterClass } from '../controllers/roomMaster.controller';
import { Router } from 'express';

const router = new Router();
const roomMaster = new RoomMasterClass();

router.post('/create', roomMaster.createRoomMaster);
router.get('/get', roomMaster.getRoomMasters);
router.get('/available-rooms', roomMaster.roomsAvailable);
router.get('/get/:id', roomMaster.getRoomMaster);
router.put('/update/:id', roomMaster.updateRoomMaster);
router.delete('/remove/:id', roomMaster.removeRoomMaster);
module.exports = router;
