import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadOnCloudinary = async (localFilePath) => {

  console.log("Cloudinary Config >>>", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing",
  });
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //File has been upload successfully

    console.log("File is uploaded on cloudinary", response.secure_url);

    return response;
  } catch (error) {
     console.error("Cloudinary upload failed:", error);
    console.error("❌ Cloudinary upload error:", error.message);
    // fs.unlinkSync(localFilePath);
    //remove the locally saved temporary file as the upload operation is failed
     if (fs.existsSync(localFilePath)) {
       fs.unlinkSync(localFilePath);
     }
    return null;
  }
};

export default uploadOnCloudinary
