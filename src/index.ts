import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import routes from './routes/index';


dotenv.config();
const app = express();

let server;

if (process.env.MONGODB_URL) {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to Development MongoDB",process.env);
    server = app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  });
} else {
  console.error("MONGODB_URL not defined in environment variables");
}

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);
