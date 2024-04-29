"use client"

import React from 'react'
import { Connected } from "@/components/connected";
import UserNavbar from "@/components/user/navbar";
import VerificationTable from "@/components/user/verification/verification-table";
import { useAccount, useContractRead } from "wagmi";
import { authorizedUserTokenContractConfig } from "@/lib/contracts";
import { useRouter } from "next/navigation";

const UserVerification = () => {
  const { address } = useAccount();
  const router = useRouter();

  const { error, isSuccess } = useContractRead({
    ...authorizedUserTokenContractConfig,
    functionName: "getVerifiedUserMetadata",
    args: [address],
    onSuccess: (data: any) => {
      console.log("Queried Auth Token", data);
      if (data?.userName === "" || !(data?.category == "individual")) {
        router.push("/");
      }
    },
    onError: (error: any) => {
      console.error("Error querying Auth Token", error);
    },
  });

  return (
    <>
      <Connected>
        <UserNavbar />
        <div className="p-8 flex flex-col gap-4">
          <VerificationTable />
        </div>
      </Connected>
    </>
  )
}

export default UserVerification