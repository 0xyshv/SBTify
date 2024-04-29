"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Connected } from "@/components/connected";
import AdminNavbar from "@/components/admin/navbar";
import StepperIssueSbt from "@/components/admin/issue/stepper";
import { useAccount } from "wagmi";
import { useContractRead } from "wagmi";
import { authorizedUserTokenContractConfig } from "@/lib/contracts";
import { useRouter } from "next/navigation";

const AdminIssue = () => {
  const searchParams = useSearchParams();
  const tokenName = searchParams.get("tokenName");
  const tokenAddress = searchParams.get("tokenAddress");

  const { address } = useAccount();
  const router = useRouter();

  const { error, isLoading, isSuccess } = useContractRead({
    ...authorizedUserTokenContractConfig,
    functionName: "getVerifiedUserMetadata",
    args: [address],
    onSuccess: (data: any) => {
      console.log("Queried Auth Token", data);
      if (data?.userName === "" || data?.category === "individual") {
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
        <AdminNavbar />
        <div className="p-8 flex flex-col gap-4">
          {" "}
          <StepperIssueSbt tokenName={tokenName} tokenAddress={tokenAddress} />
        </div>
      </Connected>
    </>
  )
}

export default AdminIssue