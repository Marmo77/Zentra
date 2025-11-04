import React from "react";

const Footer = () => {
  const footerItems = [
    {
      label: "Privacy Policy",
      href: "#",
    },
    {
      label: "Terms",
      href: "#",
    },
    {
      label: "Contact",
      href: "#",
    },
  ];

  return (
    <div className="w-full h-20 text-center bg-background/20 border-t border-footer-line flex items-end">
      {/* <span className="max-w-6xl">Footer</span> */}
      <div className="container mx-auto px-10 py-2">
        <div className="flex flex-col items-center gap-3 justify-center">
          <div className="flex gap-4">
            {footerItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-light text-muted-foreground hover:text-foreground duration-300 ease-in-out transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <span className="text-xs font-light text-muted-foreground">
            &copy; {new Date().getFullYear()} Zentra. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
