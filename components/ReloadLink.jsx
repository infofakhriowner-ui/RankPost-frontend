"use client";

export default function ReloadLink({ href, children, ...props }) {
  return (
    <a
      {...props}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = href; // full refresh
      }}
    >
      {children}
    </a>
  );
}
