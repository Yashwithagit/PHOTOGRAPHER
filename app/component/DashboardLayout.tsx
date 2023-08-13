"use client"
import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";
import { useAuth } from "@/context/auth";
import LoadingSpinner from "./LoadingSpinner";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  
  const [isOpened, setOpened] = useState(true);

  const toggleDrawer = () => {
    setOpened((prev) => !prev);
  };
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Handle authentication redirection or rendering an unauthorized message
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <Container>
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer} />
      <Content>
        <Sidebar isOpened={isOpened} />
        <PageContainer  isOpened={isOpened}>{children}</PageContainer>
      </Content>
      {/* <Footer /> */}
    </Container>
  );
}

export default DashboardLayout
export const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  color: #000133;
`;

export const Content = styled.div`
  display: flex;
 
  flex: 1;
`;

export const PageContainer = styled.div<{ isOpened: boolean }>`
  padding: 20px;
  width: ${(props) => (props.isOpened ? "80vw" : " 100%")};
  display: flex;
  flex-direction: column;
`;