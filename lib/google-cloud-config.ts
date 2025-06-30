import { ImageAnnotatorClient } from "@google-cloud/vision";

let visionClient: ImageAnnotatorClient | null = null;

export function getGoogleVisionClient(): ImageAnnotatorClient | null {
  if (visionClient) {
    return visionClient;
  }

  try {
    // Method 1: Use base64 encoded service account key from environment variable
    if (process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64) {
      const credentials = JSON.parse(
        Buffer.from(
          process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64,
          "base64"
        ).toString("utf-8")
      );

      visionClient = new ImageAnnotatorClient({
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        credentials,
      });

      console.log("✅ Google Vision initialized with base64 credentials");
      return visionClient;
    }

    // Method 2: Use JSON string from environment variable
    if (process.env.GOOGLE_CLOUD_CREDENTIALS_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS_JSON);

      visionClient = new ImageAnnotatorClient({
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        credentials,
      });

      console.log("✅ Google Vision initialized with JSON credentials");
      return visionClient;
    }

    // Method 3: Use key file path (local development only)
    if (
      process.env.GOOGLE_CLOUD_KEY_FILE &&
      process.env.NODE_ENV === "development"
    ) {
      visionClient = new ImageAnnotatorClient({
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
      });

      console.log("✅ Google Vision initialized with key file (development)");
      return visionClient;
    }

    // Method 4: Use Application Default Credentials (for Google Cloud deployment)
    if (process.env.GOOGLE_CLOUD_PROJECT_ID) {
      visionClient = new ImageAnnotatorClient({
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      });

      console.log(
        "✅ Google Vision initialized with Application Default Credentials"
      );
      return visionClient;
    }

    console.log("⚠️ No Google Cloud credentials found, using fallback OCR");
    return null;
  } catch (error) {
    console.error("❌ Failed to initialize Google Vision client:", error);
    return null;
  }
}

export function isGoogleVisionAvailable(): boolean {
  return getGoogleVisionClient() !== null;
}
