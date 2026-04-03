import mongoose,{Schema, type Document} from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  clerkId: string;
  updatedAt: Date;
  createdAt: Date;
  avatar?: string;

}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
        lowercase: true,
        trim: true,
  },
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },

 

  avatar: {
    type: String,
    default: "", 
},
},

 {
    timestamps: true,
  }
  

);

const User = mongoose.model<IUser>("User", userSchema);

export default User; 