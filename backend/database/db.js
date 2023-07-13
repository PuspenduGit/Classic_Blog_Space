import mongoose from "mongoose";

const Connection = async (URL) => {
  try {
    console.log('Connecting to database');
    await mongoose.connect(URL, { useNewUrlParser: true});
    console.log('Database connected successfully');
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};

export default Connection;
