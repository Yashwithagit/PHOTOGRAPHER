"use client";

import { RelatedType } from '@/lib/constant';
import { FieldLabelProps } from '@/lib/types';
import { Button } from '@/styles/globalStyles'
import React from 'react'
import styled from 'styled-components';

import { Form } from "houseform";
import InputField from 'app/component/HouseFormComponent/InputField';
import SelectField from 'app/component/HouseFormComponent/SelectField';
import axios from 'axios';
import { API_BASE_PATH, addGallery } from '@/lib/apiPath';
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
  const router = useRouter();
  const formValidation = (data: uploadImageProps) => {

    if (!data.title || !data.description || !data.caption || !data.image || !data.type) {
      Swal.fire({
        icon: 'warning',
        title: 'info',
        text: 'Please Enter Mandatory Fields...',

      })

      return false

    } else return true

  }
  const onFormSubmit = async (data: uploadImageProps) => {


    if (formValidation(data)) {

      const formData = new FormData()

      formData.append('image', data?.image ? data?.image : '')
      const id = localStorage.getItem("id");
      const idValue = id !== null ? id : ''; // Convert null to an empty string
      formData.append('p_id', idValue);
      formData.append('title', data?.title ? data?.title : '')
      formData.append('description', data?.description ? data?.description : '')
      formData.append('type', data?.type ? String(data.type) : '');
      formData.append('caption', data?.caption ? data?.caption : '')

      await axios
        .post(API_BASE_PATH + addGallery, formData, {
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

              <div>
                <FieldContainer>

                  <FieldLabel>Related</FieldLabel>
                  <SelectField

                    name={"type"}
                    type={"select"}
                    label={"Select Type"}

                    options={RelatedType}
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

                  />

                </FieldContainer>

                <ButtonContainer>
                  <Button type='button' onClick={(e) => {
                    router.push('/gallery')

                  }}>
                    Cancel
                  </Button>
                  <Button onClick={submit}>
                    Submit
                  </Button>
                </ButtonContainer>
              </div>

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
  flex-direction: column;
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