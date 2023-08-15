"use client";


import { API_BASE_PATH, deletePack, galleryList, packageList } from '@/lib/apiPath';
import { FROM_POP_UP_TYPE, actionList } from '@/lib/constant';
import { premiumTableHeader, tableData } from '@/lib/tableHelper'
import { ModelDataProps } from '@/lib/types';
import { Button, ButtonContainer, FieldIcon } from '@/styles/globalStyles';
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
import {
  FcEditImage
} from "react-icons/fc";
import {
  MdDeleteForever
} from "react-icons/md";
import { useAuth } from '@/context/auth';
import LoadingSpinner from 'app/component/LoadingSpinner';
import { convertArrayBufferToBase64 } from '@/lib/helper';

const Gallery: NextPage = () => {
  const [modelData, setModelData] = useState<ModelDataProps>({
    show: false,
    message: <></>,
    type: 0,
  });
const router=useRouter();
const [imageList,setImageList]=useState([]);
 
  const getImageList=async ()=>{
    await axios
      .get(API_BASE_PATH + galleryList, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(
        (response) => {
          if (response.data.responseCode === 100001) {
            const newData=response?.data?.responseData?.map((item:any,index:number)=>{
                item['index']=index+1
                return item
            })
           setImageList(newData)
          
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
   getImageList() 
  },[])
 

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
              title: `Image has been Deleted from Gallery`,
              showConfirmButton: true,
             
            })
             getImageList() 

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
    const actionHandle=(id:number,action:number)=>{
       if(action===actionList.delete){
          Swal.fire({
      title: 'Are you sure?',
      text: "You want to Delete a Image.",
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
     }else {
      router.push(`/gallery/uploadImage?id=${id}`)
       }
      
    }
  
 const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Handle authentication redirection or rendering an unauthorized message
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <DashboardLayout>

      <ButtonContainer>  <Button onClick={() => router.push('/gallery/uploadImage')}>Upload photos</Button></ButtonContainer>
 <OuterContainer>
      <GalleryContainer>
         {imageList.map((item:any,index) => (
        <GalleryImgContainer key={index}>
        <GalleryImg src={`data:image/png;base64,${convertArrayBufferToBase64(item.image)}`} ></GalleryImg>
        <GalleryImgBottom>{item.title}
             <div><FieldIcon onClick={() => actionHandle(item.gallery_id,actionList.edit)}><FcEditImage/></FieldIcon> <FieldIcon onClick={() => actionHandle(item.gallery_id,actionList.delete)}> <MdDeleteForever/> </FieldIcon></div> 
             </GalleryImgBottom></GalleryImgContainer>
      
      ))}
          
       
       </GalleryContainer>
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
    border-radius: 1.5rem;
    
`;
const GalleryImgContainer = styled.figure`
 background-color: blue;
  width: 18rem;
    height: 18rem;
     box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.4);
border-radius: 1.5rem;
 position: relative;
`;
const GalleryImgBottom = styled.figcaption`
 background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
   bottom: 0rem;
   align-items: center;
    justify-content: space-between;
   padding: 0rem 1rem;
   display: flex;
   width: 100%;
   height: 3rem;
   border-radius: 0rem 0rem 1.5rem 1.5rem;
   font-size: 1.5rem;
   
`;