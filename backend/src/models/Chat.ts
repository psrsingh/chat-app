import mongoose,{Schema,type Document} from "mongoose";

export interface IChat extends Document {
    participants: mongoose.Types.ObjectId[];
    lastMessage?: mongoose.Types.ObjectId;  
    lastMessageAt?: Date;
    updatedAt: Date;
    createdAt: Date;
}

const chatSchema = new Schema<IChat>({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null,
    },
    lastMessageAt: {
        type: Date,
        default: Date.now,

    },
}, {
    timestamps: true,
});

const Chat = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;