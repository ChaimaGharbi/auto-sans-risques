import { Pagination } from 'antd'

export default function Paginate(props: Props) {
  return (
    <Pagination
      total={props.total}
      current={props.page}
      onChange={props.onChange}
      pageSize={props.size}
    />
  )
}

interface Props {
  total: number
  page: number
  onChange: (page: number) => void
  size: number
}
