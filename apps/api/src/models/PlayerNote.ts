import mongoose, { Document, Schema } from "mongoose";

export interface IPlayerNote extends Document {
  leagueId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  externalPlayerId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const playerNoteSchema = new Schema<IPlayerNote>(
  {
    leagueId: {
      type: Schema.Types.ObjectId,
      ref: "League",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    externalPlayerId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true },
);

playerNoteSchema.index(
  { leagueId: 1, userId: 1, externalPlayerId: 1 },
  { unique: true },
);

export default mongoose.model<IPlayerNote>("PlayerNote", playerNoteSchema);
