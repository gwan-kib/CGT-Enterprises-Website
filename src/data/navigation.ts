export interface NavigationItem {
  href: `#${string}`;
  icon: string;
  label: string;
}

export const navigationItems: NavigationItem[] = [
  { href: "#home", icon: "arrow_upward", label: "Top" },
  { href: "#services", icon: "home_repair_service", label: "Services" },
  { href: "#faq", icon: "quiz", label: "FAQ" },
  { href: "#contact", icon: "call", label: "Contact" },
  { href: "#reviews", icon: "star_shine", label: "Reviews" },
  { href: "#leave-review", icon: "rate_review", label: "Leave a review" },
];
