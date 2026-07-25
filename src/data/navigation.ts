export interface NavigationItem {
  href: `#${string}`;
  icon: string;
  label: string;
}

export const navigationItems: NavigationItem[] = [
  { href: "#services", icon: "home_repair_service", label: "Services" },
  { href: "#reviews", icon: "reviews", label: "Reviews" },
  { href: "#leave-review", icon: "rate_review", label: "Leave a review" },
  { href: "#faq", icon: "quiz", label: "FAQ" },
];
