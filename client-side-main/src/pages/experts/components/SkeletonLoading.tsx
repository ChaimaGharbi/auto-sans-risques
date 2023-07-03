const Skeleton = () => {
  return (
    <div className="py-4 grid grid-rows-1 sm:grid-rows-1 md:grid-rows-1 lg:grid-rows-1 xl:grid-rows-1 gap-5 w-full">
      {new Array(4).fill(0).map((_, i) => (
        <div
          key={i}
          className=" w-full max-w-full flex lg:pr-8 bg-white rounded shadow-2xl"
        >
          <div className=" w-1/2  lg:w-48 animate-pulse h-full bg-gray-200 flex-none bg-cover rounded-t rounded-l text-center overflow-hidden"></div>
          <div className="border-b  border-gray-200 border-l-0 border-t bg-white rounded-b-none lg:rounded-r p-4  justify-between leading-normal flex lg:flex-row md:flex-row flex-col w-full">
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2 animate-pulse h-6 bg-gray-200 w-1/2 rounded-tr rounded-tl"></div>
                <p className="text-blue-400 underline text-base animate-pulse h-3 bg-gray-200 w-24 rounded-tr rounded-tl mb-1"></p>
                <p className="text-base font-medium text-gray-600 animate-pulse h-3 bg-gray-200 w-24 rounded-tr rounded-tl mb-1"></p>
                <p className="text-sm font-medium text-gray-500 animate-pulse h-3 bg-gray-200 w-24 rounded-tr rounded-tl mb-1"></p>
              </div>
              <div className="flex items-center lg:pl-1 md:pl-7 ">
                <div className="text-sm">
                  <p className="text-gray-400 leading-none animate-pulse h-3 bg-gray-200 w-24 rounded-tr rounded-tl"></p>
                </div>
              </div>
            </div>
            <div className="flex items-center ">
              <div className="animate-pulse h-8 bg-gray-200 w-24 rounded-tr rounded-tl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton
