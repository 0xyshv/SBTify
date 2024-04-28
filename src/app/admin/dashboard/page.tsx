import React from 'react'
import { Connected } from "@/components/connected";
import AdminNavbar from "@/components/admin/navbar";
import { InfoCard } from "@/components/admin/dashboard/info-card";

const AdminDashboard = () => {
  return (
    <>
      <Connected>
        <AdminNavbar />
        <div className="p-8 flex flex-col gap-4">
          <InfoCard />
        </div>
      </Connected>
    </>
  )
}

export default AdminDashboard