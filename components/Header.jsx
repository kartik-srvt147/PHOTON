"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Header = () => {
  const path = usePathname();
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-3 flex items-center justify-between gap-8">
        <Link href="/" className="mr-10 md:mr-20">
          <Image
            src="/photon-logo.png"
            alt="Photon Logo"
            className="min-w-24 object-cover"
            width={96}
            height={24}
          />
        </Link>

        {path === "/" && (
          <div className="hidden md:flex space-x-6">
            <Link
              href="#features"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-200 cursor-pointer"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-200 cursor-pointer"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-200 cursor-pointer"
            >
              Contact
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 ml-10 md:ml-20">
          {/* < className="relative z-40 flex justify-end gap-2 px-4 pt-28 sm:px-8"> */}
          <Show when="signed-out">
            <SignInButton>
              <Button variant="glass">Sign in</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="primary">Sign up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;
