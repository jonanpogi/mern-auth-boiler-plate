import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

export type IUsers = {
  _id: string;
  googleId: string;
  displayName: string;
  name: {
    givenName: string;
    familyName: string;
  };
  role: 'admin' | 'super_admin' | 'user';
  email: string;
  asset: {type: string; signedUrl: string; alias: string}[];
  isArchived: boolean;
  metaData: any[];
} & mongoose.Document;

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUsers>(
  {
    _id: {type: String, required: true, default: uuidv4},
    googleId: {type: String, required: true},
    displayName: {type: String, required: true},
    name: {
      givenName: {type: String, required: true},
      familyName: {type: String, required: true},
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'super_admin', 'user'],
    },
    email: {type: String, required: true},
    asset: [
      {
        type: {type: String, required: true},
        signedUrl: {type: String, required: true},
        alias: {type: String, required: true},
      },
    ],
    isArchived: {type: Boolean, required: true, default: false},
    metaData: Schema.Types.Mixed,
  },
  {timestamps: true, collection: 'users'},
);

const Users = mongoose.model<IUsers>('users', UserSchema);

export default Users;
