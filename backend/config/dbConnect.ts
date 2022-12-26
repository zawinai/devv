import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_ACCESS as string);
    useUnifiedTopology: true;
    useNewUrlParser: true;
  } catch (e) {}
};
