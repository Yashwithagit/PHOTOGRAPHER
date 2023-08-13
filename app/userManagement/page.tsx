"use client";

import {
  userManagementData,
  userManagementTableHeader,
} from "@/lib/tableHelper";
import DashboardLayout from "app/component/DashboardLayout";
import Table from "app/component/Table";
import { NextPage } from "next";
import React from "react";

const UserManagement: NextPage = () => {
  return (
    <DashboardLayout>
    <Table
      columns={userManagementTableHeader}
      data={userManagementData}
      pageSize={10}
    />
    </DashboardLayout>
  );
};

export default React.memo(UserManagement);
