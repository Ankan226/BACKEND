import College from "../models/college.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import slugify from "slugify";

// Search/filter colleges (all parameters required)
export const getFilteredColleges = async (req, res) => {
  try {
    // Accept both lowercase and capitalized query keys
    const country = req.query.country || req.query.Country;
    const Qs_rank = req.query.Qs_rank || req.query.qs_rank;
    const program = req.query.program || req.query.Program;
    const level = req.query.level || req.query.Level;
    const acceptance_rate = req.query.Acceptance_rate|| req.query.acceptance_rate;

    // Require all parameters
    if (!country || !Qs_rank || !program || !level || !acceptance_rate) {
      return res.status(400).json({ message: "All parameters (country, Qs_rank, program, level, acceptance_rate) are required." });
    }

    const filter = {};
    filter.Qs_rank = { $lte: Number(Qs_rank) };
    filter.country = { $regex: new RegExp(`\\b${country}\\b`, 'i') };
    filter.program = { $regex: new RegExp(`\\b${program}\\b`, 'i') };
    filter.level = { $regex: new RegExp(`\\b${level}\\b`, 'i') };

    // Fetch all matching colleges except acceptance_rate
    let colleges = await College.find(filter).lean();

    // Now filter by acceptance_rate in JS
    const rate =Number(String(acceptance_rate).replace(/[^0-9.]/g, ""));
    colleges = colleges.filter(college => {
      const dbRate =Number(String(college.acceptance_rate).replace(/[^0-9.]/g, ""));
      return dbRate <= rate;
    });

    // Convert arrays to comma-separated strings for display
    const formattedColleges = colleges.map(college => ({
      ...college,
      level: Array.isArray(college.level) ? college.level.join(", ") : college.level,
      program: Array.isArray(college.program) ? college.program.join(", ") : college.program,
    }));

    console.log("Colleges found:", formattedColleges);
    res.json(formattedColleges);
  } catch (err) {
    console.error("Error in getFilteredColleges:", err);
    res.status(500).json({ message: "hvjgiibijbibiiib" });
  }
};

// Upload college logo
export const uploadLogo = async (req, res) => {
  try {
    const { country, collegeName } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const folder = country ? `university_logos/${country.toLowerCase()}` : 'university_logos';
    const publicId = collegeName ? slugify(collegeName, { lower: true }) : undefined;

    const secureUrl = await uploadToCloudinary(req.file.buffer, folder, publicId);

    res.json({ message: "Logo uploaded successfully.", url: secureUrl });
  } catch (err) {
    console.error("Error in uploadLogo:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};