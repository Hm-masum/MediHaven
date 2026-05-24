
import { Facebook, Instagram, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import { navLinks } from "@/constants/routesGenerator";

const Footer = () => {


  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 py-12 text-gray-600 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="text-2xl space-x-1 flex items-center">
              <Image width={35} height={35} src={logo} alt="logo" />
              <h2 className="font-semibold md:text-2xl">
                Medi<span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Haven</span>
              </h2>
            </div>
          </div>
          <p className="mt-3 md:w-2/3">
           MediHaven is your trusted digital healthcare platform, designed to make medical services simple, secure, and accessible for everyone. We connect patients with reliable healthcare solutions, expert guidance, and essential medical resources in one place.
          </p>
        </div>

        <hr />
        <ul className="flex flex-col md:flex-row justify-center gap-1 md:gap-3 text-sm font-medium my-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path} className="hover:text-blue-600">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center space-x-4">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link href={href} key={index} className="hover:text-purple-600">
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
