import { Schema, model } from 'mongoose';
     import bcrypt from 'bcryptjs';


     interface IUser {
       name: string;
       email: string;
       password: string;
     }
     const userSchema = new Schema<IUser>({
       name: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
     });

     userSchema.pre('save', async function (next) {
       if (this.isModified('password')) {
         this.password = await bcrypt.hash(this.password, 10);
       }
       next();
     });

     const User = model<IUser>('User', userSchema);

     export default User;


