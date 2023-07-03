import Container from 'app/shared/components/Container'
import Loading from 'app/shared/components/Loading'
import { useBuyCredits, useGetAllPacks } from 'app/store/hooks'
import { BsFillCreditCard2FrontFill as CardIcon } from 'react-icons/bs'
import { CgArrowsExchangeAlt as XChangeIcon } from 'react-icons/cg'

export default function PaymentMethod() {
  const { select, pick, payWithCard, payWithTransfer } = useBuyCredits()

  const { data, loading } = useGetAllPacks()

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    )

  return (
    <div className="bg-white rounded-sm py-10 max-w-xl mx-auto font-rubik ">
      <h1 className="font-medium text-center text-lg">PACKS DE CRÉDITS</h1>
      <Container>
        <div className="grid gap-3 py-4">
          {data.map(pack => (
            <Option
              key={pack._id}
              value={pick[0]}
              amount={pack.nb_missions}
              price={pack.prix}
              select={() => select(pack._id)}
            />
          ))}
          <button
            className="button  flex space-x-4 items-center justify-center"
            onClick={payWithCard}
          >
            <CardIcon className="text-xl" />
            <span>Payer avec carte bancaire</span>
          </button>

          <button
            className="button bg-[#33E324] flex space-x-4 items-center justify-center"
            onClick={payWithTransfer}
          >
            <XChangeIcon className="text-xl" />
            <span>Payer avec transfert bancaire</span>
          </button>
        </div>
      </Container>
    </div>
  )
}

function Option({ value, amount, price, select }) {
  const handleChange = () => {
    select()
  }

  return (
    <label
      className={`cursor-pointer border rounded ${
        value === 1 ? 'border-primary' : 'border-[#E8E8E8]'
      }  font-bold flex items-center w-full p-4 duration-300`}
    >
      <input
        type="radio"
        name="amount"
        className="accent-blue-500 outline-none duration-300"
        value={(value === 1).toString()}
        onChange={handleChange}
      />
      <span className="ml-2">{amount} MISSIONS</span>

      <div className="ml-auto"></div>

      <span className="">{price}DT</span>
    </label>
  )
}
