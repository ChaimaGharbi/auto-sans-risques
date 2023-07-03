function SkeletonLoading() {
  console.log('I\'m loadiing');
  
  return (
    <div className="px-10 md:px-20 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-5">
      {new Array(9).fill(0).map((_, i) => (
        <div key={i} className="w-full bg-white rounded shadow-2xl">
          <div className="h-36 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
          <div className="p-5">
            <div className="grid grid-cols-4 gap-1">
              <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
              <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
            </div>
            <div className="h-6 rounded-sm bg-gray-200 animate-pulse mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoading
