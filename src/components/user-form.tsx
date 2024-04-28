import React, { useState, useEffect, FormEvent } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Alert,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
// import {
//   useContractWrite,
//   usePrepareContractWrite,
//   useWaitForTransaction,
// } from "wagmi";
// import { authorizedUserTokenABI } from "@/lib/abi/authorizedUserTokenAbi";
import { DefaultSpinner } from "./spinner";
import SuccessIcon from "@/components/icons/successIcon";
import ErrorIcon from "@/components/icons/errorIcon";

export function UserForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
  } as any);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleClose = () => setOpen(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  // const { config } = usePrepareContractWrite({
  //   address: "",
  //   abi: authorizedUserTokenABI,
  //   functionName: "mintDefaultAuthSbtForTesting",
  //   args: [formData.userName, "individual", []],
  // });
  // const { write, data, error, isLoading, isError } = useContractWrite(config);

  // const {
  //   data: receipt,
  //   isLoading: isPending,
  //   isSuccess,
  // } = useWaitForTransaction({ hash: data?.hash });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   write?.();
  // };
  // useEffect(() => {
  //   if (isSuccess) {
  //     router.push("/user");
  //   }
  // }, [isSuccess, router]);

  return (
    <>
      <Button placeholder="" onClick={handleOpen} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        User
      </Button>
      <Dialog
        placeholder=""
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Card placeholder="" className="mx-auto w-full max-w-[24rem]" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <CardHeader
            placeholder=""
            className="flex justify-between bg-gray-900" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <Typography
              placeholder=""
              className=" text-white font-semibold p-2"
              variant="paragraph"
              color="gray" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Register Details
            </Typography>
            <Button
              placeholder=""
              className="p-2 m-2"
              onClick={handleClose}
              color="white" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              X
            </Button>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            {isLoading ? (
              <div className="mt-8">
                <DefaultSpinner />
              </div>
            ) : (
              <>
                <CardBody placeholder="" className="flex flex-col gap-4" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <Typography placeholder="" className="-mb-2" variant="h6" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Your Name
                  </Typography>
                  <Input
                    crossOrigin=""
                    type="text"
                    placeholder="Your Name"
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    label="userName"
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    required={true}
                    value={formData.userName}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        userName: e.target.value,
                      });
                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                </CardBody>
                <CardFooter placeholder="" className="pt-0" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <Button
                    placeholder=""
                    variant="gradient"
                    type="submit"
                    fullWidth onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                    Register
                  </Button>
                </CardFooter>
              </>
            )}
          </form>
        </Card>
      </Dialog>
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
}
