"use client";

import {
  API_BASE_PATH,

  bookingList,

  eventList,

} from "@/lib/apiPath";

import { bookingTableHeader } from "@/lib/tableHelper";
import DashboardLayout from "app/component/DashboardLayout";
import Table from "app/component/Table";
import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


const Bookings: NextPage = () => {

  const [bookingLists, setBookingsList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [fixedPages, setFixedPages] = useState(0);
  const getBookingList = async () => {
    await axios
      .get(API_BASE_PATH + bookingList, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            const newData = response?.data?.responseData?.map(
              (item: any, index: number) => {
                item["index"] = index + 1;
                return item;
              }
            );
            setBookingsList(newData);
            setPageList(newData);
            setFixedPages(newData.length);
          } else {
            Swal.fire({
              icon: "error",
              title: `Something went wrong`,
              showConfirmButton: true,
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: `${error}`,
            showConfirmButton: true,
          });
        }
      );
  };
  useEffect(() => {
    getBookingList();
  }, []);
  const pageClick = (id: number) => {
    const newArray = bookingLists.slice(id * 10 - 10);
    setPageList(newArray);
  };




  return (
    <DashboardLayout>


      <Table
        columns={bookingTableHeader()}
        data={pageList}
        pageSize={10}
        fixedPages={fixedPages}
        onClickPage={pageClick}
      />

    </DashboardLayout>
  );
};

export default React.memo(Bookings);
