import { pokemonDatabase } from "./pokemon-data";

interface PokemonData {
  id: number;
  name: string;
  type: string[];
  description: string;
  personality: string[];
  image: string;
  generation?: number;
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

const typePersonalities: Record<string, string[]> = {
  Fire: ["Passionate", "Energetic", "Brave", "Impulsive", "Determined"],
  Water: ["Calm", "Adaptable", "Flowing", "Peaceful", "Protective"],
  Grass: ["Nurturing", "Patient", "Calm", "Grounded", "Loyal"],
  Electric: ["Energetic", "Quick", "Bright", "Enthusiastic", "Dynamic"],
  Psychic: ["Intelligent", "Mysterious", "Analytical", "Introspective", "Wise"],
  Dark: ["Mysterious", "Independent", "Cunning", "Determined", "Strong-willed"],
  Ghost: ["Mysterious", "Playful", "Mischievous", "Elusive", "Unpredictable"],
  Fighting: ["Strong", "Determined", "Brave", "Competitive", "Disciplined"],
  Normal: ["Friendly", "Reliable", "Adaptable", "Social", "Balanced"],
  Flying: [
    "Free-spirited",
    "Independent",
    "Graceful",
    "Adventurous",
    "Optimistic",
  ],
  Poison: ["Cunning", "Resilient", "Defensive", "Strategic", "Adaptable"],
  Ground: ["Steady", "Reliable", "Strong", "Grounded", "Practical"],
  Rock: ["Steady", "Reliable", "Defensive", "Patient", "Enduring"],
  Bug: ["Hardworking", "Persistent", "Social", "Organized", "Determined"],
  Steel: ["Strong", "Reliable", "Defensive", "Methodical", "Protective"],
  Ice: ["Cool", "Calm", "Elegant", "Reserved", "Precise"],
  Dragon: ["Powerful", "Proud", "Majestic", "Confident", "Noble"],
  Fairy: ["Gentle", "Playful", "Magical", "Kind", "Protective"],
};

export function generatePersonality(types: string[], stats?: any): string[] {
  const personality = new Set<string>();

  types.forEach((type) => {
    const typeTraits = typePersonalities[type] || ["Mysterious"];

    typeTraits.slice(0, 3).forEach((trait) => personality.add(trait));
  });

  if (stats) {
    if (stats.speed > 100) personality.add("Quick");
    if (stats.attack > 100) personality.add("Aggressive");
    if (stats.defense > 100) personality.add("Defensive");
    if (stats.hp > 100) personality.add("Resilient");
  }

  return Array.from(personality).slice(0, 4);
}

export function parseKaggleData(csvData: any[]): PokemonData[] {
  return csvData.map((row) => ({
    id: parseInt(row.id || row.pokedex_number || row.number),
    name: row.name,
    type: [row.type1, row.type2].filter(Boolean),
    description:
      row.description || row.species || `A ${row.type1}-type Pokémon.`,
    personality: generatePersonality([row.type1, row.type2].filter(Boolean), {
      hp: parseInt(row.hp || 0),
      attack: parseInt(row.attack || 0),
      defense: parseInt(row.defense || 0),
      speed: parseInt(row.speed || 0),
    }),
    image: `/pokemon/${row.id || row.number}.png`,
    generation: parseInt(row.generation || 1),
    stats: {
      hp: parseInt(row.hp || 0),
      attack: parseInt(row.attack || 0),
      defense: parseInt(row.defense || 0),
      speed: parseInt(row.speed || 0),
    },
  }));
}

export const curatedPokemon: PokemonData[] = [
  {
    id: 3,
    name: "Venusaur",
    type: ["Grass", "Poison"],
    description:
      "The flower on its back releases a soothing scent that enhances emotions.",
    personality: ["Nurturing", "Calm", "Protective", "Wise"],
    image: "/pokemon/3.png",
  },
  {
    id: 6,
    name: "Charizard",
    type: ["Fire", "Flying"],
    description:
      "It spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.",
    personality: ["Proud", "Powerful", "Independent", "Passionate"],
    image: "/pokemon/6.png",
  },
  {
    id: 9,
    name: "Blastoise",
    type: ["Water"],
    description:
      "A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles.",
    personality: ["Strong", "Protective", "Reliable", "Strategic"],
    image: "/pokemon/9.png",
  },
  {
    id: 144,
    name: "Articuno",
    type: ["Ice", "Flying"],
    description:
      "A legendary bird Pokémon that is said to appear to doomed people who are lost in icy mountains.",
    personality: ["Elegant", "Mysterious", "Calm", "Majestic"],
    image: "/pokemon/144.png",
  },
  {
    id: 145,
    name: "Zapdos",
    type: ["Electric", "Flying"],
    description:
      "A legendary bird Pokémon that is said to appear from clouds while dropping enormous lightning bolts.",
    personality: ["Energetic", "Powerful", "Dynamic", "Fierce"],
    image: "/pokemon/145.png",
  },
  {
    id: 146,
    name: "Moltres",
    type: ["Fire", "Flying"],
    description:
      "A legendary bird Pokémon that has the ability to control fire. If this Pokémon is injured, it is said to dip its body in the molten magma of a volcano to burn and heal itself.",
    personality: ["Passionate", "Healing", "Powerful", "Resilient"],
    image: "/pokemon/146.png",
  },
];

export const popularPokemon: PokemonData[] = [
  {
    id: 39,
    name: "Jigglypuff",
    type: ["Normal", "Fairy"],
    description:
      "Its vocal cords can freely adjust the wavelength of its voice. This helps it sing lullabies.",
    personality: ["Musical", "Caring", "Gentle", "Sleepy"],
    image: "/pokemon/39.png",
  },
  {
    id: 104,
    name: "Cubone",
    type: ["Ground"],
    description:
      "Because it never removes its skull helmet, no one has ever seen this Pokémon's real face.",
    personality: ["Lonely", "Emotional", "Strong", "Mysterious"],
    image: "/pokemon/104.png",
  },
  {
    id: 131,
    name: "Lapras",
    type: ["Water", "Ice"],
    description:
      "A gentle and kindhearted Pokémon that shares rides across bodies of water with people and Pokémon.",
    personality: ["Gentle", "Kind", "Helpful", "Peaceful"],
    image: "/pokemon/131.png",
  },
  {
    id: 143,
    name: "Snorlax",
    type: ["Normal"],
    description:
      "Its stomach can digest any kind of food, even if it happens to be moldy or rotten.",
    personality: ["Relaxed", "Sleepy", "Easygoing", "Content"],
    image: "/pokemon/143.png",
  },
];

export function expandPokemonDatabase(): PokemonData[] {
  const expanded = [...pokemonDatabase];

  expanded.push(...curatedPokemon);
  expanded.push(...popularPokemon);

  const unique = expanded.filter(
    (pokemon, index, self) =>
      index === self.findIndex((p) => p.id === pokemon.id)
  );

  return unique.sort((a, b) => a.id - b.id);
}
