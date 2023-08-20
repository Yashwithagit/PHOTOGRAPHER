"use client";

import { ButtonProps, CardContainerProps, IconsProps } from "@/lib/types";
import { AppColors } from "lib/constant";
import styled, { css } from "styled-components";

export const CardContainer = styled.div<CardContainerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  text-align: center;
  padding: 3rem;
  width: ${(props) => (props.width ? props.width : "25rem")};
  transform: translate(-50%, -50%);
  box-shadow: -1px 2px 5px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  gap: 1rem;
  flex-direction: column;

  @media screen and (max-width: 768px) and (min-width: 400px) {
    width: ${(props) => (props.width ? props.width : "20rem")};
    padding: 2.5rem;
  }
  @media screen and (max-width: 400px) {
    width: ${(props) => (props.width ? props.width : "19rem")};
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

export const Button = styled.button<ButtonProps>`
  outline: none;
  padding: 0.7rem 3rem;
  border-radius: 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  width: auto;
  border: 2px solid #00022e;
  background: #00022e;
  ${(props) =>
    props.disabled &&
    css`
      background-color: #ccc;
      cursor: not-allowed;
      border: none;
    `};

  color: ${AppColors.White};
  &:hover,
  &:focus {
    box-shadow: 0px 2px 4px ${AppColors.White};
  }
  white-space: nowrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const FieldIcon = styled.span<IconsProps>`
  font-size: ${(props) => (props.width ? props.width : "1.5rem")};
  line-height: 1rem;
  cursor: pointer;
`;

export const Select = styled.select`
  padding: 0.7rem 2.8rem;
  border-radius: 0.5rem;
  text-align: left;
  height: auto;
  border: 1px solid #999999;
  font-size: 0.8rem;
  background-color: #ffffff;
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
  outline: none;
  border: 1px solid #999999;
  margin-left: 0.5rem;
`;
