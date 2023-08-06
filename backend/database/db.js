import mongoose from "mongoose";

const Connection = (URL) => {
  try {
    console.log('Connecting to database');
    mongoose.connect(URL, { useNewUrlParser: true });
    console.log('Database connected successfully');
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};

export default Connection;
