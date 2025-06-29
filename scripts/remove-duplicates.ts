#!/usr/bin/env bun

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  description: string;
  personality: string[];
  image?: string;
}

const POKEMON_DATA_PATH = join(process.cwd(), "lib", "pokemon-data.ts");

function removeDuplicates() {
  console.log("🔍 Reading pokemon-data.ts...");

  try {
    const modulePath = join(process.cwd(), "lib", "pokemon-data.ts");
    delete require.cache[require.resolve(modulePath)];

    const fileContent = readFileSync(POKEMON_DATA_PATH, "utf-8");

    const { pokemonDatabase } = require(modulePath) as {
      pokemonDatabase: Pokemon[];
    };

    const pokemonObjects: Pokemon[] = [];
    const seenIds = new Set<number>();
    const seenNames = new Set<string>();
    const duplicatesFound: {
      type: string;
      value: string | number;
      pokemon: Pokemon;
    }[] = [];

    for (const pokemon of pokemonDatabase) {
      const nameKey = pokemon.name.toLowerCase().trim();

      if (seenIds.has(pokemon.id)) {
        duplicatesFound.push({ type: "ID", value: pokemon.id, pokemon });
        console.log(`⚠️  Duplicate ID found: ${pokemon.id} (${pokemon.name})`);
        continue;
      }

      if (seenNames.has(nameKey)) {
        duplicatesFound.push({ type: "Name", value: pokemon.name, pokemon });
        console.log(
          `⚠️  Duplicate name found: ${pokemon.name} (ID: ${pokemon.id})`
        );
        continue;
      }

      seenIds.add(pokemon.id);
      seenNames.add(nameKey);
      pokemonObjects.push(pokemon);
    }

    console.log(`\n📊 Analysis Results:`);
    console.log(
      `   Total entries processed: ${
        pokemonObjects.length + duplicatesFound.length
      }`
    );
    console.log(`   Unique entries: ${pokemonObjects.length}`);
    console.log(`   Duplicates removed: ${duplicatesFound.length}`);

    if (duplicatesFound.length > 0) {
      console.log(`\n🗑️  Duplicates removed:`);
      duplicatesFound.forEach((dup) => {
        console.log(`   - ${dup.type}: ${dup.value} (${dup.pokemon.name})`);
      });
    }

    pokemonObjects.sort((a, b) => a.id - b.id);

    const newFileContent = generateFileContent(pokemonObjects);

    const backupPath = POKEMON_DATA_PATH + ".backup";
    writeFileSync(backupPath, fileContent);
    console.log(`\n💾 Backup created: ${backupPath}`);

    writeFileSync(POKEMON_DATA_PATH, newFileContent);
    console.log(`✅ Cleaned pokemon-data.ts written successfully!`);
    console.log(`📈 Final count: ${pokemonObjects.length} unique Pokémon`);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

function generateFileContent(pokemon: Pokemon[]): string {
  const header = `export const pokemonDatabase = [`;

  const pokemonEntries = pokemon
    .map((p) => {
      const typeArray = p.type.map((t: string) => `"${t}"`).join(", ");
      const personalityArray = p.personality
        .map((trait: string) => `"${trait}"`)
        .join(", ");
      const imagePath = p.image ?? `/pokemon/${p.id}.png`;

      return `  {
    id: ${p.id},
    name: "${p.name}",
    type: [${typeArray}],
    description: "${p.description}",
    personality: [${personalityArray}],
    image: "${imagePath}",
  }`;
    })
    .join(",\n");

  const footer = `];`;

  return `${header}\n${pokemonEntries}\n${footer}\n`;
}

if (require.main === module) {
  removeDuplicates();
}
