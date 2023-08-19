"use client";
import Link from "next/link";

import { MenuItem as MenuItemType } from "../constants/menu-items";

import { useState } from "react";
import styled from "styled-components";
import MenuItemsList from "./MenuItemList";
import ExpandIcon from "./ExpandIcon";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

type MenuItemProps = {
  menuItem: MenuItemType;
};

export default function MenuItem({
  menuItem: { name, icon: Icon, url, depth, subItems },
}: MenuItemProps) {
  const [isExpanded, toggleExpanded] = useState(false);


  const router = useRouter();
  const path = usePathname();
  const selected = path === url;
  const isNested = subItems && subItems?.length > 0;

  const onClick = () => {
    toggleExpanded((prev) => !prev);
  };
  const onClickLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result: any) => {
      if (result.isConfirmed) {
        localStorage.removeItem("id")

        Swal.fire(

          'success'
        ).then((result: any) => {
          router.push("/login")
        })
      }
    })
  }
  return (
    <>
      <MenuItemContainer className={selected ? "selected" : ""} depth={depth}>
        {url ? (
          <Link href={url} onClick={() => router.push(url)}>
            <div className="menu-item">
              <Icon />
              <span>{name}</span>
            </div>
          </Link>
        ) : (
          <div
            className="menu-item"
            onClick={() => onClickLogout()}
          >
            <Icon />
            <span>{name}</span>
          </div>
        )}

        {isNested ? (
          <ExpandIcon isExpanded={isExpanded} handleClick={onClick} />
        ) : null}
      </MenuItemContainer>
      {isExpanded && isNested ? <MenuItemsList options={subItems} /> : null}
    </>
  );
}

export const MenuItemContainer = styled.a<{ depth: number }>`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  padding: 10px 0px 10px 10px;
  align-items: center;
  justify-content: space-between;

  & svg {
    height: 30px;
    margin-right: 10px;
  }

  &:hover {
    background-color: #00022e;
    color: #fc86aa;
    opacity: 0.5;
    cursor: pointer;
  }

  .menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: ${({ depth }) => `${depth}rem`};
  }

  &.selected {
    background-color: #00022e;
    color: #fff;
  }
`;
