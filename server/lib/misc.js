const User = require('../models/User');
const connectDB = require('../configs/db');

const misc = {};

misc.resetCredits = async () => {
    try {
        await connectDB();
        const user = await User.updateMany({}, { $set: { credit: 30 } }, {new: true});
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

module.exports = misc;