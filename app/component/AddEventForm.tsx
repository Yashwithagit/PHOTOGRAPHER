"use client";

import { AppColors, DurationList, EventType, StatusType } from "@/lib/constant";
import { FieldLabelProps, PackageProps } from "@/lib/types";
import { Button, CardContainer } from "@/styles/globalStyles";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format, parseISO } from 'date-fns';
import { Form } from "houseform";
import { NextPage } from "next";
import InputField from "app/component/HouseFormComponent/InputField";
import SelectField from "app/component/HouseFormComponent/SelectField";
import axios from "axios";
import { API_BASE_PATH, addEvent, addPackage, upDateEvent } from "@/lib/apiPath";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoadingSpinner from "app/component/LoadingSpinner";
import { useAuth } from "@/context/auth";

interface addEventProps {
  title?: string;
  location?: string;
  event_type?: number;
  event_date?: number;
  status?: number;
  description?: string;
  image?: any;
  onclose?: Function;
  data?: any
}

const AddEventForm: React.FC<addEventProps> = ({ onclose = () => { }, data }) => {
  const router = useRouter();
  const [eventData, setEventData] = useState<any>(data ? data : {})
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const formValidation = (data: addEventProps) => {
    if (
      !data.title ||
      !data.location ||
      !data.event_type ||
      !data.event_date ||
      !data.status ||
      !data.description ||
      !data.image
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
    if (formValidation(data)) {
      if (!eventData.event_id) {

        const formData = new FormData()

        formData.append('image', data?.image ? data?.image : '')
        const id = localStorage.getItem("id");
        const idValue = id !== null ? id : ''; // Convert null to an empty string
        formData.append('p_id', idValue);
        formData.append('title', data?.title ? data?.title : '')
        formData.append('description', data?.description ? data?.description : '')
        formData.append('type', data?.event_type ? String(data.event_type) : '');
        formData.append('type', data?.event_date ? String(data.event_date) : '');
        formData.append('type', data?.status ? String(data.status) : '');
        formData.append('caption', data?.location ? data?.location : '')


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
    } else {
      await axios
        .post(API_BASE_PATH + upDateEvent + eventData.event_id, data, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(
          (response) => {
            if (response.data.responseCode === 100001) {
              Swal.fire({
                icon: "success",
                title: 'updated successfully',
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
  };
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Handle authentication redirection or rendering an unauthorized message
    return <LoadingSpinner></LoadingSpinner>;
  }
  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     // const reader = new FileReader();
  //     // reader.onload = () => {
  //     //   if (reader.result && typeof reader.result === 'string') {
  //     //     setBase64Image((reader.result).substring("data:image/png;base64,".length));
  //     //   }
  //     // };
  //     // reader.readAsDataURL(file);
  //     const blob = await convertToBase64(file);
  //     console.log(blob);
  //   }

  // };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      convertToBase64(file);
    }
  };
  const convertToBase64 = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target) {
        const base64String = event.target.result as string;
        const base64Image = base64String.split(",")[1];
        console.log(base64Image);
        setBase64Image(base64Image);
      }
    };

    reader.readAsDataURL(file);
  };
  const handleInput = (e: any) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value })
  }

  return (
    <FormOuterContainer>
      <Form<addEventProps>
        onSubmit={(data) => {
          onFormSubmit(data);
        }}
      >
        {({ isValid, submit, reset, value: formValue }) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <>
                <FieldContainer>
                  <FieldLabel>Title</FieldLabel>
                  <InputField
                    width="12.4rem"
                    name={"title"}
                    type={"text"}
                    label={"Name"
                    }
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
                  <FieldLabel>Event Type</FieldLabel>
                  <SelectField
                    name={"event_type"}
                    type={"select"}
                    onChange={handleInput}
                    label={"Select Event Type"}
                    options={EventType}
                    initialValue={eventData.event_type}
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
                    initialValue={eventData.event_date && format(parseISO(eventData.event_date), "yyyy-MM-dd")}
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
                    width="12.4rem"
                    name={"image"}

                    type={"file"}
                    label={"Name"}
                    acceptType="image/*"
                    onChange={handleImageChange}
                  // initialValue={eventData.image}
                  />
                </FieldContainer>

                <ButtonContainer>
                  <Button
                    onClick={(e) => {
                      onclose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={submit}>Submit</Button>
                </ButtonContainer>
              </>
            </form>
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
