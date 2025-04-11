
import React from "react";
import { cn } from "@/lib/utils";

interface LogiqoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "minimal" | "glow";
}

export function LogiqoLogo({ 
  className, 
  size = "md", 
  variant = "default" 
}: LogiqoLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };
  
  const variantClasses = {
    default: "",
    minimal: "text-foreground",
    glow: "glow-text",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn(
        "relative flex items-center justify-center rounded-full bg-gradient-to-br from-logiqo-blue via-logiqo-indigo to-logiqo-blue", 
        sizeClasses[size],
        variant === "glow" && "glow-effect"
      )}>
        {/* Stylized Q shape */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={cn("h-3/4 w-3/4", variantClasses[variant])}
        >
          <path 
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.5746 20 16.9204 18.8149 18.4217 17" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <path 
            d="M14.5 14.5L18.5 18.5" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <path 
            d="M12 8V16" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      {variant !== "minimal" && (
        <span className={cn(
          "ml-3 text-2xl font-bold tracking-tight", 
          size === "lg" && "text-3xl",
          size === "xl" && "text-4xl",
          variant === "glow" && "glow-text"
        )}>
          Logiqo
        </span>
      )}
    </div>
  );
}
