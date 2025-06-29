import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { pokemonDatabase } from "./pokemon-data";

const PersonalityAnalysisSchema = z.object({
  participants: z.array(
    z.object({
      name: z.string(),
      traits: z.array(z.string()),
      communicationStyle: z.string(),
      emotionalTone: z.string(),
      personality: z.string(),
    })
  ),
  chatSummary: z.string(),
});

const PokemonMatchSchema = z.object({
  pokemonId: z.number(),
  confidence: z.number(),
  reasoning: z.string(),
  matchedTraits: z.array(z.string()),
});

export async function analyzeChatPersonalities(
  extractedTexts: Array<{
    text: string;
    participant?: string;
    platform?: string;
  }>
) {
  try {
    const { object: personalityAnalysis } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: PersonalityAnalysisSchema,
      prompt: `
        Analyze the following chat conversation and identify the personality traits, communication style, and emotional tone of each participant.
        
        Chat data: ${JSON.stringify(extractedTexts)}
        
        Note: This chat was extracted from ${
          extractedTexts[0]?.platform ?? "an unknown platform"
        }. Consider platform-specific communication patterns:
        - Snapchat: Often casual, visual-focused, quick exchanges
        - WhatsApp: Mix of casual and formal, group dynamics
        - Discord: Gaming/community focused, often informal with slang
        - Telegram: Similar to WhatsApp but potentially more private
        - iMessage: iOS users, often emoji-heavy and casual
        
        For each participant, identify:
        1. Key personality traits (e.g., outgoing, analytical, empathetic, humorous)
        2. Communication style (e.g., direct, casual, formal, expressive)
        3. Emotional tone (e.g., positive, sarcastic, supportive, energetic)
        4. Overall personality description
        
        Also provide a brief summary of the chat conversation.
      `,
    });

    const matches = await Promise.all(
      personalityAnalysis.participants.map(async (participant) => {
        const { object: pokemonMatch } = await generateObject({
          model: google("gemini-1.5-flash"),
          schema: PokemonMatchSchema,
          prompt: `
            Based on the following personality analysis, find the best matching Pokémon from the database.
            
            Participant: ${participant.name}
            Traits: ${participant.traits.join(", ")}
            Communication Style: ${participant.communicationStyle}
            Emotional Tone: ${participant.emotionalTone}
            Personality: ${participant.personality}
            
            Available Pokémon (first 50 for context): ${JSON.stringify(
              pokemonDatabase.slice(0, 50)
            )}
            
            Consider:
            1. Personality alignment with Pokémon characteristics
            2. Behavioral patterns matching Pokémon nature
            3. Communication style reflecting Pokémon traits
            4. Overall compatibility score (0-1)
            
            Return the Pokémon ID that best matches, confidence score, reasoning, and specific traits that matched.
          `,
        });

        const pokemon = pokemonDatabase.find(
          (p) => p.id === pokemonMatch.pokemonId
        );

        return {
          participant: participant.name,
          pokemon: pokemon || pokemonDatabase[0],
          confidence: pokemonMatch.confidence,
          reasoning: pokemonMatch.reasoning,
          traits: pokemonMatch.matchedTraits,
        };
      })
    );

    return {
      matches,
      chatSummary: personalityAnalysis.chatSummary,
    };
  } catch (error) {
    console.error("AI analysis error:", error);
    throw new Error("Failed to analyze chat personalities");
  }
}
