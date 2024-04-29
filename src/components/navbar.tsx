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

export default function HomeNavbar() {
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
            className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-3xl" onPointerEnterCapture="" onPointerLeaveCapture="" >
            <FingerPrintIcon className="h-12 w-12 inline-block mr-2 text-gray-500" />
            SBT<span className="font-extrabold text-purple-400">ify</span>
          </Typography>
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block"></div>
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
          <div className="w-full">
            <ConnectKitButton showBalance={true} />
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}