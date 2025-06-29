#!/usr/bin/env bun

import { spawn } from "child_process";
import { join } from "path";

async function runScript(scriptPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = spawn("bun", [scriptPath], {
      stdio: "inherit",
      cwd: join(__dirname, ".."),
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script exited with code ${code}`));
      }
    });
  });
}

async function main() {
  console.log("🚀 Starting Pokémon database maintenance...\n");

  try {
    console.log("📋 Step 1: Removing duplicates...");
    await runScript("scripts/clean-duplicates.ts");

    console.log("\n⏸️  Pausing for 2 seconds...\n");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("📋 Step 2: Fetching missing Pokémon data...");
    await runScript("scripts/fetch-missing-pokemon.ts");

    console.log("\n✅ Database maintenance completed!");
    console.log("\n📝 Next steps:");
    console.log("1. Review the generated files");
    console.log("2. Copy new entries from new-pokemon-entries.ts");
    console.log("3. Add them to your pokemon-data.ts file");
  } catch (error) {
    console.error("❌ Error during maintenance:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
