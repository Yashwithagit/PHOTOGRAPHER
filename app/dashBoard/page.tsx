"use client";
import { NextPage } from "next";
import React from "react";
import { styled } from "styled-components";
import * as FaIcons from "react-icons/fa";
import { FieldIcon } from "@/styles/globalStyles";

import DashboardLayout from "app/component/DashboardLayout";

const DashBoard: NextPage = () => {
  return (
    <DashboardLayout>
      <CardContainer>
        <Card>
          <FieldIcon width="3rem">
            <FaIcons.FaUserFriends />
          </FieldIcon>
          Total Customers 12
        </Card>
        <Card>
          {" "}
          <FieldIcon width="3rem">
            <FaIcons.FaUserFriends />
          </FieldIcon>{" "}
          Total Photographer 20
        </Card>
      </CardContainer>
    </DashboardLayout>
  );
};

export default DashBoard;
const Card = styled.div`
  width: 20rem;
  box-shadow: 5px 4px 7px 2px rgba(0, 0, 0, 0.4);
  height: 10rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 2rem;
`;
