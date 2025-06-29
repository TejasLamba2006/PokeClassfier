import { ImageAnnotatorClient } from "@google-cloud/vision";

const vision = new ImageAnnotatorClient({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
});

export interface PhotoAnalysisResult {
  faces: any[];
  objects: any[];
  colors: any[];
  emotions: any[];
  labels: any[];
  safeSearch: any;
  text: string;
  photoCount: number;
}

export async function analyzePhotosWithGoogleVision(
  files: File[]
): Promise<PhotoAnalysisResult> {
  console.log(`🔍 Analyzing ${files.length} photos with Google Vision AI...`);

  const allFaces: any[] = [];
  const allObjects: any[] = [];
  const allColors: any[] = [];
  const allEmotions: any[] = [];
  const allLabels: any[] = [];
  const allText: string[] = [];
  let safeSearchResult: any = null;

  for (const file of files) {
    try {
      console.log(`📸 Processing ${file.name}...`);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const imageRequest = { image: { content: buffer } };

      try {
        if (vision.faceDetection) {
          const [faceResult] = await vision.faceDetection(imageRequest);
          if (faceResult.faceAnnotations) {
            allFaces.push(...faceResult.faceAnnotations);

            faceResult.faceAnnotations.forEach((face) => {
              const emotions = {
                joy: face.joyLikelihood,
                sorrow: face.sorrowLikelihood,
                anger: face.angerLikelihood,
                surprise: face.surpriseLikelihood,
                underExposed: face.underExposedLikelihood,
                blurred: face.blurredLikelihood,
                headwear: face.headwearLikelihood,
              };
              allEmotions.push(emotions);
            });
          }
        }
      } catch (error) {
        console.log("Face detection not available:", (error as Error).message);
      }

      try {
        if (vision.objectLocalization) {
          const [objectResult] = await vision.objectLocalization(imageRequest);
          if (objectResult.localizedObjectAnnotations) {
            allObjects.push(...objectResult.localizedObjectAnnotations);
          }
        }
      } catch (error) {
        console.log(
          "Object detection not available:",
          (error as Error).message
        );
      }

      try {
        if (vision.imageProperties) {
          const [propertiesResult] = await vision.imageProperties(imageRequest);
          if (
            propertiesResult.imagePropertiesAnnotation?.dominantColors?.colors
          ) {
            allColors.push(
              ...propertiesResult.imagePropertiesAnnotation.dominantColors
                .colors
            );
          }
        }
      } catch (error) {
        console.log(
          "Image properties not available:",
          (error as Error).message
        );
      }

      try {
        if (vision.labelDetection) {
          const [labelResult] = await vision.labelDetection(imageRequest);
          if (labelResult.labelAnnotations) {
            allLabels.push(...labelResult.labelAnnotations);
          }
        }
      } catch (error) {
        console.log("Label detection not available:", (error as Error).message);
      }

      try {
        if (vision.textDetection) {
          const [textResult] = await vision.textDetection(imageRequest);
          const text = textResult.textAnnotations?.[0]?.description ?? "";
          if (text.trim()) {
            allText.push(text);
          }
        }
      } catch (error) {
        console.log("Text detection not available:", (error as Error).message);
      }

      try {
        if (vision.safeSearchDetection) {
          const [safeSearchResult_] = await vision.safeSearchDetection(
            imageRequest
          );
          if (safeSearchResult_.safeSearchAnnotation) {
            safeSearchResult = safeSearchResult_.safeSearchAnnotation;
          }
        }
      } catch (error) {
        console.log("Safe search not available:", (error as Error).message);
      }
    } catch (error) {
      console.error(`Error processing ${file.name}:`, error);
    }
  }

  const processedColors = processColorData(allColors);
  const processedEmotions = processEmotionData(allEmotions);
  const processedObjects = processObjectData(allObjects);
  const processedLabels = processLabelData(allLabels);

  const result: PhotoAnalysisResult = {
    faces: allFaces,
    objects: processedObjects,
    colors: processedColors,
    emotions: processedEmotions,
    labels: processedLabels,
    safeSearch: safeSearchResult,
    text: allText.join(" "),
    photoCount: files.length,
  };
  return result;
}

function processColorData(colors: any[]) {
  const colorMap = new Map();

  colors.forEach((color) => {
    const rgb = color.color;
    const colorName = getColorName(
      rgb?.red || 0,
      rgb?.green || 0,
      rgb?.blue || 0
    );
    const existing = colorMap.get(colorName) || {
      name: colorName,
      score: 0,
      count: 0,
    };
    existing.score += color.score || 0;
    existing.count += 1;
    colorMap.set(colorName, existing);
  });

  return Array.from(colorMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function processEmotionData(emotions: any[]) {
  if (emotions.length === 0) return [];

  const emotionSummary = {
    joy: 0,
    sorrow: 0,
    anger: 0,
    surprise: 0,
    dominant: "neutral",
  };

  emotions.forEach((emotion) => {
    Object.keys(emotionSummary).forEach((key) => {
      if (key !== "dominant" && emotion[key]) {
        const likelihood = emotion[key];
        if (likelihood === "VERY_LIKELY") emotionSummary[key] += 3;
        else if (likelihood === "LIKELY") emotionSummary[key] += 2;
        else if (likelihood === "POSSIBLE") emotionSummary[key] += 1;
      }
    });
  });

  const maxEmotion = Object.entries(emotionSummary)
    .filter(([key]) => key !== "dominant")
    .reduce((a, b) => (a[1] > b[1] ? a : b));

  emotionSummary.dominant = maxEmotion[0];

  return [emotionSummary];
}

function processObjectData(objects: any[]) {
  return objects
    .map((obj) => ({
      name: obj.name,
      confidence: obj.score,
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10);
}

function processLabelData(labels: any[]) {
  return labels
    .map((label) => ({
      description: label.description,
      confidence: label.score,
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 15);
}

function getColorName(r: number, g: number, b: number): string {
  if (r > 200 && g > 200 && b > 200) return "white";
  if (r < 50 && g < 50 && b < 50) return "black";
  if (r > g && r > b) return "red";
  if (g > r && g > b) return "green";
  if (b > r && b > g) return "blue";
  if (r > 150 && g > 150 && b < 100) return "yellow";
  if (r > 150 && g < 100 && b > 150) return "purple";
  if (r > 150 && g > 100 && b < 100) return "orange";
  if (r > 100 && g > 50 && b < 50) return "brown";
  return "gray";
}

export async function analyzeMockPhotos(
  files: File[]
): Promise<PhotoAnalysisResult> {
  console.log("🎭 Using mock photo analysis (Google Vision not configured)");

  const mockEmotions = [
    {
      joy: "LIKELY",
      sorrow: "UNLIKELY",
      anger: "UNLIKELY",
      surprise: "POSSIBLE",
      dominant: "joy",
    },
  ];

  const mockColors = [
    { name: "blue", score: 0.8, count: 3 },
    { name: "white", score: 0.6, count: 2 },
    { name: "black", score: 0.4, count: 1 },
  ];

  const mockObjects = [
    { name: "Person", confidence: 0.95 },
    { name: "Face", confidence: 0.92 },
    { name: "Clothing", confidence: 0.78 },
  ];

  const mockLabels = [
    { description: "Happy", confidence: 0.89 },
    { description: "Smiling", confidence: 0.85 },
    { description: "Portrait", confidence: 0.82 },
    { description: "Person", confidence: 0.95 },
  ];

  return {
    faces: [{ joyLikelihood: "LIKELY" }],
    objects: mockObjects,
    colors: mockColors,
    emotions: mockEmotions,
    labels: mockLabels,
    safeSearch: { adult: "UNLIKELY", violence: "UNLIKELY" },
    text: "",
    photoCount: files.length,
  };
}
