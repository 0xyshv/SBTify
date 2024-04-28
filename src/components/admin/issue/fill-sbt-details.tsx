import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import { sbts } from "@/constants/sbt";
import React, { useState } from "react";
import { Button, Alert } from "@material-tailwind/react";
// import {
//   useContractWrite,
//   usePrepareContractWrite,
//   useWaitForTransaction,
// } from "wagmi";
import { DefaultSpinner } from "@/components/spinner";
import SuccessIcon from "@/components/icons/successIcon";
import ErrorIcon from "@/components/icons/errorIcon";

export default function FillSbtDetails({
  tokenName,
  tokenAddress,
}: {
  tokenName: string;
  tokenAddress: any;
}) {
  const [formData, setFormData] = useState({} as any);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  // const { config } = usePrepareContractWrite({
  //   address: tokenAddress,
  //   abi: sbts[tokenName].abi,
  //   functionName: "issueCredential",
  //   args: prepareIssueCredentialArgs(formData),
  // });

  // const { write, data, error, isError } = useContractWrite(config);
  // const {
  //   data: receipt,
  //   isLoading,
  //   isSuccess,
  // } = useWaitForTransaction({ hash: data?.hash });

  // function prepareIssueCredentialArgs(formData: any) {
  //   const sbtObject = sbts[tokenName];
  //   let args: string[] = [];
  //   args[0] = formData["Wallet Address"];

  //   sbtObject.sbtFields.forEach((field: any) => {
  //     args.push(formData[field.title]);
  //   });

  //   return args;
  // }

  function issueCredential(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // write?.();
    setFormData({} as any);
  }

  const validateEthAddress = (address: string) => {
    // Ethereum addresses are 40 characters long and start with '0x'
    const ethAddressRegExp = /^0x[0-9a-fA-F]{40}$/;

    return ethAddressRegExp.test(address);
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={issueCredential} className="lg:px-48 px-4">
          {isLoading ? (
            <div className="mt-8 flex justify-center">
              <DefaultSpinner />
            </div>
          ) : (
            <>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900 mt-4">
                    {/* Credential Information for {sbts[tokenName].sbtName} */}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Please make sure you fill all the details correctly.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* {sbts[tokenName].sbtFields.map((field: any) => (
                      <div className="sm:col-span-6">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          {field.title}
                        </label>
                        <div className="mt-2">
                          <input
                            type={field.type}
                            required={true}
                            value={formData[field.title]}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                [field.title]: e.target.value,
                              });
                            }}
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    ))} */}

                    {/* Issue to wallet address */}
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Issue to wallet address
                      </label>
                      <input
                        type="string"
                        required={true}
                        value={formData["Wallet Address"]}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            ["Wallet Address"]: e.target.value,
                          });
                          setIsValid(validateEthAddress(e.target.value));
                        }}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {isValid ? (
                        <p className="text-green-600">Valid Ethereum Address</p>
                      ) : (
                        <p className="text-red-600">
                          Enter valid Ethereum Address
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  placeholder=""
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={!isValid} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Issue SBT
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
      {/* <div className="fixed bottom-10 right-5">
        {isSuccess && (
          <Alert
            open={open}
            onClose={() => setOpen(false)}
            icon={<SuccessIcon />}
            color="green"
          >
            Credential Issued Successfully
          </Alert>
        )}

        {isError && (
          <Alert
            open={open}
            onClose={() => setOpen(false)}
            icon={<ErrorIcon />}
            color="red"
          >
            Oops! There was an error.
          </Alert>
        )}
      </div> */}
    </>
  );
}
