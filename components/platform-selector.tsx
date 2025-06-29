"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Smartphone,
  MessageCircle,
  Hash,
  Phone,
  Users,
} from "lucide-react";

interface PlatformSelectorProps {
  readonly onPlatformSelect?: (platform: string) => void;
  readonly selectedPlatform?: string;
}

const platforms = [
  {
    id: "auto",
    name: "Auto-detect",
    description: "Let AI detect the platform automatically",
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    description: "Chat screenshots from Snapchat",
    icon: Smartphone,
    color: "bg-yellow-100 text-yellow-800",
    tips: "Look for 'ME' and uppercase usernames",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "WhatsApp chat exports or screenshots",
    icon: MessageCircle,
    color: "bg-green-100 text-green-800",
    tips: "Messages with timestamps [12/25/24, 10:30:45 AM]",
  },
  {
    id: "discord",
    name: "Discord",
    description: "Discord chat screenshots",
    icon: Hash,
    color: "bg-indigo-100 text-indigo-800",
    tips: "Look for 'Today at' or 'Yesterday at' timestamps",
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Telegram chat screenshots",
    icon: MessageCircle,
    color: "bg-blue-100 text-blue-800",
    tips: "Time stamps followed by usernames",
  },
  {
    id: "imessage",
    name: "iMessage",
    description: "iPhone Messages screenshots",
    icon: Phone,
    color: "bg-gray-100 text-gray-800",
    tips: "Clean interface with blue/gray bubbles",
  },
  {
    id: "generic",
    name: "Other",
    description: "Other chat platforms or formats",
    icon: Users,
    color: "bg-purple-100 text-purple-800",
    tips: "Generic 'Username: Message' format",
  },
];

export function PlatformSelector({
  onPlatformSelect,
  selectedPlatform = "auto",
}: PlatformSelectorProps) {
  const [selected, setSelected] = useState(selectedPlatform);

  const handleSelectionChange = (value: string) => {
    setSelected(value);
    onPlatformSelect?.(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>Chat Platform</span>
        </CardTitle>
        <CardDescription>
          Select your chat platform for better parsing accuracy (optional)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selected} onValueChange={handleSelectionChange}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {platforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <div key={platform.id} className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={platform.id}
                    id={platform.id}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={platform.id}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className={`p-2 rounded-md ${platform.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm">
                            {platform.name}
                          </h4>
                          {platform.id === "auto" && (
                            <Badge variant="secondary" className="text-xs">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          {platform.description}
                        </p>
                        {platform.tips && (
                          <p className="text-xs text-gray-500 italic">
                            💡 {platform.tips}
                          </p>
                        )}
                      </div>
                    </div>
                  </Label>
                </div>
              );
            })}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
