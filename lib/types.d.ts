//Table props

export type Cell = {
  render: (type: string) => JSX.Element;
  getCellProps: () => void;
  column: Column;
  row: Row;
  state: string;
  value: string | JSX.Element;
};

export type Row = {
  index: number;
  cells: Cell[];
  getRowProps: () => void;
  original: object;
};

export type tableSortProps = {
  title?: string | undefined;
  style?: CSSProperties | undefined;
  onClick?: ((e: MouseEvent) => void) | undefined;
};

export type EnhancedColumn = {
  render: (type: string) => JSX.Element;
  getHeaderProps: (column: tableSortProps) => void;
  isSortRequired?: boolean;
  isSortedDesc?: undefined | boolean;
  getSortByToggleProps: (props?: tableDefaultProps[]) => tableSortProps;
};

export type HeaderGroup = {
  headers: EnhancedColumn[];
  getRowProps: (userProps?: object) => object;
  getHeaderGroupProps: () => void;
};

export interface tableDefaultProps {
  style?: CSSProperties | undefined;
  className?: string | undefined;
  role?: string | undefined;
}

export interface useTableProps {
  getTableProps: (propGetter?: tableDefaultProps) => TableProps;
  rows?: Array<D>;
  getTableBodyProps: (propGetter?: tableDefaultProps) => TableBodyProps;
  headerGroups: Array<HeaderGroup<D>>;
  page?: Array<Row<D>>;
  prepareRow: (row: Row<D>) => void;
  setFilter?: (
    columnId: String,
    updater: ((filterValue: string) => string) | string
  ) => void;
  setAllFilters?: (
    updater:
      | Array<{ id: String | number; value: String }>
      | ((
          filters: Array<{ id: String | number; value: string }>
        ) => Array<{ id: String | number; value: string }>)
  ) => void;
  setGlobalFilter?: (filterValue: string | undefined) => void;
  canPreviousPage?: boolean;
  canNextPage?: boolean;
  nextPage?: () => void;
  pageOptions?: number[];
  previousPage?: () => void;
  setPageSize?: (pageSize: number) => void;
  state: { hiddenColumns?: Array<String> | undefined; pageIndex?: number };
}

export interface TableContentProps {
  border?: string;
  padding?: string;
  display?: string;
}

export interface TableColumnProps {
  Header?: string;
  accessor: string | propertyIsEnumerable;
  isSortRequired?: boolean;
  disableGlobalFilter?: boolean;
}

export interface TableContainerProps {
  padding?: string;
  tableHeight?: string;
  spaceBetween?: boolean;
}

export interface optionProps {
  label: string;
  value: number;
}

export interface FieldLabelProps {
  width?: string;
}

export interface PackageProps {
  package_title?: string;
  prize: number;
  duration: any;
}

export interface IconsProps {
  width?: string;
}

export interface ModelDataProps {
  show: boolean;
  message?: JSX.Element;
  type?: number;
  isSuccess?: boolean;
}
export interface TableTitleProps {
  show: string; 
}