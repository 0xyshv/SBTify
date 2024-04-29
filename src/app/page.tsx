"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import HomeNavbar from "@/components/navbar";
import { useAccount, useContractRead } from "wagmi";
import { authorizedUserTokenContractConfig } from "@/lib/contracts";

export default function App() {
  const { address, isDisconnected } = useAccount();
  const router = useRouter();
  const [isUnregistered, setIsUnregistered] = useState(false);

  // to check if the user is registered or not
  const { error, isLoading, isSuccess } = useContractRead({
    ...authorizedUserTokenContractConfig,
    functionName: "getVerifiedUserMetadata",
    args: [address],

    onSuccess: (data: any) => {
      if (data?.userName === "") {
        // router.push("/");
        setIsUnregistered(true);
      } else if (data?.category === "individual") {
        router.push("/user/dashboard");
      } else router.push("/admin/dashboard");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  return (
    <>
      <HomeNavbar />
      <main className="flex min-h-screen flex-col gap-10 items-center justify-between p-24">
        <div className="text-center">
          {" "}
          <Card className="mt-6 mx-20" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <CardBody placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Typography
                placeholder=""
                variant="h5"
                color="blue-gray"
                className="mb-2" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Hello there 👋
              </Typography>
              <Typography placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Connect your wallet to get started.
                <br />
                <br />
              </Typography>
              <Typography
                placeholder=""
                variant="h5"
                color="blue-gray"
                className="mb-2 font-semibold text-purple-400" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Your gateway to sovereign identity
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <ConnectKitButton />
            </CardFooter>
          </Card>
        </div>
        {isUnregistered && (
          <div className="text-center mt-6 mx-20 py-8">
            {" "}
            {/* <Card placeholder="" className="mt-6 mx-20 py-8"> */}
            You are not registered
            <Typography
              placeholder=""
              variant="h5"
              color="blue-gray"
              className="mb-2" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Register as
            </Typography>
            <div>
              <Button
                placeholder=""
                onClick={() => {
                  router.push("/user");
                }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                User
              </Button>
              <Button
                placeholder=""
                className="ml-8"
                onClick={() => {
                  router.push("/admin");
                }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Admin
              </Button>
            </div>
            {/* </Card> */}
          </div>
        )}
      </main>
    </>
  );
}
