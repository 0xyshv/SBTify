"use client";
import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";
import { ViewModal } from "./view-modal";
// import { sbts } from "@/constants/sbt";
import { useAccount } from "wagmi";

const TABLE_HEAD = ["Credential Name", "Credential Symbol", "Token ID", ""];

export function InfoTable() {
  const { address } = useAccount();
  const [filteredRows, setFilteredRows] = useState([]);
  const [walletSbts, setWalletSbts] = useState<any>([]);
  const [tooltipContent, setTooltipContent] = useState("Copy Address");

  // const {} = useContractRead({
  //   address: sbts.EMP.sbtAddress,
  //   abi: sbts.EMP.abi,
  //   functionName: "getTokenIdsByWallet",
  //   args: [],
  //   account: address,
  //   onSuccess: (data: any) => {
  //     data.forEach((sbt: any) => {
  //       setWalletSbts((prev: any) => [
  //         ...prev,
  //         {
  //           sbtName: sbts.EMP.sbtName,
  //           sbtSymbol: sbts.EMP.sbtSymbol,
  //           sbtAddress: sbts.EMP.sbtAddress,
  //           tokenId: sbt,
  //         },
  //       ]);
  //     });
  //     console.log("Token IDs", data);
  //   },
  //   onError: (error) => {
  //     console.error("Error querying Auth Token", error);
  //   },
  // });

  // const {} = useContractRead({
  //   address: sbts.EDU.sbtAddress,
  //   abi: sbts.EDU.abi,
  //   functionName: "getTokenIdsByWallet",
  //   args: [],
  //   account: address,
  //   onSuccess: (data: any) => {
  //     data.forEach((sbt: any) => {
  //       setWalletSbts((prev: any) => [
  //         ...prev,
  //         {
  //           sbtName: sbts.EDU.sbtName,
  //           sbtSymbol: sbts.EDU.sbtSymbol,
  //           sbtAddress: sbts.EDU.sbtAddress,
  //           tokenId: sbt,
  //         },
  //       ]);
  //     });
  //     console.log("Token IDs", data);
  //   },
  //   onError: (error) => {
  //     console.error("Error querying Auth Token", error);
  //   },
  // });

  // const {} = useContractRead({
  //   address: sbts.SSN.sbtAddress,
  //   abi: sbts.SSN.abi,
  //   functionName: "getTokenIdsByWallet",
  //   args: [],
  //   account: address,
  //   onSuccess: (data: any) => {
  //     data.forEach((sbt: any) => {
  //       setWalletSbts((prev: any) => [
  //         ...prev,
  //         {
  //           sbtName: sbts.SSN.sbtName,
  //           sbtSymbol: sbts.SSN.sbtSymbol,
  //           sbtAddress: sbts.SSN.sbtAddress,
  //           tokenId: sbt,
  //         },
  //       ]);
  //     });
  //     console.log("Token IDs", data);
  //   },
  //   onError: (error) => {
  //     console.error("Error querying Auth Token", error);
  //   },
  // });

  // const {} = useContractRead({
  //   address: sbts.PID.sbtAddress,
  //   abi: sbts.PID.abi,
  //   functionName: "getTokenIdsByWallet",
  //   args: [],
  //   account: address,
  //   onSuccess: (data: any) => {
  //     data.forEach((sbt: any) => {
  //       setWalletSbts((prev: any) => [
  //         ...prev,
  //         {
  //           sbtName: sbts.PID.sbtName,
  //           sbtSymbol: sbts.PID.sbtSymbol,
  //           sbtAddress: sbts.PID.sbtAddress,
  //           tokenId: sbt,
  //         },
  //       ]);
  //     });
  //     console.log("Token IDs", data);
  //   },
  //   onError: (error) => {
  //     console.error("Error querying Auth Token", error);
  //   },
  // });

  useEffect(() => {
    setFilteredRows(walletSbts);
  }, [walletSbts]);

  function copyAddress(address: string) {
    navigator.clipboard.writeText(address);
    setTooltipContent("Address Copied!");
    setTimeout(() => {
      setTooltipContent("Copy Address");
    }, 2000);
  }

  return (
    <Card className="h-full w-full" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none"
        placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <div className="mb-0 flex items-center justify-between gap-4">
          <div>
            <Typography variant="h5" color="blue-gray" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Owned Credentials / SBTs
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal"
              placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              List of all soul-bound tokens (SBTs) that you hold.
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-none px-0" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length == 0 ? (
              <>
                <div className="w-full m-4">No data found</div>
              </>
            ) : (
              filteredRows.map(
                ({ sbtName, sbtSymbol, sbtAddress, tokenId }, index) => {
                  const isLast = index === walletSbts.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={sbtName}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                              {sbtName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                              placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                              {String(sbtAddress).substring(0, 6) +
                                "..." +
                                String(sbtAddress).substring(
                                  String(sbtAddress).length - 6
                                )}
                              {/* Add a span of copy icon here 🟢*/}
                              <Tooltip content={tooltipContent}>
                                <span
                                  onClick={() => {
                                    copyAddress(sbtAddress);
                                  }}
                                  className="inline-flex ml-1 h-[15px] cursor-pointer"
                                >
                                  <DocumentDuplicateIcon />
                                </span>
                              </Tooltip>
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="black"
                            className="font-bold"
                            placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                          >
                            {sbtSymbol}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="black"
                            className="font-bold"
                            placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                          >
                            {String(tokenId)}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex flex-col">
                          <ViewModal
                            sbtName={sbtName}
                            sbtSymbol={sbtSymbol}
                            tokenId={tokenId}
                            status="Approved"
                            sbtAddress={sbtAddress}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
