import express from 'express';
import mongoose from 'mongoose';
import allRoutes from "./routes/index.js"
import dotenv from "dotenv";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const {MONGO_URI} = process.env
export const SECRET = process.env.JWT_SECRET;

app.use(express.json());

app.use('/', allRoutes)

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "TransformX2"
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
