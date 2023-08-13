"use client";

import { AppColors, DurationList } from '@/lib/constant';
import { FieldLabelProps, PackageProps } from '@/lib/types';
import { Button, CardContainer } from '@/styles/globalStyles'
import React, { useEffect } from 'react'
import styled from 'styled-components';

import { Form } from "houseform";
import { NextPage } from 'next';
import InputField from 'app/component/HouseFormComponent/InputField';
import SelectField from 'app/component/HouseFormComponent/SelectField';
import axios from 'axios';
import { API_BASE_PATH, addPackage } from '@/lib/apiPath';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface addPhotographerProps { 
    photographer_name?:string;
    company?:string;
    details?:number;
    contact?:number;
}
const AddPhotographer: NextPage = () => {
    const router = useRouter();
    const formValidation=(data:addPhotographerProps) => { 
        if(!data.photographer_name|| !data.company||  !data.contact ||  !data.details)
        { Swal.fire({
            icon: 'error',
            title: 'info',
            text: 'Please Enter Mandatory Fields...',
            
          })
          return false

        }else return true

    }
  const onFormSubmit = async(data:addPhotographerProps) => { 
    if(formValidation(data)){ 
        console.log(data);
        await axios
          .post(API_BASE_PATH + addPackage, data, {
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
                   
                    router.push("/photographerManagement");
                  }
                })
    
              } else {
                alert("Invalid User Name and Password");
              }
            },
            (error) => {
              console.log(error);
            }
          );
    }
   
    
  };
 
  return (
    <FormOuterContainer>
      <Form<addPhotographerProps>
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
                  <FieldLabel width='10rem'>Photographer Name</FieldLabel>
                  <InputField
                    width='12.4rem'
                    name={"photographer_name"}
                    type={"text"}
                    label={"Name"}
                 
                  />
                </FieldContainer>
                <FieldContainer>
                  <FieldLabel width='10rem'>Company</FieldLabel>
                  <InputField
                    width='12.4rem'
                    name={"company"}
                    type={"text"}
                    label={"Name"}
                   
                 
                  />
                </FieldContainer>
                <FieldContainer>

                  <FieldLabel width='10rem' >Contact</FieldLabel>
                  <InputField
                    width='12.4rem'
                    name={"contact"}
                    type={"text"}
                    label={"Name"}
                   
                  />

                </FieldContainer>
                <FieldContainer>

                  <FieldLabel width='10rem'>Details</FieldLabel>
                  <InputField
                    width='12.4rem'
                    name={"details"}
                    type={"textArea"}
                    label={"Name"}
                    rows={10}
                   
                  />

                </FieldContainer>

                <ButtonContainer>

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
  )
}

export default React.memo(AddPhotographer)

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
`