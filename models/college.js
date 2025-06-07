import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  
university: String,
  acceptance_rate:String,
  Qs_rank: Number,
  country: String,
  program: String,
  level: String,
  logoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const college = mongoose.model("College", collegeSchema);
export default college;