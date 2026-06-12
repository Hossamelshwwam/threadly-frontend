import {
  RiDashboardLine,
  RiShoppingBag3Line,
  RiFileList3Line,
  RiWallet3Line,
  RiStore2Line,
  RiMessage2Line,
} from "react-icons/ri";
import { IconType } from "react-icons";

export interface SellerNavItem {
  label: string;
  href: string;
  icon: IconType;
}

export const sellerNavItems: SellerNavItem[] = [
  {
    label: "Dashboard",
    href: "/seller",
    icon: RiDashboardLine,
  },
  {
    label: "My Products",
    href: "/seller/products",
    icon: RiShoppingBag3Line,
  },
  {
    label: "Fulfillment & Orders",
    href: "/seller/orders",
    icon: RiFileList3Line,
  },
  {
    label: "Earnings & Payouts",
    href: "/seller/payouts",
    icon: RiWallet3Line,
  },
  {
    label: "My Reviews",
    href: "/seller/reviews",
    icon: RiMessage2Line,
  },
  {
    label: "Store Profile",
    href: "/seller/profile",
    icon: RiStore2Line,
  },
];
