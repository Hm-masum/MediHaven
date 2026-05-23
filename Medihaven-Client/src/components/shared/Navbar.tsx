"use client";

import Image from "next/image";
import logo from "../../assets/logo.png";
import Link from "next/link";
import { navLinks } from "@/constants/routesGenerator";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

  return (
    <div className="px-3 py-2 backdrop-blur-3xl bg-white/55 dark:bg-white/35 sticky top-0 z-10">
      <div className="md:max-w-7xl mx-auto flex items-center justify-between">
        {/* menu bar */}
        <button className="lg:hidden p-2 flex items-center justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="border-[#003060] p-1.5 md:px-3 md:py-1 rounded-md text-5xl md:text-6xl" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center my-3 justify-center">
                    <Image width={40} height={40} src={logo} alt="" />
                    <h2 className="font-semibold text-xl md:text-3xl">
                      Medi
                      <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Haven
                      </span>
                    </h2>
                  </div>
                </SheetTitle>

                <SheetDescription className="mt-5 flex flex-col w-full items-center justify-center gap-5">
                  {navLinks.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      className={
                        pathname == item.path
                          ? "text-blue-700 dark:text-blue-300 border-b-2 border-blue-700 dark:border-blue-300"
                          : ""
                      }
                    >
                      {item.title}
                    </Link>
                  ))}
                </SheetDescription>
              </SheetHeader>
              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>
        </button>

        {/* logo */}
        <Link href="/" className="flex items-center w-[25%]">
          <Image width={40} height={40} src={logo} alt="" />
          <h2 className="font-semibold text-xl md:text-2xl">
            Medi
            <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Haven</span>
          </h2>
        </Link>

        {/* nav links */}
        <ul className="hidden lg:flex items-center justify-center space-x-5">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={
                pathname == item.path
                  ? "text-blue-700 dark:text-blue-300 border-b-2 border-blue-700 dark:border-blue-300"
                  : ""
              }
            >
              {item.title}
            </Link>
          ))}
        </ul>

        <div className="md:w-[25%] flex items-center justify-center md:justify-end gap-3 md:gap-5">
          {/* Theme */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {user ? (
            <ProfileDropdown />
          ) : (
            <Link href={`/login`}>
              <Button
                variant="outline"
                className="bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
