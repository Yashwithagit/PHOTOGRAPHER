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
import LoadingSpinner from 'app/component/LoadingSpinner';
import { useAuth } from '@/context/auth';

interface addPackageProps { 
    package_name?:string;
    duration?:string;
    prize?:number;
    onclose?:Function;
}

const AddPackageForm: React.FC<addPackageProps> = ({onclose=() =>{}}) => {
    const router = useRouter();
    const formValidation=(data:addPackageProps) => { 
        if(!data.duration|| !data.prize||  !data.package_name)
        { Swal.fire({
          icon: 'warning',
            title: 'info',
            text: 'Please Enter Mandatory Fields...',
            
          })
          return false

        }else return true

    }
  const onFormSubmit = async(data:addPackageProps) => { 
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
                   
                   onclose()
                  }
                })
    
              } else {
                Swal.fire({
                    icon: 'error',
                    title: `Invalid package`,
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
    <FormOuterContainer>
      <Form<addPackageProps>
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
                  <FieldLabel>Package Title</FieldLabel>
                  <InputField
                    width='12.4rem'
                    name={"package_name"}
                    type={"text"}
                    label={"Name"}
                   
                    placeholder="Enter the Package Title"
                  />
                </FieldContainer>
                <FieldContainer>
                  <FieldLabel>Duration</FieldLabel>
                  <SelectField

                    name={"duration"}
                    type={"select"}
                    label={"Select Duration"}
                 
                    options={DurationList}
                  />
                </FieldContainer>
                <FieldContainer>

                  <FieldLabel >Prize</FieldLabel>
                  <InputField
                    width='12.4rem'
                    name={"prize"}
                    type={"number"}
                    label={"Name"}
                   
                  />

                </FieldContainer>

                <ButtonContainer>
<Button onClick={(e) => {
               
                 onclose()
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
  )
}

export default React.memo(AddPackageForm)

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