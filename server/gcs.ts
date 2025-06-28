"use server";

import { Storage } from "@google-cloud/storage";

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: process.env.GOOGLE_PRIVATE_KEY
    ? {
        type: "service_account",
        project_id: process.env.GOOGLE_CLOUD_PROJECT_ID!,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL!,
        client_id: process.env.GOOGLE_CLIENT_ID,
      }
    : undefined,
});

const bucketName =
  process.env.GOOGLE_CLOUD_STORAGE_BUCKET || "your-bucket-name";
const bucket = storage.bucket(bucketName);

export async function uploadImageToGCS(
  file: Buffer,
  fileName: string,
  contentType: string,
): Promise<string> {
  try {
    // Validate required environment variables
    if (
      !process.env.GOOGLE_CLOUD_PROJECT_ID ||
      !process.env.GOOGLE_PRIVATE_KEY ||
      !process.env.GOOGLE_CLIENT_EMAIL
    ) {
      throw new Error(
        "Missing required Google Cloud Storage environment variables",
      );
    }

    // Create a unique filename with timestamp under artworks folder
    const timestamp = Date.now();
    const date = new Date(timestamp);

    const mm = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1)
    const dd = String(date.getDate()).padStart(2, "0"); // 일
    const yyyy = date.getFullYear(); // 년

    const formattedDate = `${mm}-${dd}-${yyyy}`;

    const userId = crypto.randomUUID();
    const uniqueFileName = `artworks/${userId}/${fileName}-${formattedDate}`;

    const fileUpload = bucket.file(uniqueFileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType,
        cacheControl: "public, max-age=31536000",
        metadata: {
          userId: userId,
        },
      },
      // public: true,
    });

    return new Promise((resolve, reject) => {
      stream.on("error", (error) => {
        console.error("Upload error:", error);
        reject(error);
      });

      stream.on("finish", () => {
        // Make the file publicly accessible
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;
        resolve(publicUrl);
      });

      stream.end(file);
    });
  } catch (error) {
    console.error("Error uploading to GCS:", error);
    throw error;
  }
}
