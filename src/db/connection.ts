import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.DB_HOST!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database conected successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error . Please make sure MongoDB is running " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};
