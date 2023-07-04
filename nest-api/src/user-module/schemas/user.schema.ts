import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    phone: String,
    address: String,
    isVerified: Boolean,
    isProvidedPassword: Boolean,
    googleId: String,
    facebookId: String,
    name: String,
    type: Number,
    thumbnailUrl: String,
    isEarlyAdopter: Boolean,
    status: Number,
    secretCode: String,
    tokenGenerate: String
});