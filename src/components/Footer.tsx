
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, Twitter, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/10 bg-background py-8">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h4 className="mb-3 text-sm font-medium">Platform</h4>
            <ul className="space-y-2">
              <FooterLink to="/roadmap">Roadmap</FooterLink>
              <FooterLink to="/playground">Playground</FooterLink>
              <FooterLink to="/challenges">Challenges</FooterLink>
              <FooterLink to="/community">Community</FooterLink>
              <FooterLink to="/resources">Resources</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium">Account</h4>
            <ul className="space-y-2">
              <FooterLink to="/login">Login</FooterLink>
              <FooterLink to="/signup">Sign Up</FooterLink>
              <FooterLink to="/settings">Settings</FooterLink>
              <FooterLink to="/profile">Profile</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium">Company</h4>
            <ul className="space-y-2">
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium">Legal</h4>
            <ul className="space-y-2">
              <FooterLink to="/terms">Terms</FooterLink>
              <FooterLink to="/privacy">Privacy</FooterLink>
              <FooterLink to="/cookies">Cookies</FooterLink>
              <FooterLink to="/licenses">Licenses</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between border-t border-border/10 pt-8 sm:flex-row sm:items-center">
          <p className="mb-4 text-xs text-muted-foreground sm:mb-0">
            &copy; {new Date().getFullYear()} DSA Learning Platform. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <SocialLink href="https://twitter.com" icon={<Twitter size={16} />} label="Twitter" />
            <SocialLink href="https://github.com" icon={<Github size={16} />} label="GitHub" />
            <SocialLink href="https://discord.com" icon={<MessageSquare size={16} />} label="Discord" />
          </div>
        </div>
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
        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
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
      className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
