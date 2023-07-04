import { Document } from 'mongoose';

export interface User extends Document {
    readonly email: string,
    readonly password: string,
    readonly phone: string,
    readonly address: string,
    readonly isVerified: boolean,
    readonly isProvidedPassword: boolean,
    readonly googleId: string,
    readonly facebookId: string,
    readonly name: string,
    readonly type: number,
    readonly thumbnailUrl: string,
    readonly isEarlyAdopter: boolean,
    readonly status: number,
    readonly secretCode: string,
    readonly tokenGenerate: string
}