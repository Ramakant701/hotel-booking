

import { Schema } from 'mongoose';
const roomMasterSchema = new Schema({
    roomType: {
      type: String,
    },
    checkInDate: {
        type: Date
    },
    checkOutDate: {
        type: Date
    },
    deleteFlag: {
        type: String,
        trim: true,
        default: 'No'
    },
}, {
    timestamps: true,
});

module.exports = roomMasterSchema;

