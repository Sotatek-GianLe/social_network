import { Schema, model, Document } from "mongoose";
import { GLOBAL_STATUS, USER_TYPE } from "../constant/common.constants";

export interface IUserModel extends Document {
  email: string;
  password: string;
  phone: string;
  address: string;
  isVerified: boolean;
  isProvidedPassword: boolean;
  googleId: string;
  facebookId: string;
  name: string;
  type: number;
  thumbnailUrl: string;
  isEarlyAdopter: boolean;
  status: number;
  secretCode: string;
  tokenGenerate: string;
}

const UserModel = () => {
  const schema: Schema = new Schema<IUserModel>(
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
      },
      isVerified: { type: Boolean, default: false },
      isProvidedPassword: {
        type: Boolean,
        default: true,
      },
      name: {
        type: String,
      },
      googleId: {
        type: String,
      },
      facebookId: {
        type: String,
      },
      thumbnailUrl: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
      isEarlyAdopter: {
        type: Boolean,
        default: false,
      },
      type: {
        type: Number,
        default: USER_TYPE.USER,
      },
      status: {
        type: Number,
        default: GLOBAL_STATUS.ACTIVE,
      },
      secretCode: {
        type: String,
      },
      tokenGenerate: {
        type: String,
      },
    },
    { timestamps: true },
  );

  schema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
  return model<IUserModel>("user", schema);
};

export default UserModel;
