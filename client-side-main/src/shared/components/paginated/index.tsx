import { Pagination } from 'antd'
import { useMemo } from 'react'
import { useState, useEffect } from 'react'

export function PaginatedContent({
  container,
  item,
  data,
  total,
  page,
  onChange,
  pageSize,
  onLoadMore, // TODO: implement
}: {
  container?: any
  item: any
  data: any
  total: number
  page: number
  onChange: any
  pageSize: number
  onLoadMore: any
}) {
  const [currentPage, setCurrentPage] = useState(page)
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  data = data ? data.slice(start, end) : [];

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    onChange(pageNumber)
  }
  return (
    <>
      {container
        ? container({
            children: (
              <>
                {data
                  .filter((_, idx) => idx < pageSize)
                  .map((d, key) => item({ data: { ...d }, key }))}
              </>
            ),
          })
        : data
            .filter((_, idx) => idx < pageSize)
            .map((d, key) => item({ data: { ...d }, key }))}

      <div className="flex flex-row justify-center px-1 py-6 leading-normal text-gray-400 no-underline">
        <Pagination
          total={total}
          current={currentPage}
          onChange={handlePageChange}
          pageSize={pageSize}
        />
      </div>
    </>
  )
}
