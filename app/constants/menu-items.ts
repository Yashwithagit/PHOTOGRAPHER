import {
  FaHome,
  FaRegistered,
  FaMoneyCheckAlt,
  FaPenSquare,
  FaUserFriends,
  FaSignOutAlt
} from "react-icons/fa";
import {
  MdEvent
  
} from "react-icons/md";
import {
 GrGallery
  
} from "react-icons/gr";

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
    url: "/dashBoard",
  },
  
  
  
  {
    name: "Client/ Users",
    icon: FaUserFriends,
    url: "/userManagement",
  },
   
  {
    name: "Events",
    icon: MdEvent,
    url: "/events",
  },
  
  {
    name: "Services",
    icon: FaMoneyCheckAlt,
    url: "/premium",
  },
  {
    name: "Gallery",
    icon: GrGallery,
    url: "/gallery",
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
