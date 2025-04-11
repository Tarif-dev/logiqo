
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface XpProgressProps {
  currentXp: number;
  levelXp: number;
  level: number;
  className?: string;
  variant?: "default" | "compact" | "dashboard";
  showLevel?: boolean;
}

export function XpProgress({
  currentXp,
  levelXp,
  level,
  className,
  variant = "default",
  showLevel = true,
}: XpProgressProps) {
  const percentage = Math.min(Math.floor((currentXp / levelXp) * 100), 100);

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {showLevel && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
            {level}
          </div>
        )}
        <div className="flex-1">
          <Progress value={percentage} className="h-2" />
        </div>
        <span className="text-xs font-medium">
          {currentXp}/{levelXp} XP
        </span>
      </div>
    );
  }

  if (variant === "dashboard") {
    return (
      <div className={cn("rounded-xl border p-4", className)}>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-400" />
            <h3 className="font-semibold">Experience</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
              {level}
            </div>
            <span className="text-sm font-medium text-muted-foreground">Level</span>
          </div>
        </div>
        <Progress value={percentage} className="h-3 mb-2" />
        <div className="flex justify-between text-sm">
          <span className="font-medium">{currentXp} XP</span>
          <span className="text-muted-foreground">{levelXp} XP needed</span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showLevel && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
              {level}
            </div>
          )}
          <span className="font-medium">Level {level}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentXp}/{levelXp} XP
        </span>
      </div>
      <Progress value={percentage} className="h-3" />
    </div>
  );
}
