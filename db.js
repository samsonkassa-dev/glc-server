import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

export default connectDatabase;