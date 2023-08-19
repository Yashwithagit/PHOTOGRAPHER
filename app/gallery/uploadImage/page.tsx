"use client";

import { AppColors, DurationList, EventType, StatusType } from '@/lib/constant';
import { FieldLabelProps, PackageProps } from '@/lib/types';
import { Button, CardContainer } from '@/styles/globalStyles'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import { Form } from "houseform";
import { NextPage } from 'next';
import InputField from 'app/component/HouseFormComponent/InputField';
import SelectField from 'app/component/HouseFormComponent/SelectField';
import axios from 'axios';
import { API_BASE_PATH, addGallery, addPackage } from '@/lib/apiPath';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import LoadingSpinner from 'app/component/LoadingSpinner';
import { useAuth } from '@/context/auth';
import DashboardLayout from 'app/component/DashboardLayout';

interface uploadImageProps {
  title?: string;
  description?: string;
  type?: number;
  p_id?: number;
  caption?: string;
  image?: string;

}

const UploadImage: React.FC = () => {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const router = useRouter();
  const formValidation = (data: uploadImageProps) => {

    if (!data.title || !data.description || !data.caption || !data.image || !data.type) {
      Swal.fire({
        icon: 'warning',
        title: 'info',
        text: 'Please Enter Mandatory Fields...',

      })
      console.log(data);
      return false

    } else return true

  }
  const onFormSubmit = async (data: uploadImageProps) => {


    if (formValidation(data)) {
      const req = {
        ...data,
        p_id: localStorage.getItem("id"
        ),
        image: base64Image
      }
      console.log(req, data);
      await axios
        .post(API_BASE_PATH + addGallery, req, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(
          (response) => {
            if (response.data.responseCode === 100001) {
              Swal.fire({
                icon: 'success',
                title: 'success',
                showConfirmButton: false,
                timer: 1000
              }).then((result) => {
                if (result.isDismissed) {
                  router.push('/gallery')
                  //  onclose()
                }
              })

            } else {
              Swal.fire({
                icon: 'error',
                title: `Invalid Gallery Details`,
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


  };
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Handle authentication redirection or rendering an unauthorized message
    return <LoadingSpinner></LoadingSpinner>;
  }

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

  return (
    <DashboardLayout>
      <FormOuterContainer>
        <Form<uploadImageProps>
          onSubmit={(data) => {
            onFormSubmit(data)
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

                    <FieldLabel>Related</FieldLabel>
                    <SelectField

                      name={"type"}
                      type={"select"}
                      label={"Select Type"}

                      options={EventType}
                    />
                  </FieldContainer>
                  <FieldContainer>
                    <FieldLabel>Title</FieldLabel>
                    <InputField
                      width='12.4rem'
                      name={"title"}
                      type={"text"}
                      label={"Name"}

                      placeholder="Enter Title"
                    />
                  </FieldContainer>

                  <FieldContainer>
                    <FieldLabel>Caption</FieldLabel>
                    <InputField
                      width='12.4rem'
                      name={"caption"}
                      type={"text"}
                      label={"Name"}

                      placeholder="Enter caption"
                    />
                  </FieldContainer>



                  <FieldContainer>
                    <FieldLabel>Description</FieldLabel>
                    <InputField
                      width='12.4rem'
                      name={"description"}
                      type={"textArea"}
                      label={"Name"}

                      placeholder="Enter a description"
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
                      onChange={handleImageChange}

                    />

                  </FieldContainer>

                  <ButtonContainer>
                    <Button onClick={(e) => {
                      reset()
                      router.push('/gallery')

                    }}>
                      Cancel
                    </Button>
                    <Button onClick={submit}>
                      Submit
                    </Button>
                  </ButtonContainer>
                </>
              </form>
            );
          }}
        </Form>
      </FormOuterContainer>
    </DashboardLayout>
  )
}

export default React.memo(UploadImage)

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
  display:flex ;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`