"use client";

import { FieldIcon, FormFieldIcon } from "@/styles/globalStyles";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

export const premiumTableHeader = [
  {
    Header: "Package id",
    accessor: "pack_id",
  },
  {
    Header: "Package Title",
    accessor: "package_name",
  },
  {
    Header: "Prize",
    accessor: "prize",
  },
  {
    Header: "Duration",
    accessor: "duration",
  },
  {
    Header: "Created At",
    accessor: "created_at",
  },
  ,{
    Header: 'Action',
    accessor: 'action',
    Cell: ({
      row,
    }: {
      row: {
        getToggleRowSelectedProps: any;
        original: {
          user_id: number;
          user_name: string;
        };
      };
    }) => {
      return (
        <TableDiv>
          <FieldIcon>
            <FaIcons.FaEdit />
          </FieldIcon>
          <FieldIcon>
            <MdIcons.MdDelete />
          </FieldIcon>
        </TableDiv>
      );
    },
  },
  ]
 
   


export const photographerTableHeader = [{
  Header: 'Name',
  accessor: 'photographer_name'
},
{
  Header: 'Company',
  accessor: 'company'
}, {
  Header: 'Contact',
  accessor: 'contact'
}, {
  Header: 'Details',
  accessor: 'details'
},{
  Header: 'Action',
  accessor: 'action',
  Cell: ({
    row,
  }: {
    row: {
      getToggleRowSelectedProps: any;
      original: {
        photographer_id: number;
        user_name: string;
      };
    };
  }) => {
    return (
      <TableDiv>
          <FieldIcon>
          <GrIcons.GrView />
        </FieldIcon>
       
        <FieldIcon>
          <MdIcons.MdDelete />
        </FieldIcon>
      </TableDiv>
    );
  },
},
]
export const userManagementTableHeader = [{
  Header: 'User id',
  accessor: 'user_id'
},
{
  Header: 'User Name',
  accessor: 'user_name'
}, {
  Header: 'User Email',
  accessor: 'email'
}, {
  Header: 'User Contact',
  accessor: 'contact'
}, {
  Header: 'User Address',
  accessor: 'address',

},
]

export const userManagementData = [{
  user_id: '123456789-',
  user_name: "<NAME>",
  email: "<EMAIL>",
  contact: "987654321",
  address: "Bangalore",
},
{
  user_id: '123456789-',
  user_name: "<NAME>",
  email: "<EMAIL>",
  contact: "987654321",
  address: "Bangalore",
},
{
  user_id: '123456789-',
  user_name: "<NAME>",
  email: "<EMAIL>",
  contact: "987654321",
  address: "Bangalore",
},
{
  user_id: '123456789-',
  user_name: "<NAME>",
  email: "<EMAIL>",
  contact: "987654321",
  address: "Bangalore",
},
{
  user_id: '123456789-',
  user_name: "<NAME>",
  email: "<EMAIL>",
  contact: "987654321",
  address: "Bangalore",
},
{
  user_id: '123456789-',
  user_name: "<NAME>",
  email: "<EMAIL>",
  contact: "987654321",
  address: "Bangalore",
}]






export const tableData = [
  {
    package_id: "23456789-2345-2",
    package_title: "Gold",
    prize: 1200,
    duration: "1 month",
    created_at: "12/2/23",
  },
  {
    package_id: "23456789-2345-2",
    package_title: "Gold",
    prize: 1200,
    duration: "1 month",
    created_at: "12/2/23",
  },
  {
    package_id: "23456789-2345-2",
    package_title: "Gold",
    prize: 1200,
    duration: "1 month",
    created_at: "12/2/23",
  },
  {
    package_id: "23456789-2345-2",
    package_title: "Gold",
    prize: 1200,
    duration: "1 month",
    created_at: "12/2/23",
  },
  {
    package_id: "23456789-2345-2",
    package_title: "Gold",
    prize: 1200,
    duration: "1 month",
    created_at: "12/2/23",
  },
  {
    package_id: "23456789-2345-2",
    package_title: "Gold",
    prize: 1200,
    duration: "1 month",
    created_at: "12/2/23",
  },
  {
    package_id: "23456789-2345-2",
    package_title: "Gold",
    prize: 1200,
    duration: "1 month",
    created_at: "12/2/23",
  },
];



export const photographerManagementData = [
  {
  photographer_id: '123456789-',
  photographer_name: "<NAME>",
  company: "<EMAIL>",
  contact: "987654321",
  details: "Bangalore",
},
{
  photographer_id: '123456789-',
  photographer_name: "<NAME>",
  company: "<EMAIL>",
  contact: "987654321",
  details: "Bangalore",
},
]
export const feedBackTableHeader = [
  {
    Header: "S.NO.",
    accessor: "index",
  },
  {
    Header: "Mail Id",
    accessor: "email",
  },
  {
    Header: "Feed back",
    accessor: "feedback",
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({
      row,
    }: {
      row: {
        getToggleRowSelectedProps: any;
        original: {
          user_id: number;
          user_name: string;
        };
      };
    }) => {
      return (
        <TableDiv>
          <FieldIcon>
            <MdIcons.MdContactMail />
          </FieldIcon>
        </TableDiv>
      );
    },
  },
];
export const feedBackData = [
  {
    feedback_id: 1,
    feedback: "asa",
    user_id: 1,
  },
];
const TableDiv = styled.main`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;


