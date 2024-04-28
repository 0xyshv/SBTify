"use client";
import React, { use } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
// import { useAccount, useContractRead } from "wagmi";
// import { sbts } from "@/constants/sbt";

interface ViewModalProps {
  sbtName: string;
  sbtSymbol: string;
  sbtAddress: `0x${string}`;
  status: string;
  tokenId: string;
}

export function ViewModal({
  sbtName,
  sbtSymbol,
  sbtAddress,
  status,
  tokenId,
}: ViewModalProps) {
  // const { address } = useAccount();
  const [open, setOpen] = React.useState(false);
  const [sbtData, setSbtData] = React.useState<any>({});

  console.log(sbtAddress, sbtSymbol, tokenId, sbtName);

  // const { data, isRefetching } = useContractRead({
  //   address: sbtAddress, // Fix: Prefix sbtAddress with '0x'
  //   abi: sbts[sbtSymbol].abi,
  //   functionName: "verifyCredential",
  //   args: [tokenId],
  //   account: address,
  //   onSuccess: (data: any) => {
  //     console.log("Data", data);
  //     setSbtData(data);
  //   },
  // });

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {status === "Approved" ? (
        <Button
          onClick={handleOpen}
          color="green"
          variant="gradient"
          placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          View
        </Button>
      ) : (
        <Button color="green" placeholder={""} variant="gradient" disabled onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          -NA-
        </Button>
      )}

      <Dialog open={open} handler={handleOpen} placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <DialogHeader
          className="flex justify-center items-center"
          placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          {sbtName}
        </DialogHeader>
        <DialogBody placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className="bg-green-200 w-96 p-8 rounded-lg shadow-xl max-w-sm mx-auto border deep-purple-700">
            <ul>
              {Object.keys(sbtData).map((field: string) => (
                <li key={field} className="text-black">
                  <strong>
                    <span className="">{field}</span> :{" "}
                    {String(sbtData?.[field])}
                  </strong>{" "}
                </li>
              ))}
            </ul>
          </div>
        </DialogBody>
        <DialogFooter placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button
            variant="gradient"
            color="green"
            onClick={handleOpen}
            fullWidth
            placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
