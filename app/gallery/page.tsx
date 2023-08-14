"use client";


import { API_BASE_PATH, deletePack, packageList } from '@/lib/apiPath';
import { FROM_POP_UP_TYPE, actionList } from '@/lib/constant';
import { premiumTableHeader, tableData } from '@/lib/tableHelper'
import { ModelDataProps } from '@/lib/types';
import { Button, ButtonContainer } from '@/styles/globalStyles';
import AddPackageForm from 'app/component/AddPackageForm';
import PopUp from 'app/component/PopUp';
import DashboardLayout from 'app/component/DashboardLayout';
import Table from 'app/component/Table'
import axios from 'axios';
import { NextPage } from 'next'
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { styled } from 'styled-components';


const Gallery: NextPage = () => {
  const [modelData, setModelData] = useState<ModelDataProps>({
    show: false,
    message: <></>,
    type: 0,
  });
const router=useRouter();
const [packagesList,setPackagesList]=useState([]);
  const [pageList,setPageList]=useState([]);
  const [fixedPages,setFixedPages]=useState(0)
  const getFeedBack=async ()=>{
    await axios
      .get(API_BASE_PATH + packageList, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            const newData=response?.data?.responseData?.map((item:any,index:number)=>{
                item['index']=index+1
                return item
            })
           setPackagesList(newData)
           setPageList(newData)
           setFixedPages(newData.length)

          } else {
            Swal.fire({
              icon: 'error',
              title: `Something went wrong`,
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
  useEffect(()=>{
   getFeedBack() 
  },[])
  const pageClick=(id:number)=>{
    const newArray = packagesList.slice(((id*10)-10));
    setPageList(newArray)
  }
  const handleFormClose=()=>{
    setModelData({
      ...modelData,
      show: false,
      type: 0,
    })}

    // delete package
    const deletePackage=async (id:number)=>{
    await axios
      .get(API_BASE_PATH + deletePack + id, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            Swal.fire({
              icon: 'success',
              title: `Package has been Booked`,
              showConfirmButton: true,
             
            })
             getFeedBack() 

          } else {
            Swal.fire({
              icon: 'error',
              title: `Something went wrong`,
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
    // handle action
    const actionHandle=(id:number)=>{
       
          Swal.fire({
      title: 'Are you sure?',
      text: "You want to Book a Package.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result:any) => {
      if (result.isConfirmed) {
        
        
        deletePackage(id);
      }
    })
    
      
    }
  

  return (
    <DashboardLayout>

      <ButtonContainer>  <Button onClick={() => router.push('/gallery/uploadImage')}>Upload photos</Button></ButtonContainer>
 <OuterContainer>
      <GalleryContainer> <GalleryImgContainer></GalleryImgContainer>
       <GalleryImgContainer></GalleryImgContainer>
        <GalleryImgContainer></GalleryImgContainer>
         <GalleryImgContainer></GalleryImgContainer></GalleryContainer>
     </OuterContainer>
   
    </DashboardLayout>
     
  )
}

export default React.memo(Gallery)
const GalleryContainer = styled.div`
 display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    overflow:scroll;
     height: 100%;
    grid-gap: 2rem;
    justify-items: center;
    align-items: center;
`;
const OuterContainer = styled.div`
 margin: 1rem;
    overflow-y:auto;
     height: 35rem;
  
`;


const GalleryImg = styled.img`
 display: grid;
  width: 100%;
    height: 100%;
    object-fit: cover;
`;
const GalleryImgContainer = styled.div`
 background-color: blue;
  width: 18rem;
    height: 18rem;
     box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.4);
border-radius: 1.5rem;
`;