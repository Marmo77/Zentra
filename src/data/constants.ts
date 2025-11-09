interface NavigationNavbarProps {
  label: string;
  href: string;
}

export const AppConstants = {
  Website: {
    Title: "Zentra",
    github: "https://github.com/Marmo77/Zentra",
    iconPath: "/web-icon.svg",
  },
  Navigation: {
    navbar: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Features", href: "#features" },
      { label: "Contact", href: "#contact" },
    ] as NavigationNavbarProps[],
    footer: {
      Privacy: "/privacy",
      Terms: "/terms",
      Contact: "/home#contact",
    },
  },
};
