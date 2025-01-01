"use client";

import IconButton from "@src/components/ui/iconButton/iconButton";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <IconButton
        className="lg:hidden"
        onClick={() => setIsMenuOpen((prevState) => !prevState)}
      >
        {isMenuOpen ? (
          <X className="text-black w-6 h-6" />
        ) : (
          <Menu className="text-black w-6 h-6" />
        )}
      </IconButton>
    </>
  );
};

export default MobileMenu;
