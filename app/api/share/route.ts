import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const ShareEventSchema = z.object({
  pokemonId: z.number(),
  pokemonName: z.string(),
  confidence: z.number().min(0).max(1),
  shareMethod: z.enum(["native", "clipboard"]),
  photoCount: z.number().min(1).max(5),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const shareEvent = ShareEventSchema.parse(body);

    await db.analysisResult.create({
      data: {
        userId: (session.user as any).id,
        results: {
          type: "share_event",
          pokemon: {
            id: shareEvent.pokemonId,
            name: shareEvent.pokemonName,
          },
          confidence: shareEvent.confidence,
          shareMethod: shareEvent.shareMethod,
          photoCount: shareEvent.photoCount,
          timestamp: new Date().toISOString(),
        },
        processingTime: 0,
        fileCount: shareEvent.photoCount,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Share event tracked",
    });
  } catch (error) {
    console.error("Share tracking error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to track share event",
      },
      { status: 500 }
    );
  }
}
