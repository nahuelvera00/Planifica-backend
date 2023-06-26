import mongoose, { Schema } from "mongoose";
import { GroupProps } from "../types/types";

const groupSchema = new Schema<GroupProps>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    schedules: [
        {
            day: { type: String, required: true, trim: true },
            startTime: { type: String, required: true, trim: true },
            endTime: { type: String, required: true, trim: true }
        }
    ]
})

const GroupModel = mongoose.model<GroupProps>("Group", groupSchema)

export default GroupModel;