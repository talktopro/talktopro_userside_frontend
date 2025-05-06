import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FC } from "react";

interface ICustomPaginationProps {
  totalPage: number;
  currentPage: number;
  onChange(newPage: number): void;
}

const CustomPagination: FC<ICustomPaginationProps> = ({
  currentPage,
  onChange,
  totalPage,
}) => {
  const MAX_VISIBLE_PAGES = 5;
  const showEllipsis = totalPage > MAX_VISIBLE_PAGES;

  const handlePageChange = (newPage: number) => {
    if (currentPage === newPage) return;
    onChange(newPage);
  };

  const renderPageNumbers = () => {
    if (!showEllipsis) {
      return Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        <PaginationItem key={page}>
          <PaginationLink
            isActive={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ));
    }

    type PageItem = number | "ellipsis-left" | "ellipsis-right";
    const pages: PageItem[] = [1]; // Always show first page

    if (currentPage > 3) pages.push("ellipsis-left");

    // Show current page and neighbors
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPage - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPage - 2) pages.push("ellipsis-right");
    if (totalPage > 1) pages.push(totalPage); // Always show last page if different from first

    return pages.map((page, index) => {
      if (typeof page === "string") {
        return (
          <PaginationItem key={`${page}-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      return (
        <PaginationItem key={page}>
          <PaginationLink
            isActive={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem
          hidden={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <PaginationPrevious className="[&>span]:hidden" />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem
          hidden={currentPage === totalPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <PaginationNext className="[&>span]:hidden" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
