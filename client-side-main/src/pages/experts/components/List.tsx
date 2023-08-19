import If from 'app/shared/components/If'
import Skeleton from './SkeletonLoading'
import Expert from './Expert'
import { useGetExperts } from 'app/store/hooks'
import { Pagination } from 'antd'

const List = () => {
  // TODO: Pagination
  const { state, pagination } = useGetExperts()
  
  console.log(state);
  

  const handlePageChange = (page ) => {
    pagination.onchange(page)
  }
  
  
  const start = (pagination.page - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  const experts = state.data ? state.data.slice(start, end) : [];

  console.log(experts);
  
  

  return (
    <div className="flex flex-col w-full overflow-scroll lg:max-h-[80vh]">
      <If test={state.loading}>
        <Skeleton />
      </If>

      <div className="lg:p-4 grid grid-rows-1 sm:grid-rows-1 md:grid-rows-1 lg:grid-rows-1 xl:grid-rows-1 gap-5 w-full">
        <If test={!state.loading && state.data?.length === 0}>
          <div className="text-lg font-medium w-full   text-gray-700">
            Pas des experts!
          </div>
        </If>

        <If test={!state.loading && experts && experts?.length > 0}>
          {experts &&
            experts.map(expert => (
              <Expert
                key={expert._id}
                id={expert._id}
                name={expert.fullName}
                img={expert.img}
                speciality={expert.specialite}
                city={expert.ville}
                address={expert.address}
                note={expert.note}
              />
            ))}
        </If>

        <div className="flex flex-row justify-center px-1 py-6 leading-normal text-gray-400 no-underline">
          <Pagination
            total={pagination.total}
            current={pagination.page}
            onChange={handlePageChange}
            pageSize={pagination.pageSize}
            defaultCurrent={1}
          />
        </div>
      </div>
    </div>
  )
}

export default List
