"use client";

import React from "react";
import { Connected } from "@/components/connected";
import AdminNavbar from "@/components/admin/navbar";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Alert,
  Select,
  Option,
} from "@material-tailwind/react";
// import { sbts } from "@/constants/sbt";
import { DefaultSpinner } from "@/components/spinner";
import VerificationRequestsTable from "@/components/admin/verification/verification-requests-table";
import SuccessIcon from "@/components/icons/successIcon";
import ErrorIcon from "@/components/icons/errorIcon";
import {
  useAccount,
  // useContractWrite,
  // useContractRead,
  // useWaitForTransaction,
} from "wagmi";
import CreateVerificationRequest from "@/components/admin/verification/create-verification-request";
// import { authorizedUserTokenContractConfig } from "@/lib/contracts";
import { useRouter } from "next/navigation";

const AdminVerification = () => {
  const { address } = useAccount();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const router = useRouter();

  // const { } = useContractRead({
  //   ...authorizedUserTokenContractConfig,
  //   functionName: "getVerifiedUserMetadata",
  //   args: [address],
  //   onSuccess: (data: any) => {
  //     console.log("Queried Auth Token", data);
  //     if (data?.userName === "" || data?.category === "individual") {
  //       router.push("/");
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Error querying Auth Token", error);
  //   },
  // });

  return (
    <>
      <Connected>
        <AdminNavbar />
        <div className="p-8 flex flex-col gap-4">
          <div className="m-8">
            {/* <VerificationForm /> */}
            <VerificationRequestsTable requestVerification={handleOpen} />
            {/* Request for Verification Dialog */}
            <Dialog
              placeholder=""
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <CreateVerificationRequest />
            </Dialog>
          </div>
        </div>
      </Connected>
    </>
  );
};

export default AdminVerification;
