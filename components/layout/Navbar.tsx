"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { navLinks } from "@/lib/constants";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdownMenu = () => setDropdownMenu(!dropdownMenu);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setDropdownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="top-0 z-20 w-full flex justify-between items-center px-6 py-4 shadow-xl lg:hidden">
      <div className="flex gap-2">
        <Image src="/assets/cartLogo.svg" alt="logo" width={40} height={40} />
        <h1 className="max-sm:text-[20px] text-[25px] font-bold flex items-center justify-center tracking-wide">
          <p className="text-orange-500">Next</p>ify Admin
        </h1>
      </div>

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-orange-500" : "text-gray-400"
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={toggleDropdownMenu}
        />
        {dropdownMenu && (
          <div
            ref={menuRef}
            className={`absolute top-10 right-6 flex flex-col gap-8 p-5 border rounded-lg bg-[#1a1a1e]`}
          >
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className={`flex gap-4 text-body-medium ${
                  pathname === link.url ? "text-orange-500" : "text-gray-400"
                }`}
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
