"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { IdentificationIcon } from "@heroicons/react/24/outline";

export default function SbtCard({
  tokenName,
  tokenAddress,
  selectedToken,
  selectedClass,
  description,

  handleSelect,
}: {
  tokenName: string;
  tokenAddress: string;
  selectedToken: string | null;
  selectedClass: string;
  description: string;

  handleSelect: (token: string) => void;
}) {
  function handleClick() {
    if (selectedToken === tokenName) {
      handleSelect("");
      return;
    }
    handleSelect(tokenName);
  }

  return (
    <Card
      placeholder=""
      onClick={handleClick}
      className={selectedClass + "cursor-pointer"} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <div className="flex justify-center mt-2">
        <IdentificationIcon className="h-16" />
      </div>

      <CardBody placeholder="" className="text-center" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography
          placeholder=""
          variant="h4"
          color="blue-gray"
          className="mb-2" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          {tokenName}
        </Typography>
        <Typography
          placeholder=""
          color="blue-gray"
          className="font-medium"
          textGradient onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}
