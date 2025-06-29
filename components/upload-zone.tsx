"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import {
  Upload,
  ImageIcon,
  X,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface UploadZoneProps {
  readonly onUpload: (files: File[]) => void;
  readonly isAnalyzing: boolean;
  readonly canUpload: boolean;
  readonly remainingUploads: number;
}

export function UploadZone({
  onUpload,
  isAnalyzing,
  canUpload,
  remainingUploads,
}: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addFiles = useCallback((newFiles: File[]) => {
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...imageFiles].slice(0, 5));
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      addFiles(acceptedFiles);
    },
    [addFiles]
  );

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!canUpload || isAnalyzing) return;

      const clipboardFiles = Array.from(e.clipboardData?.files || []);
      if (clipboardFiles.length > 0) {
        addFiles(clipboardFiles);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [canUpload, isAnalyzing, addFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 5,
    disabled: !canUpload || isAnalyzing,
  });

  const removeFile = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleAnalyze = () => {
    if (files.length > 0) {
      onUpload(files);

      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  if (!canUpload && remainingUploads <= 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You've used all your free uploads. Upgrade to Premium for unlimited
          access!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <motion.div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${!canUpload || isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}
        `}
        whileHover={canUpload && !isAnalyzing ? { scale: 1.02 } : {}}
        whileTap={canUpload && !isAnalyzing ? { scale: 0.98 } : {}}
      >
        <div {...getRootProps()} className="w-full h-full">
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            {isDragActive ? "Drop your photos here" : "Drag & drop your photos"}
          </p>
          <p className="text-sm text-gray-500">
            or click to browse • Press Ctrl+V to paste • PNG, JPG, JPEG, WebP •
            Max 5 photos • Clear face photos work best!
          </p>
          {remainingUploads < Number.POSITIVE_INFINITY && (
            <p className="text-xs text-blue-600 mt-2">
              {remainingUploads} free uploads remaining
            </p>
          )}
        </div>
      </motion.div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">
            Selected Files ({files.length}/5)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {files.map((file) => (
              <motion.div
                key={`${file.name}-${file.size}-${file.lastModified}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2"
              >
                <ImageIcon className="w-4 h-4 text-gray-500" />{" "}
                {/* Update Image to ImageIcon */}
                <span className="text-sm text-gray-700 flex-1 truncate">
                  {file.name}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFile(file)}
                  disabled={isAnalyzing}
                >
                  <X className="w-3 h-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">
              Analyzing your personality...
            </span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-xs text-gray-500">
            This may take a few moments while we process your photos and analyze
            your personality traits
          </p>
        </div>
      )}

      {files.length > 0 && !isAnalyzing && (
        <Button onClick={handleAnalyze} className="w-full" size="lg">
          <Sparkles className="w-4 h-4 mr-2" />
          Analyze My Personality
        </Button>
      )}
    </div>
  );
}
