import {RoomMasterModel} from '../models/roomMaster.dao';

const roomMasterModel = new RoomMasterModel();

export class RoomMasterClass {
    createRoomMaster = async (req, res) => {
        try {
            const roomMasterBody = req.body;
            const roomMasterCreated = await roomMasterModel.createRoomMaster(roomMasterBody);
            return res.json({
                room: roomMasterCreated,
                message: "RoomMaster created successfully",

            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };


    roomsAvailable = async (req, res) => {
        try {
            const {checkInDate, checkOutDate} = req.query;
            const rooms = await roomMasterModel.getRoomMaster({
                $and: [
                    {
                        checkOutDate: {$lte: checkInDate}
                    },
                    {
                        checkOutDate: {$lte: checkOutDate}
                    }],
            });
            res.json({
                rooms,
                totalAvailableRooms: rooms.length,
                message: "RoomMasters fetched successfully",
            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };


    getRoomMasters = async (req, res) => {
        try {
            const roomMasters = await roomMasterModel.getRoomMaster(req.query);
            res.json({
                roomMasters,
                key: 'roomMasters',
                message: "RoomMasters fetched successfully",
            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };

    getRoomMaster = async (req, res) => {
        try {
            const roomMaster = await roomMasterModel.getRoomMasterById({_id: req.params.id});
            res.json({
                roomMaster,
                key: 'roomMaster',
                message: "RoomMaster fetched successfully",
            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err})
        }
    };

    updateRoomMaster = async (req, res) => {
        try {
            const {checkInDate, checkOutDate} = req.body;
            const {forceBooking} = req.query;
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const roomMaster = await roomMasterModel.getRoomMasterById({_id: req.params.id});
            debugger;
            if (!roomMaster.checkOutDate || roomMaster.checkOutDate <= today || forceBooking) {
                if (!forceBooking) {
                    if (new Date(checkInDate) < yesterday || new Date(checkOutDate) < yesterday) {
                        return res.json({
                            message: "Checkin/Checkout cannot be less than current date",
                        });
                    } else if (new Date(checkInDate) > new Date(checkOutDate)) {
                        return res.json({
                            message: "Checkout date cannot be less than check in date",
                        });
                    } else if (checkInDate === checkOutDate) {
                        return res.json({
                            message: "checkin and checkout date cannot be same",
                        });
                    }
                }

                const roomMasterUpdated = await roomMasterModel.updateRoomMaster({_id: req.params.id}, {
                    checkInDate,
                    checkOutDate
                });
                return res.json({
                    roomMasterUpdated,
                    message: "Room updated successfully - Your booking is confirmed",
                });
            } else {
                return res.json({
                    message: "This room is full, please check other",
                });
            }

        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };

    removeRoomMaster = async (req, res) => {
        try {
            const roomMaster = await roomMasterModel.deleteRoomMaster({_id: req.params.id});
            res.json({
                roomMaster,
                key: 'roomMaster',
                message: "RoomMaster deleted successfully",
            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };
}

