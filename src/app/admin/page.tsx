"use client";

import HomeNavbar from "@/components/navbar";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { sbts } from "@/constants/sbt";
import React, { useEffect, useState } from "react";
import { Button, Alert } from "@material-tailwind/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { DefaultSpinner } from "@/components/spinner";
import SuccessIcon from "@/components/icons/successIcon";
import ErrorIcon from "@/components/icons/errorIcon";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({} as any);
  const [open, setOpen] = React.useState(true);
  const { address } = useAccount();

  const { write, data, error, isLoading, isError } = useContractWrite({
    address: sbts.AUTH.sbtAddress,
    abi: sbts.AUTH.abi,
    functionName: "mintDefaultAuthSbtForTesting",
    args: [
      address,
      formData.userName,
      formData.category,
      [
        sbts.EDU.sbtAddress,
        sbts.EMP.sbtAddress,
        sbts.SSN.sbtAddress,
        sbts.PID.sbtAddress,
      ],
    ],
  });
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    if (isSuccess) {
      router.push("/admin/dashboard");
    }
  }, [isSuccess]);

  function mintDefaultAuthSbtForTesting(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Address :", address, "User Name:", formData.userName);
    write?.();
    setFormData({});
  }

  return (
    <>
      <HomeNavbar />
      <div className="w-full">
        <form
          onSubmit={mintDefaultAuthSbtForTesting}
          className="lg:px-48 px-4 w-[80%] flex flex-col justify-center items-center mx-auto mt-20"
        >
          {isLoading ? (
            <div className="mt-8 flex justify-center">
              <DefaultSpinner />
            </div>
          ) : (
            <>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-lg text-center font-semibold leading-7 text-gray-900 mt-4">
                    Register as Admin
                  </h2>
                  <p className="mt-1 text-center text-sm leading-6 text-gray-600">
                    Please make sure you fill all the details correctly.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* User Name */}
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        User Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="string"
                          required={true}
                          value={formData.userName}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              userName: e.target.value,
                            });
                          }}
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    {/* Category */}
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Industry
                      </label>
                      <div className="mt-2">
                        <input
                          type="string"
                          required={true}
                          value={formData.category}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            });
                          }}
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  placeholder=""
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Register
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
      <div className="fixed bottom-10 right-5">
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
      </div>
    </>
  );
};

export default Admin;
