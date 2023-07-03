const Modal = ({ children, open, onClose, className }) => {
  if (!open) return null
  return (
    <>
      <div
        onClick={onClose}
        className="bg-black/50 z-30 fixed inset-0 duration-300"
      ></div>
      <div
        className={`duration-300 fixed w-1/2 z-40  right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 ${className}`}
      >
        {children}
      </div>
    </>
  )
}

export default Modal
