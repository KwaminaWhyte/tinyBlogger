import React from "react";
import { Link } from "remix";

const links = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
];

function NavigationBar() {
  return (
    <nav className="h-16 w-full flex items-center bg-slate-400 px-3">
      <Link to="/">Sly GH</Link>

      <div className="flex ml-auto">
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
