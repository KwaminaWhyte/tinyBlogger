import React from "react";
import { Link } from "remix";

const links = [
  { name: "Home", href: "/" },
  { name: "Browse", href: "/blog" },
  // { name: "Blog", href: "/blog" },
];

function NavigationBar() {
  return (
    <nav className="fixed z-50 flex h-20 w-full items-center border-b border-black bg-slate-50 px-3">
      <Link to="/" className="logo text-2xl font-black">
        Sly GH
      </Link>

      <div className="ml-auto flex">
        {links.map((link) => (
          <Link key={link.name} to={link.href} className="ml-1 mr-1">
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavigationBar;
