import Container from 'app/shared/components/Container'
import { useBuyCredits } from 'app/store/hooks'
import { AiFillLock as LockIcon } from 'react-icons/ai'

export default function PayWithCard() {
  const { select, pick } = useBuyCredits()
  return (
    <div className="bg-white rounded-sm py-10 max-w-xl mx-auto font-rubik text-[#333333]">
      <h1 className="font-medium text-center text-lg">
        Paiement en ligne par carte bancaire
      </h1>
      <Container>
        <div className="py-4">
          <h3 className="text-sm font-bold">
            Récapitualitif de votre commande
          </h3>
          <div className="grid gap-3 ">
            <div className="rounded bg-[#EEEEEE] p-4">
              <div className="text-xl flex items-center justify-between">
                <h2 className="">Nombre de missions</h2>
                <span>20</span>
              </div>
              <div className="text-xl flex items-center justify-between">
                <h2 className="text-[#333333]">Montant</h2>
                <span>80 TND</span>
              </div>
            </div>

            <div>
              <input
                placeholder="Numéro de carte"
                type="text"
                className="border border-[#E0E0E0] w-full outline-none h-12 p-4 rounded"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 border border-[#E0E0E0] w-full h-12 p-4 rounded flex items-center space-x-2">
                <input
                  placeholder="MM"
                  type="text"
                  className="w-6 outline-none"
                />
                <span className="text-[#A7A7A7]">/</span>
                <input
                  placeholder="YY"
                  type="text"
                  className="w-6 outline-none"
                />
              </div>
              <input
                placeholder="VCC"
                type="text"
                className=" border border-[#E0E0E0] w-full outline-none h-12 p-4 rounded"
              />
            </div>
            <button className="button bg-[#33E324] flex space-x-4 items-center justify-center placeholder:text-[#A7A7A7] font-bold">
              <LockIcon className="text-xl" />
              <span>Payer</span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}
