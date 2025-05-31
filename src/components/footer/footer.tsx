import Link from "next/link";
import React from "react";

export const Footer = () => {
  const footerLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/privacy",
      label: "Privacy",
    },
    {
      href: "/terms",
      label: "Terms",
    },
  ];

  const year = new Date().getFullYear();

  return (
    <main className="mb-10">
      <footer className=" flex items-center justify-between">
        {footerLinks.map((footer, i) => (
          <Link href={footer.href} key={i} className=" text-lg text-gray-600">
            {footer.label}
          </Link>
        ))}
      </footer>
      <p className=" text-center text-lg text-gray-600">&copy; {year} StudySmart. All rights reserved.</p>
    </main>
  );
};
