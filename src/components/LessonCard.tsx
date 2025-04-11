
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart, Lock, CheckCircle } from "lucide-react";

type LessonStatus = "completed" | "in-progress" | "locked" | "available";
type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  status: LessonStatus;
  duration: number; // in minutes
  difficulty: DifficultyLevel;
  xpReward: number;
  thumbnailUrl?: string;
  className?: string;
}

export function LessonCard({
  id,
  title,
  description,
  status,
  duration,
  difficulty,
  xpReward,
  thumbnailUrl,
  className,
}: LessonCardProps) {
  const isLocked = status === "locked";
  
  const difficultyColors: Record<DifficultyLevel, string> = {
    beginner: "bg-green-500",
    intermediate: "bg-blue-500",
    advanced: "bg-purple-500",
    expert: "bg-red-500",
  };

  const statusIndicator = {
    completed: <CheckCircle size={16} className="text-green-500" />,
    "in-progress": <div className="h-2 w-2 rounded-full bg-blue-500" />,
    locked: <Lock size={16} className="text-muted-foreground" />,
    available: <div className="h-2 w-2 rounded-full bg-secondary" />,
  };

  return (
    <Link
      to={isLocked ? "#" : `/lessons/${id}`}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md",
        isLocked && "cursor-not-allowed opacity-75",
        className
      )}
    >
      {status === "completed" && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-green-500/20 p-1">
          <CheckCircle size={16} className="text-green-500" />
        </div>
      )}
      
      {/* Thumbnail */}
      <div className="relative h-40 w-full overflow-hidden bg-muted">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <span className="text-4xl font-bold text-primary/40">{title.charAt(0)}</span>
          </div>
        )}
        
        {/* Difficulty badge */}
        <Badge 
          className={cn(
            "absolute bottom-2 left-2", 
            difficultyColors[difficulty],
            "text-white border-none"
          )}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Badge>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {statusIndicator[status]}
            <span className="text-xs font-medium text-muted-foreground">
              {status === "completed" 
                ? "Completed" 
                : status === "in-progress" 
                ? "In Progress" 
                : status === "locked" 
                ? "Locked" 
                : "Available"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>{duration} min</span>
          </div>
        </div>
        
        <h3 className="mb-1 line-clamp-2 text-lg font-semibold">{title}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <BarChart size={12} className="text-primary" />
            <span>{xpReward} XP</span>
          </div>
          
          {isLocked ? (
            <div className="flex items-center gap-1 text-xs">
              <Lock size={12} />
              <span>Complete previous lessons</span>
            </div>
          ) : (
            <Badge variant="outline" className="text-xs">
              Start {status === "in-progress" ? "Again" : "Learning"}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
