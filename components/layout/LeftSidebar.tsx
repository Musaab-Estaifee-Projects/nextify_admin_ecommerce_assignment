"use client"
import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="h-screen left-0 top-0 sticky p-8 flex flex-col gap-16 shadow-sm shadow-slate-600 max-lg:hidden">
      <div className="flex gap-2">
        <Image src="/assets/cartLogo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-[20px] font-bold flex items-center justify-center tracking-wide">
          <p className="text-orange-500">Next</p>ify Admin
        </h1>
      </div>

      <div className="flex flex-col gap-12">
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
      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p className="text-gray-400">Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
