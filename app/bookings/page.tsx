"use client";

import {
  API_BASE_PATH,
  eventDetail,
  eventList,
  deleteEvent,
} from "@/lib/apiPath";
import { FROM_POP_UP_TYPE, actionList } from "@/lib/constant";
import { eventsTableHeader } from "@/lib/tableHelper";
import { ModelDataProps } from "@/lib/types";
import { Button, ButtonContainer } from "@/styles/globalStyles";
import PopUp from "app/component/PopUp";
import DashboardLayout from "app/component/DashboardLayout";
import Table from "app/component/Table";
import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddEventForm from "app/component/AddEventForm";

const Bookings: NextPage = () => {
  const [modelData, setModelData] = useState<ModelDataProps>({
    show: false,
    message: <></>,
    type: 0,
  });

  const [eventLists, setEventList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [actionType, setActionType] = useState(0);
  const [fixedPages, setFixedPages] = useState(0);
  const getEventList = async () => {
    await axios
      .get(API_BASE_PATH + eventList, {
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
            setEventList(newData);
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
    getEventList();
  }, [modelData.show]);
  const pageClick = (id: number) => {
    const newArray = eventLists.slice(id * 10 - 10);
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
  const deleteEvents = async (id: number) => {
    console.log(id);
    await axios
      .get(API_BASE_PATH + deleteEvent + id, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            Swal.fire({
              icon: "success",
              title: `success`,
              showConfirmButton: true,
            });
            getEventList();
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
  // event detail
  const detailsEvent = async (id: number) => {
    await axios
      .get(API_BASE_PATH + eventDetail + id, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            setEventData(response.data.responseData);
            setModelData({ ...modelData, type: id, show: true });
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
  const actionHandle = (id: number, action: number) => {
    if (actionList.delete === action) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Delete.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result: any) => {
        if (result.isConfirmed) {
          deleteEvents(id);
        }
      });
    } else {
      action === actionList.edit
        ? setActionType(action)
        : setActionType(action);
      detailsEvent(id);
    }
  };

  console.log(fixedPages, pageList);

  return (
    <DashboardLayout>
      <ButtonContainer>
        {" "}
        <Button
          onClick={() => {
            setActionType(0);
            setModelData({
              ...modelData,
              show: true,
              type: 1,
            });
          }}
        >
          Add Event
        </Button>
      </ButtonContainer>

      <Table
        columns={eventsTableHeader(actionHandle)}
        data={pageList}
        pageSize={10}
        fixedPages={fixedPages}
        onClickPage={pageClick}
      />
      {modelData.show && (
        <PopUp popUptype={FROM_POP_UP_TYPE}>
          <AddEventForm
            onclose={handleFormClose}
            data={eventData}
            type={actionType}
          />
        </PopUp>
      )}
    </DashboardLayout>
  );
};

export default React.memo(Bookings);
