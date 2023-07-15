import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Navmenu({ open, setOpen }) {
  const router = useRouter();
  const navLink = [
    {
      name: "Home",
      link: "/",
    },
    
  ];
  return (
    <nav>
      {navLink.map(({ link, name }) => (
        <Link
          key={name}
          href={link}
          className={`${
            router.pathname === link ? "text-indigo-600" : "text-black"
          } font-bold uppercase`}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
export default function Header(props) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${props.bgslate} py-5 border-b border-black/10 px-3 md:px-0`}>
      <div className={`max-w-5xl mx-auto justify-center md:justify-between`}>
        <Navmenu />
      </div>
    </header>
  );
}
