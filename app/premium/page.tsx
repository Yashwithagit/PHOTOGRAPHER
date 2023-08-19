"use client";

import { API_BASE_PATH, deletePack, packageList } from "@/lib/apiPath";
import { FROM_POP_UP_TYPE } from "@/lib/constant";
import { premiumTableHeader } from "@/lib/tableHelper";
import { ModelDataProps } from "@/lib/types";
import { Button, ButtonContainer } from "@/styles/globalStyles";
import AddPackageForm from "app/component/AddPackageForm";
import PopUp from "app/component/PopUp";
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
  const deletePackage = async (id: number) => {
    await axios
      .get(API_BASE_PATH + deletePack + id, {
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
        deletePackage(id);
      }
    });
  };

  return (
    <DashboardLayout>
      <ButtonContainer>
        {" "}
        <Button
          onClick={() =>
            setModelData({
              ...modelData,
              show: true,
              type: 1,
            })
          }
        >
          Add Package
        </Button>
      </ButtonContainer>

      <Table
        columns={premiumTableHeader(actionHandle)}
        data={pageList}
        pageSize={10}
        fixedPages={fixedPages}
        onClickPage={pageClick}
      />
      {modelData.show && (
        <PopUp popUptype={FROM_POP_UP_TYPE}>
          <AddPackageForm onclose={handleFormClose} />
        </PopUp>
      )}
    </DashboardLayout>
  );
};

export default React.memo(Premium);
