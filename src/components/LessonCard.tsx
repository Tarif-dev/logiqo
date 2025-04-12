
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart, Lock, CheckCircle, ArrowRight } from "lucide-react";

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

  return (
    <Link
      to={isLocked ? "#" : `/lessons/${id}`}
      className={cn(
        "card-minimal relative overflow-hidden p-4 hover-lift",
        isLocked && "cursor-not-allowed opacity-60",
        className
      )}
    >      
      <div className="flex justify-between gap-2">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            {status === "completed" && (
              <Badge variant="secondary" className="px-1.5 py-0 h-5 text-[10px] gap-1 font-medium">
                <CheckCircle size={12} />
                Completed
              </Badge>
            )}
            {status === "in-progress" && (
              <Badge variant="secondary" className="px-1.5 py-0 h-5 text-[10px] gap-1 font-medium">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                In Progress
              </Badge>
            )}
            {difficulty === "beginner" && (
              <Badge variant="outline" className="px-1.5 py-0 h-5 text-[10px] font-normal border-green-500/20 text-green-500">
                Beginner
              </Badge>
            )}
            {difficulty === "intermediate" && (
              <Badge variant="outline" className="px-1.5 py-0 h-5 text-[10px] font-normal border-blue-500/20 text-blue-500">
                Intermediate
              </Badge>
            )}
            {difficulty === "advanced" && (
              <Badge variant="outline" className="px-1.5 py-0 h-5 text-[10px] font-normal border-orange-500/20 text-orange-500">
                Advanced
              </Badge>
            )}
            {difficulty === "expert" && (
              <Badge variant="outline" className="px-1.5 py-0 h-5 text-[10px] font-normal border-red-500/20 text-red-500">
                Expert
              </Badge>
            )}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock size={12} />
              <span>{duration} min</span>
            </div>
          </div>
          
          <h3 className="text-base font-medium">{title}</h3>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {description}
          </p>
        </div>
        
        {thumbnailUrl && (
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded border border-border/60">
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform"
            />
          </div>
        )}
      </div>
      
      <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <BarChart size={12} />
          <span>{xpReward} XP</span>
        </div>
        
        {isLocked ? (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lock size={12} />
            <span>Locked</span>
          </div>
        ) : (
          <Badge variant="secondary" className="h-5 px-2 gap-1 text-[10px]">
            <span>Continue</span>
            <ArrowRight size={10} />
          </Badge>
        )}
      </div>
    </Link>
  );
}
