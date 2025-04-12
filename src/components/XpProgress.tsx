
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
          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-secondary text-xs font-medium text-secondary-foreground">
            {level}
          </div>
        )}
        <div className="flex-1">
          <Progress value={percentage} className="h-1.5" />
        </div>
        <span className="text-xs text-muted-foreground">
          {currentXp}/{levelXp}
        </span>
      </div>
    );
  }

  if (variant === "dashboard") {
    return (
      <div className={cn("rounded-md border border-border/60 p-4", className)}>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-muted-foreground" />
            <h3 className="text-sm font-medium">Experience</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-xs font-medium">
              {level}
            </div>
          </div>
        </div>
        <Progress value={percentage} className="h-1.5 mb-2" />
        <div className="flex justify-between text-xs">
          <span className="font-medium">{currentXp}</span>
          <span className="text-muted-foreground">{levelXp} needed</span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showLevel && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs font-medium">
              {level}
            </div>
          )}
          <span className="text-sm font-medium">Level {level}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {currentXp}/{levelXp}
        </span>
      </div>
      <Progress value={percentage} className="h-1.5" />
    </div>
  );
}
