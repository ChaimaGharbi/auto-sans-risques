import { Pagination } from 'antd'
import { useMemo } from 'react'

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
          current={page}
          onChange={onChange}
          pageSize={pageSize}
        />
      </div>
    </>
  )
}
