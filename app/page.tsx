"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, Users, Crown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UploadZone } from "@/components/upload-zone";
import { PokemonResults } from "@/components/pokemon-results";
import { PremiumSection } from "@/components/premium-section";
import { AdminNav } from "@/components/admin-nav";
import { useAuth } from "@/hooks/use-auth";
import { useUsage } from "@/hooks/use-usage";

import { pokemonDatabase } from "@/lib/pokemon-data";

export default function HomePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const { user, signIn } = useAuth();
  const { data: usage } = useUsage();

  const handleAnalysis = async (files: File[]) => {
    if (!user) {
      signIn();
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file-${index}`, file);
      });

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  const canUpload = !user || (usage && usage.count < 5) || usage?.isPremium;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PokéChat Classifier
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white"
            >
              <a
                href="https://linkedin.com/in/tejaslamba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-[#333] text-[#333] hover:bg-[#333] hover:text-white"
            >
              <a
                href="https://github.com/TejasLamba2006/PokeClassfier"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            </Button>

            {user && (
              <div className="flex items-center space-x-2">
                <Badge variant={usage?.isPremium ? "default" : "secondary"}>
                  {usage?.isPremium ? (
                    <>
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </>
                  ) : (
                    `${usage?.count ?? 0}/5 Free`
                  )}
                </Badge>
              </div>
            )}
            <AdminNav />
            <Button onClick={signIn} variant={user ? "outline" : "default"}>
              {user ? user.name : "Sign In"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Discover Your Pokémon Twin
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your photos and let AI analyze your facial expressions,
            style, and personality to match you with your perfect Pokémon
            character using advanced visual recognition!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <Upload className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">AI Visual Analysis</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">
                Facial Recognition & Personality AI
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <Users className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium">
                {pokemonDatabase.length}+ Pokémon Database
              </span>
            </div>
          </div>
        </motion.div>

        {!results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Photos</CardTitle>
                <CardDescription>
                  Upload 1-5 photos of yourself to get your AI-powered Pokémon
                  personality match. Works best with clear face photos showing
                  different expressions!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadZone
                  onUpload={handleAnalysis}
                  isAnalyzing={isAnalyzing}
                  canUpload={canUpload}
                  remainingUploads={
                    usage?.isPremium
                      ? Number.POSITIVE_INFINITY
                      : Math.max(0, 5 - (usage?.count ?? 0))
                  }
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <PokemonResults
              results={results}
              onReset={() => setResults(null)}
            />
          </motion.div>
        )}

        {!user ||
          (!usage?.isPremium && usage?.count >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PremiumSection />
            </motion.div>
          ))}
      </main>

      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Terms of Service
              </a>
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Tejas Lamba. All rights reserved.
            </p>
            <p className="text-sm text-gray-600">
              Made with <span className="text-red-500 text-base">❤️</span> by{" "}
              <a
                href="https://linkedin.com/in/tejaslamba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077B5] hover:underline font-medium"
              >
                Tejas Lamba
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
