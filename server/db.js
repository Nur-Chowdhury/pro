import mongoose from "mongoose";

const connectTODB = async () => {
    // console.log(process.env.MONGO_URI);

    try {
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`conntected to: ${connect.connection.host}`)
    } catch (error) {
        console.log(`error:${error.message}`);
    }
}

export default connectTODB;