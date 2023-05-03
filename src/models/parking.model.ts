import mongoose, { Document, Schema } from "mongoose";
import { toJSON, paginate } from "./plugins";

interface IParking extends Document {
  area: string;
  spot: string;
  booked: Boolean;
}

const parkingSchema: Schema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: true,
    },
    spot: {
      type: String,
      required: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
   
  },
  {
    timestamps: true,
  }
);


parkingSchema.plugin(toJSON);
parkingSchema.plugin(paginate);

export const Parking = mongoose.model<IParking>("parking", parkingSchema);

