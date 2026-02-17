// Cloudinary configuration and upload helpers
// Uses unsigned uploads for simplicity

// TODO: Replace with your Cloudinary cloud name
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "YOUR_UPLOAD_PRESET";

export const isCloudinaryConfigured = CLOUD_NAME !== "YOUR_CLOUD_NAME";

// Cloudinary base URL
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  width: number;
  height: number;
  duration?: number;
}

/**
 * Upload a file to Cloudinary using unsigned upload
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = "portfolio"
): Promise<CloudinaryUploadResponse> {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  const resourceType = file.type.startsWith("video/") ? "video" : "image";
  const endpoint = `${CLOUDINARY_URL}/${resourceType}/upload`;

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to upload to Cloudinary");
  }

  return response.json();
}

/**
 * Generate optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "jpg" | "png";
  } = {}
): string {
  if (!url.includes("cloudinary.com")) return url;

  const { width, height, quality = 80, format = "auto" } = options;
  const transforms: string[] = [];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`);
  transforms.push("c_fill");

  const transformString = transforms.join(",");

  // Insert transformations into URL
  return url.replace("/upload/", `/upload/${transformString}/`);
}

/**
 * Generate video thumbnail URL
 */
export function getVideoThumbnail(
  videoUrl: string,
  options: {
    width?: number;
    height?: number;
  } = {}
): string {
  if (!videoUrl.includes("cloudinary.com")) return videoUrl;

  const { width = 800, height } = options;
  const transforms: string[] = [];

  transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  transforms.push("c_fill");
  transforms.push("so_0"); // Start at 0 seconds

  const transformString = transforms.join(",");

  // Convert video URL to image thumbnail
  return videoUrl
    .replace("/video/upload/", `/video/upload/${transformString}/`)
    .replace(/\.[^.]+$/, ".jpg");
}
