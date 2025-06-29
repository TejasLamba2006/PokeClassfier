"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Share2, RotateCcw, Sparkles, Camera } from "lucide-react";
import { createShareData, shareResults } from "@/lib/share-utils";
import { useState } from "react";

interface PokemonMatch {
  pokemon: {
    name: string;
    id: number;
    type: string[];
    description: string;
    personality: string[];
    image: string;
  };
  confidence: number;
  reasoning: string;
  visualTraits: string[];
  personalityTraits: string[];
}

interface PhotoAnalysis {
  facialExpressions: string[];
  emotions: Array<{ emotion: string; confidence: number }>;
  visualStyle: string[];
  colors: Array<{ color: string; prominence: number }>;
  objects: string[];
  ageRange?: string;
  mood: string;
}

interface PokemonResultsProps {
  readonly results: {
    match: PokemonMatch;
    photoAnalysis: PhotoAnalysis;
    summary: string;
    processingTime: number;
    photoCount: number;
  };
  readonly onReset: () => void;
}

export function PokemonResults({ results, onReset }: PokemonResultsProps) {
  const [shareStatus, setShareStatus] = useState<
    "idle" | "sharing" | "shared" | "copied"
  >("idle");

  const handleShare = async () => {
    try {
      setShareStatus("sharing");

      const shareData = createShareData(results);
      const pokemonData = {
        pokemonId: results.match.pokemon.id,
        pokemonName: results.match.pokemon.name,
        confidence: results.match.confidence,
        photoCount: results.photoCount,
      };

      const result = await shareResults(shareData, pokemonData);

      if (result === "shared") {
        setShareStatus("shared");
      } else if (result === "copied") {
        setShareStatus("copied");
      }

      setTimeout(() => {
        setShareStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Share failed:", error);
      setShareStatus("idle");
    }
  };

  const getShareButtonText = () => {
    switch (shareStatus) {
      case "sharing":
        return "Sharing...";
      case "shared":
        return "Shared!";
      case "copied":
        return "Copied to clipboard!";
      default:
        return "Share Results";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Pokémon Twin!
        </h2>
        <p className="text-gray-600 mb-2">{results.summary}</p>
        <div className="flex justify-center mb-4">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800"
          >
            <Camera className="w-4 h-4 mr-2" />
            Analyzed {results.photoCount}{" "}
            {results.photoCount === 1 ? "photo" : "photos"}
          </Badge>
        </div>
        <div className="flex justify-center space-x-2">
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            disabled={shareStatus === "sharing"}
          >
            <Share2 className="w-4 h-4 mr-2" />
            {getShareButtonText()}
          </Button>
          <Button onClick={onReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Analyze New Photos
          </Button>
        </div>
      </motion.div>

      {/* Pokemon Match */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Your Pokémon Twin</CardTitle>
              <Badge variant="secondary">
                {Math.round(results.match.confidence * 100)}% Match
              </Badge>
            </div>
            <CardDescription>Based on your visual personality</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Pokemon Info */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <img
                  src={`/pokemon/${results.match.pokemon.id}.png`}
                  alt={results.match.pokemon.name}
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {results.match.pokemon.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  #{results.match.pokemon.id.toString().padStart(3, "0")}
                </p>
                <div className="flex space-x-1">
                  {results.match.pokemon.type.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pokédex Entry</h4>
              <p className="text-sm text-gray-600">
                {results.match.pokemon.description}
              </p>
            </div>

            {/* Personality Traits */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Personality Traits
              </h4>
              <div className="flex flex-wrap gap-1">
                {results.match.pokemon.personality.map((trait) => (
                  <Badge key={trait} variant="secondary" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Visual Traits Detected
              </h4>
              <div className="flex flex-wrap gap-1">
                {results.match.visualTraits.map((trait) => (
                  <Badge key={trait} variant="outline" className="text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Personality Traits Detected
              </h4>
              <div className="flex flex-wrap gap-1">
                {results.match.personalityTraits.map((trait) => (
                  <Badge key={trait} variant="outline" className="text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">AI Analysis</h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                {results.match.reasoning}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Processing Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-gray-500"
      >
        Analysis completed in {results.processingTime}s using advanced computer
        vision and AI personality matching
      </motion.div>
    </div>
  );
}
