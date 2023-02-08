import mongoose, { Document, Schema } from 'mongoose';
export interface IArtist {
  name: string;
  email: string;
  password: string;
  gender: string;
  bio: string;
  nationality: string;
  smartContractNumber: string[];
}

export interface IArtistModel extends IArtist, Document {}

const ArtistSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,  },
    gender: { type: String, required: false },
    bio: { type: String, required: false },
    nationality: { type: String, required: false },
    smartContractNumber: { type: Array, default: [] },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IArtistModel>('Artist', ArtistSchema);
