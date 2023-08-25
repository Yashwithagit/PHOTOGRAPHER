"use client";

import { useAuth } from "@/context/auth";
import { API_BASE_PATH, bookingDetail, usersList } from "@/lib/apiPath";
import {

  userManagementTableHeader,

} from "@/lib/tableHelper";
import DashboardLayout from "app/component/DashboardLayout";
import LoadingSpinner from "app/component/LoadingSpinner";
import Table from "app/component/Table";
import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserManagement: NextPage = () => {
  const [userList, setUserList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [fixedPages, setFixedPages] = useState(0);
  const p_id=Number(localStorage.getItem('id'))
  const getUserList = async () => {
    await axios
      .get(API_BASE_PATH + bookingDetail+p_id, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            const newData = response?.data?.responseData?.map((item: any, index: number) => {
              item['index'] = index + 1
              return item
            })
            setUserList(newData)
            setPageList(newData)
            setFixedPages(newData.length)

          } else {
            Swal.fire({
              icon: 'error',
              title: `Something went wrong`,
              showConfirmButton: true,

            })
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: `${error}`,
            showConfirmButton: true,

          })
        }
      );
  }
  useEffect(() => {
    getUserList()
  }, [])
  const pageClick = (id: number) => {
    const newArray = userList.slice(((id * 10) - 10));
    setPageList(newArray)
  }
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Handle authentication redirection or rendering an unauthorized message
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <DashboardLayout>
      <Table
        columns={userManagementTableHeader}
        data={pageList}
        pageSize={10}
        fixedPages={fixedPages}
        onClickPage={pageClick}
      />
    </DashboardLayout>
  );
};

export default React.memo(UserManagement);