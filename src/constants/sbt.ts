import { authorizedUserTokenABI } from "@/lib/abi/authorizedUserTokenAbi";
import { educationalIdContractABI } from "@/lib/abi/educationalIdAbi";
import { employeeIdContractABI } from "@/lib/abi/employeeIdAbi";
import { nationalIdContractABI } from "@/lib/abi/nationalIdAbi";
import { passportIdContractABI } from "@/lib/abi/passportIdAbi";

export const sbts: { [key: string]: any } = {
  AUTH: {
    sbtSymbol: "AUTH",
    sbtName: "AuthorizedUser Token",
    sbtAddress: "0x415c26A2686000E9D8Dc65e3282697f073A0e9EE",
    sbtFields: [
      { title: "User Name", type: "string" },
      { title: "Category", type: "string" },
      { title: "Allowed SBTs", type: "string" },
    ],
    abi: authorizedUserTokenABI,
    active: true,
  },
  EDU: {
    sbtSymbol: "EDU",
    sbtName: "Educational ID",
    sbtAddress: "0xf113B8bb4bd7CBE6aA291c918D5289A06361F269",
    sbtFields: [
      { title: "Holder Name", type: "string" },
      { title: "Institution", type: "string" },
      { title: "Course", type: "string" },
      { title: "Year Of Passing", type: "number" },
      { title: "Grade", type: "string" },
    ],
    abi: educationalIdContractABI,
    active: true,
  },
  EMP: {
    sbtSymbol: "EMP",
    sbtName: "Employee ID",
    sbtAddress: "0xD5Eec5AaEE792ef19a22B2cf8Ac9D74aB1fEc200",
    sbtFields: [
      { title: "ID", type: "number" },
      { title: "Employee Name", type: "string" },
      { title: "Position", type: "string" },
      { title: "Date Of Joining", type: "date" },
    ],
    abi: employeeIdContractABI,
    active: true,
  },
  SSN: {
    sbtSymbol: "SSN",
    sbtName: "National ID",
    sbtAddress: "0x5421b8fc58c16330402e2Ec72FDb23E59dE99500",
    sbtFields: [
      { title: "ID", type: "number" },
      { title: "Holder Name", type: "string" },
      { title: "Gender", type: "string" },
      { title: "Date Of Birth", type: "date" },
    ],
    abi: nationalIdContractABI,
    active: true,
  },
  PID: {
    sbtSymbol: "PID",
    sbtName: "Passport ID",
    sbtAddress: "0x2ed1aD0bea7508D1fd1458F8a06154147Ed0511C",
    sbtFields: [
      { title: "Passport Number", type: "string" },
      { title: "Holder Name", type: "string" },
      { title: "Nationality", type: "string" },
      { title: "Date Of Birth", type: "date" },
      { title: "Gender", type: "string" },
      { title: "Place Of Issue", type: "string" },
      { title: "Date Of Expiry", type: "date" },
    ],
    abi: passportIdContractABI,
    active: true,
  },
};
