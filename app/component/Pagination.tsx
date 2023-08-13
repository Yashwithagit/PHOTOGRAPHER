import { useEffect, useState } from "react";
import styled from "styled-components";

import { AppColors } from "../../lib/constant";
interface PaginationProps {
  onPageChange: Function;
  pages: number;
  pageIndexDisplay?: number;
  total_page?: number;
  pageSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  pages,
  total_page = 1,
}) => {
  const [activePage, setActivePages] = useState(pages);
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    setVisiblePages(getVisiblePages(0, total_page as number));
  }, [total_page]);

  const changePage = (page: number) => {
    setActivePages(page);
    onPageChange(page);
    const visiblePages = getVisiblePages(page, total_page as number);
    setVisiblePages(filterPages(visiblePages, total_page));
  };

  const getVisiblePages = (page: number, total: number) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, 6, total];
      }
    }
  };

  const filterPages: any = (visiblePages: number[], totalPage: number) => {
    return visiblePages.filter((page) => page <= totalPage);
  };

  useEffect(() => {
    setActivePages(pages);
  }, [pages]);

  return (
    <div>
      <ButtonComp
        onClick={(e) => {
          if (activePage === 1) return;
          changePage(activePage - 1);
        }}
        disabled={activePage === 1}
      >
        {"<"}
      </ButtonComp>

      {visiblePages?.map((page, index, array) => {
        return (
          <ButtonComp
            key={page}
            onClick={(e) => {
              changePage(page);
            }}
            color={activePage === page ? AppColors.SkyBlue : ""}
          >
            {array[index - 1] + 2 < page ? `...${page}` : page}
          </ButtonComp>
        );
      })}

      <ButtonComp
        onClick={(e) => {
          if (activePage === total_page) return;
          changePage(activePage + 1);
        }}
        disabled={activePage === total_page}
      >
        {">"}
      </ButtonComp>
    </div>
  );
};
export default Pagination;

export const ButtonComp = styled.button`
  padding: 0.5rem 0.7rem;
  margin: 0.2rem;
  background-color: ${(prop) =>
    prop.color == AppColors.SkyBlue && AppColors.SkyBlue};
  cursor: pointer;

  padding: 0.5rem 0.7rem;
  margin: 0.2rem;
  border-radius: 5px;
  box-shadow: 0 0 0.1px 1px rgb(0 0 15 / 18%);
  border: 1px solid #00000f2e;
`;
