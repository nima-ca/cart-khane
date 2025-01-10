"use client";

import Button from "@src/components/ui/button/button";
import Drawer from "@src/components/ui/drawer/drawer";
import IconButton from "@src/components/ui/iconButton/iconButton";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <IconButton className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
        {isMenuOpen ? (
          <X aria-label="close menu button" className="text-black w-6 h-6" />
        ) : (
          <Menu aria-label="open menu button" className="text-black w-6 h-6" />
        )}
      </IconButton>

      <Drawer isOpen={isMenuOpen} onClose={closeMenu}>
        <div className="flex flex-col p-4 h-full w-full">
          <div className="self-end">
            <IconButton onClick={closeMenu}>
              <X className="text-black w-6 h-6" />
            </IconButton>
          </div>

          <div className="flex flex-col text-black justify-between h-full w-full py-5">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="font-medium hover:opacity-70 active:opacity-100 transition-all"
              >
                صفحه اصلی
              </Link>{" "}
              <Link
                href="/about-us"
                onClick={closeMenu}
                className="font-medium hover:opacity-70 active:opacity-100 transition-all"
              >
                درباره ما
              </Link>
              <Link
                href="/contact-us"
                onClick={closeMenu}
                className="font-medium hover:opacity-70 active:opacity-100 transition-all"
              >
                تماس با ما
              </Link>
            </div>
            <Button onClick={closeMenu} href="/">
              ورود به اپلیکیشن
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MobileMenu;
