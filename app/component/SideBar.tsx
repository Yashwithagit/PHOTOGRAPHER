"use client"
import styled from "styled-components";
import { MENU_ITEMS } from "../constants/menu-items";
import MenuItemsList from "./MenuItemList";
type SidebarProps = {
  isOpened: boolean,
};

export default function Sidebar({ isOpened }: SidebarProps) {
  return (
    <SidebarContainer isOpened={isOpened}>
      <MenuItemsList options={MENU_ITEMS} />
    </SidebarContainer>
  );
}
export const SidebarContainer = styled.aside<{ isOpened: boolean }>`
  background: #d8dcd6;
  width: ${(props) => (props.isOpened ? "20vw" : "0vw")};
  transition: width 0.5s;
  overflow: hidden;
  height: 100vh;
`;