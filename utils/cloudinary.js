import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import streamifier from 'streamifier';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload to Cloudinary with optional folder and public_id
export const uploadToCloudinary = (buffer, folder = 'university_logos', public_id) => {
  return new Promise((resolve, reject) => {
    const options = { folder };
    if (public_id) options.public_id = public_id;

    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default cloudinary;