import { AiFillStar as StarIcon } from 'react-icons/ai'
const Rating = props => {
  return (
    <div className="flex items-center">
      {new Array(5).fill(0).map((_, index) => (
        <span
          key={index}
          className={`${
            props.value && index < props.value
              ? 'text-[#FF9529]'
              : 'text-[#C8C8C8]'
          }  ${
            props.className
          } text-6xl m-0 leading-4 tracking-tighter relative -left-2`}
        >
          ⭑
        </span>
      ))}
    </div>
  )
}

export default Rating
