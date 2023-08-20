"use client";

import { API_BASE_PATH, deleteGallery, galleryList } from "@/lib/apiPath";
import { actionList, galleryItemList } from "@/lib/constant";
import { ModelDataProps } from "@/lib/types";
import { Button, ButtonContainer, FieldIcon } from "@/styles/globalStyles";
import DashboardLayout from "app/component/DashboardLayout";

import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { styled } from "styled-components";
import { FcEditImage } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { useAuth } from "@/context/auth";
import LoadingSpinner from "app/component/LoadingSpinner";
import { convertArrayBufferToBase64 } from "@/lib/helper";

const Gallery: NextPage = () => {
  const [modelData, setModelData] = useState<ModelDataProps>({
    show: false,
    message: <></>,
    type: 0,
  });
  const router = useRouter();








  const isAuthenticated = useAuth();


  if (!isAuthenticated) {
    // Handle authentication redirection or rendering an unauthorized message
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <DashboardLayout>
      <OuterContainer>
        <GalleryContainer>
          {
            galleryItemList.map((item: any, index) => (
              <GalleryImgContainer key={index} onClick={() => router.push(`/gallery/galleryList?id=${item.id}`)}>
                <GalleryImg src={item.image}></GalleryImg>
                <GalleryImgBottom>
                  {item.title}

                </GalleryImgBottom>
              </GalleryImgContainer>
            ))}
        </GalleryContainer>
      </OuterContainer>
    </DashboardLayout>
  );
};

export default React.memo(Gallery);
const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  
  
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
`;
const OuterContainer = styled.div`
  margin: 1rem;
  
`;

const GalleryImg = styled.img`
  display: grid;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.5rem;
`;
const GalleryImgContainer = styled.figure`
  width: 18rem;
  height: 18rem;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;
  position: relative;
  cursor: pointer;
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
 color: red;
`;
