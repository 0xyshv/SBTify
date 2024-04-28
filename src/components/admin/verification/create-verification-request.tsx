"use client"

import React, { useState } from "react";
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
import { DefaultSpinner } from "@/components/spinner";
// import { sbts } from "@/constants/sbt";
// import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import SuccessIcon from "@/components/icons/successIcon";
import ErrorIcon from "@/components/icons/errorIcon";

interface FormProps {
  walletAddress: string;
  sbtSymbol: string;
  tokenId: string;
}

const CreateVerificationRequest = () => {
  // const { address } = useAccount();
  const [formData, setFormData] = useState<FormProps>({
    walletAddress: "",
    sbtSymbol: "",
    tokenId: "",
  } as any);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");

  // const { write, data, isError, isLoading } = useContractWrite({
  //   address: formData.sbtSymbol ? sbts[formData.sbtSymbol].sbtAddress : "",
  //   abi: formData.sbtSymbol ? sbts[formData.sbtSymbol].abi : "",
  //   functionName: "requestForVerification",
  //   args: [
  //     formData?.walletAddress,
  //     formData?.tokenId,
  //     formData.sbtSymbol ? sbts[formData.sbtSymbol].sbtAddress : "",
  //     formData.sbtSymbol ? sbts[formData.sbtSymbol].sbtName : "",
  //     formData?.sbtSymbol,
  //   ],
  //   onError: (error) => {
  //     console.error("Error there was:", error.message);
  //   },
  //   onSuccess: (result) => {
  //     console.log("Success:", result);
  //   },
  // });

  // const {
  //   data: receipt,
  //   isSuccess,
  //   isLoading: isPending,
  // } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      formData["walletAddress"] == undefined ||
      formData["sbtSymbol"] == undefined ||
      formData["tokenId"] == undefined
    ) {
      alert("Please fill all the fields");
      return;
    }
    console.log(formData);
    // write?.();
    setFormData({ walletAddress: "", sbtSymbol: "", tokenId: "" });
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-24">
          <DefaultSpinner />
        </div>
      ) : (
        <Card placeholder="" className="mx-auto w-full max-w-[24rem]" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <CardHeader
            placeholder=""
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <Typography placeholder="" variant="h4" color="white" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Request for Verification
            </Typography>
          </CardHeader>
          <CardBody placeholder="" className="flex flex-col gap-4" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <form className="mb-4 flex flex-col gap-6" onSubmit={handleSubmit}>
              <Input
                className="focus:ring-0 "
                size="lg"
                label="SBT Holder Wallet Address"
                value={formData.walletAddress}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    walletAddress: e.target.value,
                  });
                }}
                crossOrigin={undefined}
                required={true} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              {/* <Select
                  onChange={(value: any) => {
                    setFormData({
                      ...formData,
                      sbtSymbol: value,
                    });
                  } }
                  label="Select SBT"
                  placeholder={formData.sbtSymbol}
                  value={formData.sbtSymbol} children={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                <Option value="EDU">Educational ID</Option>
                <Option value="EMP">Employee ID</Option>
                <Option value="SSN">National ID</Option>
                <Option value="PID">Passport ID</Option>
              </Select> */}
              <Input
                type="number"
                className="focus:ring-0 "
                size="lg"
                label="Document/Token ID"
                value={formData.tokenId.toString()}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    tokenId: e.target.value,
                  });
                }}
                required={true}
                crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              <Button
                placeholder=""
                color="blue"
                type="submit"
                variant="gradient"
                fullWidth onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Send Request
              </Button>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Transaction result div */}
      {/* <div className="fixed bottom-10 right-5">
        {isSuccess && (
          <Alert icon={<SuccessIcon />} color="green">
            Transaction Succesful
          </Alert>
        )}
        {isError && (
          <Alert icon={<ErrorIcon />} color="red">
            Oops! Something went wrong
          </Alert>
        )}
      </div> */}
    </div>
  );
};

export default CreateVerificationRequest;
