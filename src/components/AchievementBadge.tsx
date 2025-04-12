
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Trophy, Award, Star, Zap, Target, 
  Brain, Rocket, CheckCircle, Flame,
  Code, Cpu
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type BadgeType = 
  | "streak" 
  | "completion" 
  | "speed" 
  | "accuracy" 
  | "problem-solver" 
  | "genius" 
  | "contest-winner" 
  | "explorer" 
  | "first-time" 
  | "debug-master"
  | "algorithm-master";

interface BadgeConfig {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const badgeConfigs: Record<BadgeType, BadgeConfig> = {
  streak: {
    icon: <Flame size={18} />,
    name: "Consistent Learner",
    description: "Maintain a learning streak",
  },
  completion: {
    icon: <CheckCircle size={18} />,
    name: "Completionist",
    description: "Complete all lessons in a module",
  },
  speed: {
    icon: <Zap size={18} />,
    name: "Speed Demon",
    description: "Solve problems in record time",
  },
  accuracy: {
    icon: <Target size={18} />,
    name: "Precision Coder",
    description: "Achieve high accuracy in challenges",
  },
  "problem-solver": {
    icon: <Brain size={18} />,
    name: "Problem Solver",
    description: "Solve a large number of problems",
  },
  genius: {
    icon: <Brain size={18} />,
    name: "DSA Genius",
    description: "Master complex algorithms",
  },
  "contest-winner": {
    icon: <Trophy size={18} />,
    name: "Contest Winner",
    description: "Win a coding contest",
  },
  explorer: {
    icon: <Rocket size={18} />,
    name: "Explorer",
    description: "Try out all platform features",
  },
  "first-time": {
    icon: <Star size={18} />,
    name: "First Steps",
    description: "Complete your first challenge",
  },
  "debug-master": {
    icon: <Code size={18} />,
    name: "Debug Master",
    description: "Fix a significant number of bugs",
  },
  "algorithm-master": {
    icon: <Cpu size={18} />,
    name: "Algorithm Master",
    description: "Master a specific algorithm category",
  },
};

interface AchievementBadgeProps {
  type: BadgeType;
  level?: 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md" | "lg";
  unlocked?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export function AchievementBadge({
  type,
  level = 1,
  size = "md",
  unlocked = true,
  showTooltip = true,
  className,
}: AchievementBadgeProps) {
  const config = badgeConfigs[type];
  
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const badge = (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-md border",
        unlocked 
          ? "border-border bg-background text-foreground" 
          : "border-border/40 bg-secondary/50 text-muted-foreground",
        sizeClasses[size],
        className
      )}
    >
      {React.cloneElement(config.icon as React.ReactElement, { 
        className: cn(unlocked ? "" : "opacity-50")
      })}
      {level > 1 && (
        <div className={cn(
          "absolute -right-1 -top-1 flex items-center justify-center rounded-full border border-background bg-secondary text-xs font-medium",
          size === "sm" ? "h-3.5 w-3.5 text-[8px]" : "h-4 w-4 text-[10px]"
        )}>
          {level}
        </div>
      )}
    </div>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            <div>
              <p className="font-medium">{config.name}</p>
              <p className="text-muted-foreground">{config.description}</p>
              {level > 1 && (
                <p className="mt-0.5 font-medium">Level {level}</p>
              )}
              {!unlocked && (
                <p className="mt-0.5 italic text-muted-foreground">Locked</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
}
