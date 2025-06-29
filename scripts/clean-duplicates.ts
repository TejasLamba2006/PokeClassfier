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
  console.log("🔍 Reading and parsing pokemon-data.ts...");

  try {
    const modulePath = join(process.cwd(), "lib", "pokemon-data.ts");
    delete require.cache[require.resolve(modulePath)];

    const fileContent = readFileSync(POKEMON_DATA_PATH, "utf-8");

    const { pokemonDatabase } = require(modulePath) as {
      pokemonDatabase: Pokemon[];
    };

    console.log(`📊 Found ${pokemonDatabase.length} total entries`);

    const uniquePokemon: Pokemon[] = [];
    const seenIds = new Set<number>();
    const seenNames = new Set<string>();
    const duplicatesFound: Array<{ type: string; pokemon: Pokemon }> = [];

    for (const pokemon of pokemonDatabase) {
      const nameKey = pokemon.name.toLowerCase().trim();

      if (seenIds.has(pokemon.id)) {
        duplicatesFound.push({ type: "Duplicate ID", pokemon });
        console.log(`⚠️  Duplicate ID: ${pokemon.id} - ${pokemon.name}`);
        continue;
      }

      if (seenNames.has(nameKey)) {
        duplicatesFound.push({ type: "Duplicate Name", pokemon });
        console.log(`⚠️  Duplicate Name: ${pokemon.name} (ID: ${pokemon.id})`);
        continue;
      }

      seenIds.add(pokemon.id);
      seenNames.add(nameKey);
      uniquePokemon.push(pokemon);
    }

    uniquePokemon.sort((a, b) => a.id - b.id);

    console.log(`\n📊 Results:`);
    console.log(`   Original entries: ${pokemonDatabase.length}`);
    console.log(`   Unique entries: ${uniquePokemon.length}`);
    console.log(`   Duplicates removed: ${duplicatesFound.length}`);

    const gaps: number[] = [];
    for (let i = 1; i <= Math.max(...uniquePokemon.map((p) => p.id)); i++) {
      if (!seenIds.has(i)) {
        gaps.push(i);
      }
    }

    if (gaps.length > 0) {
      console.log(`\n🔍 Missing IDs found: ${gaps.length} gaps`);
      console.log(
        `   First 20 missing: ${gaps.slice(0, 20).join(", ")}${
          gaps.length > 20 ? "..." : ""
        }`
      );
    }

    const backupPath = POKEMON_DATA_PATH + ".backup";
    writeFileSync(backupPath, fileContent);
    console.log(`\n💾 Backup created: ${backupPath}`);

    const newContent = generateCleanFile(uniquePokemon);
    writeFileSync(POKEMON_DATA_PATH, newContent);

    console.log(`✅ File cleaned successfully!`);
    console.log(`📈 Final count: ${uniquePokemon.length} unique Pokémon`);

    if (gaps.length > 0) {
      const gapsReport = `Missing Pokémon IDs (${
        gaps.length
      } total):\n${gaps.join(", ")}`;
      writeFileSync("missing-pokemon-ids.txt", gapsReport);
      console.log(`📝 Missing IDs report saved to: missing-pokemon-ids.txt`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

function generateCleanFile(pokemon: Pokemon[]): string {
  const header = `export const pokemonDatabase = [`;

  const entries = pokemon
    .map((p) => {
      const types = p.type.map((t) => `"${t}"`).join(", ");
      const traits = p.personality.map((trait) => `"${trait}"`).join(", ");
      const imagePath = p.image ?? `/pokemon/${p.id}.png`;

      return `  {
    id: ${p.id},
    name: "${p.name}",
    type: [${types}],
    description: "${p.description.replace(/"/g, '\\"')}",
    personality: [${traits}],
    image: "${imagePath}",
  }`;
    })
    .join(",\n");

  return `${header}\n${entries}\n];\n`;
}

if (require.main === module) {
  removeDuplicates();
}
