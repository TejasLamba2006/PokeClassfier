import { z } from "zod";

export const ShareDataSchema = z.object({
  title: z.string().min(1).max(200),
  text: z.string().min(1).max(500),
  url: z.string().url(),
});

export type ShareData = z.infer<typeof ShareDataSchema>;

export const PokemonShareResultSchema = z.object({
  pokemonName: z.string(),
  pokemonId: z.number().min(1),
  confidence: z.number().min(0).max(1),
  matchedTraits: z.array(z.string()),
  visualTraits: z.array(z.string()),
  analysisTimestamp: z.string().datetime(),
  photoCount: z.number().min(1).max(5),
});

export type PokemonShareResult = z.infer<typeof PokemonShareResultSchema>;

export function createShareData(result: {
  match: {
    pokemon: { name: string; id: number };
    confidence: number;
    visualTraits: string[];
    personalityTraits: string[];
  };
  photoCount: number;
}): ShareData {
  const confidencePercent = Math.round(result.match.confidence * 100);
  const confidenceLevel =
    result.match.confidence > 0.8
      ? "perfect"
      : result.match.confidence > 0.6
      ? "great"
      : "good";

  const shareData: ShareData = {
    title: "My Pokémon Twin - Photo Personality Analysis",
    text: `I just discovered my Pokémon twin! I'm a ${confidenceLevel} match with ${
      result.match.pokemon.name
    }! 🎯 ${confidencePercent}% compatibility based on ${result.photoCount} ${
      result.photoCount === 1 ? "photo" : "photos"
    }. Try it yourself!`,
    url:
      typeof window !== "undefined"
        ? window.location.origin
        : "https://pokeclassifier.tejaslamba.com",
  };

  return ShareDataSchema.parse(shareData);
}

export function formatShareResult(result: {
  match: {
    pokemon: { name: string; id: number };
    confidence: number;
    visualTraits: string[];
    personalityTraits: string[];
  };
  photoCount: number;
}): PokemonShareResult {
  const shareResult: PokemonShareResult = {
    pokemonName: result.match.pokemon.name,
    pokemonId: result.match.pokemon.id,
    confidence: result.match.confidence,
    matchedTraits: result.match.personalityTraits,
    visualTraits: result.match.visualTraits,
    analysisTimestamp: new Date().toISOString(),
    photoCount: result.photoCount,
  };

  return PokemonShareResultSchema.parse(shareResult);
}

export async function shareResults(
  shareData: ShareData,
  pokemonData?: {
    pokemonId: number;
    pokemonName: string;
    confidence: number;
    photoCount: number;
  }
): Promise<"shared" | "copied" | "failed"> {
  try {
    const validatedData = ShareDataSchema.parse(shareData);
    let shareMethod: "native" | "clipboard" = "clipboard";

    if (navigator.share && navigator.canShare?.(validatedData)) {
      await navigator.share(validatedData);
      shareMethod = "native";

      if (pokemonData) {
        trackShareEvent({
          ...pokemonData,
          shareMethod,
        }).catch(console.error);
      }

      return "shared";
    }

    const shareText = `${validatedData.text}\n\n${validatedData.url}`;
    await navigator.clipboard.writeText(shareText);

    if (pokemonData) {
      trackShareEvent({
        ...pokemonData,
        shareMethod,
      }).catch(console.error);
    }

    return "copied";
  } catch (error) {
    console.error("Share failed:", error);

    try {
      const fallbackText = `${shareData.text}\n\n${shareData.url}`;
      await navigator.clipboard.writeText(fallbackText);
      return "copied";
    } catch (clipboardError) {
      console.error("Clipboard fallback also failed:", clipboardError);
      return "failed";
    }
  }
}

async function trackShareEvent(data: {
  pokemonId: number;
  pokemonName: string;
  confidence: number;
  photoCount: number;
  shareMethod: "native" | "clipboard";
}): Promise<void> {
  try {
    await fetch("/api/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Failed to track share event:", error);
  }
}
