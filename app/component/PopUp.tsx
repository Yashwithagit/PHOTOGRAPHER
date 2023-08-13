import React from "react";
import styled from "styled-components";
import { AppColors, FROM_POP_UP_TYPE } from "@/lib/constant";

type ModalProps = {
  popUptype: "form" | "popup";
  onClick?: Function;
};

const PopUp: React.FC<{
  children: React.ReactNode;
  popUptype?: "form" | "popup";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ children, popUptype = "form", onClick = () => {} }) => {
  return (
    <Modal popUptype={popUptype} onClick={onClick}>
      <ModalBody popUptype={popUptype} onClick={(e:any) => e.stopPropagation()}>
        {children}
      </ModalBody>
    </Modal>
  );
};

const Modal = styled.div<ModalProps>`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 6;
  display: ${(props) =>
    props?.popUptype == FROM_POP_UP_TYPE ? "block" : "flex"};
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  background: ${AppColors.BlackOverlay};
`;

const ModalBody = styled.div<ModalProps>`
  background-color: ${AppColors.White};
  width:50%;
  margin: ${(props) =>
    props?.popUptype == FROM_POP_UP_TYPE ? "6rem" : "auto"};
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default React.memo(PopUp);
