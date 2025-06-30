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
import {
  Crown,
  Sparkles,
  Camera,
  Zap,
  Heart,
  ExternalLink,
} from "lucide-react";

import { pokemonDatabase } from "@/lib/pokemon-data";

export function PremiumSection() {
  const handleJoinDiscord = () => {
    const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL;
    window.open(discordUrl, "_blank", "noopener,noreferrer");
  };

  const isPremium = false;

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800"
          >
            <Crown className="w-4 h-4 mr-2" />
            Premium Features
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Unlock Your Full Pokémon Potential
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our premium Discord community to access advanced features and
            exclusive content
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Free Trainer</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="text-3xl font-bold text-gray-900 mt-4">
                  Free
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Camera className="w-5 h-5 mr-3 text-green-500" />
                    <span>3 photo analyses per day</span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-3 text-green-500" />
                    <span>Basic personality matching</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-3 text-green-500" />
                    <span>{pokemonDatabase.length}+ Pokémon database</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Tier */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card
              className={`h-full border-2 relative overflow-hidden ${
                isPremium
                  ? "border-green-200 bg-gradient-to-br from-green-50 to-blue-50"
                  : "border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50"
              }`}
            >
              <div
                className={`absolute top-0 right-0 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg ${
                  isPremium
                    ? "bg-gradient-to-l from-green-500 to-blue-500"
                    : "bg-gradient-to-l from-purple-500 to-blue-500"
                }`}
              >
                {isPremium ? "Active" : "Most Popular"}
              </div>

              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Crown
                    className={`w-6 h-6 mr-2 ${
                      isPremium ? "text-green-600" : "text-purple-600"
                    }`}
                  />
                  Premium Trainer
                  {isPremium && (
                    <Badge className="ml-2 bg-green-100 text-green-800">
                      Active
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Unlock your full potential</CardDescription>
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${
                    isPremium
                      ? "from-green-600 to-blue-600"
                      : "from-purple-600 to-blue-600"
                  } bg-clip-text text-transparent mt-4`}
                >
                  {isPremium ? "Premium Active" : "Join Discord"}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Camera
                      className={`w-5 h-5 mr-3 ${
                        isPremium ? "text-green-500" : "text-purple-500"
                      }`}
                    />
                    <span className="font-medium">
                      Unlimited photo analyses
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Zap
                      className={`w-5 h-5 mr-3 ${
                        isPremium ? "text-green-500" : "text-purple-500"
                      }`}
                    />
                    <span className="font-medium">
                      Advanced AI personality insights
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles
                      className={`w-5 h-5 mr-3 ${
                        isPremium ? "text-green-500" : "text-purple-500"
                      }`}
                    />
                    <span className="font-medium">
                      Exclusive Pokémon variants
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Heart
                      className={`w-5 h-5 mr-3 ${
                        isPremium ? "text-green-500" : "text-purple-500"
                      }`}
                    />
                    <span className="font-medium">
                      Priority support & community
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Crown
                      className={`w-5 h-5 mr-3 ${
                        isPremium ? "text-green-500" : "text-purple-500"
                      }`}
                    />
                    <span className="font-medium">
                      Premium Discord channels
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ExternalLink
                      className={`w-5 h-5 mr-3 ${
                        isPremium ? "text-green-500" : "text-purple-500"
                      }`}
                    />
                    <span className="font-medium">
                      Early access to new features
                    </span>
                  </div>
                </div>

                {!isPremium && (
                  <Button
                    onClick={handleJoinDiscord}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-lg mt-6"
                    size="lg"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Join Discord for Premium
                  </Button>
                )}

                {isPremium && (
                  <div className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 text-lg mt-6 rounded-md text-center">
                    <Crown className="w-5 h-5 mr-2 inline" />
                    Premium Access Active!
                  </div>
                )}

                <p className="text-sm text-gray-600 text-center mt-3">
                  {isPremium
                    ? "Enjoy unlimited photo analyses and premium features!"
                    : "Get premium access instantly by joining our Discord community"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-900">
            Why Join Our Premium Discord?
          </h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">
                Exclusive Community
              </h4>
              <p className="text-gray-600">
                Connect with fellow Pokémon enthusiasts and AI photo analysis
                experts
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Instant Access</h4>
              <p className="text-gray-600">
                Get premium features activated immediately upon joining
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Direct Support</h4>
              <p className="text-gray-600">
                Get help directly from the creators and premium community
                members
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
