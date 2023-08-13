"use client";

/* eslint-disable react/jsx-key */
import {
  faSortAmountDesc,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo } from "react";
import {
  Row,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import styled from "styled-components";

import { AppColors } from "../../lib/constant";
import {
  HeaderGroup,
  TableColumnProps,
  TableContainerProps,
  TableContentProps,
  TableTitleProps,
  useTableProps,
} from "../../lib/types";
import Pagination from "./Pagination";
import NoData from "./NoData";


interface TableProps {
  columns: Array<TableColumnProps> | any;
  data: any;
  pageSize: number;
  border?: string;
  setPageNo?: Function;
  pageNo?: number;
  pause?: boolean;
  padding?: string;
  isPaginationRequired?: boolean;
  onClickPage?: Function;
  pagination?: boolean;
  totalPage?: number;
  isRefreshPagination?: boolean;
  activePage?: number;
  tableContainerStyle?: string;
  display?: string;
  tableHeight?: string;
  fixedPages?:number;
  showHeader?: string;
  header?: string;

}

const Table: React.FC<TableProps> = ({
  columns,
  data,

  pageSize,
  border = "",
  pause = false,
  padding = "0rem",
  isPaginationRequired = true,
  onClickPage = () => { },
  pagination,
  totalPage = 0,
  activePage = 1,
  tableContainerStyle = "",
  tableHeight = "",
  display = "",
  fixedPages=1,
  showHeader='',
  header=''
  

}) => {
  let updatedColumns: Array<TableColumnProps> = [];

  updatedColumns = useMemo(() => {

    columns.map((column: TableColumnProps) => {

      return column;

    });

    return columns;
  }, []);

  const {
    getTableProps,
  
    getTableBodyProps,
    
    headerGroups,
    page = [],
    rows,
    prepareRow,
    


    setPageSize = () => { },
    state: { pageIndex = 0 },
  }: useTableProps = useTable(
    {
      columns: updatedColumns,
      data: data ? data : [],
      // autoResetGlobalFilter: false, //TODO : useTable option not containing autoResetGlobalFilter option.So to get rid of type error please go to the folder @types/react-table/index.d.ts/propGetter line number 170 add autoResetGlobalFilter:boolean there in node-modules
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
    
  );

  useEffect(() => {
    setPageSize(pageSize);
  }, []);


  const onPageClickHandle = (page: number) => {
    onClickPage(page);
  };

  return (
    <TableContainer padding={tableContainerStyle} tableHeight={tableHeight} >
       <TableHeaderTitle show={showHeader}>{header}</TableHeaderTitle>
      {rows.length > 0 ? (
        <>
          <TableBodyContainer>
            <div className="fixTableHead">
              <TableComp {...getTableProps()}>
                <TableHead border={border}>
                  {headerGroups.map((headerGroup: HeaderGroup, index: number) => (
                    <tr key={index}{...headerGroup.getHeaderGroupProps}>
                      {headerGroup.headers.map((column, columnIndex: number) => (
                        <TableHeader key={columnIndex} border={border} display={display}>
                          {column.render("Header")}
                          <SortIcon
                            {...(column.getHeaderProps(
                              column.getSortByToggleProps as any
                            ) as any)}
                          >
                            {column.isSortRequired ? (
                              <FontAwesomeIcon
                                icon={
                                  column.isSortedDesc == undefined
                                    ? faSortAmountUp
                                    : column.isSortedDesc
                                      ? faSortAmountDesc
                                      : faSortAmountUp
                                }
                                style={{
                                  fontSize: "1rem",
                                  color:
                                    column.isSortedDesc == undefined
                                      ? `${AppColors.LightGrey}`
                                      : `${AppColors.Black}`,
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </SortIcon>
                        </TableHeader>
                      ))}
                    </tr>
                  ))}
                </TableHead>

                <tbody {...getTableBodyProps()}>
                  {page.map((row: Row, i: number) => {
                    prepareRow(row);
                    return (
                      <TableRow   {...row.getRowProps()} padding={padding}>
                        {row.cells.map((cell: any, rowIdex: number) => {
                          return (
                            <TableCell
                              key={rowIdex}
                              {...cell.getCellProps()}
                              border={border}
                              padding={padding}
                            >
                              {cell.render("Cell")}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </tbody>
              </TableComp>
            </div>

           
          </TableBodyContainer>
          {isPaginationRequired && (
              <><PaginationContainer>
                <Pagination
                  onPageChange={onPageClickHandle}
                  pages={activePage}
                  total_page={Math.ceil(fixedPages / pageSize)}
                  pageSize={pageSize} />
              </PaginationContainer></>
            )}
        </>
      ) : (
        <NoData />
      )}
 
     
    </TableContainer>
  );
};

export default React.memo(Table);
const TableBodyContainer = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`
const TableComp = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
`;


export const TableContainer = styled.div<TableContainerProps>`
  padding: ${(props) =>
    props.padding ? props.padding : "2rem 1rem"};
  overflow-x: auto;
  height: ${(props) =>
    props.tableHeight ? props.tableHeight : "88%"};
  display: flex;
  flex-direction: column;
  justify-content:${(props) => props.spaceBetween ? "space-between" : 'none'};
  
`;

const TableHead = styled.thead<TableContentProps>`
  background-color: #00022e;
  border: ${(props) => props.border ?? ""};
`;

const TableHeader = styled.th<TableContentProps>`
  padding: 1rem;
  font-weight: 700;
  color: ${AppColors.White};
  border: ${(props) => props.border ?? "1px solid red"};
  background: #00022e;
  display: ${(props) => (props.display ? "auto" : "auto")};
  
`;
const TableCell = styled.td<TableContentProps>`
  padding:0.5rem;
  text-align: center;
  border:  1px solid ${AppColors.LightGrey};
  
`;
const TableRow = styled.tr<TableContentProps>`
  padding: 0.5rem;

  &:hover {
    background-color: ${AppColors.LightGrey};
  }
  &:nth-of-type(even) {
    border: none;
  }
`;

const SortIcon = styled.span``;

const PaginationContainer = styled.div`
  text-align: center;
  padding: 1rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TableHeaderTitle = styled.h1<TableTitleProps>`
  text-align:left;
  display: ${(props) => (props.show ? props.show  : "none")};;
  
  
`;