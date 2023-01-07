import { NavLink, Link } from "@remix-run/react";

const links = [
  { name: "Home", href: "/" },
  { name: "Browse", href: "/blog" },
  // { name: "Login", href: "/login" },
  // { name: "Blog", href: "/blog" },
];

function NavigationBar() {
  return (
    <nav className="fixed z-50 flex h-20 w-full items-center border-b border-black bg-slate-50 px-3">
      <Link to="/" className="logo text-2xl font-black">
        tiny Blogger
      </Link>

      <div className="ml-auto flex items-center">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            className={({ isActive }) =>
              isActive
                ? "ml-1 mr-1 decoration-slice font-semibold text-black underline underline-offset-8"
                : "ml-1 mr-1"
            }
          >
            {link.name}
          </NavLink>
        ))}

        <Link
          to="/auth"
          className="mx-3 mr-auto rounded-2xl bg-black py-2 px-5 font-medium text-white shadow-md shadow-gray-400 ring-black transition-all duration-75 hover:bg-yellow-400 hover:text-black hover:ring-2"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default NavigationBar;
