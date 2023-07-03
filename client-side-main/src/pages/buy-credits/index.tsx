// PACKS DE CRÉDITS

import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { useState } from 'react'
import PaymentMethod from './components/PaymentMethod'
import PayWithCard from './components/PayWithCard'
import PayWithTransfer from './components/PayWithTransfer'
import { useBuyCredits } from 'app/store/hooks'

import If from 'app/shared/components/If'

const OngoingMissions = () => {
  const { step } = useBuyCredits()

  return (
    <Container>
      <div className="py-20">
        <div className="py-4">
          <Breadcrumb
            path={[
              {
                label: 'Accueil',
                path: '',
              },
              {
                label: 'Recharger Crédit missions',
                path: '/buy-credits',
              },
            ]}
          />
        </div>

        <If test={step === 'PICK_METHOD'}>
          <PaymentMethod />
        </If>
        <If test={step === 'PAY_WITH_CARD'}>
          <PayWithCard />
        </If>
        <If test={step === 'PAY_WITH_TRANSFER'}>
          <PayWithTransfer />
        </If>
      </div>
    </Container>
  )
}

export default OngoingMissions
