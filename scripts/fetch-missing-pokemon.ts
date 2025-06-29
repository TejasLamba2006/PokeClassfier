#!/usr/bin/env bun

import { writeFileSync } from "fs";
import { join } from "path";

interface PokeApiPokemon {
  id: number;
  name: string;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  species: {
    url: string;
  };
}

interface PokeApiSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }>;
}

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  description: string;
  personality: string[];
  image: string;
}

const POKEMON_DATA_PATH = join(process.cwd(), "lib", "pokemon-data.ts");
const API_BASE = "https://pokeapi.co/api/v2";

async function findMissingPokemon() {
  console.log("🔍 Analyzing current Pokémon database...");

  try {
    const { pokemonDatabase } = require(join(
      process.cwd(),
      "lib",
      "pokemon-data.ts"
    )) as { pokemonDatabase: Pokemon[] };
    const existingIds = new Set(pokemonDatabase.map((p) => p.id));

    console.log(`📊 Current database has ${pokemonDatabase.length} Pokémon`);

    const maxId = 1000;
    const missingIds: number[] = [];

    for (let i = 1; i <= maxId; i++) {
      if (!existingIds.has(i)) {
        missingIds.push(i);
      }
    }

    console.log(`🔍 Found ${missingIds.length} missing Pokémon IDs`);
    console.log(
      `📝 First 20 missing: ${missingIds.slice(0, 20).join(", ")}${
        missingIds.length > 20 ? "..." : ""
      }`
    );

    if (missingIds.length === 0) {
      console.log("✅ No missing Pokémon found!");
      return;
    }

    const toFetch = missingIds.slice(0, 50);
    console.log(
      `\n🌐 Fetching data for first ${toFetch.length} missing Pokémon...`
    );

    const fetchedPokemon: Pokemon[] = [];

    for (const [index, id] of toFetch.entries()) {
      console.log(
        `📥 Fetching ${index + 1}/${toFetch.length}: Pokémon #${id}...`
      );

      try {
        const pokemon = await fetchPokemonData(id);
        if (pokemon) {
          fetchedPokemon.push(pokemon);
          console.log(`   ✅ ${pokemon.name}`);
        }
      } catch (error) {
        console.log(`   ❌ Failed to fetch #${id}: ${error}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(
      `\n📊 Successfully fetched ${fetchedPokemon.length} new Pokémon`
    );

    if (fetchedPokemon.length > 0) {
      const outputData = {
        fetchedAt: new Date().toISOString(),
        count: fetchedPokemon.length,
        pokemon: fetchedPokemon,
      };

      const outputPath = "fetched-pokemon-data.json";
      writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
      console.log(`💾 Fetched data saved to: ${outputPath}`);

      const tsCode = generateTSCode(fetchedPokemon);
      writeFileSync("new-pokemon-entries.ts", tsCode);
      console.log(`📝 TypeScript entries saved to: new-pokemon-entries.ts`);

      console.log(`\n🎯 Next steps:`);
      console.log(`1. Review the fetched data in: ${outputPath}`);
      console.log(`2. Copy entries from: new-pokemon-entries.ts`);
      console.log(`3. Add them to your pokemon-data.ts file`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

async function fetchPokemonData(id: number): Promise<Pokemon | null> {
  try {
    const pokemonResponse = await fetch(`${API_BASE}/pokemon/${id}`);
    if (!pokemonResponse.ok) {
      throw new Error(`HTTP ${pokemonResponse.status}`);
    }

    const pokemonData: PokeApiPokemon = await pokemonResponse.json();

    const speciesResponse = await fetch(pokemonData.species.url);
    if (!speciesResponse.ok) {
      throw new Error(`HTTP ${speciesResponse.status} for species`);
    }

    const speciesData: PokeApiSpecies = await speciesResponse.json();

    const name = capitalize(pokemonData.name);
    const types = pokemonData.types.map((t) => capitalize(t.type.name));

    const englishEntries = speciesData.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    );

    const description =
      englishEntries.length > 0
        ? englishEntries[0].flavor_text
            .replace(/[\n\f]/g, " ")
            .replace(/\s+/g, " ")
            .trim()
        : `The ${name} Pokémon.`;

    const personality = generatePersonality(name, types);

    return {
      id,
      name,
      type: types,
      description,
      personality,
      image: `/pokemon/${id}.png`,
    };
  } catch (error) {
    console.warn(`Failed to fetch Pokémon #${id}:`, error);
    return null;
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generatePersonality(name: string, types: string[]): string[] {
  const personalityOptions: Record<string, string[]> = {
    fire: ["passionate", "energetic", "fierce", "hot-tempered", "brave"],
    water: ["calm", "flowing", "adaptable", "cleansing", "deep"],
    grass: ["nurturing", "peaceful", "growing", "natural", "patient"],
    electric: ["energetic", "shocking", "fast", "charged", "bright"],
    psychic: ["intelligent", "mystical", "telepathic", "wise", "mysterious"],
    ice: ["cool", "calm", "frozen", "crystalline", "serene"],
    dragon: ["powerful", "majestic", "legendary", "ancient", "proud"],
    dark: ["mysterious", "cunning", "night-dwelling", "shadowy", "strategic"],
    fighting: ["strong", "determined", "brave", "competitive", "disciplined"],
    poison: ["toxic", "cunning", "dangerous", "adaptive", "resilient"],
    ground: ["sturdy", "earthy", "solid", "reliable", "grounded"],
    flying: ["free", "soaring", "graceful", "swift", "aerial"],
    bug: ["industrious", "small", "numerous", "adaptable", "metamorphic"],
    rock: ["solid", "sturdy", "defensive", "ancient", "enduring"],
    ghost: ["mysterious", "ethereal", "haunting", "spiritual", "otherworldly"],
    steel: ["strong", "metallic", "defensive", "sharp", "durable"],
    fairy: ["magical", "cute", "enchanting", "protective", "mystical"],
    normal: ["balanced", "adaptable", "friendly", "common", "versatile"],
  };

  const traits = new Set<string>();

  for (const type of types) {
    const typeTraits = personalityOptions[type.toLowerCase()] ?? [
      "unique",
      "special",
    ];
    typeTraits.forEach((trait) => traits.add(trait));
  }

  const nameTraits = [
    "loyal",
    "curious",
    "playful",
    "gentle",
    "alert",
    "clever",
    "spirited",
    "noble",
    "wild",
    "caring",
  ];

  const shuffledTraits = [...nameTraits].sort(() => Math.random() - 0.5);
  shuffledTraits.slice(0, 2).forEach((trait) => traits.add(trait));

  const finalTraits = Array.from(traits).slice(0, 5);
  while (finalTraits.length < 5) {
    finalTraits.push("special");
  }

  return finalTraits;
}

function generateTSCode(pokemon: Pokemon[]): string {
  const entries = pokemon
    .map((p) => {
      const types = p.type.map((t) => `"${t}"`).join(", ");
      const traits = p.personality.map((t) => `"${t}"`).join(", ");

      return `  {
    id: ${p.id},
    name: "${p.name}",
    type: [${types}],
    description: "${p.description.replace(/"/g, '\\"')}",
    personality: [${traits}],
    image: "${p.image}",
  }`;
    })
    .join(",\n");

  return `export const newPokemonEntries = [
${entries}
];
`;
}

if (require.main === module) {
  findMissingPokemon();
}
