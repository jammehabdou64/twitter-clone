import mongoose from "mongoose";

type ConnectionType = {
  isConnected: any;
};

const connection = {} as ConnectionType;

const connect = async () => {
  try {
    if (connection.isConnected) {
      console.log("Already Connected");
      return;
    }
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log("Use previous connection");
        return;
      }

      await mongoose.disconnect();
    }
    // mongoose.connect(process.env.DB_HOST!);
    // const connection = mongoose.connection;
    // connection.on("connected", () => {
    //   console.log("Database conected successfully");
    // });
    // connection.on("error", (err) => {
    //   console.log(
    //     "MongoDB connection error . Please make sure MongoDB is running " + err
    //   );
    //   process.exit();
    // });
    const db = await mongoose.connect(process.env.DB_HOST!);
    console.log("New connection");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("Something went wrong");
  }
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    }
  }
};

export { connect, disconnect };
