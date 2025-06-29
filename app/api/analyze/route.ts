import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  analyzePhotosWithGoogleVision,
  analyzeMockPhotos,
} from "@/lib/photo-analysis";
import { analyzePhotosForPokemonMatch } from "@/lib/photo-ai";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const dailyLimit = 5;
    if (!dbUser.isPremium && dbUser.usageCount >= dailyLimit) {
      return NextResponse.json(
        {
          error: "Daily usage limit exceeded",
          message: `Free users can analyze ${dailyLimit} photos per day. Join our Discord for unlimited access!`,
          isPremium: false,
          usageCount: dbUser.usageCount,
          limit: dailyLimit,
        },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const files: File[] = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file-") && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No photos provided" },
        { status: 400 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 photos allowed" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      return NextResponse.json(
        {
          error: "Only image files (JPEG, PNG, WebP) are allowed",
        },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    console.log(`📸 Starting photo analysis for ${files.length} photos...`);

    const photoAnalysis =
      process.env.GOOGLE_CLOUD_PROJECT_ID && process.env.GOOGLE_CLOUD_KEY_FILE
        ? await analyzePhotosWithGoogleVision(files)
        : await analyzeMockPhotos(files);

    const pokemonMatch = await analyzePhotosForPokemonMatch(photoAnalysis);
    const processingTime = (Date.now() - startTime) / 1000;

    await db.user.update({
      where: { id: user.id },
      data: { usageCount: { increment: 1 } },
    });

    await db.analysisResult.create({
      data: {
        userId: user.id,
        results: pokemonMatch,
        processingTime,
        fileCount: files.length,
      },
    });

    return NextResponse.json({
      match: {
        pokemon: pokemonMatch.pokemon,
        confidence: pokemonMatch.confidence,
        reasoning: pokemonMatch.reasoning,
        visualTraits: pokemonMatch.traits ?? [],
        personalityTraits: pokemonMatch.visualSimilarities ?? [],
      },
      photoAnalysis: {
        facialExpressions: (photoAnalysis.faces ?? []).map(
          (face: any) => face.expression ?? "neutral"
        ),
        emotions: (photoAnalysis.emotions ?? []).map((emotion: any) => ({
          emotion: emotion.emotion ?? "unknown",
          confidence: emotion.confidence ?? 0,
        })),
        visualStyle: (photoAnalysis.labels ?? [])
          .map((label: any) => label.description ?? "")
          .filter(Boolean),
        colors: (photoAnalysis.colors ?? []).map((color: any) => ({
          color: color.color ?? "unknown",
          prominence: color.prominence ?? 0,
        })),
        objects: (photoAnalysis.objects ?? [])
          .map((obj: any) => obj.name ?? "")
          .filter(Boolean),
        mood: "neutral",
      },
      summary: `Analysis based on ${files.length} ${
        files.length === 1 ? "photo" : "photos"
      }`,
      processingTime,
      photoCount: files.length,
    });
  } catch (error) {
    console.error("Photo analysis error:", error);
    return NextResponse.json(
      { error: "Photo analysis failed" },
      { status: 500 }
    );
  }
}
