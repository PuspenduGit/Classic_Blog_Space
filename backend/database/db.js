import mongoose from "mongoose";

const Connection = (URL) => {
  try {
    console.log("Connecting to database");
    mongoose
      .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(
        () => {
          console.log("Database connected successfully");
        },
        (error) => {
          console.log("Database could not be connected : " + error);
        }
      );
  } catch (error) {
    console.log("Error: " + error);
  }
};

export default Connection;
