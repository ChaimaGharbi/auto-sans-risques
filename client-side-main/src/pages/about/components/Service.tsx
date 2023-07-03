const Service = (props: { label; src }) => {
  return (
    <div className="">
      <div
        style={{
          boxShadow: '0px 4px 24px rgba(78, 173, 255, 0.5)',
        }}
        className="mx-auto rounded-full bg-primary p-6 grid place-content-center w-[100px] h-[100px]"
      >
        <img src={props.src} alt="services" className="w-3/4 mx-auto" />
      </div>
      <p className="text-xs sm:text-base text-center max-w-[100px] sm:max-w-[200px] mt-3">
        {props.label}
      </p>
    </div>
  )
}

export default Service
