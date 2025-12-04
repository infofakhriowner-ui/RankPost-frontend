"use client";

import Link from "next/link";

export default function ReloadLink({ href, children, className = "", ...props }) {
  const handleClick = (e) => {
    e.preventDefault(); // Stop Next.js SPA navigation
    window.location.href = href; // FORCE full page reload
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
