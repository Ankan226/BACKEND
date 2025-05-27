import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  
university: String,
  acceptance_rate: Number,
  Qs_rank: Number,
  country: String,
  program: [String],
  level: String,
  logoUrl: String
});

const college = mongoose.model("College", collegeSchema);
export default college;