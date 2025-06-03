import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: 
  { type: String, 
    required: [true,'Please add a name'],
    trim: true,
    maxlength: [20, 'Name cannot be more than 20 characters'],
    minlength: [3, 'Name must be at least 3 characters'],
  },

  email:
   { type: String, 
    required: [true,'Please add an email'],
    trim: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email address'],
    lowercase: true,
    maxlength: [30, 'Email cannot be more than 30 characters'],
    minlength: [10, 'Email must be at least 10 characters']
  },

  password: 
  { type: String,
     required:[true, 'Please add a password'],
     trim: true,},
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;