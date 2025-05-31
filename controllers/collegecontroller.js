import College from "../models/college.js";
import { uploadToCloudinary } from "../utils/cloudinary.js"; // <-- Import the utility
import slugify from "slugify";


// Search/filter colleges
export const getFilteredColleges = async (req, res) => {
  try {
    const { acceptance_rate, Qs_rank, country, program, level } = req.query;

    const filter = {};

    if (acceptance_rate) filter.acceptance_rate = { $lte: Number(acceptance_rate) };
    if (Qs_rank) filter.Qs_rank = { $lte: Number(Qs_rank) };
    if (country) filter.country = country;
    if (program) filter.program = { $in: [program] };
    if (level) filter.level = level;

    const colleges = await College.find(filter);
    console.log("Colleges found:", colleges);
    res.json(colleges);
  } catch (err) {
    console.error("Error in getFilteredColleges:", err);
    res.status(500).json({ message: "Error fetching colleges" });
  }
};
// Upload college logo
export const uploadLogo = async (req, res) => {
  try {
    const {country, collegeName} = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
      const folder=country ? `university_logos/${country.toLowerCase()}` : 'university_logos';
      const publicId = collegeName ? slugify(collegeName, { lower: true }) : undefined;
      const secureUrl = await uploadToCloudinary(req.file.buffer, folder, publicId);
    res.json({ message: "Logo uploaded successfully.", url: secureUrl });
  }catch (err) {
    console.error("Error in uploadLogo:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};