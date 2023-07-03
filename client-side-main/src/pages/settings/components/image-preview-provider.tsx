import { CloseMenuIcon } from 'app/shared/components/Header/Icons'
import { createContext, useContext, useEffect, useState } from 'react'

interface IImagePreviewContext {
  image: null | string
  setImage: (image: string) => void
}

export const ImagePreviewContext = createContext<IImagePreviewContext>({
  image: null,
  setImage: () => {},
})

export function usePreview() {
  return useContext(ImagePreviewContext)
}

export function ImagePreviewProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<null | string>(null)

  useEffect(() => {
    if (image) setOpen(true)
  }, [image])

  useEffect(() => {
    if (!open) setImage(null)
  }, [open])

  return (
    <ImagePreviewContext.Provider value={{ image, setImage }}>
      {open ? (
        <>
          <div
            onClick={() => setOpen(false)}
            className="bg-black/50 z-[120] fixed inset-0 duration-300"
          ></div>
          <div className="bg-white p-4 md:p-10 rounded-xl border shadow-xl duration-300 fixed z-[2002]  right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2">
            <img
              src={image || ''}
              alt="Preview"
              className="max-h-[60vh] rounded-md"
            />

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 !text-white rounded-md bg-primary flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <CloseMenuIcon />
                  <span>Fermer</span>
                </span>
              </button>
            </div>
          </div>
        </>
      ) : null}

      {children}
    </ImagePreviewContext.Provider>
  )
}
