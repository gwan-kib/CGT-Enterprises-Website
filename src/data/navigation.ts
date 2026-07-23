export interface NavigationItem {
  href: `#${string}`;
  label: string;
}

export const navigationItems: NavigationItem[] = [
  { href: "#services", label: "Services" },
  { href: "#reviews", label: "Reviews" },
  { href: "#leave-review", label: "Leave a review" },
  { href: "#faq", label: "FAQ" },
];
