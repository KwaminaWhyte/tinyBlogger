import { NavLink, Link, Form } from "@remix-run/react";
import Popper from "popper.js";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./DropDown";

const links = [
  { name: "Home", href: "/" },
  { name: "Browse", href: "/blogs" },
  // { name: "Login", href: "/login" },
  // { name: "Blog", href: "/blog" },
];

function NavigationBar({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // new Popper(buttonRef?.current, dropdownRef.current, {
    //   placement: "bottom-start",
    // });
  }, []);

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
                ? "ml-1 mr-1 decoration-slice text-sm font-semibold text-black underline underline-offset-8"
                : "ml-1 mr-1 text-sm"
            }
          >
            {link.name}
          </NavLink>
        ))}

        {isAuthenticated ? (
          <div className="relative flex items-center">
            <Dropdown>
              <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-800 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                  >
                    More
                    <svg
                      className="ml-2 -mr-0.5 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </Dropdown.Trigger>

              <Dropdown.Content>
                <Dropdown.Link href="create/blog/new" label="New Blog" />
                <Dropdown.Link href="user/profile" label="Profile" />
              </Dropdown.Content>
            </Dropdown>

            <button
              ref={buttonRef}
              className="ml-3 flex items-center rounded-full bg-gray-200 px-2 py-1 text-sm transition-all duration-300 hover:bg-gray-300"
              onClick={toggleDropdown}
            >
              <p>{user?.email}</p>
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                alt="profile_image"
              />
            </button>
            {isOpen && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 z-10 mt-2 w-52 list-none rounded-lg bg-white py-2 text-base font-medium leading-6 text-gray-700 shadow-xl"
              >
                <li className="px-4 py-1 hover:bg-gray-100">
                  <Form className="block w-full px-4 py-1" method="post">
                    <button className="w-full text-left text-red-600">
                      Logout
                    </button>
                  </Form>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            className="mx-3 mr-auto rounded-2xl bg-black py-2 px-5 text-sm font-medium text-white shadow-md shadow-gray-400 ring-black transition-all duration-75 hover:bg-yellow-400 hover:text-black hover:ring-2"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
