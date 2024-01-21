import React from "react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { Link } from "@remix-run/react";
import logoWhite from "~/assets/Penrodes_logo_Horizintal-17.png";
// import { Theme, useTheme } from "remix-themes";

export default function Footer() {
  // const [theme, setTheme] = useTheme();
  // console.log(theme);

  return (
    <footer className="flex mt-11 bg-[#ff0000] text-white ">
      <div className=" mx-auto md:w-[85%] flex flex-col w-[93%]">
        <section className="flex gap-5 py-14 flex-wrap-reverse">
          <Link to="/">
            <img src={logoWhite} alt="" className="h-16" />
          </Link>

          <div className="ml-auto flex flex-col gap-2">
            <p className="font-semibold text-white">TOP POSTS & PAGES</p>
            <ul>
              <li> - 35 of the Best Book Club Books You'll Read This Year</li>
              <li> - 12 of The Best Independent Bookstores in NYC</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold ext-white text-white">CONTACT INFO</p>
            <p className="ext-white text-white">contact@blogger.com</p>
          </div>
        </section>

        <section className="flex items-center justify-between md:flex-row flex-col-reverse border-t border-white py-8 ">
          <p className="montage-fon mt-3 md:mt-0 mx-auto md:mx-0 text-white">
            Made with ❤️ by KwaminaWhyte
          </p>
          <div className="flex items-center gap-5">
            <FacebookIcon className="w-6 h-6 text-white" />
            <InstagramIcon className="w-6 h-6 text-white" />
            <YoutubeIcon className="w-6 h-6 text-white" />
          </div>
        </section>
      </div>
    </footer>
  );
}
