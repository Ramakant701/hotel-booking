

import mongoose from 'mongoose';
import {autoIncrement} from 'mongoose-plugin-autoinc-fix';
import roomMasterSchema from '../schemas/roomMaster.schema';
export class RoomMasterModel {
    roomMasterModel;

    constructor() {
        roomMasterSchema.statics = {
            create: async function (data) {
                try {
                    const roomMaster = new this(data);
                    return roomMaster.save();
                } catch (e) {
                    throw  e;
                }
            },

            get: function (query, select = 'type checkInDate checkOutDate roomType') {
                try {
                    return this.find(query).select(select);
                } catch (e) {
                    throw  e;
                }
            },

            getById: function (query) {
                try {
                    return this.findOne(query);
                } catch (e) {
                    throw e;
                }
            },

            update: function (query, updateData) {
                try {
                    return this.findOneAndUpdate(query, {$set: updateData}, {new: true});
                } catch (e) {
                    throw  e;
                }
            },
            
            delete: function (query) {
                try {
                    return this.findOneAndDelete(query);
                } catch (e) {
                    throw  e;
                }
            }
        };
        this.setModel();
    };

    setModel() {
        roomMasterSchema.plugin(autoIncrement, 'RoomMaster');
        this.roomMasterModel = mongoose.model('RoomMaster', roomMasterSchema);
    };

    createRoomMaster = (data) => {
        return this.roomMasterModel.create(data);
    };

    getRoomMaster = (query) => {
        return this.roomMasterModel.get(query).lean();
    };

    getRoomMasterById = (query) => {
        return this.roomMasterModel.getById(query).lean();
    };


    updateRoomMaster = (query, data) => {
        return this.roomMasterModel.update(query, data);
    };

    deleteRoomMaster = async (query) => {
        return this.roomMasterModel.delete(query);
    };
}
