
import React from "react";
import { Link } from "react-router-dom";
import { LogiqoLogo } from "@/components/LogiqoLogo";
import { Linkedin, Twitter, Github, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-12">
      <div className="container grid gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <LogiqoLogo />
          <p className="text-sm text-muted-foreground">
            Making Data Structures and Algorithms learning fearless, fun, and unforgettable.
          </p>
          <div className="flex items-center space-x-3">
            <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
            <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} label="LinkedIn" />
            <SocialLink href="https://github.com" icon={<Github size={18} />} label="GitHub" />
            <SocialLink href="https://youtube.com" icon={<Youtube size={18} />} label="YouTube" />
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Platform</h4>
          <ul className="space-y-2 text-sm">
            <FooterLink to="/roadmap">Learning Paths</FooterLink>
            <FooterLink to="/playground">Code Playground</FooterLink>
            <FooterLink to="/challenges">Challenges</FooterLink>
            <FooterLink to="/ai-assistant">AI Assistant</FooterLink>
            <FooterLink to="/contests">Contests</FooterLink>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Community</h4>
          <ul className="space-y-2 text-sm">
            <FooterLink to="/forum">Forum</FooterLink>
            <FooterLink to="/study-groups">Study Groups</FooterLink>
            <FooterLink to="/events">Events</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/contribute">Contribute</FooterLink>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Company</h4>
          <ul className="space-y-2 text-sm">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/privacy">Privacy</FooterLink>
            <FooterLink to="/terms">Terms</FooterLink>
          </ul>
        </div>
      </div>
      <div className="container mt-12 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Logiqo. All rights reserved.
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

function FooterLink({ to, children }: FooterLinkProps) {
  return (
    <li>
      <Link
        to={to}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
