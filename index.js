import express from 'express';
import mongoose from 'mongoose';
import allRoutes from "./routes/index.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', allRoutes)

mongoose.connect('mongodb+srv://vinaybadgujar102:Badgujar%40102@cluster0.ip6ahsy.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "TransformX2"
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
