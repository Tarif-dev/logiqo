
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Trophy, Award, Star, Zap, Target, 
  Brain, Rocket, CheckCircle, FireExtinguisher,
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
  color: string;
}

const badgeConfigs: Record<BadgeType, BadgeConfig> = {
  streak: {
    icon: <FireExtinguisher size={24} />,
    name: "Consistent Learner",
    description: "Maintain a learning streak",
    color: "from-orange-500 to-amber-500",
  },
  completion: {
    icon: <CheckCircle size={24} />,
    name: "Completionist",
    description: "Complete all lessons in a module",
    color: "from-green-500 to-emerald-500",
  },
  speed: {
    icon: <Zap size={24} />,
    name: "Speed Demon",
    description: "Solve problems in record time",
    color: "from-yellow-400 to-yellow-600",
  },
  accuracy: {
    icon: <Target size={24} />,
    name: "Precision Coder",
    description: "Achieve high accuracy in challenges",
    color: "from-blue-500 to-sky-500",
  },
  "problem-solver": {
    icon: <Brain size={24} />,
    name: "Problem Solver",
    description: "Solve a large number of problems",
    color: "from-violet-500 to-purple-600",
  },
  genius: {
    icon: <Brain size={24} />,
    name: "DSA Genius",
    description: "Master complex algorithms",
    color: "from-indigo-500 to-blue-600",
  },
  "contest-winner": {
    icon: <Trophy size={24} />,
    name: "Contest Winner",
    description: "Win a coding contest",
    color: "from-amber-400 to-yellow-500",
  },
  explorer: {
    icon: <Rocket size={24} />,
    name: "Explorer",
    description: "Try out all platform features",
    color: "from-pink-500 to-rose-500",
  },
  "first-time": {
    icon: <Star size={24} />,
    name: "First Steps",
    description: "Complete your first challenge",
    color: "from-cyan-400 to-teal-500",
  },
  "debug-master": {
    icon: <Code size={24} />,
    name: "Debug Master",
    description: "Fix a significant number of bugs",
    color: "from-red-500 to-pink-600",
  },
  "algorithm-master": {
    icon: <Cpu size={24} />,
    name: "Algorithm Master",
    description: "Master a specific algorithm category",
    color: "from-emerald-500 to-teal-600",
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
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: 14,
    md: 24,
    lg: 32,
  };

  const levelIndicator = level > 1 ? (
    <div className={cn(
      "absolute -bottom-1 -right-1 flex items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-bold text-secondary-foreground",
      size === "sm" && "h-4 w-4 text-[10px]",
      size === "md" && "h-5 w-5",
      size === "lg" && "h-6 w-6"
    )}>
      {level}
    </div>
  ) : null;

  const badge = (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-full",
        unlocked 
          ? `bg-gradient-to-br ${config.color}` 
          : "bg-muted text-muted-foreground",
        unlocked ? "" : "opacity-50",
        sizeClasses[size],
        className
      )}
    >
      {React.cloneElement(config.icon as React.ReactElement, { 
        size: iconSizes[size],
        className: "text-white"
      })}
      {levelIndicator}
    </div>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent side="top">
            <div className="text-center">
              <p className="font-bold">{config.name}</p>
              <p className="text-xs text-muted-foreground">{config.description}</p>
              {level > 1 && (
                <p className="mt-1 text-xs font-semibold">Level {level}</p>
              )}
              {!unlocked && (
                <p className="mt-1 text-xs italic text-muted-foreground">Locked</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
}
