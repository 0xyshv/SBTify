"use client";
import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  IdentificationIcon,
  CheckBadgeIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import { ConnectKitButton } from "connectkit";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navListItems = [
  {
    label: "Dashboard",
    icon: UserCircleIcon,
    href: "/admin/dashboard",
    active: false,
  },
  {
    label: "Issue a SBT",
    icon: IdentificationIcon,
    href: "/admin/issue",
    active: false,
  },
  {
    label: "Request for Verification",
    icon: CheckBadgeIcon,
    href: "/admin/verification",
    active: false,
  },
];

function NavList() {
  const pathname = usePathname();
  // console.log(pathname);

  switch (pathname) {
    case "/admin/dashboard":
      navListItems[0].active = true;
      navListItems[1].active = false;
      navListItems[2].active = false;
      break;

    case "/admin/issue":
      navListItems[0].active = false;
      navListItems[1].active = true;
      navListItems[2].active = false;
      break;

    case "/admin/verification":
      navListItems[0].active = false;
      navListItems[1].active = false;
      navListItems[2].active = true;
      break;

    default:
      break;
  }

  return (
    <ul className="mb-4 mt-2  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, href, active }, key) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <Link href={href}>
            <Typography
              placeholder=""
              key={label}
              variant="small"
              color="blue-gray"
              className="font-normal" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <MenuItem
                placeholder=""
                className={active
                  ? "flex items-center gap-2 lg:rounded-full font-bold bg-blue-gray-50"
                  : "flex items-center gap-2 lg:rounded-full"} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
                {label}
              </MenuItem>
            </Typography>
          </Link>
        );
      })}
    </ul>
  );
}

export default function AdminNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className="">
      <br />
      <Navbar className="mx-auto p-2 lg:rounded-[16px] lg:pl-6" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="mx-auto flex justify-between items-center text-blue-gray-900">
          <Typography
            placeholder=""
            as="a"
            href="/"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-3xl" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <FingerPrintIcon className="h-12 w-12 inline-block mr-2 text-gray-500" />
            SBT<span className="font-extrabold text-purple-400">ify</span>
          </Typography>
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList />
          </div>
          <IconButton
            placeholder=""
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          {/* <ProfileMenu /> */}
          <div className="hidden lg:block ">
            <ConnectKitButton showBalance={true} />
          </div>
        </div>
        <MobileNav open={isNavOpen} className="">
          <NavList />
          <div className="w-full">
            <ConnectKitButton showBalance={true} />
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
