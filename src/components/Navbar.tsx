
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AlignRight,
  X,
  Code,
  Home,
  BarChart2,
  Compass,
  MessageSquare,
  LogIn,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-medium tracking-tight">
            DSA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-1 md:items-center">
            <NavLink to="/" icon={<Home size={16} />} label="Home" isActive={isActive("/")} />
            <NavLink to="/roadmap" icon={<Compass size={16} />} label="Roadmap" isActive={isActive("/roadmap")} />
            <NavLink to="/playground" icon={<Code size={16} />} label="Playground" isActive={isActive("/playground")} />
            <NavLink to="/challenges" icon={<BarChart2 size={16} />} label="Challenges" isActive={isActive("/challenges")} />
            <NavLink to="/community" icon={<MessageSquare size={16} />} label="Community" isActive={isActive("/community")} />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="px-2"
          >
            {isMenuOpen ? <X size={18} /> : <AlignRight size={18} />}
          </Button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log in
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border/10 md:hidden">
          <div className="container space-y-1 p-4">
            <MobileNavLink to="/" icon={<Home size={16} />} label="Home" onClick={() => setIsMenuOpen(false)} isActive={isActive("/")} />
            <MobileNavLink to="/roadmap" icon={<Compass size={16} />} label="Roadmap" onClick={() => setIsMenuOpen(false)} isActive={isActive("/roadmap")} />
            <MobileNavLink to="/playground" icon={<Code size={16} />} label="Playground" onClick={() => setIsMenuOpen(false)} isActive={isActive("/playground")} />
            <MobileNavLink to="/challenges" icon={<BarChart2 size={16} />} label="Challenges" onClick={() => setIsMenuOpen(false)} isActive={isActive("/challenges")} />
            <MobileNavLink to="/community" icon={<MessageSquare size={16} />} label="Community" onClick={() => setIsMenuOpen(false)} isActive={isActive("/community")} />
            
            {!isAuthenticated && (
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </Link>
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <Link to="/signup">
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

function NavLink({ to, label, icon, isActive }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive 
          ? "bg-secondary text-foreground" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

function MobileNavLink({ to, label, icon, isActive, onClick }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md py-2 px-3 text-sm font-medium transition-colors",
        isActive 
          ? "bg-secondary text-foreground" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <UserCircle size={18} />
          <span className="hidden sm:inline">Account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/logout" className="flex items-center">
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
