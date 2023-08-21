"use client";

import { EventType, StatusType, actionList } from "@/lib/constant";
import { FieldLabelProps } from "@/lib/types";
import { Button } from "@/styles/globalStyles";
import React, { useState } from "react";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import { Form } from "houseform";
import InputField from "app/component/HouseFormComponent/InputField";
import SelectField from "app/component/HouseFormComponent/SelectField";
import axios from "axios";
import { API_BASE_PATH, addEvent, upDateEvent } from "@/lib/apiPath";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoadingSpinner from "app/component/LoadingSpinner";
import { useAuth } from "@/context/auth";
import Thumbnail from "./Thumbnail";

interface addEventProps {
  title?: string;
  location?: string;
  event_type?: number;
  event_date?: number;
  status?: number;
  description?: string;
  image?: any;
  onclose?: Function;
  data?: any;
  type?: number;
}

const AddEventForm: React.FC<addEventProps> = ({
  onclose = () => { },
  data,
  type
}) => {
  console.log(data)
  const [imageNameStatus, setImageNameStatus] = useState(true)
  const [eventData, setEventData] = useState<any>(data && type !== 0 ? data : {});


  const formValidation = (data: addEventProps) => {
    if (
      !data.title ||
      !data.location ||
      !data.event_type ||
      !data.event_date ||
      !data.status ||
      !data.description || (!eventData.event_id && !eventData.image) ||
      (!data.image && type == 0)
    ) {
      Swal.fire({
        icon: "warning",
        title: "info",
        text: "Please Enter Mandatory Fields...",
      });
      return false;
    } else return true;
  };
  const onFormSubmit = async (data: addEventProps) => {
    console.log(data)
    if (formValidation(data)) {
      console.log(isNaN(eventData.event_id))
      if (isNaN(eventData.event_id)) {
        console.log(data)
        const formData = new FormData();
        formData.append("image", data?.image ? data?.image : "");
        const id = localStorage.getItem("id");
        const idValue = id !== null ? id : ""; // Convert null to an empty string
        formData.append("p_id", idValue);
        formData.append("title", data?.title ? data?.title : "");
        formData.append(
          "description",
          data?.description ? data?.description : ""
        );
        formData.append(
          "event_type",
          data?.event_type ? String(data.event_type) : ""
        );
        formData.append(
          "event_date",
          data?.event_date ? String(data.event_date) : ""
        );
        formData.append("status", data?.status ? String(data.status) : "");
        formData.append("location", data?.location ? data?.location : "");

        await axios
          .post(API_BASE_PATH + addEvent, formData, {
            headers: { "content-type": "application/x-www-form-urlencoded" },
          })
          .then(
            (response) => {
              if (response.data.responseCode === 100001) {
                Swal.fire({
                  icon: "success",
                  title: "success",
                  showConfirmButton: false,
                  timer: 1000,
                }).then((result) => {
                  if (result.isDismissed) {
                    onclose();
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: `Invalid Event`,
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
      }
      else {
        console.log(data)
        const formData = new FormData();

        formData.append("image", eventData?.image ? eventData?.image : "");
        const id = localStorage.getItem("id");
        const idValue = id !== null ? id : ""; // Convert null to an empty string
        formData.append("p_id", idValue);
        formData.append("title", eventData?.title ? eventData?.title : "");
        formData.append(
          "description",
          eventData?.description ? eventData?.description : ""
        );
        formData.append(
          "event_type",
          data?.event_type ? String(data.event_type) : String(eventData.event_type)
        );
        formData.append(
          "event_date",
          eventData?.event_date ? String(eventData.event_date) : ""
        );
        formData.append("status", eventData?.status ? String(eventData.status) : "");
        formData.append("location", eventData?.location ? eventData?.location : "");

        await axios
          .post(API_BASE_PATH + upDateEvent + eventData.event_id, formData, {
            headers: { "content-type": "application/x-www-form-urlencoded" },
          })
          .then(
            (response) => {
              if (response.data.responseCode === 100001) {
                Swal.fire({
                  icon: "success",
                  title: "updated successfully",
                  showConfirmButton: false,
                  timer: 1000,
                }).then((result) => {
                  if (result.isDismissed) {
                    onclose();
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: `Invalid Event`,
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
      }
    }
  };

  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Handle authentication redirection or rendering an unauthorized message
    return <LoadingSpinner></LoadingSpinner>;
  }

  const handleInput = (e: any) => {
    console.log(e.target.value)
    setImageNameStatus(!(type !== 0 && e.target.name === 'image'));

    setEventData({ ...eventData, [e.target.name]: e.target.value });

  };

  return (
    <FormOuterContainer>
      <Form<addEventProps>
        onSubmit={(data) => {
          onFormSubmit(data);
        }}
      >
        {({ isValid, submit, reset, value: formValue }) => {
          return (
            <main>
              <FieldContainer>
                <FieldLabel>Title</FieldLabel>
                <InputField
                  width="12.4rem"
                  name={"title"}
                  type={"text"}
                  label={"Name"}
                  onChange={handleInput}
                  initialValue={eventData.title}
                  placeholder="Enter the Event Title"
                />
              </FieldContainer>

              <FieldContainer>
                <FieldLabel>Location</FieldLabel>
                <InputField
                  width="12.4rem"
                  name={"location"}
                  type={"text"}
                  label={"Name"}
                  onChange={handleInput}
                  placeholder=""
                  initialValue={eventData.location}
                />
              </FieldContainer>
              <FieldContainer>
                <FieldLabel>Event Type{eventData.event_type}</FieldLabel>
                <SelectField
                  name={"event_type"}
                  type={"select"}
                  onChange={handleInput}
                  label={"Select Event Type"}
                  options={EventType}
                  initialValue={eventData?.event_type}
                />
              </FieldContainer>
              <FieldContainer>
                <FieldLabel>Event Date</FieldLabel>
                <InputField
                  width="12.4rem"
                  name={"event_date"}
                  type={"date"}
                  label={"Name"}
                  onChange={handleInput}
                  initialValue={
                    eventData.event_date &&
                    format(parseISO(eventData.event_date), "yyyy-MM-dd")
                  }
                />
              </FieldContainer>
              <FieldContainer>
                <FieldLabel>Status</FieldLabel>
                <SelectField
                  name={"status"}
                  type={"select"}
                  onChange={handleInput}
                  label={"Select Status"}
                  options={StatusType}
                  initialValue={eventData.status}
                />
              </FieldContainer>
              <FieldContainer>
                <FieldLabel>Description</FieldLabel>
                <InputField
                  width="12.4rem"
                  name={"description"}
                  type={"textArea"}
                  onChange={handleInput}
                  label={"Name"}
                  placeholder=""
                  initialValue={eventData.description}
                />
              </FieldContainer>
              <FieldContainer>
                <FieldLabel>Select Image</FieldLabel>
                <InputField
                  width='12.4rem'
                  name={"image"}
                  type={"file"}
                  label={"Name"}
                  acceptType='image/*'
                  // initialValue={galleryData?.image}
                  onChange={(e: any) =>
                    setEventData({ ...eventData, [e.target.name]: e.target.files[0] })
                  }
                />
                {/* {type !== 0 && imageNameStatus && (
                  <label>{galleryData?.image}</label>
                )} */}


              </FieldContainer>
              {type !== 0 && <Thumbnail src={eventData.url} alt="images" />}

              <ButtonContainer>
                <Button
                  type="button"
                  onClick={() => {
                    onclose();
                  }}
                >
                  Cancel
                </Button>

                <Button disabled={type == actionList.view} onClick={submit}>Submit</Button>
              </ButtonContainer>
            </main>
          );
        }}
      </Form>
    </FormOuterContainer>
  );
};

export default React.memo(AddEventForm);

const FieldLabel = styled.label<FieldLabelProps>`
  padding: 0.3rem 0rem;
  margin: auto 0.3rem;
  text-align: left;
  white-space: nowrap;
  width: ${(props) => (props.width ? props.width : "6rem")};
`;

const FormOuterContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;
