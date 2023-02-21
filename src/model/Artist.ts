import mongoose, { Document, Schema } from 'mongoose';
export interface IArtist {
  name: string;
  email: string;
  password: string;
  pronouns: string;
  bio: string;
  country: string;
  smartContractNumber: string[];
}

export interface IArtistModel extends IArtist, Document {}

const ArtistSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pronouns: { type: String, required: false },
    bio: { type: String, required: false },
    country: { type: String, required: false },
    smartContractNumber: { type: Array, default: [] },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IArtistModel>('Artist', ArtistSchema);
