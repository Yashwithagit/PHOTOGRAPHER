import {
  FaHome,
  FaListUl,
  FaMoneyCheckAlt,
  FaPenSquare,
  FaUserEdit,
  FaUserFriends,
  FaSignOutAlt
} from "react-icons/fa";

type MenuOption = {
  name: string;
  icon: React.ComponentType;
  url: string;
  subItems?: MenuOption[];
};

const MENU_OPTIONS: MenuOption[] = [
  {
    name: "Dashboard",
    icon: FaHome,
    url: "/",
  },
  // {
  //   name: "Orders",
  //   icon: FaListUl,
  //   url: "/orders",
  //   subItems: [
  //     {
  //       name: "New",
  //       icon: FaListUl,
  //       url: "/new-orders",
  //     },
  //     {
  //       name: "Completed",
  //       icon: FaListUl,
  //       url: "/completed-orders",
  //     },
  //   ],
  // },
  // {
  //   name: "Customers",
  //   icon:FaListUl,
  //   url: "/customers",
  //   subItems: [
  //     {
  //       name: "Corporate",
  //       icon: FaListUl,
  //       url: "/corporate",
  //     },
  //     {
  //       name: "SMB",
  //       icon: FaListUl,
  //       url: "/smb",
  //       subItems: [
  //         {
  //           name: "Retail",
  //           icon: FaListUl,
  //           url: "/retail",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    name: "User Management",
    icon: FaUserFriends,
    url: "/userManagement",
  },
  {
    name: "Photographer Management",
    icon: FaUserEdit,
    url: "/photographerManagement",
  },
  {
    name: "Premium",
    icon: FaMoneyCheckAlt,
    url: "/premium",
  },
  {
    name: "Feed Back",
    icon: FaPenSquare,
    url: "/feedback",
  },
  {
    name: "Sign Out",
    icon: FaSignOutAlt,
    url: "",
  },
];

export type MenuItem = {
  name: string;
  icon: React.ComponentType;
  url: string;
  id: string;
  depth: number;
  subItems?: MenuItem[];
};

function makeMenuLevel(options: MenuOption[], depth = 0): MenuItem[] {
  return options.map((option, idx) => ({
    ...option,
    id: depth === 0 ? idx.toString() : `${depth}.${idx}`,
    depth,
    subItems:
      option.subItems && option.subItems.length > 0
        ? makeMenuLevel(option.subItems, depth + 1)
        : undefined,
  }));
}

export const MENU_ITEMS: MenuItem[] = makeMenuLevel(MENU_OPTIONS);
