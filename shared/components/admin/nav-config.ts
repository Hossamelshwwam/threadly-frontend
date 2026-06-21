import {
  RiDashboardLine,
  RiUserLine,
  RiStoreLine,
  RiBox3Line,
  RiListCheck3,
  RiShoppingBag3Line,
  RiBankCardLine,
  RiStarLine,
} from "react-icons/ri";
import { IconType } from "react-icons";

export interface NavItem {
  label: string;
  href: string;
  icon: IconType;
  badge?: "pending_sellers" | "pending_payouts";
}

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: RiDashboardLine,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: RiUserLine,
  },
  {
    label: "Sellers",
    href: "/admin/sellers",
    icon: RiStoreLine,
    badge: "pending_sellers",
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: RiBox3Line,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: RiListCheck3,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: RiShoppingBag3Line,
  },
  {
    label: "Payouts",
    href: "/admin/payouts",
    icon: RiBankCardLine,
    badge: "pending_payouts",
  },

];
