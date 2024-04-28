"use client";
import {
  CheckBadgeIcon,
  CheckCircleIcon,
  ClipboardIcon,
  DocumentDuplicateIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import { useAccount, } from "wagmi";
import { useState, useEffect } from "react";
// import { authorizedUserTokenContractConfig } from "@/lib/contracts";
import { useRouter } from "next/navigation";

export function InfoCard() {
  const { address } = useAccount();
  const router = useRouter();

  const [authToken, setAuthToken] = useState<any>({
    userName: "",
    category: "",
    allowedSBTs: [],
  });

  // state 🟢
  const [tooltipContent, setTooltipContent] = useState("Copy Wallet Address");

  // 🟢 - here is onClick function
  function copyAddress() {
    navigator.clipboard.writeText(String(address));
    setTooltipContent("Address Copied!");
    setTimeout(() => {
      setTooltipContent("Copy Wallet Address");
    }, 2000);
  }

  // const { error, isLoading, isSuccess } = useContractRead({
  //   ...authorizedUserTokenContractConfig,
  //   functionName: "getVerifiedUserMetadata",
  //   args: [address],
  //   onSuccess: (data: any) => {
  //     console.log("Queried Auth Token", data);
  //     if (data?.userName === "" || data?.category === "individual") {
  //       router.push("/");
  //     }
  //     setAuthToken(data);
  //   },
  //   onError: (error) => {
  //     console.error("Error querying Auth Token", error);
  //   },
  // });

  return (
    <Card
      color="white"
      variant="gradient"
      className="w-full  p-8"
      placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 "
        placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Typography
          placeholder=""
          variant="h1"
          color="gray"
          className="font-normal uppercase" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Welcome,{" "}
          <span className="text-blue-300 font-bold"> {authToken.userName}</span>
        </Typography>
        <Typography
          placeholder=""
          variant="h6"
          color="gray"
          className="font-normal uppercase flex gap-2" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Wallet Address :{" "}
          <span className="font-semibold text-blue-400">{address}</span>{" "}
          {/* Here is copy icon 🟢 */}
          <Tooltip content={tooltipContent}>
            <span
              onClick={copyAddress}
              className="inline-flex  h-[18px] cursor-pointer"
            >
              {tooltipContent === "Address Copied!" ? (
                <CheckCircleIcon />
              ) : (
                <DocumentDuplicateIcon />
              )}
            </span>
          </Tooltip>
          {/* <Chip size="lg" color="teal" value={authToken.category} /> */}
        </Typography>
        <Typography
          placeholder=""
          variant="h5"
          color="gray"
          className="font-normal flex gap-2 mt-2" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Industry / Category : {"   "}
          <Chip size="lg" color="teal" value={authToken.category} />
        </Typography>
      </CardHeader>
      <CardBody placeholder="" className="p-0" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <ul className="flex flex-row gap-4 justify-around">
          <li className="flex items-center gap-4">
            <CheckBadgeIcon className="h-10 text-green-400" />
            <Typography placeholder="" className="font-semibold" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Authorization Token Valid
            </Typography>
          </li>
          <li className="flex items-center gap-4">
            <IdentificationIcon className="h-10 text-green-400" />

            <Typography placeholder="" className="font-semibold inline-flex" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <span className="text-3xl text-green-700">
                {authToken.allowedSBTs.length}
              </span>{" "}
              <span className="ml-2 mt-1">Allowed SBTs</span>
            </Typography>
          </li>
          <li className="flex items-center gap-4">
            <ViewfinderCircleIcon className="h-10 text-green-400" />

            <Typography placeholder="" className="font-semibold" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Can create verification requests
            </Typography>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
