"use client";

import { API_BASE_PATH, packageList, service } from "@/lib/apiPath";
import { premiumTableHeader } from "@/lib/tableHelper";
import { ModelDataProps } from "@/lib/types";
import DashboardLayout from "app/component/DashboardLayout";
import Table from "app/component/Table";
import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Premium: NextPage = () => {
  const [modelData, setModelData] = useState<ModelDataProps>({
    show: false,
    message: <></>,
    type: 0,
  });

  const [packagesList, setPackagesList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [fixedPages, setFixedPages] = useState(0);
  const getFeedBack = async () => {
    await axios
      .get(API_BASE_PATH + packageList, {
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
            setPackagesList(newData);
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
    getFeedBack();
  }, [modelData.show]);
  const pageClick = (id: number) => {
    const newArray = packagesList.slice(id * 10 - 10);
    setPageList(newArray);
  };
  const handleFormClose = () => {
    setModelData({
      ...modelData,
      show: false,
      type: 0,
    });
  };

  // delete package
  const postService = async (id: number) => {
    const data = {
      p_id: Number(localStorage.getItem('id')),
      package_id: id,
      status: 2
    }
    await axios
      .post(API_BASE_PATH + service, data, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            Swal.fire({
              icon: "success",
              title: `Package has been Booked`,
              showConfirmButton: true,
            });
            getFeedBack();
          } else {
            Swal.fire({
              icon: "error",
              title: response.data.responseMessage,
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
  // handle action
  const actionHandle = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Book a Package.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result: any) => {
      if (result.isConfirmed) {


        postService(id);
      }
    });
  };

  return (
    <DashboardLayout>


      <Table
        columns={premiumTableHeader(actionHandle)}
        data={pageList}
        pageSize={10}
        fixedPages={fixedPages}
        onClickPage={pageClick}
      />

    </DashboardLayout>
  );
};

export default React.memo(Premium);
