"use client";

import { IconsProps } from "@/lib/types";
import { AppColors } from "lib/constant";
import styled from "styled-components";

export const CardContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  text-align: center;
  padding: 3rem;
  width: 25rem;
  transform: translate(-50%, -50%);
  box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  gap: 1rem;
  flex-direction: column;

  @media screen and (max-width: 768px) and (min-width: 400px) {
    width: 20rem;
    padding: 2.5rem;
  }
  @media screen and (max-width: 400px) {
    width: 19rem;
    padding: 2rem;
  }
`;

export const CardHeader = styled.header`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  font-family: "Montserrat", sans-serif;
`;

export const FormField = styled.main`
  position: relative;
  height: 3rem;
  width: 100%;
  border-radius: 1.2rem;
  padding: 0rem 0.8rem;
  display: flex;
  background: rgba(255, 255, 255, 0.94);
  outline: 1px solid black;
`;

export const FormFieldIcon = styled.span`
  width: 2.5rem;
  line-height: 3.5rem;
`;

export const FormFieldInput = styled.input`
  height: 100%;
  width: 100%;

  border: none;
  outline: none;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
`;

export const SubmitButton = styled.button`
  background: ${AppColors.LightShadeBlue};
  padding: 0.7rem 1rem;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 2rem;
  color: white;
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: 600;
  :hover {
    background: ${AppColors.LightBlue};
  }
`;
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  
  gap: 1rem;
`;

export const LinkContainer = styled.div`
  font-size: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  font-family: "Poppins", sans-serif;
`;

export const LinkText = styled.span`
  color: ${AppColors.SkyBlue};
`;

export const ErrorMessage = styled.p`
  color: #bf1650;

  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

export const PageTitle = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  margin: 1rem 0rem;
  padding: 0;
`;

export const BackArrowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  display: flex;
  padding-top: 2rem;
  padding-left: 5rem;
  @media screen and (max-width: 768px) {
    padding-left: 3rem;
  }
`;

export const SwiperContainer = styled.div`
  max-width: 124rem;
  padding: 4rem;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SwiperMobileContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  display: none;
  padding-bottom: 3rem;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const Button = styled.button`
  outline: none;
  padding: 0.7rem 3rem;
  border-radius: 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  width: auto;
  border: 2px solid #00022e;
  background: #00022e;

  color: ${AppColors.White};
  &:hover,
  &:focus {
    box-shadow: 0px 2px 4px ${AppColors.White};
  }
  white-space: nowrap;
`;

export const ButtonContainer=styled.div`
display:flex;
justify-content:flex-end;`
export const FieldIcon = styled.span<IconsProps>`
font-size: ${(props) => (props.width ? props.width : "1.5rem")};
line-height: 1rem;
cursor: pointer;
`;