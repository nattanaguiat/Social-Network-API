import mongoose from 'mongoose';

// TODO: Add route
const connectDB = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/social_networkdb');
        console.log(">>> DB is connected")
    } catch (error) {
        console.log(error)
    }
}
// Exporting connection to mongoose
export default connectDB;