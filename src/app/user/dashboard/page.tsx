import React from 'react'
import { Connected } from "@/components/connected";
import { InfoCard } from "@/components/user/dashboard/info-card";
import { InfoTable } from "@/components/user/dashboard/info-table";
import UserNavbar from "@/components/user/navbar";

const UserDashboard = () => {
  return (
    <>
      <Connected>
        <UserNavbar />
        <div className="p-8 flex flex-col gap-4">
          <InfoCard />
          <InfoTable />
        </div>
      </Connected>
    </>
  )
}

export default UserDashboard