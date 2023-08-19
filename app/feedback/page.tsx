"use client";

import { useAuth } from "@/context/auth";
import { API_BASE_PATH, userFeedback } from "@/lib/apiPath";
import {

  feedBackTableHeader,

} from "@/lib/tableHelper";
import DashboardLayout from "app/component/DashboardLayout";
import LoadingSpinner from "app/component/LoadingSpinner";
import Table from "app/component/Table";
import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FeedBack: NextPage = () => {
  const [feedbackList, setFeedBackList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [fixedPages, setFixedPages] = useState(0)
  const getFeedBack = async () => {
    await axios
      .get(API_BASE_PATH + userFeedback, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            const newData = response?.data?.responseData?.map((item: any, index: number) => {
              item['index'] = index + 1
              return item
            })
            setFeedBackList(newData)
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
    getFeedBack()
  }, [])
  const pageClick = (id: number) => {
    const newArray = feedbackList.slice(((id * 10) - 10));
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
        columns={feedBackTableHeader}
        data={pageList}
        pageSize={10}
        fixedPages={fixedPages}
        onClickPage={pageClick}
      />
    </DashboardLayout>
  );
};

export default React.memo(FeedBack);