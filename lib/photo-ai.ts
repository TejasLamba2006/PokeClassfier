import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { pokemonDatabase } from "./pokemon-data";
console.log(pokemonDatabase.length, " Pokémon in database");
const PersonalityAnalysisSchema = z.object({
  visualTraits: z.object({
    facialExpression: z
      .string()
      .describe("Primary facial expression (happy, serious, playful, etc.)"),
    eyeExpression: z
      .string()
      .describe("Eye expression (bright, intense, gentle, mischievous, etc.)"),
    overallVibe: z
      .string()
      .describe("Overall personality vibe from the photos"),
    energyLevel: z
      .enum(["low", "medium", "high"])
      .describe("Perceived energy level"),
    approachability: z
      .enum(["shy", "neutral", "outgoing"])
      .describe("How approachable the person seems"),
  }),
  personalityTraits: z
    .array(z.string())
    .describe("Inferred personality traits from visual analysis"),
  colorPreferences: z
    .array(z.string())
    .describe(
      "Dominant colors in clothing/background that might indicate preferences"
    ),
  lifestyle: z
    .string()
    .describe("Inferred lifestyle from photo settings and context"),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe("Confidence score of the analysis"),
});

const PokemonMatchSchema = z.object({
  pokemonId: z.number(),
  confidence: z.number(),
  reasoning: z.string(),
  matchedTraits: z.array(z.string()),
  visualSimilarities: z
    .array(z.string())
    .describe("Visual similarities (colors, expression, energy, etc.)"),
});

export async function analyzePhotosForPokemonMatch(photoAnalysis: {
  faces: any[];
  objects: any[];
  colors: any[];
  emotions: any[];
  photoCount: number;
}) {
  try {
    console.log("🔍 Starting AI photo analysis for Pokémon matching...");

    const { object: personalityAnalysis } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: PersonalityAnalysisSchema,
      prompt: `
        Analyze these photos to determine SPECIFIC and UNIQUE personality traits for Pokémon matching.
        
        Photo Analysis Data:
        - Number of photos: ${photoAnalysis.photoCount}
        - Detected faces: ${photoAnalysis.faces.length}
        - Facial emotions detected: ${JSON.stringify(photoAnalysis.emotions)}
        - Objects in photos: ${JSON.stringify(photoAnalysis.objects)}
        - Dominant colors: ${JSON.stringify(photoAnalysis.colors)}
        
        ANALYSIS REQUIREMENTS:
        1. **Be Specific**: Avoid generic traits like "friendly" - use specific descriptors
        2. **Look for Uniqueness**: Find distinctive personality combinations
        3. **Consider Context**: Photo settings reveal lifestyle and preferences
        4. **Micro-expressions**: Notice subtle facial cues that reveal deeper personality
        5. **Consistency Check**: Look for patterns across multiple photos
        
        Analyze for:
        - **Facial Expression**: Primary expression (contemplative, mischievous, determined, gentle, etc.)
        - **Eye Expression**: Eye personality (sparkling, intense, dreamy, focused, wise, etc.)
        - **Overall Vibe**: Unique personality combination (creative-adventurous, calm-analytical, etc.)
        - **Energy Level**: Precise energy assessment
        - **Approachability**: Social interaction style
        - **Specific Traits**: Use descriptive traits like: analytical, nurturing, mischievous, determined, mysterious, protective, playful, wise, independent, loyal, fierce, gentle, brave, curious, etc.
        - **Color Story**: What do their color choices say about them?
        - **Lifestyle Clues**: Indoor/outdoor, social/solo, formal/casual, active/relaxed
        
        AVOID generic analysis - be specific and insightful!
        Look for personality combinations that would match specific Pokémon, not just popular ones.
        
        Examples of good analysis:
        - "Contemplative and wise with gentle eyes" → might match Alakazam or Mewtwo
        - "Mischievous with sparkling eyes and playful energy" → might match Gengar or Sableye  
        - "Calm and nurturing with protective instincts" → might match Chansey or Blissey
        - "Mysterious and independent with intense focus" → might match Umbreon or Crobat
      `,
    });

    const personTraits = personalityAnalysis.personalityTraits.map((t) =>
      t.toLowerCase()
    );
    const energyLevel = personalityAnalysis.visualTraits.energyLevel;

    const candidatePokemon = pokemonDatabase
      .map((p) => {
        let score = 0;
        const pokemonTraits = p.personality.map((t) => t.toLowerCase());

        const overlap = personTraits.filter((trait) =>
          pokemonTraits.some(
            (pTrait) => pTrait.includes(trait) || trait.includes(pTrait)
          )
        ).length;
        score += overlap * 2;

        const highEnergyWords = [
          "energetic",
          "dynamic",
          "fast",
          "quick",
          "active",
          "fierce",
        ];
        const lowEnergyWords = [
          "calm",
          "relaxed",
          "sleepy",
          "peaceful",
          "slow",
          "gentle",
        ];

        if (
          energyLevel === "high" &&
          pokemonTraits.some((t) => highEnergyWords.some((e) => t.includes(e)))
        )
          score += 2;

        if (
          energyLevel === "low" &&
          pokemonTraits.some((t) => lowEnergyWords.some((e) => t.includes(e)))
        )
          score += 2;

        score += Math.random() * 0.5;

        return { pokemon: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 30);

    const { object: pokemonMatch } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: PokemonMatchSchema,
      prompt: `
        Based on this personality analysis, find the best matching Pokémon from these top candidates.
        
        Person's Analysis:
        - Facial Expression: ${
          personalityAnalysis.visualTraits.facialExpression
        }
        - Eye Expression: ${personalityAnalysis.visualTraits.eyeExpression}
        - Overall Vibe: ${personalityAnalysis.visualTraits.overallVibe}
        - Energy Level: ${personalityAnalysis.visualTraits.energyLevel}
        - Approachability: ${personalityAnalysis.visualTraits.approachability}
        - Personality Traits: ${personalityAnalysis.personalityTraits.join(
          ", "
        )}
        - Color Preferences: ${personalityAnalysis.colorPreferences.join(", ")}
        - Lifestyle: ${personalityAnalysis.lifestyle}

        TOP CANDIDATE POKÉMON (${candidatePokemon.length} options):
        ${candidatePokemon
          .map(
            ({ pokemon: p }) =>
              `ID: ${p.id}, Name: ${p.name}, Type: ${p.type.join(
                "/"
              )}, Personality: ${p.personality.join(", ")}`
          )
          .join("\n")}
                
        Choose the Pokémon that best matches this person's unique personality combination.
        Provide reasoning for both personality alignment and visual/energy similarities.
        You must choose from the IDs listed above only!
      `,
    });
    console.log("🔍 Pokemon match result:", pokemonMatch);

    let pokemon =
      candidatePokemon.find(({ pokemon: p }) => p.id === pokemonMatch.pokemonId)
        ?.pokemon ??
      pokemonDatabase.find((p) => p.id === pokemonMatch.pokemonId);

    pokemon ??= candidatePokemon[0]?.pokemon ?? pokemonDatabase[0];

    if (
      !candidatePokemon.find(
        ({ pokemon: p }) => p.id === pokemonMatch.pokemonId
      )
    ) {
      console.warn(
        `⚠️ Invalid Pokémon ID ${pokemonMatch.pokemonId}, using best candidate...`
      );
      console.log(
        `🎯 Fallback to best candidate: ${pokemon.name} (ID: ${pokemon.id})`
      );
    }

    const result = {
      pokemon: pokemon,
      confidence: pokemonMatch.confidence || 0.8,
      reasoning:
        pokemonMatch.reasoning ||
        `Matched based on personality traits: ${personalityAnalysis.personalityTraits.join(
          ", "
        )}`,
      traits:
        pokemonMatch.matchedTraits || personalityAnalysis.personalityTraits,
      visualSimilarities: pokemonMatch.visualSimilarities || [
        "personality-based match",
      ],
      analysis: personalityAnalysis,
    };

    console.log(
      "🎯 Final Pokémon match:",
      result.pokemon.name,
      `(ID: ${result.pokemon.id})`
    );
    return result;
  } catch (error) {
    console.error("AI photo analysis error:", error);
    throw new Error("Failed to analyze photos for Pokémon matching");
  }
}
