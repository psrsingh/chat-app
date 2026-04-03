import mongoose,{Schema, type Document} from "mongoose";    
export interface IMessage extends Document {
    chat: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    text: string;
    updatedAt: Date;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

// indexes for efficient querying
messageSchema.index({ chat: 1, createdAt: -1 }); // for fetching messages in a chat
messageSchema.index({ sender: 1, createdAt: -1 }); // for fetching messages by a sender


const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;  

        