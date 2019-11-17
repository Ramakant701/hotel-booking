// import mongoose from 'mongoose';
import config from 'config';

import mongoose from 'mongoose';
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
module.exports = () => {
    mongoose.connect(config.get('DB'));
    const db = mongoose.connection;
    db.on('connected', function () {
        console.log("Mongoose default connection is open to ", config.get('DB'));
        /*mongoose.connection.db.listCollections().toArray(function (err, names) {
            // console.log(names); // [{ name: 'dbname.myCollection' }]
            module.exports.Collection = names;
        });*/
    });
    db.on('error', function (err) {
        console.log("Mongoose default connection has occured " + err + " error");
    });

    db.on('disconnected', function () {
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function () {
        db.close(function () {
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
    process.on('uncaughtException', err => {
        if (err.message === 'MongoDB connection is not recoverable, application restart required') {
            console.log('agenda lose db connection')
        } else {
            process.exit(1)
        }
    });
    return db;
};
