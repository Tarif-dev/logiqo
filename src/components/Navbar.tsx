
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlignJustify,
  X,
  Code,
  Home,
  BarChart2,
  Compass,
  Award,
  Heart,
  LogIn,
  UserPlus
} from "lucide-react";
import { LogiqoLogo } from "@/components/LogiqoLogo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <LogiqoLogo variant="glow" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-6">
            <NavLink to="/" icon={<Home size={16} />} label="Home" />
            <NavLink to="/roadmap" icon={<Compass size={16} />} label="Learning Paths" />
            <NavLink to="/playground" icon={<Code size={16} />} label="Playground" />
            <NavLink to="/challenges" icon={<BarChart2 size={16} />} label="Challenges" />
            <NavLink to="/community" icon={<Heart size={16} />} label="Community" />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <AlignJustify size={20} />}
          </Button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log in
                </Link>
              </Button>
              <Button asChild>
                <Link to="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="container space-y-1 p-4">
            <MobileNavLink to="/" icon={<Home size={16} />} label="Home" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/roadmap" icon={<Compass size={16} />} label="Learning Paths" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/playground" icon={<Code size={16} />} label="Playground" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/challenges" icon={<BarChart2 size={16} />} label="Challenges" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/community" icon={<Heart size={16} />} label="Community" onClick={() => setIsMenuOpen(false)} />
            
            {!isAuthenticated && (
              <div className="mt-4 flex items-center gap-4">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
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
}

function NavLink({ to, label, icon }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

function MobileNavLink({ to, label, icon, onClick }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-md py-2 text-muted-foreground transition-colors hover:text-foreground"
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
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-secondary">
            <span className="text-sm font-medium text-secondary-foreground">
              US
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link to="/dashboard" className="flex items-center">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/profile" className="flex items-center">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/settings" className="flex items-center">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/logout" className="flex items-center">
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
