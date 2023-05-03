import mongoose, { Document, Schema } from "mongoose";
import { toJSON, paginate } from "./plugins";

interface IBooking extends Document {
  area: string;
  spot: string;
  startTime: string;
  endTime: string;
  duration: string;
}

const bookingSchema: Schema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: false,
    },
    spot: {
      type: String,
      required: false,
    },
    startTime: {
      type: String,
      required: false,
    },
    endTime: {
      type: String,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

interface IUser extends Document {
  email: string;
  password: string;
  bookings?: IBooking[];
}

const userSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookings: {
      type: [bookingSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

export const User = mongoose.model<IUser>("user", userSchema);

