import { Breadcrumb as BC } from 'antd'
import { Link } from 'react-router-dom'

interface SubPath {
  path: string
  label: string
}

const joined = (items: SubPath[], idx) => {
  let joined: string[] = []
  for (let i = 0; i <= idx; i++) {
    joined.push(items[i].path)
  }
  if (joined.length > 1) return joined.join('/')
  return '/' + joined.join('/')
}

const Breadcrumb = (props: { path: SubPath[] }) => {
  return (
    <div className="py-4">
      <BC className=" text-sm text-gray-500 w-full justify-self-start">
        {props.path.map((item, idx) => (
          <BC.Item className="capitalize" key={item.path + idx}>
            <Link to={joined(props.path, idx)}>{item.label}</Link>
          </BC.Item>
        ))}
      </BC>
    </div>
  )
}

export default Breadcrumb
