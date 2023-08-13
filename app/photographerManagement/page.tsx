"use client";
import { useAuth } from '@/context/auth';
import { photographerManagementData, photographerTableHeader } from '@/lib/tableHelper';
import { Button, ButtonContainer } from '@/styles/globalStyles'
import DashboardLayout from 'app/component/DashboardLayout';
import Table from 'app/component/Table';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react'
import LoadingSpinner from 'app/component/LoadingSpinner';
import { styled } from 'styled-components';

const PhotographerManagement: NextPage=()=> {
    const router=useRouter();
    const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Handle authentication redirection or rendering an unauthorized message
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <DashboardLayout>
<OuterContainer>
      {/* <ButtonContainer>  <Button onClick={() =>router.push('/photographerManagement/addPhotographer')}>Add Photographer</Button></ButtonContainer> */}

      <Table showHeader='block' header='Pending' columns={photographerTableHeader} data={photographerManagementData} pageSize={10}  />
      <Table showHeader='block' header='Completed' columns={photographerTableHeader} data={photographerManagementData} pageSize={10} />
      </OuterContainer> </DashboardLayout>
  )
}
export default React.memo(PhotographerManagement)
const OuterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;