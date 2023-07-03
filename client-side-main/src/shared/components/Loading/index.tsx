import './main.css'

const Loading = () => {
  return (
    <div className="py-48 flex justify-center items-center">
      <Spinner />
    </div>
  )
}

export const Spinner = () => {
  return (
    <div className="loader ease-linear rounded-full border-4 pr-4  border-t-4 border-gray-200 h-6 w-4"></div>
  )
}

export default Loading
